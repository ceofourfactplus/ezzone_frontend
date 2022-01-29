<template>
  <div>
    <nav-app :url_name="'Redemption'" reward_menu="true"
      >Pre-Order Reward</nav-app
    >
    <!-- SearchBlock -->
    <div class="row" style="max-width: 672px">
      <div class="col-10 w-100 BlockSearch">
        <SearchBar @search="search" />
      </div>
      <div class="col-2 w-100 BlockSelect">
        <select
          name="category"
          id="category"
          v-model="category_id"
          style="height: 45px; width: 137px"
        >
          <!-- <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option> -->
        </select>
      </div>
    </div>

    <!-- Header -->
    <div class="table-header" id="Header">
      <div class="row" style="width: 772px; height: 50px; margin: 0px">
        <div class="col-1 w-100"></div>
        <div class="col-4 w-100" style="padding-left: 30px">Reward</div>
        <div class="col-2 w-100">Qty</div>
        <div class="col-3 w-100">Cust Name</div>
        <div class="col-2 w-100">Status</div>
      </div>
    </div>
    <!-- Item -->
    <div
      class="row table-item"
      @click="show_redeem(item)"
      id="BlockItem"
      style="line-height: 50px"
      v-for="item in rewards"
      :key="item.id"
    >
      <div
        class="col-1"
        style="
          background-color: #717171;
          border-radius: 10px;
          width: 40px;
          height: 40px;
          margin: 5px;
          left: 3px;
          position: relative;
        "
      >
        <img
          :src="item.reward_set.img"
          alt=""
          style="
            height: 40px;
            width: 40px;
            left: -11px;
            top: -9px;
            position: relative;
          "
        />
      </div>
      <div class="col-4 w-100" style="text-align: left">
        {{ item.reward_set.reward }}
      </div>
      <div class="col-2 w-100">{{ item.reward_set.qty }}</div>
      <div class="col-3 w-100">{{ item.customer_set.nick_name }}</div>
      <div class="col-2 w-100" style="padding: 0px">
        <img
          src="../../assets/icon/cooking-status.png"
          alt=""
          style="height: 38px; width: 100px; top: -4px; position: relative"
        />
      </div>
    </div>

    <!-- Popup -->
    <div class="AreaPopup" v-if="redeem_popup">
      <div class="HeadPopup" style="left: 20px">
        <b>Redeem</b>
        <img
          src="../../assets/img/btn-close.png"
          alt=""
          style="right: -176px; position: relative"
          @click="redeem_popup = false"
        />
      </div>
      <div class="table-item AreaRedeemPopup">
        <div class="row">
          <div class="col-6 StatusBlock" @click="save">
            <b>Confirm Redeem</b>
          </div>
          <div class="col-6 RedeemNamePhone" style="margin-bottom: 5px">
            {{ redeem_item.customer_set.nick_name }}
          </div>
        </div>
        <div class="row" style="height: 250px; padding-top: 10px">
          <div class="col-6 RedeemImg" style="background-color: #717171">
            <img
              :src="redeem_item.reward_set.img"
              style="height: 245px; width: 243px"
            />
          </div>
          <div class="col-6 RedeemImg">
            <div
              class="RedeemNamePhone"
              style="margin: 0px; margin-bottom: 15px"
            >
              {{
                phone_number_layout(
                  redeem_item.customer_set.phone_number
                )
              }}
            </div>
            <div
              class="RedeemNameReward"
              style="margin: 0px; margin-bottom: 15px"
            >
              <b>{{ redeem_item.reward_set.reward }}</b>
            </div>
            <div
              class="row RedeemPoint"
              style="margin: 0px; margin-bottom: 15px"
            >
              <div
                class="col-6 w-100 DetailPoint"
                style="background-color: #303344"
              >
                <b>{{ redeem_item.reward_set.point }}</b>
              </div>
              <div class="col-6 w-100 DetailPoint"><b>Point</b></div>
            </div>
            <div class="RedeemNamePhone" style="margin: 0px">
              <select
                v-model="redeem_item.reward_set.is_pre_order"
                style="background: #717171; height: 50px; width: 233px"
              >
                <option :value="false">Received @ Counter</option>
                <option :value="true">Pre-order</option>
              </select>
            </div>
          </div>
        </div>
        <!-- Sign Here -->
        <div class="flex-row">
          <div class="wrapper">
            <!-- <canvas id="signature-pad" width="510"></canvas> -->
            <img :src="redeem_item.signature" id="signature-pad">
          </div>
        </div>
      </div>
    </div>
    <!-- Card Popup -->
    <SavePopup :alert="alert" />
  </div>
</template>

<script>
import NavApp from "../../components/main_component/NavApp.vue";
import SavePopup from "../../components/main_component/SavePopup.vue"
import SearchBar from "../../components/materials/SearchBar.vue";
import { api_promotion } from "../../api/api_promotion";

