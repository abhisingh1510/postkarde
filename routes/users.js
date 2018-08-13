var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use(function(req,res,next){
	if(req.session.username==undefined || req.session.designation!='user')
	{
		console.log('Invalid user please login first')
		res.redirect('/logout')
	}
	next()
})

router.get('/', function(req, res, next) {
  res.render('usershome',{'username':req.session.username,'designation':req.session.designation})
});

module.exports = router;
