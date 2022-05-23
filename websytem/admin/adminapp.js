////////////////////////////////////////////
//
// admin.js
// Author: Brian M
//
///////////////////////////////////////////

const db = require('../services/dbpool');

let postContacts = (data, password, contactsuuid) =>{
  try {
    //let sqlString1 = 'INSERT INTO users (name, surname) VALUES ($1, $2)';
    //let sqlValues1 = [data.name, data.surname];
    let sqlString1 = 'INSERT INTO usersdb (name, surname, username, password, contacts_identifier, email, home_number, cell_number, title, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    let sqlValues = [data.name, data.surname, data.username, password, contactsuuid, data.email, data.home_number, data.cell_number, data.title, data.description];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(" postUsers dberror: "+err);
      } else {
        console.log(results["rowCount"]);
        return results["rowCount"];
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("postContacts...done.");
  }
}

module.exports = {
  postContacts
}
