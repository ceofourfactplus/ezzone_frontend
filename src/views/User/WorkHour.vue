<template>
  <div>
    <nav-app>Work Hour</nav-app>
    <div class="table">
      <div class="row m-0">
        <div class="col-5 w-100 p-0">
          <label for="start_date">Start Date</label>
          <input
            type="date"
            v-model="start_date"
            name="start_date"
            id="start_date"
          />
        </div>
        <div class="col-5 w-100 p-0">
          <label for="end_date">End Date</label>
          <input type="date" name="" v-model="end_date" id="end_date" />
        </div>
        <div class="col-2 w-100">
          <button class="btn-b w-100" type="submit" @click="find_user()">
            submit
          </button>
        </div>
      </div>
      <div class="table-header w-100 row m-0" style="border: 0px">
        <div class="col-6 w-100">
          <label for="start_date">User</label>
        </div>
        <div class="col-6 w-100">
          <label for="start_date">Hour</label>
        </div>
      </div>
      <div style="overflow-y: auto;height:700px;">
        <div
          class="table-item row m-0 mt-2"
          style="line-height: 20px;"
          v-for="(item, index) in data"
          :key="index"
        >
          <div class="col-6" style="margin:auto;">{{ item.user }}</div>
          <div class="col-6" style="margin:auto;">{{item.time_login}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api_user } from "../../api/api_user.js";
import NavApp from "../../components/main_component/NavApp.vue";
export default {
  components: { NavApp },
  data() {
    return {
      start_date: new Date().toISOString().slice(0, 10),
      end_date: new Date().toISOString().slice(0, 10),
      data: [],
    };
  },
  methods: {
    find_user() {
      api_user
        .get("work-hours/" + this.start_date + "/" + this.end_date)
        .then((response) => {
          this.data = response.data;
        });
    },
  },
};
</script>
<style scoped>
input {
  padding: 0px !important;
  height: 100%;
  width: 63%;
}

label {
  font-size: 22px;
}

.btn-b {
  background-color: #65b0f6 !important;
  height: 80%;
  line-height: 80%;
  top: 10px;
  padding: 0px;
}
</style>