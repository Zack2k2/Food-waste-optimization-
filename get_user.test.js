const handle_db = require('./handle_db')
const handle_users = require('./handle_users')
const path = require('path')
const fs = require('fs')
/**
 * UNIT TEST TO VERIFY LOGIN FUNCTION.
 * it should return a list with id number and cookie.
 */
import { describe, test, it, expect } from 'vitest'
it("should return id and cookie of an account i manually created"), 
    async () => {
    expect( await handle_users.__getIdAndCookiesFromLogin("./db/users.json","Satrun","system"))
        .toBe(["009","fzhlogccl4b"])
}

