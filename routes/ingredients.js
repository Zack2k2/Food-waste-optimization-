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




router.get('/', async (req, res) => {
    ingredients = await handle_db.readJsonData(ingredients_json_filepath);

    res.render('ingredients', { ingredients });
 });
  
// Route to handle ingredient modifications
router.post('/', async (req, res) => {

    const { ingredient, action, quantity, newIngredient, newQuantity } = req.body;
    var ingredients = await handle_db.readJsonData(ingredients_json_filepath);

    const qty = parseInt(quantity, 10);
    const newQty = parseInt(newQuantity, 10);
    if (newIngredient){
        ingredients[newIngredient] = newQty;
    } else if (ingredients.hasOwnProperty(ingredient)) {
        if (action === 'add') {
            ingredients[ingredient] += qty;
        } else if (action === 'subtract') {
            ingredients[ingredient] = Math.max(0, ingredients[ingredient] - qty);
        }
    }
    const jsonData = JSON.stringify(ingredients, null, 2);
    // Write the JSON data to the file, overwriting existing content
    fs.writeFile(ingredients_json_filepath, jsonData, (err) => {
        if (err) {
             console.error('Error writing to file', err);
        } else {
            console.log('Data successfully written to file');
        }
    });
    res.redirect('/ingredients');
});




module.exports = router;
