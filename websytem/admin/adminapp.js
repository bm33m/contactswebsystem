////////////////////////////////////////////
//
// adminapp.js
// Author: Brian M
//
///////////////////////////////////////////

const db = require('../services/dbpool');
const dbvalid = require('../services/dbvalidators');


let registerContacts = async (data, ref, res) =>{
  try {
    //let sqlString1 = 'INSERT INTO users (name, surname) VALUES ($1, $2)';
    //let sqlValues1 = [data.name, data.surname];
    let username = await dbvalid.checkData(data.username);
    let password = await dbvalid.checkData(data.password);
    let hashPassword = await dbvalid.db3hashData(username+"+"+password);
    let contactsUUID = dbvalid.contactsUUID(ref);
    let contacts = [{
      name: await dbvalid.checkData(data.name),
      surname: await dbvalid.checkData(data.surname),
      username: username,
      password: hashPassword,
      contacts_identifier: contactsUUID,
      email: await dbvalid.checkData(data.email),
      cell_number: await dbvalid.checkData(data.cell_number),
      home_number: await dbvalid.checkData(data.home_number),
      title: await dbvalid.checkData(data.title),
      description: await dbvalid.checkData(data.description),
      user_id: ref
    }];
    let sqlString1 = 'INSERT INTO usersdb (name, surname, username, password, contacts_identifier, email, home_number, cell_number, title, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    let sqlValues = [contacts[0].name, contacts[0].surname, contacts[0].username, contacts[0].password, contacts[0].contacts_identifier, contacts[0].email, contacts[0].home_number, contacts[0].cell_number, contacts[0].title, contacts[0].description];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(" postContactsDb dberror: "+err);
        //return err;
        res.render('pages/register', {name: data.name, chattoken: dbvalid.chatid(),
        chatsid: dbvalid.chatid(), results: err});
      } else {
        console.log(results["rowCount"]);
        //return results["rowCount"];
        processContacts(data, contactsuuid, password);
        res.render('pages/register', {name: data.name, chattoken: dbvalid.chatid(),
        chatsid: dbvalid.chatid(), results: results["rowCount"]});
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("postContactsDb...done.");
  }
}

let postUsers = (data, userid) =>{
  try {
    let sqlString = 'INSERT INTO users (name, surname, userid) VALUES ($1, $2, $3)';
    let sqlValues = [data.name, data.surname, userid];
    //let sqlString2 = 'INSERT INTO usersdb (name, surname, username, password, contacts_identifier, email, home_number, cell_number, title, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    //let sqlValues2 = [data.name, data.surname, data.username, password, contactsuuid, data.email, data.home_number, data.cell_number, data.title, data.description];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(" postUsers dberror: "+err);
        return err;
      } else {
        console.log(results["rowCount"]);
        return results["rowCount"];
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("postUsers...done.");
  }
}

let postLoginUsers = (data, userid, hashPassword) =>{
  try {
    let sqlString = 'INSERT INTO loginusers (userid, username, password) VALUES ($1, $2, $3)';
    let sqlValues = [userid, data.username, password];
    //let sqlString2 = 'INSERT INTO usersdb (name, surname, username, password, contacts_identifier, email, home_number, cell_number, title, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    //let sqlValues2 = [data.name, data.surname, data.username, password, contactsuuid, data.email, data.home_number, data.cell_number, data.title, data.description];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(" postLoginUsers dberror: "+err);
        return err;
      } else {
        console.log(results["rowCount"]);
        return results["rowCount"];
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("postLoginUsers...done.");
  }
}

let postContacts = (data, userid, contacts_identifier) =>{
  try {
    let sqlString = 'INSERT INTO contacts (userid, contacts_identifier, email, home_number, cell_number) VALUES ($1, $2, $3, $4, $5)';
    let sqlValues = [userid, contacts_identifier, data.email, data.home_number, data.cell_number];
    //let sqlString2 = 'INSERT INTO usersdb (name, surname, username, password, contacts_identifier, email, home_number, cell_number, title, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    //let sqlValues2 = [data.name, data.surname, data.username, password, contactsuuid, data.email, data.home_number, data.cell_number, data.title, data.description];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(" postContacts dberror: "+err);
        return err;
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

let postNotes = (data, userid) =>{
  try {
    let sqlString = 'INSERT INTO notes (userid, title, description) VALUES ($1, $2, $3)';
    let sqlValues = [userid, data.title, data.description];
    //let sqlString2 = 'INSERT INTO usersdb (name, surname, username, password, contacts_identifier, email, home_number, cell_number, title, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    //let sqlValues2 = [data.name, data.surname, data.username, password, contactsuuid, data.email, data.home_number, data.cell_number, data.title, data.description];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(" postUsers dberror: "+err);
        return err;
      } else {
        console.log(results["rowCount"]);
        return results["rowCount"];
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("postUsers...done.");
  }
}

//const loginUsers = async (req, res) => {};
const loginUsers = async (data, hashPassword, res, pd=0) => {
  console.log("loginUsers : "+data.username);
  try {
    let sqlString = 'SELECT userid FROM loginusers WHERE username = $1 AND password = $2';
    let sqlValues = [data.username, hashPassword];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(" loginUsers dberror: ", err);
        //return err;
        res.render('pages/login', {chattime: dbvalid.dbTime(), pd: pd,
        chattoken1: dbvalid.chatid(), chattoken2: dbvalid.chatid(),
        message: pd, results: err});
      } else {
        let resultsRows = results["rows"];
        let resultsLength = results["rows"].length;
        let dblogin2 = (resultsLength > 0) ? 1 : 0;
        let subject = "#Login: "+dblogin2
        let message = "<h1>"+subject+"</h1>\n"+resultsRows+"\n"+resultsLength;
        console.log(message);
        //return results["rows"];
        res.render('pages/login', {chattime: dbvalid.dbTime(), pd: pd,
        chattoken1: dbvalid.chatid(), chattoken2: dbvalid.chatid(),
        message: message, results: resultsRows});
      }
    });
  } catch (e) {
    console.log("# loginUsers e: ", e);
  } finally {
    console.log("#06 loginUsers Done: ");
  }
  console.log("### 07 ### loginUsers Done: ###");
};

const processContacts = async (data, contacts_identifier, hashPassword) => {
  console.log("getUserID : "+data.username);
  try {
    let sqlString = 'SELECT userid FROM usersdb WHERE contacts_identifier = $1';
    let sqlValues = [contacts_identifier];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(" getUserID dberror: ", err);
        return err;
      } else {
        let resultsRows = results["rows"];
        let resultsLength = results["rows"].length;
        let userid = results["rows"][0]["userid"];
        let dblogin2 = (resultsLength > 0) ? 1 : 0;
        let subject = "#getUserID: "+dblogin2+", userid: "+userid;
        let message = "<h1>"+subject+"</h1>\n"+resultsRows+"\n"+resultsLength;
        console.log(message);
        if (resultsLength > 0) {
          postLoginUsers(data, userid, hashPassword);
          postContacts(data, userid, contacts_identifier);
          postNotes(data, userid);
        }
        return results["rows"];
      }
    });
  } catch (e) {
    console.log("# processContacts : ", e);
  } finally {
    console.log("#06 processContacts Done: ");
  }
  console.log("### 07 ### processContacts Done: ###");
};

module.exports = {
  registerContacts,
  loginUsers
}
