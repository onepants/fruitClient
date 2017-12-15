var express = require('express');
var router = express.Router();
//var md5 = require("md5");
var MySql = require("./../md/MySql.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/registerAction', function(req, res, next) {
	//http://localhost:3000/users/registerAction?status=register&username="+username+"&password="+password
  var str = req.url;
  str = str.split("username=")[1].split("&password=");
  var obj = {};
  obj.username = str[0];
  obj.password = str[1];
  console.log(obj)

  /**
   * 查询数据库，是不是存在该用户，
   * 如果存在，则返回0，表示用户已存在，
   * 如果不存在，则返回1，表示注册成功
   * 其他(数据库发生错误)错误返回2
   */
  
MySql.connect((err) => {
    res.send('2');
},(db) => {
    console.log("数据库连接成功")
    MySql.findData(db, "dayday", {username: obj.username}, {_id:0}, (result) => {
      if(result.length == 0){//没有用户
        MySql.insert(db,'dayday',obj,(result) => {
          console.log(result);
          res.send('1');
          db.close();
        })
      }else{
        res.send('0');
      }
      
      db.close();
    })
	})
});


router.get('/loginAction', function(req, res, next) {
	var str = req.url;
  str = str.split("username=")[1].split("&password=");
  var obj = {};
  obj.username = str[0];
  obj.password = str[1];
  console.log(obj)

  /**
   * 查询数据库，是不是存在该用户，
   * 如果存在，继续判断账户名密码是不是匹配
   * 如果匹配，返回1， --- 登录成功
   * 如果不匹配，返回2 ---- 密码错误
   * 如果不存在该用户，那么返回0
   * 数据库错误，返回-1
   */
	MySql.connect((err) => {
	    res.send('-1')
	},(db) => {
	    MySql.findData(db, 'dayday',{username: obj.username},{}, (result1) => {
	      if(result1.length > 0){
	        MySql.findData(db, 'dayday',obj,{}, (result2) => {
	          if(result2.length > 0){//匹配成功
	            //后台可以记录登录状态-----cookie
	            res.send('1');
	          }else{
	            res.send('2')
	          }
	          db.close();
	        })
	      }else{//没有该用户
	        res.send('0')
	      }
	      db.close();
	    })
	}); 
});


module.exports = router;
