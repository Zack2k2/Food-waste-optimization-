const express = require('express');
const handle_user = require('../handle_users')
const router = express.Router();

// GET login page
router.get('/', (req, res) => {
    res.render('login', { title: 'Login' });
});

// POST login form
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    // Here you would typically add code to authenticate the user
    // For now, we'll just log the user data to the console
    //console.log(`Username: ${username}, Password: ${password}`);

    db_response = await handle_user.__getIdAndCookiesFromLogin("./db/users.json",`${username}`, `${password}`)
    //console.log(db_response);
    if (db_response === -1){
        res.send(`
      <h2><p>Invalid credentials. You will be redirected to the homepage in 4 seconds...</p></h2>
      <script>
        setTimeout(function() {
          window.location.href = "/";
        }, 4000);
      </script>
    `);
    } 
    if (typeof(db_response) === typeof([])){
        console.log(db_response);
        user_cookie = db_response[1];
        res.cookie('cookie', user_cookie, {maxAge: 7 * 24 * 60 * 60 * 60 * 4000})
        res.redirect('/')
    }
    //console.log(user_id + " : " + user_cookie );
    
    //res.cookie()
    // Send a response back to the client
    //res.send('Login successful!');
});

module.exports = router;
