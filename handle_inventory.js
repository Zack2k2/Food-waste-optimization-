const handle_db = require('./handle_db')
const path = require('path')
const fs = require('fs');



readInventory = async (filename) => {
    data = await handle_db.readJsonData(filename);
    
    return data;
}

writeDishInventory = async(filename, new_dish_dict) => {
    data = await handle_db.readJsonData(filename);
    data.push(
        new_dish_dict
    );
    handle_db.writeJsonData(filename, data);
}

module.exports = {
    readInventory,
    writeDishInventory
}