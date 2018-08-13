var con=require('./conn.js')

function addpost(tbl_nm,data,image1,image2,image3,cb)
{
    var query="insert into "+tbl_nm+" values(NULL,1,'"+data.title+"','"+data.sub_cat_nm+"','"+data.description+"',"+data.price+",'"+image1+"','"+image2+"','"+image3+"','"+data.address+"','"+data.email+"',"+data.mob+",'"+data.city+"')"
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)      //result is either true or false
    })
}

function fetchsubcat(tbl_nm,cat_nm,cb)
{
	var query="select * from "+tbl_nm+" where cat_nm='"+cat_nm+"'"
	con.query(query,function(err,result){
		if(err)
			console.log(err)
		else
			cb(result)
	})
}

function addsubcategory(cat_nm,sub_cat_nm,sub_cat_img_nm,cb)
{
	var query="insert into addsubcat values (NULL,'"+cat_nm+"','"+sub_cat_nm+"','"+sub_cat_img_nm+"')"
	con.query(query,function(err,result){
		if(err)
			console.log(err)
		else
			cb(result)
	})	
}

function fetchdata(tbl_nm,cb)
{
	var query="select * from "+tbl_nm+" order by cat_id desc limit 0,9"
	con.query(query,function(err,result){
		if(err)
			console.log(err)
		else
			cb(result)
	})
}

function fetchalldata(tbl_nm,cb)
{
	var query="select * from "+tbl_nm
	con.query(query,function(err,result){
		if(err)
			console.log(err)
		else
			cb(result)
	})
}

function userregistration(tbl_nm,data,cb)
{
    var query="insert into "+tbl_nm+" values(NULL,'"+data.nm+"','"+data.unm+"','"+data.pass+"','"+data.address+"','"+data.mob+"','"+data.gender+"','"+data.date+"','user',0)"
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)      //result is either true or false
    })
}

function authenticationupdate(emailid,cb)
{
	var query="update register set status=1 where username='"+emailid+"'"
	con.query(query,function(err,result){
		if(err)
			console.log(err)
		else
			cb(result)
	})
}

function logincheck(tbl_nm,data,cb)
{
	var query="select * from "+tbl_nm+" where username='"+data.unm+"' && password='"+data.pass+"' && status=1"
	con.query(query,function(err,result){
		if(err)
			console.log(err)
		else
			cb(result)
	})
}

function addcategory(cat_nm,cat_img_nm,cb)
{
	var query="insert into addcat values (NULL,'"+cat_nm+"','"+cat_img_nm+"')"
	con.query(query,function(err,result){
		if(err)
			console.log(err)
		else
			cb(result)
	})	
}

module.exports={authenticationupdate:authenticationupdate,logincheck:logincheck,userregistration:userregistration,addcategory:addcategory,fetchdata:fetchdata,fetchalldata:fetchalldata,fetchsubcat:fetchsubcat,addsubcategory:addsubcategory,addpost:addpost}