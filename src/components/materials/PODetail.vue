<template>
  <div class="blur">
    <div class="po-detail-popup">
      <!-- Nav -->
      <div class="GridAreaNavBar" style="width: 100%;height:11%;">
        <div></div>
        <div class="popup-header">PO Detail</div>
        <div>
          <img
            @click="$emit('show_status')"
            src="../../assets/icon/Union.png"
            style="
              top: 20px;
              right: 15px;
              position: absolute;
              height: 35px;
            "/>
        </div>

      </div>
      <!-- Over Wrapper -->
      <div class="row over-wrapper">
        <div class="col-5 w-100" style="padding:0%;">
          <img :src="po_item.raw_material_set.img" class="po-detail-img">
        </div>
        <div class="col-7 w-100 AreaGridItem">
          <div class="w-100" style="font-size: 30px; color: #fff; height: 100%; text-align:left; white-space:nowrap; overflow-x:auto;">{{ po_item.raw_material_set.name }}</div>
          <div class="w-100" style="font-size: 30px; color: #EA7C69; height: 100%; text-align: left;">
            Remain&nbsp;:&nbsp;{{ po_item.raw_material_set.remain }}&nbsp;{{ po_item.unit_set.unit }} &nbsp;&nbsp;&nbsp; 
            <img style="margin-bottom: 10px;" :src="$store.state.raw_material.status_image[po_item.raw_material_set.status]['img']">
          </div>
          <!-- Table Head -->
          <div class="table-head-in-po">
            <div class="item-in-table-head">Min</div>
            <div class="item-in-table-head">Avg</div>
            <div class="item-in-table-head">Max</div>
            <div class="item-in-table-head">Last</div>
          </div>
          <!-- Table Item -->
          <div class="table-item-in-po">
              <div class="item-in-table-item">{{ po_item.raw_material_set.minimum }}</div>
              <div class="item-in-table-item">{{ po_item.avg_price }}</div>
              <div class="item-in-table-item">{{ po_item.raw_material_set.maximum }}</div>
              <div class="item-in-table-item">{{ po_item.last_price }}</div>
          </div>
        </div>
      </div>
      <!-- Below Wrapper -->
      <!-- Table -->
      
      <!-- Table Head -->
      <div>
        <div class="table-header GridHeadSupplier">
          <div class="SupHeadItem">Supplier</div>
          <div class="SupHeadItem">Price</div>
          <div class="SupHeadItem">Number</div>
          <div class="SupHeadItem">Map</div>
        </div>
      </div>
      <div>
        <!-- Table Item -->
        <div class="ScollbarSupItem">
          <div class="table-item GridSupplier">
            <div class="SupItem" 
              style="text-align:left; width:90%; margin:0% 5% 0% 5%; white-space:nowrap; overflow-x:auto;">
              {{ po_item.supplier_set.company_name }}
            </div>
            <div class="SupItem">{{ po_item.last_price }}</div>
            <div class="SupItem">{{ po_item.supplier_set.phone }}</div>
            <div class="SupItem"><img style="width: 30px; height: 30px;margin-bottom:5px" src="../../assets/icon/map-icon.png"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
    
</template>

<script>
export default {
  name: "PODetail",
  props: ['po_item'],
  components: {},
  data() {
    return {
    };
  },
  mounted() {
    console.log(this.po_item, 'po_item')
  },
  methods: {
  },
};
</script>

<style scoped>
.item-in-table-item {
  width: 100%;
  text-align: center;
  line-height: 200%;
}
.item-in-table-head {
  width: 100%;
  text-align: center;
  line-height: 190%;
}
.table-item-in-po {
  width: 100%;
  height: 80%;
  color: white;
  background: #303344;
  border-radius: 10px;
  font-size: 30px;
  display: inline-grid;
  grid-template-columns: 20% 30% 20% 30%;
}
.table-head-in-po {
  width: 100%;
  height: 80%;
  color: white;
  background: #889898;
  border-radius: 10px;
  font-size: 30px;
  display: inline-grid;
  grid-template-columns: 20% 30% 20% 30%;
  
}
.po-detail-img {
  width: 90%;
  height: 90%;
  margin: 5%;
  border-radius: 15px;
}
.over-wrapper {
  margin: 0%;
}
.po-detail-popup {
  height: 740px;
  width:90%;
  margin: 0% 5% 0% 5%;
  top: 15%;
  position: absolute;
  background-color: #252836;
  border: 2px solid #ea7c69;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 12% 40% 8% 40%;
}
.popup-header {
  font-weight: 800;
  font-size: 48px;
  line-height: 56px;
  text-align: center;
  margin-top: 10px;
  color: white;
}

.GridAreaNavBar {
  display: inline-grid;
  grid-template-columns: 10% 80% 10%;

}

.AreaGridItem {
  display: grid;
  grid-template-rows: 25% 25% 25% 25%;
  padding-left: 0%;
  line-height: 300%;

}

.GridHeadSupplier {
  width:97%;
  margin: 1% 1.5% 0% 1.5%;
  display: inline-grid;
  grid-template-columns: 45% 15% 30% 10%;
  text-align: center;
  
}

.GridSupplier {
  width:100%;
  margin: 0% 0% 2% 0%;
  display: inline-grid;
  grid-template-columns: 45% 15% 30% 10%;
}

.SupHeadItem {
  width: 100%;
  line-height: 180%;
}

.SupItem {
  width: 100%;
}

.ScollbarSupItem {
  white-space: nowrap;
  overflow-y: auto;
  width:97%;
  height: 95%;
  margin: 0% 1.5% 2% 1.5%;
  border-radius: 10px;

}
</style>