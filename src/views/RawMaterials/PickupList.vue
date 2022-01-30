<template>
  <div>
    <nav-app :rm_menu="true" :url_name="'DashBoard'">Pickup&#160;List</nav-app>
    <div class="row AreaPage">
      <div class="col-12 w-100" style="padding:0%;">
        <SearchBar
          @search="serchByTyping"
          style="width: 100%;"
        />
      </div>
    </div>

    <div>
      <!-- header -->
      <div class="AreaPage row table-header" style="line-height:160%;">
        <div class="col-2 w-100">Date</div>
        <div class="col-5 w-100">Name</div>
        <div class="col-2 w-100">Qty</div>
        <div class="col-1 w-100">Unit</div>
        <div class="col-2 w-100">Pickup By</div>
      </div>

      <!-- item -->
      <div class="AreaPage row table-item" v-for="item in pickup_items" :key="item.id">
        <div class="col-2 w-100">
          {{  format_date(item.create_at) }}</div>
        <div class="col-5" 
          style="
          width:95%;
          margin-left:5%;
          padding-left:0%;
          text-align: left; 
          white-space: nowrap; 
          overflow-x: auto;">
          {{ item.raw_material_set.name }}
        </div>
        <div class="col-2 w-100">
          {{ item.amount }}
        </div>
        <div class="col-1 w-100">
          {{ item.unit_set.unit }}
        </div>
        <div class="col-2 w-100">
          {{ item.create_by_set.username }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavApp from "../../components/main_component/NavApp.vue";
import Switch from "../../components/main_component/Switch.vue";
import SearchBar from "../../components/materials/SearchBar.vue";
import { api_raw_material } from "../../api/api_raw_material.js";
export default {
  components: { NavApp, Switch, SearchBar },
  data() {
    return {
      categories: [],
      units: [],
      pickup_items: [],
      temp_pickup: [],
    };
  },
  methods: {
    fetchPickupItems() {
      api_raw_material.get("/pickup/").then((response) => {
        console.log(response.data, "pickup data");
        console.log(response.data.unit_set, "unit_set");
        this.pickup_items = response.data;
        this.temp_pickup = response.data;
      });
    },
    serchByTyping(val) {
      var temp = [];
      if (val == "") {
        this.pickup_items = this.temp_pickup;
      } else {
        this.temp_pickup.forEach((element) => {
          if (element.raw_material_set.name.indexOf(val) + 1 != 0) {
            temp.push(element);
          }
        });
        this.pickup_items = temp;
      }
    },
    format_date(date) {
      console.log(date)
      var a = date.slice(0,10).split("-")      
      return a[2]+"/"+a[1]+"/"+a[0]
    }
  },
  watch: {
    remain() {
      this.total_price = this.remain * this.avg_price;
    },
    avg_price() {
      this.total_price = this.remain * this.avg_price;
    },
  },
  mounted() {
    this.fetchPickupItems();
    api_raw_material.get("category").then((response) => {
      this.categories = response.data;
    });
    api_raw_material.get("unit").then((response) => {
      console.log(response.data, "unit");
      this.units = response.data;
    });
  },
};
</script>

<style scoped>

div.row.table-item {
  margin-top: 1.2%;
  line-height:210%;
}
.AreaPage {
  width: 96%;
  margin: auto;
  margin-top: 1.2%;
  height: 45px;
}
</style>