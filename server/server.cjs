const url = require("url")
const express = require("express")
const websocket = require("ws")
const app = new express();
const wsServer = websocket.Server
const server = app.listen(3032)
const wss = new wsServer({server})

//用户池
const pool = {};
const records = [];

//跨域
app.use(function (req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","*");
    next();
})

//查看是否有重复注册名字
app.get("/login",(req,res)=>{
    const id = req.query.id;
    if(!pool[id]){
        pool[id] = {}
        res.send({code:200,msg:"登陆成功",data:{id}})
    }else{
        res.send({code:600,msg:"用户名已被注册"})
    }
})

const {broadcast} = require("./util.cjs")

wss.on("connection",(ws,req)=>{
    ws.id = url.parse(req.url,true).query.id
    //更新在线人数
    broadcast(wss.clients,JSON.stringify({
        allPeopleList:Object.keys(pool),
        records
    }))
    ws.on("message",(msg)=>{
        msg = JSON.parse(msg)
        records.push({id:ws.id,content:msg,time:new Date().toLocaleString()});
        broadcast(wss.clients,JSON.stringify({
            records
        }))
    })
})


