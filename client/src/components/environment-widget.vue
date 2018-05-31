<template>
  <div class="element">
    <div class="alert" :class="'alert-' + status" role="alert" v-if="visible">
      <h6 class="text-strong">{{webAddressShort}} - v{{envStatus.version}}</h6>
      <p>
        <span class="text-small text-muted">Updated: {{moment(envStatus.lastChecked).format('HH:mm:ss ZZ')}}</span><br>
      </p>
      <hr>
      <b-row class="numbers">
        <b-col><small>menu:</small>{{envStatus.menuElements}}</b-col>
        <b-col><small>poster:</small>{{envStatus.bookNowPosters}}/{{envStatus.comingSoonPosters}}</b-col>
        <b-col><small>sites:</small>{{envStatus.quickbookCinemas}}</b-col>
        <b-col><small>banners:</small>{{envStatus.heroBanners}}</b-col>
        <b-col><small>promo:</small>{{envStatus.promoboxFirstTabItems}}</b-col>
        <b-col><small>foot:</small>{{envStatus.footerLinks}}</b-col>
      </b-row>
    </div>
    <div class="alert alert-dark" role="alert" v-if="!visible">
      <p class="text-small text-center">Loading data for {{this.env}}</p>
      <div class="row text-center">
        <div class="loader" ></div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/Api'

export default {
  name: 'environmentWidget',
  props: ['env'],
  data: function () {
    return {
      envStatus: {},
      webAddressShort: '',
      visible: false,
      score: 0,
      status: ''
    }
  },
  methods: {
    getInfo: function () {
      let env = this.env
      let vm = this
      let url = '/fetch?' + env
      api().get(url)
        .then(function (response) {
          vm.envStatus = response.data
          vm.webAddressShort = vm.getWebAddressShort(response.data.website)
          vm.status = vm.checkStatus()
          vm.checkVisible()
        })
        .catch(function () {
          vm.checkVisible()
        })
    },
    checkVisible: function () {
      let website = this.envStatus.website
      this.visible = typeof website !== 'undefined' && website !== ''
    },
    getWebAddressShort: function (url) {
      let result = ''
      if (typeof url !== 'undefined' && url !== '') {
        result = url.replace('https://', '').replace('http://', '').replace('www.', '')
      }
      return result
    },
    checkStatus: function () {
      let param = this.envStatus
      let score = 0
      let result = 'secondary'
      if (typeof param !== 'undefined') {
        if (param.menuElements > 1) {
          score += 1
        }
        if (param.bookNowPosters > 1) {
          score += 0.5
        }
        if (param.comingSoonPosters > 1) {
          score += 0.5
        }
        if (param.quickbookCinemas >= 1) {
          score += 1
        }
        if (param.heroBanners >= 1) {
          score += 1
        }
        if (param.promoboxFirstTabItems > 1) {
          score += 1
        }
        if (param.footerLinks > 1) {
          score += 1
        }
      }
      this.score = score
      if (score === 6) {
        result = 'success'
      } else if (score > 6 && score > 2) {
        result = 'warning'
      } else {
        result = 'danger'
      }
      return result
    }
  },
  mounted () {
    let timeOffset = Math.round(Math.random() * 10000)
    // some randomization so all components don't start asking api at the same time
    let vm = this
    setTimeout(function () {
      vm.checkVisible()
      vm.getInfo()
      setInterval(vm.getInfo, 60 * 1000)
    }, timeOffset)
  }
}
</script>

<style lang="scss" scoped>
  .bg-success {
    background-color: rgba(255, 255, 255, 0)
  }
  p, h6 {
    margin-bottom:.2rem;
  }
  hr {
    margin-top: .3rem;
    margin-bottom: .3rem;
  }
  .numbers {
    small {
      display: block;
    }
  }
  .loader {
    border-top: 8px solid #D54733;
    border-right: 8px solid #0E5D9E;
    border-bottom: 8px solid #ECC417;
    border-left: 8px solid #3AA84B;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    animation: spin 1s linear infinite;
    margin: 0 auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
