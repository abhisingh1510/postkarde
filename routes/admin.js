var express = require('express');
var path=require('path')
var usersmodel = require('../models/usersmodel');
var router = express.Router();

var data_gb=''
usersmodel.fetchalldata('addcat',function(result){
	data_gb=result;
})

router.use(function(req,res,next){
	if(req.session.username==undefined || req.session.designation!='admin')
	{
		console.log('Invalid user please login first')
		res.redirect('/logout')
	}
	next()
})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('adminhome',{'username':req.session.username,'designation':req.session.designation})
});
/*
router.all('/addcategory',function(res,req,next){
	if(req.method=='GET')
		res.render('addcat')
	else
	{
		var data=req.body
		console.log(data)
	}
})
*/
router.all('/addcategory',function(req,res,next){
	if(req.method=='GET')
		res.render('addcat',{'result':''})
	else
	{
		var cat_nm=req.body.cat_nm
		var myimg=req.files.cat_img
		var cat_img_nm=myimg.name
		//Date()+'-'+
		var des=path.join(__dirname,'../public/uploads',cat_img_nm)
		myimg.mv(des,function(err){				//first arguement is destination path
			if(err)
				res.render('addcat',{'result':'Upload Failed'})
			else
			{
				usersmodel.addcategory(cat_nm,cat_img_nm,function(result){
					if(result)
						res.render('addcat',{'result':'Category Added Successfully'})
					else
						res.render('addcat',{'result':'Category Addition Failed'})
				})
			}
		})						
	}
})

router.all('/addsubcategory',function(req,res,next){
	var data={}
	usersmodel.fetchalldata('addcat',function(result){
		data=result;
	})
	
	if(req.method=='GET')
	{
		res.render('addsubcat',{'mycat':data_gb})
	}
	else
	{
		var cat_nm=req.body.cat_nm
		var sub_cat_nm=req.body.sub_cat_nm
		var myimg=req.files.sub_cat_img
		var sub_cat_img_nm=myimg.name
		//Date()+'-'+
		var des=path.join(__dirname,'../public/uploads',sub_cat_img_nm)
		myimg.mv(des,function(err){				//first arguement is destination path
			if(err)
				res.render('addsubcat',{'mycat':data_gb})
			else
			{
				usersmodel.addsubcategory(cat_nm,sub_cat_nm,sub_cat_img_nm,function(result){
					if(result)
						res.render('addsubcat',{'mycat':data_gb})
					else
						res.render('addsubcat',{'mycat':data_gb})
				})
			}
		})						
	}
})

module.exports = router;
