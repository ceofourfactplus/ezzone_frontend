<template>
  <div>
    <nav-app :url_name="'Promotion'" :save="true" @save="save"
      >Package Detail</nav-app
    >
    <div class="card-content">
      <div class="row">
        <!-- Left Side -->
        <div class="col-8 w-100">
          <!-- Input -->
          <div class="row">
            <div class="col-12 w-100">
              <input
                type="text"
                class="input-top"
                placeholder="Package"
                v-model="package_item.promotion"
              />
            </div>
          </div>
          <!-- Start Date -->
          <div class="row" style="margin-top: 20px">
            <div class="col-12 w-100 txt">
              <div style="display: inline">
                <span style="margin-left: -23px">Start Date</span
                >&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{{ format_date(package_item.start_date) }}&nbsp;&nbsp;
              </div>
              <input
                style="display: inline"
                type="date"
                class="input-date"
                v-model="package_item.start_date"
              />
            </div>
          </div>
          <!-- Amount Day -->
          <div class="row" style="margin-top: 20px">
            <div class="col-12 w-100 txt" style="margin-left: 18px">
              Amount Day&nbsp;:&nbsp;<input
                type="text"
                class="input-promotion"
                style="width: 240px"
                v-model="package_item.amount_day"
              />
            </div>
          </div>
          <!-- Description -->
          <div class="row" style="margin-top: 20px">
            <div class="col-12 w-100 txt" style="margin-left: 7px">
              <textarea
                style="
                  width: 428px;
                  height: 110px;
                  background: #717171;
                  borde-radius: 10px;
                  margin-left: 24px;
                "
                placeholder="Description"
                v-model="package_item.description"
              ></textarea>
            </div>
          </div>
        </div>
        <!-- Right Side -->
        <div class="col-4 w-100">
          <div
            class="col-12 w-100"
            style="color: white; margin: 15px 10px 0px 0px"
          >
            Status&nbsp;:&nbsp;
            <Switch :value="package_item.status" @switch="switch_active" style="top: 9px" />
          </div>
          <div class="col-12 w-100" style="margin-top: 30px">
            <!-- Image -->
            <label id="select_img" for="file" style="margin-top: 0px">
              <img
                :src="package_item.img"
                class="image"
              />
            </label>
            <input
              type="file"
              @change="onFileChange"
              style="display: none"
              id="file"
              class="raw-image"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Product in Package -->
    <div class="row" style="margin-top: 15px; margin-left: -40px">
      <div
        class="col-6 w-100"
        style="
          font-size: 36px;
          font-weight: bold;
          color: white;
          margin-left: 35px;
        "
      >
        Product in Package
      </div>
      <div class="col-1 w-100"></div>
      <div class="col-2 w-100" v-if="add_menu">
        <button
          class="btn-ghost"
          style="color: #ff7ca3; border-color: #ff7ca3"
          @click="cancel_to_create"
        >
          Cancel
        </button>
      </div>
      <div class="col-2 w-100" v-else>
        <button class="btn-ghost" @click="add_menu = true">+ New</button>
      </div>
      <div class="col-3 w-100">
        <button class="btn-save" @click="delete_pip()">
          <span class="icon-save"></span>Delete
        </button>
      </div>
    </div>
    <!-- Table -->
    <div class="table" style="margin-top: 10px">
      <div class="table-header" style="width: 104%; margin-left: -11px">
        <div
          class="row"
          style="font-size: 24px; font-weight: bold; color: white"
        >
          <div class="col-1 w-100">
            <div class="checkbox-white">
              <input
                type="checkbox"
                @input="select_all_items"
                style="margin-top: 4px; right: 0px; left: 23px; bottom: 3px"
              />
            </div>
          </div>
          <div class="col-6 w-100">Product</div>
          <div class="col-1 w-100" style="margin-left: -10px">Qty</div>
          <div class="col-3 w-100" style="margin-left: -20px">Price</div>
          <div class="col-1 w-100"></div>
        </div>
      </div>
      <!-- Menu -->
      <div v-for="(item, idx) in package_items" :key="item">
        <!-- Package Item -->
        <div
          class="table-item"
          style="width: 104%; margin-left: -11px"
          v-if="!update_status.includes(item)"
        >
          <div
            class="row"
            style="font-size: 20px; color: white; line-height: 1"
          >
            <div class="col-1 w-100">
              <div class="checkbox-orange">
                <input
                  type="checkbox"
                  style="margin-top: -2px; left: 23px"
                  :value="item"
                  v-model="selected_items"
                  @change="check_item_child(item)"
                />
              </div>
            </div>
            <div
              class="col-6 w-100"
              style="margin-left: 10px; text-align: left"
              @click="update_status[0] = item"
            >
              {{ item.product_set.name }}
            </div>
            <div class="col-1 w-100">{{ item.qty }}</div>
            <div class="col-3 w-100">
              {{ (parseInt(item.total_price)).toFixed(2) }}
            </div>
          </div>
        </div>

        <!-- Update Item -->
        <div
          class="table-item"
          v-else
          style="width: 104%; margin-left: -11px"
        >
          <form style="padding: 3px" @submit="update_status = []; calc_total_price();">
            <div class="row" style="padding-top: 0px">
              <div class="col-7 w-100" style="margin: auto; line-height: 100%">
                <input
                  type="text"
                  class="input-add-package"
                  @input="searchByTyping($event, 'product')"
                  v-model="item.product_set.name"
                  :class="{ incorrect: create_input }"
                  required
                />
                <ul>
                  <li
                    v-for="product in products"
                    :key="product.id"
                    @click="select_update_product(product, idx)"
                  >
                    <p class="w-100">
                      {{ product.name }}
                    </p>
                  </li>
                </ul>
              </div>
              <div
                class="col-1 w-100"
                style="
                  margin: auto;
                  text-align: left;
                  line-height: 100%;
                  margin-top: 0px;
                "
              >
                <input
                  type="number"
                  class="input-add-package"
                  v-model="item.qty"
                  required
                />
              </div>
              <div
                class="col-3 w-100"
                style="line-height: 130%; font-size: 24px"
              >
                <input
                  type="number"
                  class="input-add-package"
                  :value="item.product_set.priceproduct_set[0].price * item.qty"
                  required
                />
                <input type="submit" style="display: none" />
              </div>
              <div class="col-1" style="line-height: 145%">
                <img
                  src="../../assets/icon/incorrect.png"
                  style="width: 30px"
                  alt=""
                  @click="update_status = []; calc_total_price();"
                />
              </div>
            </div>
          </form>
        </div>

        <div v-for="topping in item.itemtopping_set" :key="topping">
          <!-- Item Topping -->
          <div
            class="table-item"
            style="width: 104%; margin-left: -11px"
            v-if="!update_status.includes(topping)"
          >
            <div
              class="row"
              style="font-size: 20px; color: white; line-height: 1"
            >
              <div class="col-1 w-100"></div>
              <div class="col-1 w-100">
                <div class="checkbox-orange">
                  <input
                    type="checkbox"
                    style="margin-top: -2px; left: 23px"
                    :value="topping"
                    v-model="selected_item_toppings"
                  />
                </div>
              </div>
              <div
                class="col-5 w-100"
                style="margin-left: 10px; text-align: left"
                @click="update_status[0] = topping"
              >
                {{ topping.topping_set.name }}
              </div>
              <div class="col-1 w-100">{{ topping.qty }}</div>
              <div class="col-3 w-100">
                {{ topping.total_price }}
              </div>
            </div>
          </div>

          <!-- Update Item Topping -->
          <div
            class="table-item"
            v-else
            style="width: 104%; margin-left: -11px"
          >
            <form style="padding: 3px" @submit="update_status = []; calc_total_price();">
              <div class="row" style="padding-top: 0px">
                <div class="col-1 w-100">Topping</div>
                <div
                  class="col-6 w-100"
                  style="margin: auto; line-height: 100%"
                >
                  <input
                    type="text"
                    class="input-add-package"
                    style="margin-left: -23px"
                    @input="searchByTyping($event, 'topping')"
                    :class="{ incorrect: create_input }"
                    v-model="topping.topping_set.name"
                    required
                  />
                  <ul style="min-width: 40%">
                    <li
                      v-for="top in toppings"
                      :key="top.id"
                    >
                      <p
                        class="w-100"
                        @click="topping.topping_set = {...top}"
                        :class="{ selected: topping_item.id == topping.id }"
                      >
                        {{ top.name }}
                      </p>
                    </li>
                  </ul>
                </div>
                <div
                  class="col-1 w-100"
                  style="
                    margin: auto;
                    text-align: left;
                    line-height: 100%;
                    margin-top: 0px;
                  "
                >
                  <input
                    type="number"
                    class="input-add-package"
                    v-model="topping.qty"
                    required
                  />
                </div>
                <div
                  class="col-3 w-100"
                  style="line-height: 130%; font-size: 24px"
                >
                  <input
                    type="number"
                    class="input-add-package"
                    :value="
                      topping.total_price *
                      topping.qty
                    "
                    required
                  />
                  <input type="submit" style="display: none" />
                </div>
                <div class="col-1" style="line-height: 145%">
                  <img
                    src="../../assets/icon/incorrect.png"
                    style="width: 30px"
                    @click="update_status = []; calc_total_price();"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- to create product -->
      <div
        class="table-item"
        v-if="add_menu"
        style="width: 104%; margin-left: -11px"
      >
        <form style="padding: 3px" @submit="make_package_item">
          <div class="row" style="padding-top: 0px">
            <div class="col-7 w-100" style="margin: auto; line-height: 100%">
              <input
                type="text"
                class="input-add-package"
                @input="searchByTyping($event, 'product')"
                v-model="product_item.name"
                :class="{ incorrect: create_input }"
                required
              />
              <ul>
                <li
                  v-for="product in products"
                  :key="product.id"
                  @click="select_product(product)"
                >
                  <p
                    class="w-100"
                    :class="{ selected: product_item.id == product.id }"
                  >
                    {{ product.name }}
                  </p>
                </li>
              </ul>
            </div>
            <div
              class="col-1 w-100"
              style="
                margin: auto;
                text-align: left;
                line-height: 100%;
                margin-top: 0px;
              "
            >
              <input
                type="number"
                class="input-add-package"
                v-model="qty"
                required
              />
            </div>
            <div class="col-3 w-100" style="line-height: 130%; font-size: 24px">
              <input
                v-if="Object.keys(product_item).length != 0"
                type="number"
                class="input-add-package"
                :value="new_menu_price * qty"
                required
              />
              <input
                v-else
                type="number"
                class="input-add-package"
                value="0"
                required
              />
              <input type="submit" style="display: none" />
            </div>
            <div class="col-1" style="line-height: 145%">
              <img
                src="../../assets/icon/incorrect.png"
                style="width: 30px"
                alt=""
                @click="cancel_to_create"
              />
            </div>
          </div>
        </form>
      </div>
      <!-- Add Topping -->
      <div
        class="table-item"
        v-if="add_topping && add_menu"
        style="width: 104%; margin-left: -11px"
      >
        <form style="padding: 3px" @submit="make_package_item">
          <div class="row" style="padding-top: 0px">
            <div class="col-1 w-100">Topping</div>
            <div class="col-6 w-100" style="margin: auto; line-height: 100%">
              <input
                type="text"
                class="input-add-package"
                style="margin-left: -23px"
                @input="searchByTyping($event, 'topping')"
                :class="{ incorrect: create_input }"
                v-model="topping_item.name"
                required
              />
              <ul style="min-width: 40%">
                <li
                  v-for="topping in toppings"
                  :key="topping.id"
                  @click="select_topping(topping)"
                >
                  <p
                    class="w-100"
                    :class="{ selected: topping_item.id == topping.id }"
                  >
                    {{ topping.name }}
                  </p>
                </li>
              </ul>
            </div>
            <div
              class="col-1 w-100"
              style="
                margin: auto;
                text-align: left;
                line-height: 100%;
                margin-top: 0px;
              "
            >
              <input
                type="number"
                class="input-add-package"
                v-model="topping_qty"
                required
              />
            </div>
            <div class="col-3 w-100" style="line-height: 130%; font-size: 24px">
              <input
                v-if="Object.keys(topping_item).length != 0"
                type="number"
                class="input-add-package"
                :value="
                  topping_item.pricetopping_set[0].price * topping_item.remain
                "
                required
              />
              <input
                v-else
                type="number"
                class="input-add-package"
                value="0"
                required
              />
              <input type="submit" style="display: none" />
            </div>
            <div class="col-1" style="line-height: 145%">
              <img
                src="../../assets/icon/incorrect.png"
                style="width: 30px"
                @click="
                  add_topping = false;
                  topping_item = {};
                "
              />
            </div>
          </div>
        </form>
      </div>
      <!-- Add Topping To Item Toppings -->
      <div
        class="table-item"
        v-if="add_topping_to"
        style="width: 104%; margin-left: -11px"
      >
        <form style="padding: 3px" @submit="make_package_item_to">
          <div class="row" style="padding-top: 0px">
            <div class="col-1 w-100">Topping</div>
            <div class="col-6 w-100" style="margin: auto; line-height: 100%">
              <input
                type="text"
                class="input-add-package"
                style="margin-left: -23px"
                @input="searchByTyping($event, 'topping')"
                :class="{ incorrect: create_input }"
                v-model="topping_item.name"
                required
              />
              <ul style="min-width: 40%">
                <li
                  v-for="topping in toppings"
                  :key="topping.id"
                  @click="select_topping(topping)"
                >
                  <p class="w-100">
                    {{ topping.name }}
                  </p>
                </li>
              </ul>
            </div>
            <div
              class="col-1 w-100"
              style="
                margin: auto;
                text-align: left;
                line-height: 100%;
                margin-top: 0px;
              "
            >
              <input
                type="number"
                class="input-add-package"
                v-model="topping_qty"
                required
              />
            </div>
            <div class="col-3 w-100" style="line-height: 130%; font-size: 24px">
              <!-- <input
                v-if="Object.keys(topping_item).length != 0"
                type="number"
                class="input-add-package"
                :value="
                  topping_item.pricetopping_set[0].price * topping_item.remain
                "
                required
              /> -->
              <input
                type="number"
                class="input-add-package"
                value="0"
                required
              />
              <input type="submit" style="display: none" />
            </div>
            <div class="col-1" style="line-height: 145%">
              <img
                src="../../assets/icon/incorrect.png"
                style="width: 30px"
                @click="
                  add_topping_to = false;
                  topping_item = {};
                "
              />
            </div>
          </div>
        </form>
      </div>
      <!-- Add Topping Txt -->
      <div
        class="table-item"
        style="width: 104%; margin-left: -11px"
        v-if="add_menu"
      >
        <div class="row" style="font-size: 20px; color: white; line-height: 1">
          <div
            v-if="Object.keys(topping_item).length == 0"
            class="col-3 w-100"
            style="margin-left: 20px; text-align: left; color: #50d1aa"
            @click="add_topping = true"
          >
            + Add Topping
          </div>
          <div
            v-else
            class="col-3 w-100"
            style="margin-left: 20px; text-align: left; color: #50d1aa"
            @click="
              make_package_item();
              add_topping_to = true;
            "
          >
            + Add Topping
          </div>
        </div>
      </div>

      <!-- Total -->
      <div class="table-item" style="width: 104%; margin-left: -11px">
        <div
          class="row"
          style="font-size: 24px; color: white; line-height: 14px"
        >
          <div class="col-6 w-100"></div>
          <div class="col-4 w-100" style="text-align: right">Total</div>
          <div class="col-2 w-100">{{ total_price }}</div>
        </div>
      </div>
      <!-- Discount Total Price -->
      <div class="table-item" style="width: 104%; margin-left: -11px">
        <div
          class="row"
          style="font-size: 24px; color: white; line-height: 14px"
        >
          <div class="col-6 w-100"></div>
          <div class="col-4 w-100" style="text-align: right">
            Discount Total Price
          </div>
          <div class="col-2 w-100" style="margin: -4px 0px 0px -10px">
            <input
              type="text"
              class="input-promotion w-100"
              style="height: 90%"
              v-model="discount_price"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Card Popup -->
    <SavePopup :alert="alert" />
  </div>
