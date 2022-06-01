////////////////////////////////////////////
//
// filtercontacts.js
// Author: Brian M
//
///////////////////////////////////////////

const db = require('../services/dbpool');
const dbvalid = require('../services/dbvalidators');

const filterContacts = async (data, res) => {
  console.log("filterContacts : "+data.type);
  try {
    let searchContacts = data.searchcontacts;
    let searchtype = data.searchtype;
    let sqlString = 'SELECT a.userid, a.name, a.surname, b.email, b.cell_number, c.title, c.description FROM users a, contacts b, notes c WHERE a.userid = $1 AND b.userid = a.userid AND c.userid = a.userid';
    if (searchtype == 'name'){
      sqlString = 'SELECT a.userid, a.name, a.surname, b.email, b.cell_number, c.title, c.description FROM users a, contacts b, notes c WHERE a.name = $1 AND b.userid = a.userid AND c.userid = a.userid';
    } else
    if (data.searchtype == 'surname'){
      sqlString = 'SELECT a.userid, a.name, a.surname, b.email, b.cell_number, c.title, c.description FROM users a, contacts b, notes c WHERE a.surname = $1 AND b.userid = a.userid AND c.userid = a.userid';
    } else
    if (data.searchtype == 'email'){
      sqlString = 'SELECT a.userid, a.name, a.surname, b.email, b.cell_number, c.title, c.description FROM users a, contacts b, notes c WHERE b.email = $1 AND a.userid = b.userid AND c.userid = b.userid';
    }
    let sqlValues = [searchContacts];
    db.pool.query(sqlString, sqlValues, (err, results) => {
      if (err) {
        console.log(" filterContacts dberror: ", err);
        res.render('pages/contacts', {chattime: dbvalid.dbTime(), pd: "",
        searchContacts: searchContacts, searchtype: searchtype,
        message: "message: "+err, chattoken: dbvalid.chatid(),
        chattoken2: dbvalid.chatid(), userid: "", contacts: err,
        results: []});
        //return err;
        //res.render('pages/contacts', {chattime: dbTime(), pd: pd,
        //searchContacts: searchContacts, searchtype: searchtype,
        //results: chatid(),
        //message: message, chattoken: chatid(),
        //chattoken2: chatid(), userid: "", contacts: "",
        //results: ""});
      } else {
        let contacts = results["rows"];
        let resultsLength = results["rows"].length;
        let userid = results["rows"][0]["userid"];
        let dblogin2 = (resultsLength > 0) ? 1 : 0;
        let subject = "#getUserID: "+dblogin2+", userid: "+userid;
        let message = "<h1>"+subject+"</h1>\n"+resultsRows+"\n"+resultsLength;
        console.log(message);
        if (resultsLength > 0) {
          console.log("Results: "+resultsLength);
        }
        res.render('pages/contacts', {chattime: dbvalid.dbTime(), pd: "",
        searchContacts: searchContacts, searchtype: searchtype,
        message: "message: "+resultsLength, chattoken: dbvalid.chatid(),
        chattoken2: dbvalid.chatid(), userid: contacts[0].userid, contacts: contacts,
        results: contacts});

        //return results["rows"];
        //res.render('pages/contacts', {chattime: dbTime(), pd: pd,
        //searchContacts: searchContacts, searchtype: searchtype,
        //results: chatid(),
        //message: message, chattoken: chatid(),
        //chattoken2: chatid(), userid: "", contacts: "",
        //results: ""});
      }
    });
  } catch (e) {
    console.log("# filterContacts : ", e);
  } finally {
    console.log("#06 filterContacts Done: ");
  }
  console.log("### 07 ### filterContacts Done: ###");
};

const getContacts = async (data, res) => {
  console.log("getContacts : "+data.type);
  try {
    let searchContacts = data.searchcontacts;
    let searchtype = data.searchtype;
    let sqlString = 'SELECT a.userid, a.name, a.surname, b.email, b.cell_number, c.title, c.description FROM users a, contacts b, notes c WHERE a.userid = b.userid AND b.userid = a.userid AND c.userid = a.userid';
    //if (searchtype == 'name'){
      sqlString = 'SELECT a.userid, a.name, a.surname, b.email, b.cell_number, c.title, c.description FROM users a, contacts b, notes c WHERE a.name = $1 AND b.userid = a.userid AND c.userid = a.userid';
    //} else
    //if (data.searchtype == 'surname'){
    //  sqlString = 'SELECT a.userid, a.name, a.surname, b.email, b.cell_number, c.title, c.description FROM users a, contacts b, notes c WHERE a.surname = $1 AND b.userid = a.userid AND c.userid = a.userid';
    //} else
    //if (data.searchtype == 'email'){
    //  sqlString = 'SELECT a.userid, a.name, a.surname, b.email, b.cell_number, c.title, c.description FROM users a, contacts b, notes c WHERE b.email = $1 AND a.userid = b.userid AND c.userid = b.userid';
    //}
    //let sqlValues = [searchContacts];
    //db.pool.query(sqlString, sqlValues, (err, results) => {
    db.pool.query(sqlString, (err, results) => {
      if (err) {
        console.log(" getContacts dberror: ", err);
        return err;
        //res.render('pages/contacts', {chattime: dbTime(), pd: pd,
        //searchContacts: searchContacts, searchtype: searchtype,
        //results: chatid(),
        //message: message, chattoken: chatid(),
        //chattoken2: chatid(), userid: "", contacts: "",
        //results: ""});
      } else {
        let resultsRows = results["rows"];
        let resultsLength = results["rows"].length;
        let userid = results["rows"]["userid"];
        let dblogin2 = (resultsLength > 0) ? 1 : 0;
        let subject = "#getUserID: "+dblogin2+", userid: "+userid;
        let message = "<h1>"+subject+"</h1>\n"+resultsRows+"\n"+resultsLength;
        console.log(message);
        if (resultsLength > 0) {
          console.log("Results: "+resultsLength);
        }
        return results["rows"];
        //res.render('pages/contacts', {chattime: dbTime(), pd: pd,
        //searchContacts: searchContacts, searchtype: searchtype,
        //results: chatid(),
        //message: message, chattoken: chatid(),
        //chattoken2: chatid(), userid: "", contacts: "",
        //results: ""});
      }
    });
  } catch (e) {
    console.log("# getContacts : ", e);
  } finally {
    console.log("#06 getContacts Done: ");
  }
  console.log("### 07 ### getContacts Done: ###");
};


module.exports = {
  filterContacts,
  getContacts
}
