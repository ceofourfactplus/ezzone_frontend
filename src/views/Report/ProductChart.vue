<template>
  <div>
    <div v-if="loading">
      <BarChart
          :chartData="testData"
          :options="testOptions"
          :plugins="Plugins"
          :width="700"
          :height="800"
          style="margin: auto"
        />
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
  
  
</template>

<script>
import { BarChart } from "vue-chart-3";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { api_pos } from "../../api/api_pos";


export default {
  props: ["data"],
  data() {
    return {
      loading: false,
    }
  },
  beforeMount() {
    var type_dict = {'Food': 3, 'Drink': 2, 'Dessert': 1, 'Topping': 'topping'}
    var data = this.$store.state.report.date_data
    data.append('type_product', type_dict[this.$route.params.type])
    api_pos.post("report/product-detail", data).then((response) => {
      console.log(response.data, 'data')
      console.log(this.testData, 'testData')
      response.data.top_products.forEach(item => {
        this.testData.labels.push(item.name)
        this.testData.datasets[0].data.push(
          response.data.all_price[
            response.data.top_products.indexOf(item)
          ]
        )
      });
      this.loading = true
    })
  },
  components: { BarChart },
  setup(props) {
    const testData = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#FF6385",
            "#25A0E8",
            "#FFCE61",
            "#9B62FB",
            "#3CC0BF",
          ],
          datalabels: {
            labels: {},
          },
          borderWidth: 0,
          borderRadius: {
            topLeft: 0,
            topRight: 20,
            botttomLeft: 0,
            bottomRight: 20,
          },
          barPercentage: 0.6,
        },
      ],
    };

    const testOptions = {
      scales: {
        y: {
          ticks: {
            enabled:true,
            font: {
              size: 12,
            },
            color: "#fff",
          },
        },
        x: {
          ticks: {
            enabled:true,
            font: {
              size: 12,
            },
            color: "#fff",
          },
          grid: {
            drawBorder: false,
            color: function (context) {
              return "#ffffff80";
            },
          },
        },
      },
      responsive: false,
      aspectRatio: 1,
      indexAxis: "y",
      plugins: {
        datalabels: {
          color: "#fff",
          textAlign: "center",
          font: {
            weight: "bold",
            size: 30,
            family: "Sarabun",
          },
        },
        legend: {
          display: false,
          labels: {
            color: "rgb(255, 99, 132)",
          },
        },
      },
    };
    const Plugins = [ChartDataLabels];
    return { testData, testOptions, Plugins };
  },
};
</script>

<style>
</style>
