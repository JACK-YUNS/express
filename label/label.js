var express = require("express");
var router = express.Router();

var Mock = require('mockjs')
var data = [
  {
    workloads: false,
    rulesets: false,
    policy:29,
    name:'小明',
    type:'3',
    id:1
  }
];
router.use("/dataList", function(req, res) {
    return res.json(data);
});
router.use("/delete", function (req, res) {
    if(req.body.id){
        for(let i =0;i<data.length;i++){
            if (req.body.id == data[i].id){
              data.splice(i,1)
              console.log(data)
          }
        }
    }
    return res.json('删除成功');
    //调用mock方法模拟数据
    
});
router.use("/add", function (req, res) {
    req.body.id = data.length+1
    data.push(req.body)
    return res.json(data);
});
module.exports = router;
