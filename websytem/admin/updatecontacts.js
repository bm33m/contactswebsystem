////////////////////////////////////////////
//
// updatecontacts.js
// Author: Brian M
//
///////////////////////////////////////////

const db = require('../services/dbpool');
const dbvalid = require('../services/dbvalidators');

let updateData = async (data, records, res, ref, pd=0) =>{
  try {
    let username = await dbvalid.checkData(data.username);
    let password = await dbvalid.checkData(data.password);
    let hashPassword = await dbvalid.db3hashData(username+"+"+password);
    let contactsUUID = dbvalid.contactsUUID(ref);
    let message = "updating Data in progress..."+dbvalid.dbDateTime();
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
      userid: await dbvalid.checkData(data.userid)
    }];
    let sqlString = 'SELECT COUNT(soft_deleted) as soft_deleted, COUNT(userid) as contacts, max(created) as date_created  FROM users';
    let sqlValues = [];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log("updateData dberror: "+err);
        //return err;
        res.render('pages/admin', {chattime: dbvalid.dbTime(), pd: pd,
        chattoken1: dbvalid.chatid(), chattoken2: dbvalid.chatid(),
        userid: contacts[0]["userid"],
        records: records, message: err,
        contacts: contacts[0] });
      } else {
        console.log("updateData: "+results["rowCount"]);
        records = results["rows"];
        if ((contacts[0]['userid'] != null) & (contacts[0]['name'] != null) & (contacts[0]['surname'] != null)) {
          updateUsers(contacts);
          if ((contacts[0]['username'] != null) & (password != null)){
            updateLogin(contacts);
          }
          if((contacts[0]['email'] != null) & (contacts[0]['home_number'] != null) & (contacts[0]['cell_number'] != null)){
            updateContacts(contacts);
          }
          if ((contacts[0]['title'] != null) & (contacts[0]['description'] != null)){
            updateNotes(contacts);
          }
        } else {
          message = "updating Data in data error try again later..."+dbvalid.dbDateTime();
        }
        res.render('pages/admin', {chattime: dbvalid.dbTime(), pd: pd,
        chattoken1: dbvalid.chatid(), chattoken2: dbvalid.chatid(),
        userid: contacts[0]["userid"],
        records: records, message: message,
        contacts: contacts[0] });
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("updateData...done.");
  }
}

let updateUsers = async (contacts) =>{
  try {
    //let sqlString = 'UPDATE users SET name = $1, surname = $2, modified = $3 WHERE userid = $4';
    //let sqlValues = [contacts[0].name, contacts[0].surname, dbvalid.dbDateTime(), contacts[0].userid];
    let sqlString = 'UPDATE users SET name = $1, surname = $2, modified = CURRENT_TIMESTAMP WHERE userid = $3';
    let sqlValues = [contacts[0].name, contacts[0].surname, contacts[0].userid];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log("updateUsers dberror: "+err);
        return err;
      } else {
        console.log(results["rows"]);
        return results["rows"];
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("updateUsers...done.");
  }
}

let updateLoginUsers = async (contacts) =>{
  try {
    let sqlString = 'UPDATE loginusers SET username = $1, password = $2, modified = CURRENT_TIMESTAMP WHERE userid = $3';
    let sqlValues = [contacts[0].username, contacts[0].password, contacts[0].userid];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log("updateLoginUsers dberror: "+err);
        return err;
      } else {
        console.log(results["rows"]);
        return results["rows"];
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("updateUsers...done.");
  }
}

let updateContacts = async (contacts) =>{
  try {
    let sqlString = 'UPDATE contacts SET email = $1, home_number = $2, cell_number = $3, modified = CURRENT_TIMESTAMP WHERE userid = $4';
    let sqlValues = [contacts[0].email, contacts[0].home_number, contacts[0].cell_number, contacts[0].userid];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log("updateContacts dberror: "+err);
        return err;
      } else {
        console.log("updateContacts: "+results["rows"]);
        return results["rows"];
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("updateContacts...done.");
  }
}

let updateNotes = async (contacts) =>{
  try {
    let sqlString = 'UPDATE notes SET title = $1, description = $2, modified = CURRENT_TIMESTAMP WHERE userid = $3';
    let sqlValues = [contacts[0].title, contacts[0].description, contacts[0].userid];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log("updateNotes dberror: "+err);
        return err;
      } else {
        console.log("updateNotes: "+results["rows"]);
        return results["rows"];
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("updateNotes...done.");
  }
}

module.exports = {
  updateData
}
