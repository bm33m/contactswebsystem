////////////////////////////////////////////
//
// adminapp.js
// Author: Brian M
//
///////////////////////////////////////////

const db = require('../services/dbpool');
const dbvalid = require('../services/dbvalidators');
let pd = 0;

let registerContacts = async (data, ref, res) =>{
  try {
    //let sqlString1 = 'INSERT INTO users (name, surname) VALUES ($1, $2)';
    //let sqlValues1 = [data.firstname, data.surname];
    pd += 1;
    let username = await dbvalid.checkData(data.username);
    let password = await dbvalid.checkData(data.password);
    let hashPassword = await dbvalid.db3hashData(username+"+"+password);
    let contactsUUID = dbvalid.contactsUUID(ref);
    let contacts = [{
      name: await dbvalid.checkData(data.firstname),
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
    console.log("Register name: "+contacts[0].name);
    let sqlString = 'INSERT INTO usersdb (name, surname, username, password, contacts_identifier, email, home_number, cell_number, title, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    let sqlValues = [contacts[0].name, contacts[0].surname, contacts[0].username, contacts[0].password, contacts[0].contacts_identifier, contacts[0].email, contacts[0].home_number, contacts[0].cell_number, contacts[0].title, contacts[0].description];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(" postContactsDb dberror: "+err);
        //return err;
        res.render('pages/register', {chattime: dbvalid.dbTime(), pd: pd,
        chattoken1: dbvalid.chatid(), chattoken2: dbvalid.chatid(),
        results: err, message: err+", "+pd,
        contacts: contacts[0]});
        //res.render('pages/register', {name: data.name, chattoken: dbvalid.chatid(),
        //chatsid: dbvalid.chatid(), results: err});
      } else {
        console.log(results["rows"]);
        //return results["rowCount"];
        processContacts(contacts);
        res.render('pages/register', {chattime: dbvalid.dbTime(), pd: pd,
        chattoken1: dbvalid.chatid(), chattoken2: dbvalid.chatid(),
        results: results["rows"], message: "username: "+username+", registerd, "+pd,
        contacts: []});
        //res.render('pages/register', {name: data.name, chattoken: dbvalid.chatid(),
        //chatsid: dbvalid.chatid(), results: results["rowCount"]});
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("postContactsDb...done.");
  }
}

const processContacts = async (contacts) => {
  console.log("processContacts: "+contacts[0].username);
  try {
    let sqlString = 'SELECT userid FROM usersdb WHERE username = $1';
    let sqlValues = [contacts[0].username];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(" processContacts dberror: ", err);
        return err;
      } else {
        let resultsRows = results["rows"];
        let resultsLength = results["rows"].length;
        let userid = resultsRows[0]["userid"];
        console.log("processContacts: "+resultsRows+"\n resultsLength: "+resultsLength+" \n userid: "+userid);
        if (resultsLength > 0) {
          postUsers(contacts, userid);
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

let postUsers = (contacts, userid) => {
  try {
    let sqlString = 'INSERT INTO users (name, surname, userid) VALUES ($1, $2, $3)';
    let sqlValues = [contacts[0].name, contacts[0].surname, userid];
    //let sqlString2 = 'INSERT INTO usersdb (name, surname, username, password, contacts_identifier, email, home_number, cell_number, title, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    //let sqlValues2 = [data.name, data.surname, data.username, password, contactsuuid, data.email, data.home_number, data.cell_number, data.title, data.description];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(" postUsers dberror: "+err);
        return err;
      } else {
        console.log("postUsers: "+results["rows"]);
        postLoginUsers(contacts, userid);
        postContacts(contacts, userid);
        postNotes(contacts, userid);
        return results["rows"];
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("postUsers...done.");
  }
}

let postLoginUsers = (contacts, userid) =>{
  try {
    let sqlString = 'INSERT INTO loginusers (userid, username, password) VALUES ($1, $2, $3)';
    let sqlValues = [userid, contacts[0].username, contacts[0].password];
    //let sqlString2 = 'INSERT INTO usersdb (name, surname, username, password, contacts_identifier, email, home_number, cell_number, title, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    //let sqlValues2 = [data.name, data.surname, data.username, password, contactsuuid, data.email, data.home_number, data.cell_number, data.title, data.description];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(" postLoginUsers dberror: "+err);
        return err;
      } else {
        console.log("postLoginUsers: "+results["rows"]);
        return results["rows"];
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("postLoginUsers...done.");
  }
}

let postContacts = (contacts, userid) =>{
  try {
    let sqlString = 'INSERT INTO contacts (userid, contacts_identifier, email, home_number, cell_number) VALUES ($1, $2, $3, $4, $5)';
    let sqlValues = [userid, contacts[0].contacts_identifier, contacts[0].email, contacts[0].home_number, contacts[0].cell_number];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(" postContacts dberror: "+err);
        return err;
      } else {
        console.log("postContacts: "+results["rows"]);
        return results["rows"];
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("postContacts...done.");
  }
}

let postNotes = (contacts, userid) =>{
  try {
    let sqlString = 'INSERT INTO notes (userid, title, description) VALUES ($1, $2, $3)';
    let sqlValues = [userid, contacts[0].title, contacts[0].description];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(" postNotes dberror: "+err);
        return err;
      } else {
        console.log("postNotes: "+results["rows"]);
        return results["rows"];
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("postNotes...done.");
  }
}

//const loginUsers = async (req, res) => {};
const loginUsers = async (data, records, hashPassword, res, pd=0) => {
  console.log("loginUsers : "+data.username);
  try {
    //let sqlString1 = 'SELECT * FROM loginusers WHERE username = $1 AND password = $2';
    let sqlString = 'SELECT a.userid, a.username, b.name, b.surname, c.email, c.cell_number, d.title, d.description FROM loginusers a, users b, contacts c, notes d  WHERE a.username = $1 AND a.password = $2 AND b.userid = a.userid AND c.userid = a.userid AND d.userid = a.userid';
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
        let message = "Login: \n"+data.username+"\n"+resultsLength;
        console.log("login:  "+dblogin2+"\n"+message);
        //return results["rows"];
        if (resultsLength > 0) {
        message = "Welcome back: \n"+resultsRows[0]['name']+"\n"+resultsLength;
        res.render('pages/admin', {chattime: dbvalid.dbTime(), pd: pd,
        chattoken1: dbvalid.chatid(), chattoken2: dbvalid.chatid(),
        userid: resultsRows[0]['userid'],
        records: records,
        message: message,
        contacts: resultsRows[0] });
        } else {
          res.render('pages/login', {chattime: dbvalid.dbTime(), pd: pd,
          chattoken1: dbvalid.chatid(), chattoken2: dbvalid.chatid(),
          message: message, results: resultsRows});
        }
      }
    });
  } catch (e) {
    console.log("# loginUsers e: ", e);
  } finally {
    console.log("#06 loginUsers Done: ");
  }
  console.log("### 07 ### loginUsers Done: ###");
};

module.exports = {
  registerContacts,
  loginUsers
}
