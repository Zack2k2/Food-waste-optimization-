const express = require('express');
const handle_inventory = require('../handle_inventory');
const handle_db = require('../handle_db');
const handle_users = require('../handle_users');
const path = require('path');
var router = express.Router();
const jsonfile = require('jsonfile')
const fs = require("fs")

inventory_json_filepath = path.join(__dirname,'../db/inventory.json')
users_json_filepath = path.join(__dirname,'../db/users.json');
ingredients_json_filepath = path.join(__dirname,'../db/ingredients.json')
//console.log(inventory_json_filepath);

/* GET home page. */
router.get('/', async function(req, res, next) 
{
  if (!req.cookies.cookie){
    return res.render('noAccountWarning');
  }
  user_pf = await handle_users.getUserProfileByCookie(users_json_filepath,req.cookies.cookie);
  const userAllergies = user_pf.allergies.map(allergy => allergy.toLowerCase());

  inst_inventory = await handle_inventory.readInventory(inventory_json_filepath)

  new_inven = inst_inventory.filter(dish => 
    !dish.ingredients.some(ingredient => 
      userAllergies.includes(ingredient.toLowerCase())
    )
  );
  // inst_inventory.forEach(element => {
  //   console.log(element);
  // });
  function  calculateAverage(rates) {
    //console.log(rates.length);
    if (rates.length == 0) return 0;
    return rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
  }
  //console.log(inst_inventory)

  inst_inventory.forEach(dish => {
    dish.average_rating = calculateAverage(dish.rate);
  });
  //console.log(inst_inventory)
  res.render('foods',{title:"List of all Foods" ,inventory: new_inven});

});

// GET search route
router.get('/search', async (req, res) => {
    const query = req.query.q; // Get the search query from the URL query parameters
    searched_inventory = []
    inst_inventory = await handle_inventory.readInventory(inventory_json_filepath)
    inst_inventory.forEach(dish_elem => {
      if(dish_elem['dist_name'].toLowerCase().includes(req.query.q) 
            || dish_elem["ingredients"].includes(req.query.q)){
        searched_inventory.push(dish_elem)
      }
      
    });
    function  calculateAverage(rates) {
      //console.log(rates.length);
      if (rates.length == 0) return 0;
      return rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
    }
    //console.log(inst_inventory)

    searched_inventory.forEach(dish => {
      dish.average_rating = calculateAverage(dish.rate);
    });
      //console.log(inst_inventory)

    return res.render('foods',{title:"List of all Foods" ,inventory: searched_inventory});
        //return res.render('index', { items: [], query: '' });
    
    if (!req.cookies.cookie){
      return res.render('noAccountWar');
    }
    // Simple search logic (case-insensitive)
    //const results = items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

    //res.render('index', { items: results, query: query });
});

router.get('/addDish', (req, res) => {
   if (!req.cookies.cookie){
    return res.render('noAccountWarning');
  }
  res.render('addDish');
});


router.get('/dish/:id', async ( req, res) => {
  if (!req.cookies.cookie){
    return res.render('noAccountWarning');
  } else {
    inst_inventory = await handle_inventory.readInventory(inventory_json_filepath)

    const idish = await inst_inventory.find(d => d.foodid == req.params.id)
    console.log(req.params)
    console.log(idish.dist_name);
   res.render('dishview',{dish:idish});
  }
  

 
  // // if you using view enggine
  // res.render('error', {
  //     message: err.message,
  //     error: {}
    
  //   });
});

