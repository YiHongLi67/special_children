import request from "../../utils/promise.request";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isRegister: false,
    phone: "",
    pwd: "",
    role: "--请选择--",
    cfmPwd: "",
    select: false,
    curIdx: -1,
    roles: ["家长", "老师", "人事管理", "财务管理"]
  },
  hideSelect() {
    this.setData({ select: false });
  },
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    });
  },
  mySelect(e) {
    let { name, idx } = e.currentTarget.dataset;
    this.setData({
      role: name,
      select: false,
      curIdx: idx
    });
  },
  getForm(e) {
    const { type } = e.currentTarget.dataset;
    this.setData({
      [type]: e.detail.value
    });
  },
  judgePhone(phone) {
    let reg_phone = /^1[3-9][0-9]{9}$/;
    if (!phone.trim()) {
      wx.showToast({
        title: "手机号不能为空",
        icon: "none",
        duration: 1500
      });
      return false;
    }
    if (!reg_phone.test(phone)) {
      wx.showToast({
        title: "手机号不合法",
        icon: "none",
        duration: 1500
      });
      return false;
    }
    return true;
  },
  judgeRole(curIdx) {
    if (curIdx < 0) {
      wx.showToast({
        title: "请选择角色",
        icon: "none",
        duration: 1500
      });
      return false;
    }
    return true;
  },
  judgePwd(pwd) {
    let reg_pwd = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9@_]{6,10}$/;
    if (!pwd) {
      wx.showToast({
        title: "密码不能为空",
        icon: "none",
        duration: 1500
      });
      return false;
    }
    if (!reg_pwd.test(pwd)) {
      // 当输入原密码通过后，修改密码，判断密码是否合法
      wx.showToast({
        title: "密码是长度为6-10的字母数字_@，至少有一个字母和数字",
        icon: "none",
        duration: 1500
      });
      return false;
    }
    return true;
  },
  judgrCfmPwd(cfmPwd) {
    if (!cfmPwd) {
      wx.showToast({
        title: "确认密码不能为空",
        icon: "none",
        duration: 1500
      });
      return false;
    }
    return true;
  },
  pwdIseq(pwd, cfmPwd) {
    if (pwd !== cfmPwd) {
      wx.showToast({
        title: "密码与确认密码不一致",
        icon: "none",
        duration: 1500
      });
      return false;
    }
    return true;
  },
  async handleForm(e) {
    const { phone, curIdx, pwd, cfmPwd, isRegister } = this.data;
    const { judgePhone, judgeRole, judgePwd, judgrCfmPwd, pwdIseq } = this;
    let send;
    if (isRegister) {
      send =
        judgePhone(phone) &&
        judgeRole(curIdx) &&
        judgePwd(pwd) &&
        judgrCfmPwd(cfmPwd) &&
        pwdIseq(pwd, cfmPwd);
    } else {
      send = judgePhone(phone) && judgePwd(pwd);
    }
    if (!send) {
      return;
    }
    if (isRegister) {
      // 注册
      let res = await request(
        "register",
        { phone, pwd, role: this.data.curIdx },
        "post"
      );
      if (res.code !== 200) {
        console.log(res);
        wx.showToast({
          title: res.message,
          icon: "none",
          duration: 1500
        });
      } else {
        wx.showToast({
          title: "注册成功",
          icon: "success",
          duration: 1500,
          success: (result) => {
            // 注册成功，切换到界面登录
            this.setData({
              isRegister: false,
              pwd: "",
              cfmPwd: ""
            });
          }
        });
      }
    } else {
      // 登录
      let res = await request("login", { phone, pwd });
      if (res.code !== 200) {
        wx.showToast({
          title: res.message,
          icon: "none",
          duration: 1500
        });
        return;
      }
      {
        let userInfo = JSON.parse(wx.getStorageSync("userInfo"));
        let phone =
          res.data.parent_phone ||
          res.data.teacher_phone ||
          res.data.per_man_phone ||
          res.data.fin_man_phone;
        const { role } = res.data;
        if (role === 0) {
          // 如果用户是家长，则请求其孩子信息
          let res = await request("getchild", { phone });
          if (res.code === 200) {
            userInfo.child = res.child[0] || {};
          }
        }
        userInfo = { ...userInfo, phone, role };
        console.log(userInfo);
        wx.setStorageSync("userInfo", JSON.stringify(userInfo));
        wx.switchTab({
          url: "/pages/personal/personal"
        });
      }
    }
  },
  register() {
    this.setData({ isRegister: true, pwd: "", cfmPwd: "" });
  },
  login() {
    this.setData({ isRegister: false, pwd: "", cfmPwd: "" });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
  onShareAppMessage: function () {}
});
