import SpinalSystem from "./SpinalSystem";

window.spinal = {};

window.spinal.spinalSystem = new SpinalSystem();

export default {
  install(Vue) {
    Vue.prototype.$spinalSystem = window.spinal.spinalSystem;
  },
  spinalSystem: window.spinal.spinalSystem
};
