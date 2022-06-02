import { ROLE } from "../../utils/constant";
import Pubsub from "pubsub-js";
let startY = 0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    transition: "",
    translateY: "translateY(0rpx)",
    userInfo: {},
    roles: ROLE,
  },
  child() {
    wx.navigateTo({
      url: "/pages/child/child",
    });
  },
  login() {
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      console.log(userInfo.role + 1);
      if (userInfo.role + 1) {
        // 跳转到基本信息管理页面
        wx.reLaunch({
          url: "/pages/manage/manage",
        });
      } else {
        // 跳转到注册页面
        wx.reLaunch({
          url: "/pages/login/login",
        });
      }
    } else {
      // 如果未授权头像昵称不能进入注册页面
      wx.showToast({
        title: "请先授权头像和昵称",
        icon: "none",
      });
    }
  },
  getUserInfo() {
    // 授权用户的头像昵称
    wx.getUserProfile({
      desc: "是否微信授权微信头像和昵称",
      success: (res) => {
        const {
          userInfo: { nickName, avatarUrl },
        } = res;
        const userInfo = { nickName, avatarUrl };
        this.setData({ userInfo });
        wx.setStorageSync("userInfo", JSON.stringify(userInfo));
      },
    });
  },
  dragTouchStart(e) {
    // touch事件开始时获取Y值
    this.setData({ transition: "" });
    startY = e.touches[0].clientY;
  },
  dragTouchMove(e) {
    // 使用节流
    let pre = 0;
    let now = new Date();
    if (now - pre > 300) {
      this.computeY(e);
      pre = now;
    }
  },
  computeY(e) {
    // 获取move过程中不断变化的Y值
    const currentY = e.touches[0].clientY;
    let distance = currentY - startY;
    if (distance < 0) {
      return;
    }
    if (distance >= 500) {
      distance = 500;
    }
    this.setData({ translateY: `translateY(${distance}rpx)` });
  },
  dragTouchEnd(e) {
    // touchend后还原元素位置
    this.setData({
      translateY: `translateY(0rpx)`,
      transition: "transform .4s linear",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    Pubsub.subscribe("updateChild", (_, data) => {
      console.log("update");
      this.setData({ userInfo: { ...this.data.userInfo, child: data } });
    });
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      this.setData({ userInfo: JSON.parse(userInfo) });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },
});
