////////////////////////////////////////////
//
// filtercontacts.js
// Author: Brian M
//
///////////////////////////////////////////

const db = require('../services/dbpool');
const dbvalid = require('../services/dbvalidators');

const filterContacts = async (data, contacts, res, pd=0) => {
  console.log("filterContacts : "+data.searchtype);
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
        res.render('pages/contacts', {chattime: dbvalid.dbTime(), pd: pd,
        searchContacts: searchContacts, searchtype: searchtype,
        message: "message: "+err+" "+pd, chattoken: dbvalid.chatid(),
        chattoken2: dbvalid.chatid(), userid: '',
        contacts: contacts,
        results: contacts});

        //res.render('pages/contacts', {chattime: dbvalid.dbTime(), pd: "",
        //searchContacts: searchContacts, searchtype: searchtype,
        //message: "message: "+err, chattoken: dbvalid.chatid(),
        //chattoken2: dbvalid.chatid(), userid: "", contacts: err,
        //results: []});
        //return err;

      } else {
        contacts = results["rows"];
        let resultsLength = results["rows"].length;
        console.log("Contacts: "+contacts, "resultsLength: "+resultsLength);
        let userid = (resultsLength > 0) ? contacts[0]["userid"] : 0;
        let dblogin2 = (resultsLength > 0) ? 1 : 0;
        let subject = "#getUserID: "+dblogin2+", userid: "+userid;
        let message = "<h1>"+subject+"</h1>\n"+"\n"+resultsLength;
        console.log(message);
        if (resultsLength > 0) {
          console.log("Results: "+resultsLength);
        }
        res.render('pages/contacts', {chattime: dbvalid.dbTime(), pd: pd,
        searchContacts: searchContacts, searchtype: searchtype,
        message: "message: "+message+" "+pd, chattoken: dbvalid.chatid(),
        chattoken2: dbvalid.chatid(), userid: userid,
        contacts: contacts,
        results: contacts});

        //res.render('pages/contacts', {chattime: dbvalid.dbTime(), pd: "",
        //searchContacts: searchContacts, searchtype: searchtype,
        //message: "message: "+resultsLength, chattoken: dbvalid.chatid(),
        //chattoken2: dbvalid.chatid(),
        //userid: userid,
        //contacts: contacts,
        //results: contacts});
      }
    });
  } catch (e) {
    console.log("# filterContacts : ", e);
  } finally {
    console.log("#06 filterContacts Done: ");
  }
  console.log("### 07 ### filterContacts Done: ###");
};

const getContacts = async (data, contacts, res, pd=0) => {
  console.log("getContacts : "+data.type);
  try {
    let searchContacts = data.searchcontacts;
    let searchtype = data.searchtype;
    let sqlString = 'SELECT a.userid, a.name, a.surname, b.email, b.cell_number, c.title, c.description FROM users a, contacts b, notes c WHERE a.userid = b.userid AND b.userid = a.userid AND c.userid = a.userid';
    db.pool.query(sqlString, (err, results) => {
      if (err) {
        console.log(" getContacts dberror: ", err);
        //return err;
        res.render('pages/contacts', {chattime: dbvalid.dbTime(), pd: pd,
        searchContacts: searchContacts, searchtype: searchtype,
        message: "message: "+err+" "+pd, chattoken: dbvalid.chatid(),
        chattoken2: dbvalid.chatid(), userid: contacts[0].userid,
        contacts: contacts,
        results: contacts});
      } else {
        contacts = results["rows"];
        let resultsLength = results["rows"].length;
        //let userid0 = results["rows"]["userid"];
        let userid = '';
        if (resultsLength > 0) {
          userid = contacts[0]["userid"];
          console.log("Results: "+resultsLength);
        }
        let dblogin2 = (resultsLength > 0) ? 1 : 0;
        let subject = "#getUserID: "+dblogin2+", userid: "+userid;
        let message = "<h1>"+subject+"</h1>\n"+contacts+"\n"+resultsLength;
        console.log(message);
        //return results["rows"];
        res.render('pages/contacts', {chattime: dbvalid.dbTime(), pd: pd,
        searchContacts: searchContacts, searchtype: searchtype,
        message: "message: "+pd, chattoken: dbvalid.chatid(),
        chattoken2: dbvalid.chatid(), userid: userid,
        contacts: contacts,
        results: contacts});
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