</template>

<script>
import SavePopup from "../../components/main_component/SavePopup.vue";
import NavApp from "../../components/main_component/NavApp.vue";
import Switch from "../../components/main_component/Switch.vue";
import { api_product } from "../../api/api_product";
import { api_promotion } from "../../api/api_promotion";

export default {
  name: "PackageDetail",
  components: {
    SavePopup,
    NavApp,
    Switch,
  },
  mounted() {
    this.is_staff = this.$store.state.auth.userInfo["is_staff"];
    this.fetchProducts();
    this.fetchToppings();
    setTimeout(() => {
      this.find_package_discount_price(1)
      this.calc_total_price();
    }, 1000)
  },
  data() {
    return {
      search_topping: false,
      search_product: false,
      is_staff: false,
      alert: false,
      add_topping_to: false,
      add_topping: false,
      add_menu: false,
      update_menu: false,
      select_all: false,
      update_status: [],
      topping_items: [],
      package_items: [],
      package_items: [],
      item_toppings: [],
      package_item: {},
      selected_item_toppings: [],
      selected_items: [],
      temp_start: null,
      topping_item: {},
      // Item Topping
      topping_id: null,
      topping_qty: 1,
      // Package Item
      product_item: {},
      qty: 1,
      total_price: 0,
      package: null,
      // Promotion Package
      promotion: null,
      start_date: null,
      img: null,
      amount_day: null,
      discount_price: null,
      normal_price: 0,
      status: true,
      total_amount: 1,
      description: "",
      show_img: null,
      products: [],
      toppings: [],
      temp_toppings: [],
      temp_products: [],
      new_menu_price: 0,
      product: "",
      topping_name: null,
    };
  },
  methods: {
    fetchPackage() {
      this.loading = true;
      api_promotion.get('get-package/'+this.$route.params.id).then((response) => {
        this.package_item = response.data;
        this.package_items = response.data.packageitem_set;
        this.discount_price = this.package_item.pricepackage_set[0].discount_price;
        this.loading = false;
      });
    },
    fetchItemTopping() {
      api_promotion
        .get(`package-item-topping/${this.$route.params.id}`)
        .then((response) => {
          console.log(response.data, "item topping");
          this.item_toppings = response.data;
        });
    },
    fetchProducts() {
      api_product.get("product/").then((response) => {
        console.log(response.data, "response");
        this.products = response.data;
        this.temp_products = response.data;
      });
    },
    fetchToppings() {
      api_product.get("topping/").then((response) => {
        console.log(response.data, "toppings");
        this.toppings = response.data;
        this.temp_toppings = response.data;
      });
    },
    save() {
      const packageitem = [];
      this.package_items.forEach((element) => {
        var pi = {
          id: element.id,
          product_id: element.product_set.id,
          qty: element.qty,
          total_price: element.product_set.priceproduct_set[0].price,
          description: element.description,
          itemtopping_set: [],
        };
        if (element.itemtopping_set.length != 0) {
          element.itemtopping_set.forEach((el) => {
            pi.itemtopping_set.push({
              id: el.id,
              topping: el.topping_set.id,
              total_price: parseInt(el.total_price),
              qty: el.qty,
            });
          });
        }
        packageitem.push(pi);
      });
      const data = {
        id: this.$route.params.id,
        promotion: this.package_item.promotion,
        start_date: this.package_item.start_date,
        amount_day: this.package_item.amount_day,
        pricepackage_set: [
          {
            normal_price: this.total_price,
            discount_price: this.package_item.discount_price,
            sale_channel: this.$store.state.ezzone_id,
          },
        ],
        description: this.package_item.description,
        total_amount: this.package_items.length,
        status: this.package_item.status,
        update_by_id: this.$store.state.auth.userInfo.id,
        create_by: this.$store.state.auth.userInfo.id,
        packageitem_set: packageitem,
      };
      console.log(data, "data");
      api_promotion.put(`package-update/${data.id}`, data).then((response) => {
        const img_data = new FormData();
        // img_data.append("img", this.img, this.img.name);
        api_promotion
          .put(`package-image/${response.data.id}`, img_data)
          .then(() => {
            this.$router.push({ name: "Promotion" });
          });
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 2000);
      });
    },
    select_topping(item) {
      console.log(item, "item");
      item.remain = this.topping_qty;
      item.qty = this.topping_qty;
      this.topping_item = item;
      this.toppings = [];
    },
    select_update_product(item, idx) {
      this.total_price = 0;
      this.package_items[idx].product_set = { ...item };
      this.package_items.forEach((el) => {
        this.total_price += parseInt(el.product_set.priceproduct_set[0].price);
        el.itemtopping_set.forEach((topping) => {
          this.total_price += parseInt(
            topping.topping_set.pricetopping_set[0].price
          );
        });
      });
      setTimeout(() => {
        this.products = [];
      }, 100);
    },
    select_product(item) {
      this.product_item = { ...item };
      this.new_menu_price = parseInt(
        this.product_item.priceproduct_set[0].price
      );
      setTimeout(() => {
        this.products = [];
      }, 100);
    },
    select_del_item(item, is_package_item) {
      if (is_package_item) {
        if (!this.selected_items.includes(item)) {
          this.selected_items.push(item);
        } else {
          console.log('splice')
          var idx = this.selected_items.indexOf(item);
          this.selected_items.splice(idx, 1);
        }
      } else {
        if (!this.selected_item_toppings.includes(item)) {
          this.selected_item_toppings.push(item);
        } else {
          var idx = this.selected_item_toppings.indexOf(item);
          this.selected_item_toppings.splice(idx, 1);
        }
      }
    },
    searchByTyping(e, type) {
      var temp = [];
      if (e.target.value == "") {
        if (type == "product") {
          this.search_product = false;
          this.products = this.temp_products;
        }
        if (type == "topping") {
          this.search_topping = false;
          this.toppings = this.temp_toppings;
        }
      } else {
        if (type == "product") {
          this.temp_products.forEach((element) => {
            if (element.name.indexOf(e.target.value) + 1 != 0) {
              temp.push(element);
            }
          });
          this.search_product = true;
          this.products = temp;
        }
        if (type == "topping") {
          this.temp_toppings.forEach((element) => {
            if (element.name.indexOf(e.target.value) + 1 != 0) {
              temp.push(element);
            }
          });
          this.search_topping = true;
          this.toppings = temp;
        }
      }
    },
    onFileChange(e) {
      console.log(e, "e");
      this.img = e.target.files[0];
      if (this.img) {
        const reader = new FileReader();
        reader.onload = (e) => (this.show_img = e.target.result);
        reader.readAsDataURL(this.img);
      }
      console.log(this.img, "img");
    },
    format_date(date) {
      var temp_date = date.split("-");
      return `${temp_date[2]}/${temp_date[1]}/${temp_date[0]}`;
    },
    switch_active() {
      this.package_item.status = !this.package_item.status;
    },
    make_package_item() {
      if (Object.keys(this.topping_item).length != 0) {
        this.topping_item.topping_set = { ...this.topping_item };
        this.topping_items.push(this.topping_item);
      }
      var data = {
        product_set: this.product_item,
        itemtopping_set: this.topping_items,
        qty: this.qty,
        price: this.new_menu_price,
        description: this.description,
      };
      this.total_price = 0;
      this.package_items.push(data);
      this.add_menu = false;
      this.add_topping = false;
      this.product_item = {};
      this.topping_item = {};
      this.topping_items = [];
      this.qty = 1;
      this.new_menu_price = null;
    },
    make_package_item_to() {
      this.total_price = 0;
      var idx = this.package_items.length - 1;
      var data = {
        qty: this.topping_item.qty,
        topping_id: this.topping_item.id,
        topping_set: this.topping_item,
        total_price: this.topping_item.pricetopping_set[0].price,
      };
      this.package_items[idx].itemtopping_set.push(data);
      this.add_menu = false;
      this.add_topping_to = false;
      this.product_item = {};
      this.topping_item = {};
      this.topping_items = [];
      this.qty = 1;
      this.new_menu_price = null;
    },
    select_item(item) {
      if (this.selected_items.includes(item)) {
        var idx = this.selected_items.indexOf(item);
        this.selected_items.splice(idx, 1);
      } else {
        this.selected_items.push(item);
      }
    },
    check_item_child(item) {
      console.log(item, 'item')
      item.itemtopping_set.forEach(topping => {
        if (!this.selected_item_toppings.includes(topping)) {
          this.selected_item_toppings.push(topping)
        } else {
            var idx = this.selected_item_toppings.indexOf(topping);
            this.selected_item_toppings.splice(idx, 1);
        }
      })
      
    },
    select_all_items() {
      this.select_all = !this.select_all;
      if (this.select_all) {
        this.package_items.forEach((item) => {
          this.select_del_item(item, true)
          item.itemtopping_set.forEach(topping => {
            this.select_del_item(topping, false)
          })
        });
      } else {
        this.selected_items = [];
        this.selected_item_toppings = [];
      }
    },
    delete_pip() {
      for (let index = 0; index < this.selected_items.length; index++) {
        var idx = this.package_items.indexOf(this.selected_items[index]);
        this.package_items.splice(idx, 1);
      }
      for (let index = 0; index < this.selected_item_toppings.length - 1; index++) {
        console.log(index, "index")
        var top_idx = this.package_items[index].itemtopping_set.indexOf(
          this.selected_item_toppings[index]
        );
        this.package_items[index].itemtopping_set.splice(top_idx , 1);
      }
      this.selected_items = [];
      this.selected_item_toppings = [];
      this.calc_total_price();
    },
    cancel_to_create() {
      this.add_menu = false;
      this.product_item = {};
      this.topping_item = {};
      this.qty = null;
      this.total_price = 0;
    },
    find_package_discount_price(sale_channel_id) {
      this.package_item.pricepackage_set.forEach(item => {
        if(item.sale_channel == sale_channel_id) {
          this.package_item.discount_price = item.discount_price
        }
      })
    },
    calc_total_price(){
      this.total_price = 0;
      this.package_items.forEach((el) => {
        this.total_price += parseInt(el.product_set.priceproduct_set[0].price);
        el.itemtopping_set.forEach((topping) => {
          this.total_price += parseInt(
            topping.topping_set.pricetopping_set[0].price
          );
        });
      });
    },
  },
  computed:{

  },
  beforeMount() {
    this.fetchPackage();
  },
};
</script>

