const jsonfile = require('jsonfile')
const fs = require('fs')
const path = require('path')


/**
 * Reads a .json file and returns JSON object.
 */
readJsonData = async (filename) => {
    try {
        let data = await jsonfile.readFile(filename);
        //console.log(data);
        //throw MediaError;
        return data;

    } catch (error) {
        logErrorToFile(error);
        return -1;
    }
}


/**
 * Writes json data
 */
writeJsonData = async (filename, newdata) => {
        jsonfile.writeFile(filename, newdata, {spaces: 2}, (err) => {
            if(err){
                logErrorToFile(err);
            }
    });
}

get_expired_ingridents = async (filename) => {
    const path = "/home/plank/webapps/backends/express_projects/food_waste_management_system/db/inventory.json"        
    inventory_data =  await readJsonData(path)
    today = new Date(Date.now())
    
    for(let idx = 0; idx < inventory_data.length; idx++){
        if (today > new Date(inventory_data[idx].expiration_date)){
            inventory_data[idx]["isexpired"]= true;
           console.log(inventory_data[idx]);
        }
    }
}

main = async () => {
    path = "/home/plank/webapps/backends/express_projects/food_waste_management_system/db/inventory.json"        
    inventory_data = readJsonData(path)

    for(let idx = 0; idx < inventory_data.length; idx++){
        
    }
}

get_expired_ingridents("")
//main()
