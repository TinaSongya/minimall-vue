const express = require('express');
const app = express();//创建app实例
const fs=require('fs');

function pagination(pageSize,currentPage,arr){
    let skipNum=(currentPage-1)*pageSize;
    let newArr=(skipNum+pageSize>=arr.length)?arr.slice(skipNum,arr.length) : arr.slice(skipNum,skipNum+pageSize);
    return newArr;
}
function sortBy(attr,rev){
    if(rev===undefined){
        rev=1;
    }else{
        rev=rev?1:-1;
    }
    return function (a,b){
        a=a[attr];
        b=b[attr];
        if(a<b){
            return rev* -1;
        }
        if(a>b){
            return rev*1;
        }
        return 0;
    }
}
function range(arr,gt,lte){
    return arr.filter(item=>item.salePrice>=gt&&item.salePrice<=lte)
}

const cors = require('cors');
const jwt=require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 秘钥);
const bodyParser = require('body-parser');
module.exports={
    devServer: {
        before(app, serve) {
            app.use(cors());
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }))
            app.get('/api/goods/home', (req, res) => {
                fs.readFile('./db/home.json','utf8',(err,data)=>{
                    if(!err){
                        res.json(JSON.parse(data));
                    }
                })
            })
            app.get('/api/goods/allGoods',(req,res)=>{
                const page=parseInt(req.query.page);
                const size=parseInt(req.query.size);
                const sort=parseInt(req.query.sort);
                const gt=parseInt(req.query.priceGt);
                const lte=parseInt(req.query.priceLte);
                const cid=req.query.cid;
                let newData=[]
                fs.readFile('./db/allGoods.json','utf8',(err,data)=>{
                    let{result}=JSON.parse(data);
                    let allData=result.data;
                    //分页显示
                    newData=pagination(size,page,allData);
                    if(cid=='1184'){//品牌周边
                        newData=allData.filter((item)=>item.productName.match(RegExp(/Smartisan/)))
                        if(sort==1){
                            newData=newData.sort(sortBy('salePrice',true))
                        }else if(sort===-1){
                            newData=newData.sort(sortBy('salePrice',false))
                        }

                    }else{
                        if(sort===1){//价格由低到高
                            newData=newData.sort(sortBy('salePrice',true))
                        }else if(sort===-1){
                            newData=newData.sort(sortBy('salePrice',false))
                        }
                        if(gt&&lte){
                            newData=range(newData,gt,lte)
                        }
                    }
                    if(newData.length<size){
                        res.json({
                            data:newData,
                            total:newData.length
                        })
                    }else{
                        res.json({
                            data:newData,
                            total:allData.length

                        })
                    }
                })
            })

            //商品数据详情
            app.get('/api/goods/productDet',(req,res) =>{
                const productId=req.query.productId;
                console.log(productId);
                fs.readFile('./db/goodsDetail.json','utf8',(err,data)=>{
                    if(!err){
                        let {result}=JSON.parse(data);
                        let newData=result.find(item  => item.productId==productId)
                        res.json(newData)
                    }
                })
            })


           app.post('/api/login',(req,res)=>{
               console.log(req.body.user);
               //登录成功获取用户名
               let username=req.body.user
               //一系列的操作
               res.json({
                   //进行加密的方法
                   token:jwt.sign({username:username},'abcd',{
                       exprisIn:"3000s"
                   }),
                   username,
                   state:1,
                   file:'/static/images/1570600179870.png',
                   code:200,
                   address:null,
                   balance:null,
                   description:null,
                   email:null,
                   message:null,
                   phone:null,
                   points:null,
                   sex:null,
                   id:62
               })
           })

         app.post('/api/validate',function (req,res){
             let token=req.headers.authorization;
             console.log(token);
             //验证token的合法性，对token进行解码
             jwt.verify(token,'abcd',function (err,decode){
                 if(err){
                     res.json({
                         msg:'当前用户未登录'
                     })
                 }else{
                     //验证用户已经登录
                     res.json({
                         token:jwt.sign({username: decode.username},'abcd',{
                         expiresIn: "3000s"
                     }),
                         username: decode.username,
                         msg: '已登录',
                         address: null,
                         balance: null,
                         description: null,
                         email: null,
                         file: "/static/images/1570600179870.png",
                         id: 62,
                         message: null,
                         phone: null,
                         points: null,
                         sex: null,
                         state: 1,

                     })
                 }
             })
         })

        }
    }
}
