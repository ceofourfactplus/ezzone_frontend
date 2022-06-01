<template>
  <div class="container mt-4">
    <nav-app :url_name="'MainReport'">Daily Product Report</nav-app>
    <div class="row">
      <div class="col-12">
        <label for="from_date"> From Date </label>
        <input v-model="filter_form.date_from" id="from_date" type="date" />
        <label for="from_date"> To Date </label>
        <input v-model="filter_form.date_to" id="to_date" type="date" />
      </div>
      <div class="col-12">
        <button @click="filter_form.category = null">all</button>
        <button
          v-for="category in categories"
          :key="category.id"
          type="button"
          @click="filter_form.category = category.id"
        >
          {{ category.category }}
        </button>
      </div>
      <div class="col-12 bg-light">
        <table class="table">
          <thead>
            <tr>
              <th>name</th>
              <th>amount</th>
              <th>price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in report_data" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.amount }}</td>
              <td>{{ item.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { api_pos } from "../../api/api_pos";
import { api_product } from "../../api/api_product";
import NavApp from "../../components/main_component/NavApp.vue";
export default {
  components: { NavApp },
  data() {
    return {
      filter_form: {
        date_from: "",
        category: null,
        date_to: "",
      },
      report_data: [],
      categories: [],
    };
  },
  async created() {
    const res = await api_product.get("category/");
    this.categories = res.data;
    this.filter_form.category = this.categories[0].id;
    this.filter_form = {
      date_from: moment().format("YYYY-MM-DD"),
      date_to: moment().add(1, "days").format("YYYY-MM-DD"),
    };
  },
  watch: {
    filter_form: {
      deep: true,
      async handler() {
        const res = await api_pos.get("report/by_date", {
          params: this.filter_form,
        });

        this.report_data = res.data;
      },
    },
  },
};
</script>

<style></style>
