const fs = require("fs");
const readline = require("readline");
// fs.readFile("./jipinjiading1.txt","utf-8",function(error,data){
//     if(error){
//         return console.log("读取内容失败："+error.message);
//     }
//     else{
//         console.log("读取内容成功:"+data);
//     }
// })
var fwrite = fs.createWriteStream("./data.json");
var strdic = {};
var key = '';
var value = '';
const rl = readline.createInterface({
    input:fs.createReadStream("./jipinjiading1.txt"),
    output:fwrite
});

rl.on('line', (line) => {
    //console.log(`文件单行内容: ${line}`);
    var values = /^第.*章/.test(line);
    if(values){
        if(key.length > 0){
            strdic[key] = value;
        }
        key = line;
        value = '';
        //fwrite.write(`${line}\n`);
        //console.log(`文件单行内容: ${line}`);
    }
    else{
        value = value + line;
    }
}).on('close',()=>{
    console.log('再见!');
    //console.log(strdic);
    var strjson = JSON.stringify(strdic);
    fwrite.write(`${strjson}\n`);
    fwrite.close();
})

