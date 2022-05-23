////////////////////////////////////////////
//
// dbpool.js
// Author: Brian M
//
///////////////////////////////////////////

const { Pool } = require('pg');
const config = require('../configs');
const pool = new Pool(config.db);


module.exports = {
  pool
}
