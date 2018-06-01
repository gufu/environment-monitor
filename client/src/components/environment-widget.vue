<template>
  <div class="card" :class="'border-' + status">
    <div class="card-header" v-if="visible" :class="['bg-' + status, {'text-white': status !== ''}]">
      <span>{{webAddressShort}}<br>- v{{envStatus.version}}</span>
    </div>
    <div class="card-body" v-if="visible">
      <b-row class="numbers">
        <b-col><small>menu:</small>{{envStatus.menuElements}}</b-col>
        <b-col><small>poster:</small>{{envStatus.bookNowPosters}}/{{envStatus.comingSoonPosters}}</b-col>
        <b-col><small>sites:</small>{{envStatus.quickbookCinemas}}</b-col>
        <b-col><small>banners:</small>{{envStatus.heroBanners}}</b-col>
        <b-col><small>promo:</small>{{envStatus.promoboxFirstTabItems}}</b-col>
        <b-col><small>foot:</small>{{envStatus.footerLinks}}</b-col>
      </b-row>
    </div>
    <div class="card-body" v-if="!visible">
      <h6 class="card-title text-center">{{this.env}}</h6>
      <h6 class="card-title text-center">Loading data...</h6>
      <loader></loader>
      <!--<div class="row text-center">
        <div class="loader" ></div>
      </div>-->
    </div>
    <div class="card-footer" v-if="visible">
      <small class="text-muted">Last updated: {{moment(envStatus.lastChecked).format('HH:mm:ss ZZ')}}</small>
    </div>
  </div>
</template>

<script>
import api from '../services/Api'
import loader from './loader.vue'

export default {
  name: 'environmentWidget',
  components: {
    'loader': loader
  },
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
      } else if (score < 6 && score > 2) {
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
  p {
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
  .card-header {
    -webkit-transition: background-color 500ms cubic-bezier(0.155, 1, 0.695, 0); /* older webkit */
    -webkit-transition: background-color 500ms cubic-bezier(0.155, 1.650, 0.695, -0.600);
    -moz-transition: background-color 500ms cubic-bezier(0.155, 1.650, 0.695, -0.600);
    -o-transition: background-color 500ms cubic-bezier(0.155, 1.650, 0.695, -0.600);
    transition: background-color 500ms cubic-bezier(0.155, 1.650, 0.695, -0.600); /* custom */

    -webkit-transition-timing-function: cubic-bezier(0.155, 1, 0.695, 0); /* older webkit */
    -webkit-transition-timing-function: cubic-bezier(0.155, 1.650, 0.695, -0.600);
    -moz-transition-timing-function: cubic-bezier(0.155, 1.650, 0.695, -0.600);
    -o-transition-timing-function: cubic-bezier(0.155, 1.650, 0.695, -0.600);
    transition-timing-function: cubic-bezier(0.155, 1.650, 0.695, -0.600); /* custom */
  }
  .card-header, .card-body, .card-footer {
    padding: .75rem;
  }
  .card-header {
    &.bg-danger,
    &.bg-warning,
    &.bg-success {
      -webkit-box-shadow: inset 28px 0px 50px -32px rgba(0,0,0,0.75);
      -moz-box-shadow: inset 28px 0px 50px -32px rgba(0,0,0,0.75);
      box-shadow: inset 28px 0px 50px -32px rgba(0,0,0,0.75);
    }
  }
</style>
