var express = require('express');
var handle_users = require('../handle_users');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  if(req.cookies.cookie){
    console.log(req.cookies.cookie)
    //console.log('hefelk')
    user_profile = await handle_users.getUserProfileByCookie('./db/users.json',req.cookies.cookie);
    console.log('hello : '+ JSON.stringify( user_profile['name']));
    user_name = JSON.stringify(user_profile['name']);
    res.render('homepage', {title:'home page',username:user_name});
  } else {
     res.render('homepage', { title:'Home Page',username:'Guest'});
  }
});

router.get('/about', function(req, res, next)
{
  
  res.render('about',{title:"about"})
});

router.get('/error', function(req,res) 
{
  res.render('error404',{});
});

module.exports = router;
