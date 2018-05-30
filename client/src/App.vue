<template>
  <div id="app" class="h-100">
    <result-table></result-table>
  </div>
</template>

<script>
import resultTable from './components/result-table.vue'
export default {
  name: 'app',
  data: function () {
    return {
      greetings: 'Hello'
    }
  },
  components: {
    'result-table': resultTable
  }
}
</script>

<style>
  body {
    height: 100vh !important;
  }

</style>
