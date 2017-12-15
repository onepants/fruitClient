var express = require('express');
var router = express.Router();
var https = require("https");
var url = require("url");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/list", function(req, res, next) {
	var option = {
		hostname:"wap.fruitday.com",
		port:"443",
		path:"/v3/ad/homepage?connect_id=&type=2&lonlat=116.25149%2C40.11637&ad_code=110114&tab_id="
	}
	
	var reqData = https.request(option,(resData) => {
		var str = "";
		resData.on("data",(val) => {
			str += val
		})
		resData.on("end",() => {
			res.send(str)
		})
		resData.on("error",(err) => {
			console.log(err)
		})
	})
	reqData.on("error",(err) => {
		console.log(err)
	})
	reqData.end();
})

router.get("/kind", function(req, res, next) {

	var str = req.url.split("?")[1].split("=")[1];
	var option = {
		hostname:"wap.fruitday.com",
		port:"443",
		path:"/v3/product/category_list?store_id_list=3&class_id="+str
	}
	
	var reqData = https.request(option,(resData) => {
		var str = "";
		resData.on("data",(val) => {
			str += val
		})
		resData.on("end",() => {
			res.send(str)
		})
		resData.on("error",(err) => {
			console.log(err)
		})
	})
	reqData.on("error",(err) => {
		console.log(err)
	})
	reqData.end();
})

router.get("/keywords", function(req, res, next) {

	var option = {
		hostname:"wap.fruitday.com",
		port:"443",
		path:"/v3/search/get_hot_keyword"
	}
	
	var reqData = https.request(option,(resData) => {
		var str = "";
		resData.on("data",(val) => {
			str += val
		})
		resData.on("end",() => {
			res.send(str)
		})
		resData.on("error",(err) => {
			console.log(err)
		})
	})
	reqData.on("error",(err) => {
		console.log(err)
	})
	reqData.end();
})

router.get("/search", function(req, res, next) {

	var str = req.url.split("?")[1].split("=")[1];
	var option = {
		hostname:"wap.fruitday.com",
		port:"443",
		path:"/v3/search/product?keyword="+str+"&store_id_list=3&tms_region_type=1&page_size=50&curr_page=1"
	}
	
	var reqData = https.request(option,(resData) => {
		var str = "";
		resData.on("data",(val) => {
			str += val
		})
		resData.on("end",() => {
			res.send(str)
		})
		resData.on("error",(err) => {
			console.log(err)
		})
	})
	reqData.on("error",(err) => {
		console.log(err)
	})
	reqData.end();
})

router.get("/keyup", function(req, res, next) {

	var str = req.url.split("?")[1].split("=")[1];
	var option = {
		hostname:"wap.fruitday.com",
		port:"443",
		path:"/v3/search/keyword?keyword="+str
	}
	
	var reqData = https.request(option,(resData) => {
		var str = "";
		resData.on("data",(val) => {
			str += val
		})
		resData.on("end",() => {
			res.send(str)
		})
		resData.on("error",(err) => {
			console.log(err)
		})
	})
	reqData.on("error",(err) => {
		console.log(err)
	})
	reqData.end();
})


router.get("/qipa", function(req, res, next) {

	var option = {
		hostname:"wap.fruitday.com",
		port:"443",
		path:"//v3/comment/rate_and_comment?product_id=27017"
	}
	
	var reqData = https.request(option,(resData) => {
		var str = "";
		resData.on("data",(val) => {
			str += val
		})
		resData.on("end",() => {
			res.send(str)
		})
		resData.on("error",(err) => {
			console.log(err)
		})
	})
	reqData.on("error",(err) => {
		console.log(err)
	})
	reqData.end();
})



module.exports = router;
