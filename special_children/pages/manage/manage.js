import { ROLE } from "../../utils/constant";
import request from "../../utils/promise.request";
let res = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    pwd: "",
    role: -1,
    isInput: false,
    roles: ROLE,
  },
  getForm(e) {
    const { type } = e.currentTarget.dataset;
    this.setData({ [type]: e.detail.value });
  },
  changePwd() {
    // 修改密码需先输入旧密码
    wx.showModal({
      title: "为了确保安全，你需要输入原密码",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#000000",
      confirmText: "确定",
      confirmColor: "#3CC51F",
      editable: true,
      success: async (result) => {
        if (result.confirm) {
          // result.content = "qpal93";
          const { phone, role } = this.data;
          res = await request(
            "getpwd",
            { phone: JSON.parse(wx.getStorageSync("userInfo")).phone, role },
            "get"
          );
          if (result.content !== res[0].pwd) {
            wx.showToast({
              title: "密码错误",
              icon: "none",
              duration: 1500,
            });
            return;
          }
          this.setData({ isInput: true });
        }
      },
    });
  },
  save() {
    let reg_phone = /^1[3-9][0-9]{9}$/;
    let reg_pwd = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9@_]{6,10}$/;
    let { phone, pwd, isInput } = this.data;
    if (!phone) {
      wx.showToast({
        title: "手机号不能为空",
        icon: "none",
        duration: 1500,
      });
      return;
    }
    if (!reg_phone.test(phone)) {
      wx.showToast({
        title: "手机号不合法",
        icon: "none",
        duration: 1500,
      });
      return;
    }
    if (isInput && !pwd) {
      // 当输入原密码通过后，修改密码，判断密码是否为空
      wx.showToast({
        title: "密码不能为空",
        icon: "none",
        duration: 1500,
      });
      return;
    }
    if (isInput && !reg_pwd.test(pwd)) {
      // 当输入原密码通过后，修改密码，判断密码是否合法
      wx.showToast({
        title: "密码由字母数字_@组成, 长度为6-10, 且必须包含一个字母和一个数字",
        icon: "none",
        duration: 1500,
      });
      return;
    }
    const userInfo = JSON.parse(wx.getStorageSync("userInfo"));
    if (!isInput && phone === userInfo.phone) {
      //  当前只修改手机号，且输入的手机号与原来的相同
      wx.showToast({
        title: "手机号与原来的相同",
        icon: "none",
        duration: 1500,
      });
      return;
    }
    console.log(res);
    if (isInput && phone === userInfo.phone && pwd === res[0].pwd) {
      // 当前修改手机号或密码
      wx.showToast({
        title: "与原来信息的相同",
        icon: "none",
        duration: 1500,
      });
      return;
    }
    wx.showModal({
      title: "确定保存修改吗",
      content: "这将导致修改手机号/密码",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#000000",
      confirmText: "确定",
      confirmColor: "#3CC51F",
      success: async (result) => {
        if (result.confirm) {
          const { phone: oldPhone, role } = JSON.parse(
            wx.getStorageSync("userInfo")
          );
          console.log(JSON.parse(wx.getStorageSync("userInfo")));
          let res = await request(
            "modify",
            { oldPhone, role, phone, pwd },
            "post"
          );
          wx.showToast({
            title: res.message,
            icon: "none",
            duration: 1500,
          });
          console.log("res", res);
          if (res.code === 200) {
            if (oldPhone !== phone) {
              // 更新storage
              let userInfo = JSON.parse(wx.getStorageSync("userInfo"));
              userInfo.phone = phone;
              wx.setStorageSync("userInfo", JSON.stringify(userInfo));
            }
            // 隐藏密码框，并清空密码
            this.setData({ isInput: false, pwd: "" });
          }
        } else {
          // 还原手机号显示，隐藏密码框，并清空密码
          this.setData({
            phone: JSON.parse(wx.getStorageSync("userInfo")).phone,
            isInput: false,
            pwd: "",
          });
        }
      },
    });
  },
  logout() {
    wx.showModal({
      title: "确定要退出登录吗？",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#000000",
      confirmText: "确定",
      confirmColor: "#3CC51F",
      success: (result) => {
        if (result.confirm) {
          // 清空storage
          wx.setStorageSync("userInfo", "");
          wx.reLaunch({
            url: "/pages/personal/personal",
          });
        }
      },
    });
  },
  /**
   *gengxi数--监听页面加载
   */
  onLoad: function (options) {
    // 获取缓存中的phone和role
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      console.log(userInfo);
      userInfo = JSON.parse(userInfo);
      const { phone, role } = userInfo;
      this.setData({ phone, role });
    }
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
