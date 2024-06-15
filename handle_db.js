const jsonfile = require('jsonfile')
const fs = require('fs')
const path = require('path')



const err_file = 'error_file.log'
const logFilePath = path.join(__dirname, 'error_file.log');


/**
 * Logs Errors into file
 * @param {L} error 
 */
const logErrorToFile = (error) => {
    const errorMessage = `[${new Date().toISOString()}] ${error.stack || error}\n`;
    
    // Append the error message to the log file
    fs.appendFile(logFilePath, errorMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
};

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
        await jsonfile.writeFile(filename, newdata, {spaces: 2}, (err) => {
            if(err){
                console.log(err)
                logErrorToFile(err);
            }
    });
}

module.exports = {
    logErrorToFile,
    readJsonData,
    writeJsonData
}