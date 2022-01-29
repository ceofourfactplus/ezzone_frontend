<template>
  <label class="switch">
    <input type="checkbox" v-model="input"  @click="$emit('switch')"/>
    <span class="slider round"></span>
  </label>
</template>

<script>
export default {
  name: "Switch",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      input: true,
    };
  },
  watch: {
    input: function (val) {
      this.input = val;
    },
    value(val){
      this.input = val
    }
  },
  mounted() {
    this.input = this.value;
  },
};
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 64px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: #fff;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 96%;
  width: 50%;
  margin: 2% 5px 2% 0%;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #c5ffed;
}

input:focus + .slider {
  box-shadow: 0 0 1px #c5ffed;
}

input:checked + .slider:before {
  -webkit-transform: translateX(100%);
  -ms-transform: translateX(100%);
  transform: translateX(100%);
  background-color: #50d1aa;
}
/* Rounded sliders */
.slider.round {
  border-radius: 25%/50%;
}

.slider.round:before {
  border-radius: 50%;
  height: 96%;
  width: 50%;
  margin: 1% 5px 1% 0%;
  padding: 0%;
  left: 0%;
}
</style>