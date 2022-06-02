import request from "../../utils/promise.request";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeId: "1",
    navList: [
      {
        name: "色盲",
        id: "1",
      },
      {
        name: "色弱",
        id: "2",
      },
      {
        name: "矮小",
        id: "3",
      },
      {
        name: "自闭",
        id: "4",
      },
      {
        name: "耳鸣",
        id: "5",
      },
      {
        name: "智残",
        id: "6",
      },
      {
        name: "语言障碍",
        id: "7",
      },
    ],
    nurse: [],
    plan: [],
    active: [],
    inputVal: "",
  },
  input(e) {
    const { value } = e.detail;
    this.setData({ inputVal: value });
    if (value === "") {
      this.throttle(
        this.getData,
        null,
        300,
        this.getKeywords(this.data.activeId)
      );
    } else {
      this.throttle(this.getData, null, 300, value);
    }
  },
  throttle: function (fn, context, delay, text) {
    clearTimeout(fn.timeoutId);
    fn.timeoutId = setTimeout(function () {
      fn.call(context, text);
    }, delay);
  },
  clearInput() {
    this.setData({ inputVal: "" });
    this.getData(this.getKeywords(this.data.activeId));
  },
  switchTab(e) {
    wx.showLoading({
      title: "加载中...",
    });
    const activeId = e.currentTarget.dataset.id;
    this.setData({ activeId });
    this.getData(this.getKeywords(activeId));
  },
  getKeywords(activeId) {
    let keywords = "";
    this.data.navList.map((item) => {
      if (item.id === activeId) {
        keywords = item.name;
      }
    });
    return keywords;
  },
  async getData(keywords) {
    this.setData({ nurse: [], plan: [], active: [] });
    let data = await request("getcourse", { keywords });
    console.log(data);
    data.map((item) => {
      switch (item.type) {
        case "nursing":
          this.setData({ nurse: item.res });
          break;
        case "plan":
          this.setData({ plan: item.res });
          break;
        case "active":
          this.setData({ active: item.res });
          break;
      }
    });
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(this.getKeywords(this.data.activeId));
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
