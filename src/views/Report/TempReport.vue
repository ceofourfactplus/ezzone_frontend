<template>
  <div>
    <div class="table">
      <div class="table-header">
        <div class="row">
          <div class="col-7 w-100">Name</div>
          <div class="col-2 w-100">Amount</div>
          <div class="col-3 w-100">Price</div>
        </div>
      </div>
      <div class="table-item" v-for="item in reports" :key="item" style="color: white; font-size: 24px;">
        <div class="row">
          <div class="col-7 w-100">{{ item.obj.product_set.name }}</div>
          <div class="col-2 w-100">{{ item.obj.amount }}</div>
          <div class="col-3 w-100">{{ item.obj.amount * item.obj.price_item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api_pos } from "../../api/api_pos";
import NavApp from "../../components/main_component/NavApp.vue";
export default {
  components: { NavApp },
  mounted() {
      api_pos.get("order-item/").then((response) => {
          console.log(response.data, 'data')
          var data = response.data.filter((item) => item.product_set.category_set.category == "ของทานเล่น");
          var product_combined = {}
          data.forEach(item => {
            if (product_combined[item.product_set.name] == undefined) {
              product_combined[item.product_set.name] = item
            } else {
              product_combined[item.product_set.name].amount += item.amount
            }
          })
          for(const i in product_combined) {
            this.reports.push({
              'obj': product_combined[i],
            })
          }
      })
  },
  data() {
    return {
      report: {},
      reports: [],
      day: 0,
      from_date: '',
      to_date: '',
    };
  },
  methods: {
    
  },
};
</script>

