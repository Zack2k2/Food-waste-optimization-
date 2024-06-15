var express = require('express');
var router = express.Router();
const handle_users = require('../handle_users')
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) 
{
  res.render('register',{title:"Register" ,v1:"variable1"});

});
// POST register form
router.post('/', async (req, res) => {
    const { name, username, age, weight, password, allergies } = req.body;
    user_json_file = './db/users.json'
    //console.log(req.body)
    // Here you would typically add code to save the user to a database
    // For now, we'll just log the user data to the console
    //console.log(`Username: ${username}, Password: ${password}`);
    console.log(name+" "+username+" "+age+" "+weight+" "+password+" "+password);
     // Basic validation
    if (!name || !username || !age || !weight || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    new_user_allergies = []
    if(typeof(allergies) == typeof([])){
        allergies.forEach(allergy => {
          new_user_allergies.push(allergy);
        });
    } else { new_user_allergies.push(allergies)}

    num_users = await handle_users.getTotalUsers(user_json_file);
    //console.log(":" + num_users);
    num_users += 1;
    id_num = num_users.toString().padStart(3, '0');

    const new_user_cookie = Math.random().toString(36).substring(2,15);



    new_user_data = {}
    new_user_data[id_num] = {
        "username":username,
        "password":password,
        "cookie":new_user_cookie,
        "name":name,
        "age":age,
        "weight":weight,
        "allergies":new_user_allergies
    }

    handle_users.addUserProfile(user_json_file, new_user_data);

    res.cookie('cookie',new_user_cookie,  {maxAge: 7 * 24 * 60 * 60 * 60 * 4000});
    res.send(`<h2><p>Registration successful!. You will be redirected to the homepage in 4 seconds...</p></h2>
      <script>
        setTimeout(function() {
          window.location.href = "/";
        }, 4000);
      </script>
    `);
});

module.exports = router;
