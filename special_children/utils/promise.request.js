import config from "./config";
export default function (url, data = {}, method = "get") {
  return new Promise((resolve, reject) => {
    let props = {
      url: `${config.mobilehost}/${url}`,
      data,
      method,
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
    };
    wx.request(props);
  });
}