router.get('/getsuggestion', async (req, res) => {
    if (!req.cookies.cookie){
      return res.render('noAccountWarning');
    } else {

    // Function to update ingredients quantities after expiration date
    update_ingredients_after_expiration =  (dishes, ingredients) => {
      const currentDate = new Date();
      
      dishes.forEach(dish => {
        const expirationDate = new Date(dish.expiration_date);
        
        if (expirationDate < currentDate) {
          dish.ingredients.forEach(ingredient => {
              ingredients[ingredient] = Math.max(ingredients[ingredient] - 1, 0); // Ensure no negative values
           
          });
        }
      });
      
      return ingredients;
    }

    get_expired_foods = async (dishes) => {
      const currentDate = new Date();
      expiredfood = []
      dishes.forEach(dish => {
        const expirationDate = new Date(dish.expiration_date);
        cond = dish.isexpired
        //console.log(cond)
        //console.log(dish)
        if (expirationDate < currentDate && !dish["isexpired"]) {
          //console.log(!(dish.isexpired === false))
          //console.log(dish)
          dish["isexpired"] = true;
          expiredfood.push(dish)
          
        }});
      return expiredfood;
    }
    get_dishes_with_available_ingredients = async (dishes, ingredients) =>{
      return dishes.filter(dish => 
        dish.ingredients.every(ingredient => 
          ingredients[ingredient] > 0
        )
      );
    }
      inventory_data = await handle_inventory.readInventory(inventory_json_filepath);
      ingredients_data = await handle_db.readJsonData(ingredients_json_filepath);
      console.log("ing_data: "+JSON.stringify(ingredients_data));
      expired_dishes =   get_expired_foods(inventory_data)
      updated_ingredents =  update_ingredients_after_expiration(expiredfood, ingredients_data);
      console.log("---"+JSON.stringify( updated_ingredents))

      if (Object.keys(updated_ingredents).length > 0){
        //console.log(avaliable_dishes)
        const jsonData = JSON.stringify(updated_ingredents, null, 2);
        // Write the JSON data to the file, overwriting existing content
        fs.writeFile(ingredients_json_filepath, jsonData, (err) => {
          if (err) {
            console.error('Error writing to file', err);
          } else {
            console.log('Data successfully written to file');
          }
        });
      } 
      
      //console.log("--: "+ JSON.stringify(expired_dishes))
      const avaliable_dishes =  await get_dishes_with_available_ingredients(inventory_data, updated_ingredents)

      
      //console.log("DEBUG: "+n)
      //console.log("ingredients: "+status)
      //console.log(avaliable_dishes)
      function  calculateAverage(rates) {
        //console.log(rates.length);
        if (rates.length == 0) return 0;
        return rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
      }
      avaliable_dishes.forEach(dish => {
        dish.average_rating = calculateAverage(dish.rate);
      });
      console.log("==="+avaliable_dishes)
      return res.render('foods',{title:"List of all Foods from remaiing ingredients" ,inventory: avaliable_dishes});
    }
  });

router.post('/dish/:id/comment', async (req, res) => {
  if (!req.cookies.cookie){
    return res.render('noAccountWarning');
  } else {
    const {comment} = req.body;
    inventory_data = await handle_inventory.readInventory(inventory_json_filepath);
    foodid = req.params.id;
    for (let index = 0; index < inventory_data.length; index++) {
      const i_elem = inventory_data[index];
      if(i_elem.foodid == req.params.id){
        user_pf = await handle_users.getUserProfileByCookie(users_json_filepath,req.cookies.cookie);
        user_name = JSON.stringify(user_pf["name"])
        inventory_data[index]['comments'].push({"author_name":user_name,"comment":req.body.comment})
      } 
      
    }
    handle_db.writeJsonData(inventory_json_filepath, inventory_data)
    res.redirect("/foods/dish/"+foodid)

    //console.log(req.body)
    //console.log(idish.dist_name);
    //res.render('dishview',{dish:idish});
  }
});


router.post('/rate', async (req, res) => {
  const {dist_name, rating} = req.body;
  inventory_data = await handle_inventory.readInventory(inventory_json_filepath);
  //console.log(`${dist_name}` +" : "+`${rating}`);
  if (!req.cookies.cookie){
    return res.render('noAccountWarning');
  }
  for (let idx = 0; idx < inventory_data.length ; idx++) {
    //const item = array[idx];
    //console.log(inventory_data[idx]['dist_name']);
    if(inventory_data[idx]['dist_name'] == `${dist_name}`){
      inventory_data[idx]['rate'].push(parseInt(`${rating}`));
      console.log(inventory_data[idx]);
    }
  }
  handle_db.writeJsonData(inventory_json_filepath, inventory_data);
  res.redirect('/foods')

});

router.post('/addDish', async (req, res) => {
  inventory_data = await handle_inventory.readInventory(inventory_json_filepath);
  num_of_dishes = inventory_data.length;
  const { dist_name, ingredients, difficulty_cooking, quality, expiration_date, quantity, storage_location } = req.body;
  const newDish = {
    "foodid":(num_of_dishes+1),
    "dist_name" :dist_name,
    ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
    difficulty_cooking: Number(difficulty_cooking),
    quality: Number(quality),
    expiration_date,
    quantity: Number(quantity),
    storage_location,
    rate: [],
    average_rate: 0,
    comments:[]
  };
  inventory_data.push(newDish);
  console.log(inventory_data);
  handle_db.writeJsonData(inventory_json_filepath, inventory_data);
  res.redirect('/foods');
});


module.exports = router;
