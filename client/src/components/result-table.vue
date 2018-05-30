<template>
  <div class="app-container">
      <b-row>
        <b-col cols="3"><h4 class="text-center">UAT DEV</h4></b-col>
        <b-col cols="3"><h4 class="text-center">UAT RELEASE</h4></b-col>
        <b-col cols="3"><h4 class="text-center">STG</h4></b-col>
        <b-col cols="3"><h4 class="text-center">PROD</h4></b-col>
      <!--<b-row>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
      </b-row>
      <b-row>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
      </b-row>
      <b-row>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
      </b-row>
      <b-row>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
      </b-row>
      <b-row>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
      </b-row>
      <b-row>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
      </b-row>
      <b-row>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
      </b-row>
      <b-row>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
      </b-row>
      <b-row>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col><widget :env="'CW_UK_PROD'"></widget></b-col>
      </b-row>-->
        <div class="w-100"></div>
        <b-col cols="3"><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col cols="3"><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col cols="3"><widget :env="'CW_UK_PROD'"></widget></b-col>
        <b-col cols="3"><widget :env="'CW_UK_PROD'"></widget></b-col>
      </b-row>
  </div>
</template>

<script>
import environmentWidget from './environment-widget.vue'
export default {
  name: 'resultTable',
  components: {
    'widget': environmentWidget
  },
  data: function () {
    return {
      greetings: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  h1, h2 {
    font-weight: normal;
  }
  .app-container {
    padding:50px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }
  .table th, .table td {
    padding:0;
  }
</style>
