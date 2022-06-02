const express = require("express");
const cors = require("cors");
// 注册解析表单的body-parser
const bodyParser = require("body-parser");
// 创建数据库连接
const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0603",
  database: "miniapp",
  // 支持同时执行多条语句
  multipleStatements: true,
});
conn.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("连接成功");
});
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
function judgeRegister(table, phone) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM ${table.name} WHERE ${table.prop}_phone=${phone};`;
    conn.query(sql, (err, result) => {
      if (err) {
        reject("请求错误");
      }
      if (result.length > 0) {
        reject("该账号已注册，可直接登录");
      } else {
        resolve({
          exist: 0,
        });
      }
    });
  });
}
let table = [
  { name: "parent", prop: "parent" },
  { name: "teacher", prop: "teacher" },
  { name: "personal_manager", prop: "per_man" },
  { name: "finance_manager", prop: "fin_man" },
];
app.post("/register", cors(), async (req, res) => {
  const {
    body: { phone, role, pwd },
  } = req;
  // 查询数据表中该手机号是否已存在
  try {
    await Promise.all([
      judgeRegister(table[0], phone),
      judgeRegister(table[1], phone),
      judgeRegister(table[2], phone),
      judgeRegister(table[3], phone),
    ]);
    // 若账号不存在，则直接注册
    let sql = `SET FOREIGN_KEY_CHECKS = 0; INSERT INTO ${table[role].name} (${table[role].prop}_phone, role, pwd) VALUES (${phone}, ${role}, '${pwd}'); SET FOREIGN_KEY_CHECKS = 1;`;
    conn.query(sql, (err, result) => {
      if (err) {
        return res.json({ code: 100, message: "请求错误", err });
      }
      res.json({
        code: 200,
        message: result,
        exist: 0,
        message: "注册成功",
      });
    });
  } catch (e) {
    // 若账号已存在或请求出错，则返回以下内容
    return res.json({
      code: 100,
      message: e,
    });
  }
});
function judgeLogin(type, phone) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM ${table[type].name} WHERE ${table[type].prop}_phone=${phone};`;
    conn.query(sql, (err, result) => {
      if (err) {
        reject({ message: "请求错误", code: 500 });
      }
      if (result.length === 0) {
        resolve({ exist: false });
      } else {
        resolve({ exist: true, type });
      }
    });
  });
}
app.get("/login", cors(), async (req, res) => {
  console.log(req.query);
  const { phone, pwd } = req.query;
  try {
    let r = [
      await judgeLogin(0, phone),
      await judgeLogin(1, phone),
      await judgeLogin(2, phone),
      await judgeLogin(3, phone),
    ];
    r = r.filter((item) => {
      return item.exist;
    });
    console.log("r", r);
    // 账号不存在的情况
    if (r.length <= 0) {
      return res.json({ message: "账号不存在, 请先注册", code: 100 });
    } else {
      const { type } = r[0];
      let sql = `SELECT * FROM ${table[type].name} WHERE ${table[type].prop}_phone=${phone} AND pwd='${pwd}'`;
      conn.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return res.json({ code: 500, message: "请求错误" });
        }
        // 密码错误
        console.log(result);
        if (result.length === 0) {
          return res.json({ code: 100, message: "密码错误" });
        }
        // 登录成功
        delete result[0].pwd;
        res.json({ data: result[0], code: 200 });
      });
    }
  } catch (e) {
    res.json({ code: 500, message: e });
  }
});
app.get("/getchild", cors(), (req, res) => {
  console.log(req);
  const { phone } = req.query;
  let sql = `SELECT c.name, age, c.disease FROM child c WHERE parent_phone = '${phone}';`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ code: 100, message: "请求错误" });
    }
    console.log(result);
    return res.json({ code: 200, child: result });
  });
});
app.get("/getpwd", cors(), (req, res) => {
  const { phone, role } = req.query;
  let sql = `SELECT pwd FROM ${table[role].name} WHERE ${table[role].prop}_phone='${phone}';`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log("err", err);
      return res.json({ message: "请求错误" });
    }
    return res.json(result);
  });
});
app.post("/modify", cors(), async (req, res) => {
  try {
    const { oldPhone, role, phone, pwd } = req.body;
    console.log(oldPhone, role, phone, pwd);
    let sql;
    if (oldPhone === phone) {
      // 只修改密码
      sql = `SET FOREIGN_KEY_CHECKS = 0; UPDATE ${table[role].name} SET pwd = '${pwd}' WHERE ${table[role].prop}_phone = '${oldPhone}'; SET FOREIGN_KEY_CHECKS = 1;`;
    }
    // 判断phone是否已经注册
    else if (!pwd) {
      // 只修改手机号
      await Promise.all([
        judgeRegister(table[0], phone),
        judgeRegister(table[1], phone),
        judgeRegister(table[2], phone),
        judgeRegister(table[3], phone),
      ]);
      // 账号没被注册，可修改
      sql = `SET FOREIGN_KEY_CHECKS = 0; UPDATE ${table[role].name} SET ${table[role].prop}_phone = '${phone}' WHERE ${table[role].prop}_phone = '${oldPhone}'; SET FOREIGN_KEY_CHECKS = 1;`;
    } else {
      // 修改手机和或密码
      await Promise.all([
        judgeRegister(table[0], phone),
        judgeRegister(table[1], phone),
        judgeRegister(table[2], phone),
        judgeRegister(table[3], phone),
      ]);
      // 账号没被注册，可修改
      sql = `SET FOREIGN_KEY_CHECKS = 0; UPDATE ${table[role].name} SET pwd = '${pwd}', ${table[role].prop}_phone = '${phone}' WHERE ${table[role].prop}_phone = '${oldPhone}'; SET FOREIGN_KEY_CHECKS = 1;`;
    }
    conn.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ code: 500, message: "请求错误" });
      }
      console.log(result);
      return res.json({ code: 200, message: "修改成功" });
    });
  } catch (e) {
    console.log(e);
    res.json({ code: 100, message: e });
  }
});
app.get("/getnurse", cors(), (req, res) => {
  console.log(req.query);
  const { phone } = req.query;
  let sql = `SELECT co.course_id, key_words, summary, course_des, course_type, cover_url, c_co.cpt_ratio FROM 
  child c, child_course c_co, course co WHERE c.parent_phone = '${phone}' AND c.child_id = c_co.child_id
  AND c_co.course_id = co.course_id AND course_type = 'nursing';`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ code: 100, message: err });
    }
    res.json({ code: 200, data: result });
  });
});
app.get("/getplan", cors(), (req, res) => {
  console.log(req.query);
  const { phone } = req.query;
  let sql = `SELECT co.course_id, key_words, summary, course_des, course_type, cover_url, c_co.cpt_ratio FROM 
  child c, child_course c_co, course co WHERE c.parent_phone = '${phone}' AND c.child_id = c_co.child_id
  AND c_co.course_id = co.course_id AND course_type = 'plan';`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ code: 100, message: err });
    }
    res.json({ code: 200, data: result });
  });
});
app.get("/morenurse", cors(), (req, res) => {
  const { phone, disease } = req.query;
  let sql = `SELECT * FROM course WHERE key_words = '${disease}' AND course_type = 'nursing' AND course_id NOT IN 
  (SELECT co.course_id FROM child c, child_course c_co, course co WHERE c.parent_phone = '${phone}' AND 
  c.child_id = c_co.child_id AND c_co.course_id = co.course_id AND course_type = 'nursing');`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ code: 100, message: err });
    }
    res.json({ code: 200, data: result });
  });
});
app.get("/moreplan", cors(), (req, res) => {
  const { phone, disease } = req.query;
  let sql = `SELECT * FROM course WHERE key_words = '${disease}' AND course_type = 'plan' AND course_id NOT IN 
  (SELECT co.course_id FROM child c, child_course c_co, course co WHERE c.parent_phone = '${phone}' AND 
  c.child_id = c_co.child_id AND c_co.course_id = co.course_id AND course_type = 'plan');`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ code: 100, message: err });
    }
    res.json({ code: 200, data: result });
  });
});
app.post("/addcourse", cors(), (req, res) => {
  const { course_id, phone } = req.body;
  let sql = `SET FOREIGN_KEY_CHECKS = 0; INSERT INTO child_course (course_id, child_id, cpt_ratio) VALUES 
  ("${course_id}", (SELECT child_id FROM child WHERE parent_phone = '${phone}'), 0); SET FOREIGN_KEY_CHECKS = 1;`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ code: 100, message: err });
    }
    console.log(result);
    return res.json({ code: 200, data: result });
  });
});
function getData(keywords, type) {
  let sql = `SELECT cover_url, summary FROM course WHERE (key_words LIKE "%${keywords}%" OR 
  summary LIKE "%${keywords}%" OR course_des LIKE "%${keywords}%") AND course_type = "${type}" LIMIT 18;`;
  return new Promise((resolve, reject) => {
    conn.query(sql, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}
app.get("/getcourse", cors(), async (req, res) => {
  const { keywords } = req.query;
  let data = [];
  const type = ["nursing", "plan", "active"];
  try {
    let p_data = await Promise.all([
      getData(keywords, type[0]),
      getData(keywords, type[1]),
      getData(keywords, type[2]),
    ]);
    p_data.map((item, i) => {
      data[i] = {};
      data[i].type = type[i];
      data[i].res = item;
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.json({ code: 100, message: err });
  }
});
app.post("/addchild", cors(), async (req, res) => {
  const { phone, name, age, disease } = req.body;
  let sql = `SET FOREIGN_KEY_CHECKS = 0; INSERT INTO
      child(child_id, parent_phone, name, age, disease)
    VALUES
      (UUID(), "${phone}", "${name}", "${age}", "${disease}"); SET FOREIGN_KEY_CHECKS = 1;`;
  conn.query(sql, (err, result) => {
    if (err) {
      res.json({ code: 100, message: err });
    }
    console.log(result);
    res.json({ code: 200, result });
  });
});
app.get("/get_tea_nurse", cors(), (req, res) => {
  const { phone } = req.query;
  let sql = `SELECT course_id, key_words, summary, course_des, course_type, cover_url, money FROM 
  course c, teacher t WHERE t.teacher_phone = c.teacher_phone AND t.teacher_phone = '${phone}' AND course_type = 'nursing';`;
  conn.query(sql, (err, result) => {
    if (err) {
      res.json({ code: 100, message: err });
    }
    console.log(result);
    res.json({ code: 200, result });
  });
});
app.get("/get_tea_plan", cors(), (req, res) => {
  const { phone } = req.query;
  let sql = `SELECT course_id, key_words, summary, course_des, course_type, cover_url, money FROM 
  course c, teacher t WHERE t.teacher_phone = c.teacher_phone AND t.teacher_phone = '${phone}' AND course_type = 'plan';`;
  conn.query(sql, (err, result) => {
    if (err) {
      res.json({ code: 100, message: err });
    }
    console.log(result);
    res.json({ code: 200, result });
  });
});
app.get("/get_tea_active", cors(), (req, res) => {
  const { phone } = req.query;
  let sql = `SELECT course_id, key_words, summary, course_des, course_type, cover_url, money FROM 
  course c, teacher t WHERE t.teacher_phone = c.teacher_phone AND t.teacher_phone = '${phone}' AND course_type = 'active';`;
  conn.query(sql, (err, result) => {
    if (err) {
      res.json({ code: 100, message: err });
    }
    console.log(result);
    res.json({ code: 200, result });
  });
});
app.post("/set_course", cors(), (req, res) => {
  const {
    teacher_phone,
    key_words,
    summary,
    course_des,
    course_type,
    cover_url,
    money,
  } = req.body;
  let sql = `SET FOREIGN_KEY_CHECKS = 0; INSERT INTO course(course_id, teacher_phone, key_words, summary, 
    course_des, course_type, cover_url, money) VALUES (UUID(), "${teacher_phone}", "${key_words}", "${summary}", 
    "${course_des}", "${course_type}", "${cover_url}", "${money}"); SET FOREIGN_KEY_CHECKS = 1; SELECT course_id 
    FROM course WHERE teacher_phone = '${teacher_phone}' AND key_words = "${key_words}" AND summary = "${summary}" 
    AND course_des = "${course_des}" AND course_type = "${course_type}" AND cover_url = "${cover_url}" AND money = "${money}";`;
  conn.query(sql, (err, result) => {
    if (err) {
      res.json({ code: 100, message: "添加失败" });
    }
    console.log(result);
    res.json({ code: 200, result: result[result.length - 1][0] });
  });
});
app.listen(3000, () => console.log("Example app listening on port 3000!"));
