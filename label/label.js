var express = require("express");
var router = express.Router();

var Mock = require('mockjs')
var data = [
  {
    workloads: 'false',
    rulesets: 'false',
    policy:29,
    name:'小明',
    type:2,
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
    let template = {
        'workloads|1': true, 
        'rulesets|1': true, 
    }
    let mockData = Mock.mock(template);
    let obj = {
        id:data.length+1,
        workloads: mockData.workloads,
        rulesets: mockData.rulesets,
        policy:'1',
        type:req.body.type,
        name:req.body.name
    }
    data.push(obj)
    return res.json('添加成功');
});
router.use("/search", function (req, res) {
    let arr = []
    data.filter(item =>{
        if (item.name.indexOf(req.body.name) > -1) {
          arr.push(item);
        }
    })
    return res.json(arr);
});
module.exports = router;
