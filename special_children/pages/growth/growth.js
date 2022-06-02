import request from "../../utils/promise.request";
import Pubsub, { countSubscriptions } from "pubsub-js";
let map = [
  {
    nurse: "nurse",
    plans: "plans",
    active: "active",
  },
  {
    nurse: "tea_nurse",
    plans: "tea_plan",
    active: "tea_active",
  },
];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nurse: [],
    plans: [],
    active: [],
    moreNurse: [],
    morePlan: [],
    moreActive: [],
    role: -1,
    isLogin: false,
    tea_nurse: [],
    tea_plan: [],
    tea_active: [],
    showModalStatus: false,
    inputDisease: "",
    inputSumm: "",
    inputDes: "",
    inputType: "",
    inputFee: "",
    inputUrl: "",
  },
  getRole() {
    let userInfo = wx.getStorageSync("userInfo");
    userInfo = JSON.parse(userInfo);
    const { role } = userInfo;
    return role;
  },
  util(statu) {
    /* 动画部分 */
    // 第1步：创建动画实例
    var animation = wx.createAnimation({
      duration: 200, //动画时长
      timingFunction: "linear", //线性
      delay: 0, //0则不延迟
    });
    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;
    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();
    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export(),
    });
    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(
      function () {
        // 执行第二组动画
        animation.opacity(1).rotateX(0).step();
        // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
        this.setData({
          animationData: animation,
        });
        //关闭
        if (statu == "close") {
          this.setData({
            showModalStatus: false,
            inputName: "",
            inputAge: "",
            inputDisease: "",
          });
        }
      }.bind(this),
      200
    );
    // 显示
    if (statu == "open") {
      this.setData({
        showModalStatus: true,
      });
    }
  },
  getVal(e) {
    this.setData({ [e.currentTarget.dataset.type]: e.detail.value });
  },
  formatData(data) {
    const map = {
      course_id: "id",
      key_words: "key_words",
      summary: "summary",
      course_des: "des",
      course_type: "type",
      cover_url: "coverUrl",
      cpt_ratio: "cpt_ratio",
    };
    data = data.map((item) => {
      let newItem = {};
      for (let key in item) {
        newItem[map[key]] = item[key];
      }
      return newItem;
    });
    console.log(data);
    return data;
  },

  async getNurse(phone) {
    let res = await request("getnurse", { phone });
    console.log("getnurse", res);
    let { data: nurse } = res;
    if (nurse.length) {
      nurse = this.formatData(nurse);
      this.setData({ nurse });
    }
  },
  async getPlans(phone) {
    let res = await request("getplan", { phone });
    console.log("getplan", res);
    let { data: plans } = res;
    if (plans.length) {
      plans = this.formatData(plans);
      this.setData({ plans });
    }
  },
  async getActive(phone) {},
  async moreNurse(phone, disease) {
    let res = await request("morenurse", { phone, disease });
    console.log("morenurse", res);
    let { data: moreNurse } = res;
    moreNurse = moreNurse.map((item) => {
      item.isClick = false;
      return item;
    });
    this.setData({ moreNurse });
  },
  async morePlan(phone, disease) {
    let res = await request("moreplan", { phone, disease });
    console.log("moreplan", res);
    let { data: morePlan } = res;
    morePlan = morePlan.map((item) => {
      item.isClick = false;
      return item;
    });
    this.setData({ morePlan });
  },
  async moreActive(phone, disease) {},
  getDatas(phone, disease) {
    this.getNurse(phone);
    this.getPlans(phone);
    this.getActive(phone);
    this.moreNurse(phone, disease);
    this.morePlan(phone, disease);
    this.moreActive(phone, disease);
  },
  refresh() {
    if (this.data.hasChild) {
      console.log("63");
      let userInfo = wx.getStorageSync("userInfo");
      userInfo = JSON.parse(userInfo);
      const {
        phone,
        child: { disease },
      } = userInfo;
      this.getDatas(phone, disease);
    }
    if (this.data.role === 1) {
      this.getTeaData(JSON.parse(wx.getStorageSync("userInfo")).phone);
    }
  },
  async getTeaData(phone) {
    console.log("phone", phone);
    let res = await request("get_tea_nurse", { phone });
    if (res.result) {
      let tea_nurse = this.formatData(res.result);
      this.setData({ tea_nurse });
    }
    res = await request("get_tea_plan", { phone });
    if (res.result) {
      let tea_plan = this.formatData(res.result);
      this.setData({ tea_plan });
    }
    res = await request("get_tea_active", { phone });
    if (res.result) {
      let tea_active = this.formatData(res.result);
      this.setData({ tea_active });
    }
  },
  price() {
    let { inputFee } = this.data;
    inputFee = +inputFee.trim();
    if (isNaN(inputFee)) {
      wx.showToast({
        title: "费用为数字",
        icon: "none",
      });
      return false;
    }
    return true;
  },
  async submit(e) {
    const { inputDisease, inputSumm, inputDes, inputType, inputFee, inputUrl } =
      this.data;
    var { statu, type } = e.currentTarget.dataset;
    if (type === "submit") {
      if (!inputDisease) {
        wx.showToast({
          title: "病症不能为空",
          icon: "none",
        });
        return;
      }
      if (!inputSumm) {
        wx.showToast({
          title: "摘要不能为空",
          icon: "none",
        });
        return;
      }
      if (!inputDes) {
        wx.showToast({
          title: "描述不能为空",
          icon: "none",
        });
        return;
      }
      if (!inputType) {
        wx.showToast({
          title: "课程类型不能为空",
          icon: "none",
        });
        return;
      }
      if (!inputFee) {
        wx.showToast({
          title: "课程价格不能为空",
          icon: "none",
        });
        return;
      }
      if (!this.price()) {
        return;
      }
      if (!inputUrl) {
        wx.showToast({
          title: "封面地址不能为空",
          icon: "none",
        });
        return;
      }
      let userInfo = JSON.parse(wx.getStorageSync("userInfo"));
      const { phone } = userInfo;
      let data = await request(
        "set_course",
        {
          teacher_phone: phone,
          key_words: inputDisease,
          summary: inputSumm,
          course_des: inputDes,
          course_type: inputType,
          cover_url: inputUrl,
          money: inputFee,
        },
        "post"
      );
      console.log(data);
      if (data.code === 200) {
        let item = {
          id: data.result.course_id,
          key_words: inputDisease,
          summary: inputSumm,
          des: inputDes,
          type: inputType,
          coverUrl: inputUrl,
        };
        console.log("teacher");
        this.updateList(item);
      }
    }
    this.util(statu);
  },
  radioChange(e) {
    console.log(e);
    this.setData({ inputType: e.detail.value });
  },
  updateList(item) {
    console.log(item);
    const role = this.getRole();
    switch (item.type) {
      case "nursing":
        this.setData({
          [map[role].nurse]: [item, ...this.data[map[role].nurse]],
        });
        console.log("1");
        break;
      case "plan":
        this.setData({
          [map[role].plans]: [item, ...this.data[map[role].plans]],
        });
        console.log("1");
        break;
      case "active":
        this.setData({
          [map[role].active]: [item, ...this.data[map[role].active]],
        });
        console.log("1");
        break;
    }
    wx.showToast({
      title: "添加成功",
      icon: "success",
      duration: 1500,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 订阅列表更新updateList消息
    Pubsub.subscribe("updateList", (_, data) => {
      console.log("onload");
      this.updateList(data);
    });
    Pubsub.subscribe("updateChild", (_, data) => {
      console.log("update");
      // this.onLoad();
      this.setData({ hasChild: true });
    });
    Pubsub.subscribe("defaultImg", (_, data) => {
      console.log("ok");
      let d;
      let { tea_nurse, tea_plan, tea_active } = this.data;
      const role = this.getRole();
      switch (data.type) {
        case "nursing":
          d = tea_nurse;
          d = d.map((item) => {
            if (item.id === data.id) {
              item.coverUrl = "/static/images/per_back.png";
            }
            return item;
          });
          this.setData({
            [map[role].nurse]: d,
          });
          break;
        case "plan":
          d = tea_plan;
          d = d.map((item) => {
            if (item.id === data.id) {
              item.coverUrl = "/static/images/per_back.png";
            }
            return item;
          });
          this.setData({
            [map[role].nurse]: d,
          });
          break;
        case "active":
          d = tea_active;
          d = d.map((item) => {
            if (item.id === data.id) {
              item.coverUrl = "/static/images/per_back.png";
            }
            return item;
          });
          this.setData({
            [map[role].nurse]: d,
          });
          break;
      }
    });
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      const { phone, role } = userInfo;
      if (role !== -1) {
        // 已登录
        console.log("login");
        this.setData({ isLogin: true, role });
        if (role === 0) {
          // 用户是家长
          const {
            child: { disease },
          } = userInfo;
          if (phone && disease) {
            // 已登录并且hasChild
            console.log("1");
            this.setData({
              hasChild: true,
            });
            this.getDatas(phone, disease);
          }
        } else if (role === 1) {
          // 用户是老师
          this.getTeaData(phone);
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.refresh();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    Pubsub.unsubscribe("updateList");
    Pubsub.unsubscribe("updateChild");
    Pubsub.unsubscribe("defaultImg");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.refresh();
    // 更新完数据后，关闭下拉刷新状态
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