export default {
  name: "PreOrderReward",
  components: {
    NavApp,
    SearchBar,
    SavePopup,
  },
  data() {
    return {
      rewards: [],
      temp_rewards: [],
      redeem_popup: false,
      alert: false,
      redeem_item: {},
    };
  },
  methods: {
    fetchRewards() {
        this.rewards = []
        this.temp_rewards = []
        setTimeout(() => {
            api_promotion.get("exchange-history/").then((response) => {
                    console.log(response.data, "rewards");
                    response.data.forEach((element) => {
                    if (element.reward_set.is_pre_order) {
                        this.rewards.push(element);
                        this.temp_rewards.push(element);
                    }
                    });
                });
        }, 500)
      
    },
    show_redeem(item) {
      console.log(item);
      this.redeem_item = item
      this.redeem_popup = true
    },
    phone_number_layout(phone) {
      if (phone != null) {
        return (
          phone.substr(0, 3) +
          "-" +
          phone.substr(3, 3) +
          "-" +
          phone.substr(6, 4)
        );
      } else {
        return "";
      }
    },
    search(val) {
      console.log(val);
    },
    save() {
        const data = {is_pre_order: this.redeem_item.reward_set.is_pre_order}
        api_promotion.put(`exchange-history/${this.redeem_item.reward_set.id}`, data).then(() => {
            this.alert = true;
            this.fetchRewards()
            setTimeout(() => {
                this.redeem_popup = false;
                this.alert = false;
            }, 2000)
        });
    }
  },
  beforeMount() {
    this.fetchRewards();
  },
};
</script>

<style scoped>
.BlockSearch {
  min-width: 615px;
  height: 45px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.BlockSelect {
  position: relative;
  top: 9px;
}

#Header {
  width: 770px;
  height: 50px;
  margin-left: 24px;
  margin-right: 24px;
  margin-top: 10px;
  margin-bottom: 20px;
  color: #ffffff;
  position: relative;
  line-height: 45px;
  font-size: 26px;
  padding: 0px;
}

#BlockItem {
  width: 772px;
  height: 50px;
  margin-left: 24px;
  margin-right: 24px;
  margin-top: 10px;
  position: relative;
  font-size: 23px;
  text-align: center;
  padding: 0px;
}

#signature-pad {
  background: white;
  width: 100%;
  height: 140px;
  cursor: crosshair;
}
.wrapper {
  border: 1px solid black;
  border-right: 0;
  width: 510px;
}
.flex-row {
  margin-top: 20px;
  display: flex;
}

img {
  border-radius: 20px;
}

.BlockItem {
  width: 672px;
  position: relative;
  font-size: 23px;
  text-align: center;
  padding: 0px;
  margin: 0px;
  top: 30px;
}

.RedeemItem {
  color: #ea7c69;
  font-size: 30px;
  height: 50px;
  width: 308px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #ea7c69;
  line-height: 20px;
  margin-left: 0px;
  margin-right: 20px;
}

.BlockImg {
  width: 672px;
  position: relative;
  font-size: 23px;
  text-align: center;
  padding: 0px;
  margin: 0px;
  top: 60px;
}

.RedeemPointItem {
  color: #fff;
  font-size: 30px;
  height: 298px;
  width: 308px;
  padding-left: 2px;
  padding-right: 2px;
  border-radius: 30px;
  background-color: #ea7c69;
  line-height: 20px;
  margin-left: 0px;
  margin-right: 20px;
}

.BlockPoint {
  height: 178px;
  margin: 0px;
  border-radius: 0px;
  font-size: 106px;
  line-height: 160px;
}

.AreaDescription {
  margin: 20px;
  color: aliceblue;
  width: 615px;
  position: relative;
  font-size: 30px;
  text-align: left;
  padding: 0px;
  margin-left: 27px;
  top: 70px;
}

.BlockDescription {
  width: 100%;
  height: 305px;
  border-radius: 20px;
  position: relative;
  font-size: 24px;
  text-align: left;
  padding: 0px;
  margin-left: 14px;
}

.AreaPopup {
  color: #fff;
  position: absolute;
  border-radius: 20px;
  width: 590px;
  height: 586px;
  background-color: #252836;
  top: 140px;
  left: 14%;
}

.HeadPopup {
  color: #fff;
  width: 590px;
  position: relative;
  font-size: 37px;
  text-align: center;
  padding: 0px;
  margin: 0px;
}

.AreaRedeemPopup {
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  width: 550px;
  height: 85%;
  padding: 20px;
}

.RedeemNamePhone {
  width: 243px;
  height: 50px;
  background-color: #717171;
  position: relative;
  font-size: 23px;
  padding: 0px;
  padding-left: 10px;
  margin-left: 12px;
  border-radius: 10px;
  line-height: 45px;
  text-align: left;
}

.RedeemImg {
  width: 243px;
  height: 100%;
  position: relative;
  font-size: 23px;
  text-align: center;
  padding: 0px;
  margin-left: 12px;
  border-radius: 25px;
}

.StatusBlock {
  color: #50d1aa;
  width: 243px;
  height: 50px;
  border-radius: 20px;
  border: 3px solid #50d1aa;
  width: 243px;
  height: 50px;
  position: relative;
  font-size: 23px;
  text-align: center;
  padding: 0px;
  margin-left: 12px;
}

.RedeemNameReward {
  width: 243px;
  height: 50px;
  position: relative;
  font-size: 30px;
  padding: 0px;
  margin-left: 12px;
  border-radius: 10px;
  line-height: 45px;
  padding-left: 10px;
  text-align: left;
}

.RedeemPoint {
  width: 243px;
  height: 50px;
  background-color: #ea7c69;
  position: relative;
  font-size: 26px;
  text-align: center;
  padding: 2px;
  margin-left: 12px;
  border-radius: 10px;
  line-height: 45px;
}

.DetailPoint {
  height: 100%;
  padding: 0px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.AreaSign {
  margin-left: 10px;
  position: relative;
  text-align: left;
  background-color: #717171;
  border-radius: 15px;
  padding-left: 12px;
  padding-top: 5px;
  width: 510px;
  height: 130px;
  left: 12px;
  top: 20px;
  font-size: 28px;
}
</style>