<template>
  <div class="app-container">
    <b-row>
      <b-col cols="12"><h4 class="text-center">UAT DEV</h4></b-col>
      <div class="card-group">
        <template v-for="(env, index) in uatdevEnvs">
          <widget :env="env" :key="'widget-' + index"></widget>
        </template>
      </div>
    </b-row>

    <b-row>
      <b-col cols="12"><h4 class="text-center mt-sm">UAT RELEASE</h4></b-col>
      <div class="card-group">
        <template v-for="(env, index) in uatreleaseEnvs">
          <widget :env="env" :key="'widget-' + index"></widget>
        </template>
      </div>
    </b-row>

    <b-row>
      <b-col cols="12"><h4 class="text-center mt-sm">STG</h4></b-col>
      <div class="card-group">
        <template v-for="(env, index) in stgEnvs">
          <widget :env="env" :key="'widget-' + index"></widget>
        </template>
      </div>
    </b-row>

    <b-row>
      <b-col cols="12"><h4 class="text-center mt-sm">PROD</h4></b-col>
      <div class="card-group">
        <template v-for="(env, index) in prodEnvs">
          <widget :env="env" :key="'widget-' + index"></widget>
        </template>
      </div>
    </b-row>
  </div>
</template>

<script>
/*
'CCI_YP_PROD',  10100
'CCI_CZ_PROD',  10101
 'CCI_HU_PROD',  10102
 'CCI_PL_PROD',  10103
 'CCI_RH_PROD',  10104
 'CCI_SL_PROD',  10105
 'CCI_BG_PROD',  10106
 'CCI_RO_PROD',  10107
'CW_UK_PROD',   10108
'CW_IE_PROD'    10109
*/
import environmentWidget from './environment-widget.vue'
export default {
  name: 'resultTable',
  components: {
    'widget': environmentWidget
  },
  data: function () {
    return {
      greetings: '',
      prodEnvs: [
        'CCI_YP_PROD',
        'CCI_CZ_PROD',
        'CCI_HU_PROD',
        'CCI_BG_PROD',
        'CCI_PL_PROD',
        'CCI_RH_PROD',
        'CCI_SK_PROD',
        'CCI_RO_PROD',
        'CW_UK_PROD',
        'CW_IE_PROD'
      ],
      uatdevEnvs: [
        'CCI_YP_UATDEV',
        'CCI_CZ_UATDEV',
        'CCI_HU_UATDEV',
        'CCI_BG_UATDEV',
        'CCI_PL_UATDEV',
        'CCI_RH_UATDEV',
        'CCI_SK_UATDEV',
        'CCI_RO_UATDEV',
        'CW_UK_UATDEV',
        'CW_IE_UATDEV'
      ],
      uatreleaseEnvs: [
        'CCI_YP_UATRELEASE',
        'CCI_CZ_UATRELEASE',
        'CCI_HU_UATRELEASE',
        'CCI_BG_UATRELEASE',
        'CCI_PL_UATRELEASE',
        'CCI_RH_UATRELEASE',
        'CCI_SK_UATRELEASE',
        'CCI_RO_UATRELEASE',
        'CW_UK_UATRELEASE',
        'CW_IE_UATRELEASE'
      ],
      stgEnvs: [
        'CCI_YP_STG',
        'CCI_CZ_STG',
        'CCI_HU_STG',
        'CCI_BG_STG',
        'CCI_PL_STG',
        'CCI_RH_STG',
        'CCI_SK_STG',
        'CCI_RO_STG',
        'CW_UK_STG',
        'CW_IE_STG'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  h1, h2 {
    font-weight: normal;
  }
  .app-container {
    padding:20px 50px;
  }
</style>
