////////////////////////////////////////////
//
// deletecontacts.js
// Author: Brian M
//
///////////////////////////////////////////

const db = require('../services/dbpool');
const dbvalid = require('../services/dbvalidators');

let softDelete = async (data, records, res, pd=0) =>{
  try {
    let userid = await dbvalid.checkData(data.deleteuserid);
    let message = "softDelete in progress..."+dbvalid.dbDateTime();
    let sqlString = 'SELECT COUNT(soft_deleted) as soft_deleted, COUNT(userid) as contacts, max(created) as date_created  FROM users WHERE soft_deleted = $1';
    let sqlValues = ['true'];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log("softDelete dberror: "+err);
        //return err;
        res.render('pages/admin', {chattime: dbvalid.dbTime(), pd: pd,
        chattoken1: dbvalid.chatid(), chattoken2: dbvalid.chatid(),
        userid: userid,
        records: records, message: err,
        contacts: [] });
      } else {
        console.log(results["rows"]);
        records = results["rows"];
        if(userid != null) {
          deleteLogin(userid);
          deleteContacts(userid);
          deleteNotes(userid);
          softDeleteUsers(userid);
        } else {
          message = "softDelete data error try again later..."+dbvalid.dbDateTime();
        }
        res.render('pages/admin', {chattime: dbvalid.dbTime(), pd: pd,
        chattoken1: dbvalid.chatid(), chattoken2: dbvalid.chatid(),
        userid: userid,
        records: records, message: message,
        contacts: [] });
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("softDelete...done.");
  }
}

let deleteLogin = async (userid) =>{
  try {
    let useridx = await dbvalid.checkData(userid);
    let sqlString = 'DELETE from loginusers where userid = $1';
    let sqlValues = [useridx];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log("deleteLoginusers dberror: "+err);
        return err;
      } else {
        console.log("deleteLoginusers: "+results["rows"]);
        return results["rows"];
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("deleteLoginusers...done.");
  }
}

let deleteContacts = async (userid) =>{
  try {
    let useridx = await dbvalid.checkData(userid);
    let sqlString = 'DELETE from contacts where userid = $1';
    let sqlValues = [useridx];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log("deleteContacts dberror: "+err);
        return err;
      } else {
        console.log("deleteContacts: "+results["rows"]);
        return results["rows"];
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("deleteContacts...done.");
  }
}

let deleteNotes = async (userid) =>{
  try {
    let useridx = await dbvalid.checkData(userid);
    let sqlString = 'DELETE from notes where userid = $1';
    let sqlValues = [useridx];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log("deleteNotes dberror: "+err);
        return err;
      } else {
        console.log("deleteNotes: "+results["rows"]);
        return results["rows"];
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("deleteNotes...done.");
  }
}

let softDeleteUsers = async (userid) =>{
  try {
    let useridx = await dbvalid.checkData(userid);
    let sqlString = 'UPDATE users SET soft_deleted = $1, modified = CURRENT_TIMESTAMP WHERE userid = $2';
    let sqlValues = ['true', useridx];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log("softDeleteUsers dberror: "+err);
        return err;
      } else {
        console.log(results["rows"]);
        softDeleteUsersdb(useridx);
        return results["rows"];
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("softDeleteUsers...done.");
  }
}

let softDeleteUsersdb = async (userid) =>{
  try {
    let useridx = await dbvalid.checkData(userid);
    let sqlString = 'UPDATE usersdb SET soft_deleted = $1, modified = CURRENT_TIMESTAMP WHERE userid = $2';
    let sqlValues = ['true', useridx];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log("softDeleteUsersdb dberror: "+err);
        return err;
      } else {
        console.log(results["rows"]);
        return results["rows"];
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("softDeleteUsersdb...done.");
  }
}

let deleteData = async (data, records, res, pd=0) =>{
  try {
    //let userid0 = await dbvalid.checkData(data.userid);
    let userid = '';
    let message = "deleteData in progress..."+dbvalid.dbDateTime();
    let sqlString = 'SELECT COUNT(soft_deleted) as soft_deleted, COUNT(userid) as contacts, max(created) as date_created  FROM users WHERE soft_deleted = $1';
    let sqlValues = ['true'];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log("deleteData dberror: "+err);
        //return err;
        res.render('pages/admin', {chattime: dbvalid.dbTime(), pd: pd,
        chattoken1: dbvalid.chatid(), chattoken2: dbvalid.chatid(),
        userid: userid,
        records: records, message: err,
        contacts: [] });
      } else {
        let resultsLength = results["rows"].length;
        console.log("deleteData: "+resultsLength+"\n results: "+results["rows"]);
        records = results["rows"];
        if(resultsLength > 0) {
          message = "deleteData in progress... records: "+resultsLength+", "+dbvalid.dbDateTime();
          deleteUsers();
        } else {
          message = "Delete data: "+resultsLength+" try again later..."+dbvalid.dbDateTime();
        }
        res.render('pages/admin', {chattime: dbvalid.dbTime(), pd: pd,
        chattoken1: dbvalid.chatid(), chattoken2: dbvalid.chatid(),
        userid: userid,
        records: records, message: message,
        contacts: [] });
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("deleteData...done.");
  }
}

let deleteUsers = async () =>{
  try {
    let sqlString = 'DELETE from users where soft_deleted = $1';
    let sqlValues = ['true'];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log("deleteUsers dberror: "+err);
        return err;
      } else {
        console.log("deleteUsers: "+results["rows"]);
        deleteUsersdb();
        return results["rows"];
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("deleteUsers...done.");
  }
}

let deleteUsersdb = async () =>{
  try {
    let sqlString = 'DELETE from usersdb where soft_deleted = $1';
    let sqlValues = ['true'];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log("deleteUsersdb dberror: "+err);
        return err;
      } else {
        console.log("deleteUsersdb: "+results["rows"]);
        return results["rows"];
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("deleteUsersdb...done.");
  }
}

module.exports = {
  softDelete,
  deleteData
}
