<template>
  <div>
    <nav-app :url_name="'DashBoard'">Unit</nav-app>
    <div class="row GridAreaSearch" v-if="is_staff" style="width: 90%; margin: auto;">
      <div class="w-100" style="padding: 0px;">
        <SearchBar @search="search_by_typing" />
      </div>
      <div class="w-100" style="padding-right: 0px;">
        <button
          class="btn-ghost"
          style="white-space: nowrap;height:45px;"
          @click="add_category_status = true"
        >
          + New
        </button>
      </div>
    </div>
    <SearchBar v-else @search="search_by_typing" />
    <!-- Table -->
    <div class="table" style="width:90%; margin:auto; margin-top:10px">
      <div class="table-header">
        <!-- Is Staff -->
        <div v-if="is_staff" class="GridItemHead">
          <div class="w-100" >Unit</div>
          <div class="w-100" >Amount</div>
        </div>
      </div>
      <!-- Scoll Bar -->
      <div class="ScollArea" v-if="is_staff">

        <div v-for="(item, idx) in all_unit" :key="idx" style="height:40px; margin: 0px 0px 8px 0px;">

          <div class="GridItemHead table-item"
            style="
              padding: 0px;
              margin: 0px;
              background-color: #303344;
              border-radius: 10px;
              line-height: 200%;
            ">
            <div class="w-100" style="text-align:left; padding-left: 18px">{{ item.unit }}</div>
            <div class="w-100" >100</div>
            <div class="w-100">
              <img
                @click="SelectUnit(item)"
                src="../../assets/icon/edit.png"
                style="position:relative; bottom: 3px; width: 25px; height: 30px"
              />
            </div>

          </div>

        </div>
          
        
      </div>
    </div>

    <!-- Popup -->
    <div class="blur" v-if="add_category_status">
      <div class="category-popup" v-if="add_category_status">
        <img
          @click="add_category_status = false"
          style="position: absolute; right: 10px; top: 10px; width: 30px"
          src="../../assets/icon/delete.png"
        />
        <h2>Create RM Unit</h2>
        <label for="category" style="color: white">Unit : &nbsp;</label>
        <input
          v-model="category"
          type="text"
          name="category"
          class="for-category"
        />
        <br />
        <button class="btn-save" @click="create()">
          <span class="icon-save"></span>Save
        </button>
      </div>
    </div>
    <!-- edit pop up -->
    <div class="blur" v-if="edit_unit">
      <div class="category-popup" v-if="edit_unit">
        <img
          @click="edit_unit = false"
          style="position: absolute; right: 10px; top: 10px; width: 30px"
          src="../../assets/icon/delete.png"
        />
        <h2>Edit RM Unit</h2>
        <label for="category" style="color: white">Unit : &nbsp;</label>
        <input
          v-model="select_unit.unit"
          type="text"
          name="category"
          class="for-category"
        />
        <br />
        <button class="btn-save" @click="edit()">
          <span class="icon-save"></span>Save
        </button>
      </div>
    </div>


    <!-- Card Popup -->
    <SavePopup :alert="alert" />
  </div>
</template>

<script>
import SearchBar from "../../components/materials/SearchBar.vue";
import NavApp from "../../components/main_component/NavApp.vue";
import SavePopup from "../../components/main_component/SavePopup.vue"
import { api_raw_material } from "../../api/api_raw_material";

export default {
  name: "RMUnit",
  components: {
    SavePopup,
    SearchBar,
    NavApp,
  },
  mounted() {
    this.is_staff = this.$store.state.auth.userInfo["is_staff"];
    this.fetchRMUnit();
  },
  data() {
    return {
      is_staff: false,
      alert: false,
      add_category_status: false,
      category: "",
      all_unit: [],
      temp_categories: [],
      select_unit: {},
      edit_unit: false,
    };
  },
  methods: {
    fetchRMUnit() {
      api_raw_material.get("/unit/").then((response) => {
        this.all_unit = response.data;
        this.temp_categories = response.data;
      });
    },
    create() {
      this.alert = true;
      var data = {
        unit: this.category,
      };
      api_raw_material.post("unit/", data).then(() => {
        setTimeout(() => {
          this.alert = false;
          this.add_category_status = false;
          this.fetchRMUnit();
          this.unit = "";
        }, 1000);
      });
    },
    search_by_typing(val) {
      var temp = [];
      if (val == "") {
        this.all_unit = this.temp_categories;
      } else {
        this.temp_categories.forEach((element) => {
          if (element.unit.toLowerCase().indexOf(val.toLowerCase()) + 1 != 0) {
            temp.push(element);
          }
        });
        this.all_unit = temp;
      }
    },
    edit() {
      this.alert = true;
      api_raw_material
        .put("/unit/" + this.select_unit.id, this.select_unit)
        .then(() => {
          setTimeout(() => {
            this.alert = false;
            this.edit_unit = false;
            this.fetchRMUnit();
          }, 1000);
        });
    },
    SelectUnit(item) {
      this.select_unit = item;
      this.edit_unit = true;
    },
  },
};
</script>

<style scoped>
.card {
  width: 542px;
  height: 350px;
  top: 230px;
  left: 90px;
}
.btn-save {
  font-weight: bold;
  font-size: 24px;
  color: #ea7c69;
  border-color: #ea7c69;
  margin-top: 45px;
  border-radius: 10px;
  text-align: center;
  background: transparent;
  line-height: 31px;
  width: 192px;
  height: 45px;
}
span.icon-save {
  background: url("../../assets/icon/save.png") no-repeat transparent;
  background-size: 30px;
  float: left;
  margin-left: 37px;
  width: 30px;
  height: 30px;
}
.for-category {
  margin: 40px 0px 0px 0px;
  width: 300px;
  height: 50px;
}
h2 {
  width: 100%;
  height: 39px;
  margin-top: 20px;
  margin: auto;
  top: 10px;
  color: #ea7c69;
}
.category-popup {
  position: absolute;
  top: 230px;
  left: 160px;
  font-weight: bold;
  font-size: 30px;
  width: 520px;
  height: 250px;
  background: #252836;
  border: 2px solid #ea7c69;
  box-sizing: border-box;
  border-radius: 10px;
}
.btn-ghost {
  border-color: #65b0f6;
  color: #65b0f6;
  width: 119px;
  height: 50px;
  margin: 0px 0px 0px 0px;
}
.wrap-search {
  min-width: 610px;
  width: fit-content;
  padding: 0px;
  margin-left: 45px;
}
.GridAreaSearch {
  display: inline-grid;
  grid-template-columns: 82% 18%;

}
.GridItemHead {
  width: 100%;
  display: inline-grid;
  grid-template-columns: 40% 40% 20%;

}
.ScollArea {
  height: 750px;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 10px;
  margin-top: 8px;

}
</style>