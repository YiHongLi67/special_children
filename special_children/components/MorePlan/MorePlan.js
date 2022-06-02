import request from "../../utils/promise.request";
import Pubsub from "pubsub-js";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: "string",
      value: "推荐内容",
    },
    datas: {
      type: "array",
      value: [],
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
    addCourse(e) {
      let userInfo = wx.getStorageSync("userInfo");
      if (userInfo) {
        userInfo = JSON.parse(userInfo);
        const { id, isclick } = e.currentTarget.dataset;
        const { phone } = userInfo;
        if (isclick) {
          wx.showToast({
            title: "已加入成长计划",
            icon: "none",
            duration: 1500,
          });
          return;
        }
        wx.showModal({
          title: "是否加入成长计划？",
          showCancel: true,
          cancelText: "取消",
          cancelColor: "#000000",
          confirmText: "确定",
          confirmColor: "#3CC51F",
          success: async (result) => {
            if (result.confirm) {
              // 向数据表中插入该条数据
              let res = await request(
                "addcourse",
                { course_id: id, phone },
                "post"
              );
              // let res = { code: 200 };
              if (res.code === 200) {
                let data = [];
                // 添加成功，修改按钮样式
                let { datas } = this.properties;
                datas.map((item) => {
                  if (item.course_id === id) {
                    item.isClick = true;
                    data = item;
                  }
                  return item;
                });
                this.setData({ datas });
                // 更新对应的列表
                const {
                  course_id,
                  key_words,
                  summary,
                  course_des,
                  course_type,
                  cover_url,
                } = data;
                Pubsub.publish("updateList", {
                  id: course_id,
                  key_words: key_words,
                  summary: summary,
                  des: course_des,
                  type: course_type,
                  coverUrl: cover_url,
                  cpt_ratio: 0,
                });
              }
            }
          },
        });
      }
    },
  },
});
