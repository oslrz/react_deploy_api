const express = require("express");
const fs = require("fs");
const app = express();

app.get("/",(request, response)=>{
    fs.readFile("./data.json","utf-8",(error,data)=>{
        if(error) throw error;
        response.send(data)
    })
});
console.log('app is working properly')
app.listen(3000);