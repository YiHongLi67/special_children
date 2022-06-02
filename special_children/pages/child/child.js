import request from "../../utils/promise.request.js";
import Pubsub from "pubsub-js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    hasChild: false,
    name: "",
    age: "",
    disease: "",
    inputName: "",
    inputAge: "",
    inputDisease: "",
  },
  async submit(e) {
    const { inputName, inputAge, inputDisease } = this.data;
    var { statu, type } = e.currentTarget.dataset;
    if (type === "submit") {
      if (!inputName) {
        wx.showToast({
          title: "姓名不能为空",
          icon: "none",
        });
        return;
      }
      if (!inputAge) {
        wx.showToast({
          title: "年龄不能为空",
          icon: "none",
        });
        return;
      }
      if (!inputDisease) {
        wx.showToast({
          title: "病症不能为空",
          icon: "none",
        });
        return;
      }
      let userInfo = JSON.parse(wx.getStorageSync("userInfo"));
      const { phone } = userInfo;
      let data = await request(
        "addchild",
        { phone, name: inputName, age: inputAge, disease: inputDisease },
        "post"
      );
      if (data.code === 200) {
        let child = { name: inputName, age: inputAge, disease: inputDisease };
        userInfo.child = child;
        wx.setStorageSync("userInfo", JSON.stringify(userInfo));
        wx.showToast({
          title: "添加成功",
          icon: "success",
        });
        this.setData({
          hasChild: true,
          name: inputName,
          age: inputAge,
          disease: inputDisease,
        });
        console.log("发布消息");
        Pubsub.publish("updateChild", child);
      }
    }
    this.util(statu);
  },
  getVal(e) {
    this.setData({ [e.currentTarget.dataset.type]: e.detail.value });
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      if (userInfo.child.name) {
        const { name, age, disease } = userInfo.child;
        this.setData({ hasChild: true, name, age, disease });
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
