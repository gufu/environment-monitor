<template>
  <div class="element" v-if="visible">
    <div class="alert" :class="'alert-' + status" role="alert">
      <h6 class="text-strong">{{webAddressShort}} - version: {{envStatus.version}}</h6>
      <p>
        <span class="text-small text-muted">{{envStatus.lastChecked}}</span><br>
        <!--<span class="text-small text-muted">{{envStatus.bookNowPosters}} | {{envStatus.comingSoonPosters}} | {{envStatus.quickbookCinemas}} | {{envStatus.menuElements}} | {{envStatus.heroBanners}} | {{envStatus.promoboxFirstTabItems}} | {{envStatus.footerLinks}}</span>-->
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
      status: ''
    }
  },
  methods: {
    getInfo: function (env) {
      let vm = this
      let url = '/fetch?' + env
      api().get(url)
        .then(function (response) {
          vm.envStatus = response.data
          vm.webAddressShort = vm.getWebAddressShort(response.data.website)
          vm.status = vm.checkStatus()
          vm.checkVisible()
        })
        .catch(function (error) {
          console.log(error)
          this.checkVisible()
        })
    },
    checkVisible: function () {
      this.visible = this.envStatus.website !== ''
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
        if (param.heroBanners > 1) {
          score += 1
        }
        if (param.promoboxFirstTabItems > 1) {
          score += 1
        }
        if (param.footerLinks > 1) {
          score += 1
        }
      }
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
    this.getInfo(this.env)
    this.checkVisible()
    setInterval(this.getInfo(this.env), 10000)
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
</style>
