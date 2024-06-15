const express = require('express');
const handle_user = require('../handle_users')
const router = express.Router();

// GET login page
router.get('/', async (req, res) => {
    const found_user = await handle_user.getUserProfileByCookie('./db/users.json',req.cookies.cookie);
    console.log(found_user);
    if (!req.cookies.cookie){
        return res.render('profile', { user : found_user });
    } else {
      return res.render('profile', { user : found_user });

    }
});

router.get('/logout',(req, res) => {
    req.clearCookie('cookie'); 
    res.send('<h1>Loged Out</h1>')

});


module.exports = router;