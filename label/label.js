var express = require("express");
var router = express.Router();

var Mock = require('mockjs')
var data = [
  {
    workloads: 'false',
    rulesets: 'false',
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
    let data = {
        id:data.length+1,
        workloads:false,
        rulesets:'false',
        policy:'1',
        type:req.body.type,
        name:req.body.name
    }
      data.push(data)
    return res.json('添加成功');
});
module.exports = router;
