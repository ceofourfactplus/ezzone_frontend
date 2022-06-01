<template>
  <div>
    <!-- <BarChart
        :chartData="testData"
        :options="testOptions"
        :plugins="Plugins"
        :width="700"
        :height="1600"
        style="margin: auto"
      /> -->
    <div class="row">
      <div class="col-12">
        <table class="table table-dark table-striped">
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
import { BarChart } from "vue-chart-3";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { api_pos } from "../../api/api_pos";
import moment from "moment";

export default {
  props: ["data"],
  data() {
    return {
      filter_form: {
        date_from: moment().format("yyyy-mm-dd"),
        date_to: moment().format("yyyy-mm-dd"),
      },
      report_data: [],
    };
  },

  // beforeMount() {
  // var type_dict = { Food: 3, Drink: 2, Dessert: 1, Topping: "topping" };
  // var data = this.$store.state.report.date_data;
  // data.append("type_product", type_dict[this.$route.params.type]);
  // if (this.$route.params.type == "Topping") {
  //   api_pos.post("report/topping-detail", data).then((response) => {
  //     console.log(response.data, "topping data");
  //     response.data.top_products.forEach((item) => {
  //       this.testData.labels.push(item.name);
  //       this.testData.datasets[0].data.push(
  //         response.data.all_price[response.data.top_products.indexOf(item)]
  //       );
  //     });
  //     this.loading = true;
  //   });
  // } else {
  //   api_pos.post("report/product-detail", data).then((response) => {
  //     console.log(response.data, "data");
  //     console.log(this.testData, "testData");
  //     response.data.top_products.forEach((item) => {
  //       this.testData.labels.push(item.name);
  //       this.testData.datasets[0].data.push(
  //         response.data.all_price[response.data.top_products.indexOf(item)]
  //       );
  //     });
  //     this.loading = true;
  //   });
  // }
  // },
  // components: { BarChart },
  // setup(props) {
  //   const testData = {
  //     labels: [],
  //     datasets: [
  //       {
  //         data: [],
  //         backgroundColor: [
  //           "#FF6385",
  //           "#25A0E8",
  //           "#FFCE61",
  //           "#9B62FB",
  //           "#3CC0BF",
  //         ],
  //         datalabels: {
  //           labels: {},
  //         },
  //         borderWidth: 0,
  //         borderRadius: {
  //           topLeft: 0,
  //           topRight: 20,
  //           botttomLeft: 0,
  //           bottomRight: 20,
  //         },
  //         barPercentage: 0.6,
  //       },
  //     ],
  //   };

  //   const testOptions = {
  //     scales: {
  //       y: {
  //         ticks: {
  //           enabled: true,
  //           font: {
  //             size: 12,
  //           },
  //           color: "#fff",
  //         },
  //       },
  //       x: {
  //         ticks: {
  //           enabled: true,
  //           font: {
  //             size: 12,
  //           },
  //           color: "#fff",
  //         },
  //         grid: {
  //           drawBorder: false,
  //           color: function (context) {
  //             return "#ffffff80";
  //           },
  //         },
  //       },
  //     },
  //     responsive: false,
  //     aspectRatio: 1,
  //     indexAxis: "y",
  //     plugins: {
  //       datalabels: {
  //         color: "#fff",
  //         textAlign: "center",
  //         font: {
  //           weight: "bold",
  //           size: 30,
  //           family: "Sarabun",
  //         },
  //       },
  //       legend: {
  //         display: false,
  //         labels: {
  //           color: "rgb(255, 99, 132)",
  //         },
  //       },
  //     },
  //   };
  //   const Plugins = [ChartDataLabels];
  //   return { testData, testOptions, Plugins };
  // },
};
</script>

<style></style>