<style scoped>
.product-menu {
  color: black;
  font-size: 24px;
  text-align: left;
  margin: 8px 0px 0px 5px;
}
.product-menu:hover {
  background: #717171;
}
.mt--4 {
  margin-top: -4px;
}
.input-add-package {
  width: 100%;
  height: 90%;
  line-height: 90%;
  background: #717171;
  border-radius: 12px;
  color: white;
  text-align: center;
}
.btn-ghost {
  border-color: #65b0f6;
  color: #65b0f6;
  width: 119px;
  height: 50px;
  margin: 0px 25px 0px 0px;
}
.btn-save {
  font-size: 24px;
  color: #ff7ca3;
  border-color: #ff7ca3;
  border-radius: 10px;
  text-align: center;
  background: transparent;
  line-height: 21px;
  width: 140px;
  height: 50px;
}
span.icon-save {
  background: url("../../assets/icon/bin.png") no-repeat transparent;
  background-size: 18px;
  float: left;
  margin-left: 17px;
  width: 19px;
  height: 27px;
}
#select_img {
  width: 170px;
  height: 170px;
  border-radius: 20px;
  margin-right: 12px;
  background-color: #c4c4c4;
}
.image {
  width: 170px;
  height: 170px;
  border-radius: 20px;
}
.colon {
  font-size: 30px;
  text-align: center;
  margin: 20px 0px 0px -40px;
  color: white;
}
.input-top {
  width: 85%;
  height: 50px;
  background: rgb(113, 113, 113);
  border-radius: 12px;
  color: white;
  float: left;
  margin: 10px 0px 0px 56px;
}
.input-code {
  width: 167px;
  height: 53px;
  background: #717171;
  border-radius: 10px;
  color: white;
}
#txt-right-side {
  margin-left: -40px;
}
.txt {
  font-size: 30px;
  font-weight: bold;
  color: white;
  /* text-align: left;
  margin: 20px 0px 0px 120px; */
}
.card-content {
  width: 765px;
  height: 342px;
  background: #303344;
  border-radius: 20px;
  margin: 15px 0px 0px 27px;
  font-size: 30px;
  font-weight: bold;
}
.checkbox-white input:checked::after {
  font-size: 20px;
  top: 1px;
  left: 1px;
}
.checkbox-white input::before {
  height: 30px;
  width: 30px;
}
.checkbox-white input {
  height: 28px;
  width: 28px;
}
.checkbox-orange input:checked::after {
  font-size: 20px;
  top: 4px;
  left: 4px;
}
.checkbox-orange input::before {
  height: 30px;
  width: 30px;
}
.checkbox-orange input {
  height: 28px;
  width: 28px;
}
ul {
  background: rgb(113, 113, 113);
  margin-top: 10px;
  list-style-type: none;
  padding: 0px;
  border-radius: 10px;
  position: absolute;
  min-width: 50%;
  z-index: 1;
}
p {
  font-size: 20px;
  font-weight: 500;
  text-align: left;
  padding-left: 10px !important;
  padding: 7px;
  margin: 0px;
}
</style>