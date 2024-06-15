
const handle_db = require('./handle_db')
const path = require('path')
const fs = require('fs');
const { Console } = require('console');

__getIdAndCookiesFromLogin = async (filename,username, passwd) => {

    data = await handle_db.readJsonData(filename);
    for (var user_idx = 0; user_idx < data.length; user_idx++) {
        user_info = Object.entries(data[user_idx]);
        if(username == user_info[0][1]['username'] && passwd == user_info[0][1]['password']){
            return [user_info[0][0],user_info[0][1]['cookie']];
        } else if (username == user_info[0][1]['username']){
            return 1
        } 
        //console.log(Object.entries(data[user_idx])[0][1]['password']);
        
    }
    return -1
}

__getCookieFromId = async (filename, id ) => {
    users_data = await handle_db.readJsonData(filename)  //readJsonData(filename);

    for (let user_idx = 0; user_idx < users_data.length; user_idx++) {
        user_info = Object.entries(users_data[user_idx]);

        if (id == user_info[0][0]){
            return user_info[0][1]['cookie'];
        }
    }

    return -1;

}

/**
 * adds user data to filename .json file
 * and the @userdata must be in this format:
 * {
 *   "NNN": {
 *      "username":username,
 *      "password":password,
 *      "cookie":`random`,
 *      "name":"Full Name",
 *      "age":int,
 *      "weight": int,
 *      "allergies":[ List<string>]
 *    }
 * }
 */
addUserProfile = async (filename, userdata) => {
    data = await handle_db.readJsonData(filename);
    data.push(
        userdata
    );

    await handle_db.writeJsonData(filename ,data);

}

getUserProfileById = async (filename,id) => {
    users_data = await handle_db.readJsonData(filename)  //readJsonData(filename);

    for (let user_idx = 0; user_idx < users_data.length; user_idx++) {
        ist_user_data = users_data[user_idx];
        user_info = Object.entries(ist_user_data);

        if (id == user_info[0][0]){
            return ist_user_data;
        }
    }

    return -1;
}

getUserProfileByCookie = async (filename, ist_cookie) => {
    data = await handle_db.readJsonData(filename);
    for (var user_idx = 0; user_idx < data.length; user_idx++) {
        user_info = Object.entries(data[user_idx]);
        if(ist_cookie == user_info[0][1]['cookie']){
            return user_info[0][1];
        } 
        //console.log(Object.entries(data[user_idx])[0][1]['password']);
    }
    return -1
}

getTotalUsers = async (filename) => {
    data = await handle_db.readJsonData(filename);
    //console.log(data.length);
    return data.length;
}

module.exports = {
     getUserProfileById,
     addUserProfile,
     getUserProfileByCookie,
     __getIdAndCookiesFromLogin,
     getTotalUsers
}

// main = async () => {

//     this.getTotalUsers()
// }

// main = async () => {
//     
//     //console.log(user_json_file);
//     users_data = await handle_db.readJsonData(user_json_file);
//     //console.log(users_data)
//     //console.log(users_data.length.toString().padStart(3,'0'));
//     //console.log(await __getIdAndCookiesFromLogin(users_data,"laiba","laiba"));
//     cookie = await __getCookieFromId(user_json_file,'003');
//     //console.log(cookie);
//     // addUserProfile(user_json_file, 
//     //     {
//     //         "005":{
//     //             "username":"laiba",
//     //             "password":"laiba",
//     //             "cookie":"l1l2k2",
//     //             "age":17,
//     //             "weight":67,
//     //             "allergies":["milk"]
//     //         }
//     //     }
//     // );
//     user1 = await getUserProfileById(user_json_file,"004");
//     console.log(user1);
// }

// main = async () =>{
//     user_json_file = './db/users.json';
//     console.log(await getTotalUsers(user_json_file))
//     //console.log(await getUserProfileByCookie(user_json_file,'a1a1a2'))
// }

// main()