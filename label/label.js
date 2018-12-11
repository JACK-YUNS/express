var express = require("express");
var router = express.Router();

var Mock = require("mockjs");
var data = [
  {
    workloads: "false",
    rulesets: "false",
    policy: 29,
    name: "小明",
    type: 2,
    id: 1
  }
];
router.use("/dataList", function(req, res) {
  return res.json(data);
});
router.use("/delete", function(req, res) {
  if (req.body.id) {
      req.body.id.filter(item=>{
     
          for (let i = 0; i < data.length; i++) {
           
              if (item == data[i].id) {
                data.splice(i, 1);
                break;
              }
          }
      })
  }
  return res.json(data);
  //调用mock方法模拟数据
});
router.use("/add", function(req, res) {
  let template = {
    "workloads|1": true,
    "rulesets|1": true,
    'id|123.1-10': 2,
  };
  let mockData = Mock.mock(template);
  let obj = {
    id: mockData.id,
    workloads: mockData.workloads,
    rulesets: mockData.rulesets,
    policy: "1",
    type: req.body.type,
    name: req.body.name
  };
  data.push(obj);
  return res.json("添加成功");
});
router.use("/search", function(req, res) {
  let arr = [];
  if (req.body.name && req.body.type) {
    data.filter(item => {
      if (
        item.name.indexOf(req.body.name) > -1 &&
        item.type.indexOf(req.body.type) > -1
      ) {
        arr.push(item);
      }
    });
  } else if (req.body.name && !req.body.type) {
    data.filter(item => {
      if (item.name.indexOf(req.body.name) > -1) {
        arr.push(item);
      }
    });
  } else if (req.body.type && !req.body.name) {
    data.filter(item => {
      if (item.type.indexOf(req.body.type) > -1) {
        arr.push(item);
      }
    });
    
  } else if (!req.body.name && !req.body.type) {
    arr = data;
  }

  return res.json(arr);
});
module.exports = router;
