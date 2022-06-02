import Pubsub from "pubsub-js";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: "string",
      value: "标题",
    },
    datas: {
      type: "array",
      value: [],
    },
    role: {
      type: "number",
      value: -1,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    imgError(e) {
      console.log("error", e);
      let { id, type } = e.currentTarget.dataset;
      Pubsub.publish("defaultImg", { id, type });
    },
  },
});
