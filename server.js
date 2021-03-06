var express = require("express")
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();
app.use(bodyParser.json());  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

app.get('/', function (req, res) {
    res.send('hello world');
});
router.use("/test", require('./test'));
router.use("/label", require("./label/label"));


app.use("/api", router)


app.listen(3001,()=>{
console.log('server is running')
})
