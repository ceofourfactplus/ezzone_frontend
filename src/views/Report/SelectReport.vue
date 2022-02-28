<template>
  <div>
    <nav-app :url_name="'DashBoard'">Sale Report</nav-app>
    <div class="row" style="margin-top: 60px; height: 700px">
      <div class="col-12">
        <button
          class="btn-ghost"
          @click="
            $router.push({ name: 'MainReport', params: { type: 'daily' } });
            $store.state.report.page = 'daily'
          "
        >
          Daily Report
        </button>
      </div>
      <div class="col-12">
        <button
          class="btn-ghost"
          @click="
            $router.push({ name: 'MainReport', params: { type: 'weekly' } });
            $store.state.report.page = 'weekly'
          "
        >
          Weekly Report
        </button>
      </div>
      <div class="col-12">
        <button
          class="btn-ghost"
          @click="
            $router.push({ name: 'MainReport', params: { type: 'monthly' } });
            $store.state.report.page = 'monthly'
          "
        >
          Monthly Report
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NavApp from "../../components/main_component/NavApp.vue";
export default {
  components: { NavApp },
};
</script>

<style scoped>
.btn-ghost {
  width: 390px;
  height: 126px;
  color: #fff;
  border: 3px solid #ea7c69;
  font-weight: bold;
  font-size: 36px;
}
.col-12 {
  margin: auto;
}
</style>