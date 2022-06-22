////////////////////////////////////////////
//
// restusers.js
// Author: Brian M
//
///////////////////////////////////////////

const db = require('../services/dbpool');
const dbvalid = require('../services/dbvalidators');
let pd = 0;

const getxContacts = async (req, res) => {
  let data = req.query;
  pd += 1;
  console.log("getxContacts : "+data.searchtype+"\n  searchContacts: "+data.searchcontacts);
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
        console.log("getxContacts dberror: ", err);
        res.json({ContactsList: "dberror", Error: err});
      } else {
        let contacts = results["rows"];
        let resultsLength = results["rows"].length;
        console.log("Contacts: "+contacts, "resultsLength: "+resultsLength);
        let userid = (resultsLength > 0) ? contacts[0]["userid"] : pd;
        let dblogin2 = (resultsLength > 0) ? 1 : 0;
        let subject = "#getUserID: "+dblogin2+", userid: "+userid;
        let message = "<h1>"+subject+"</h1>\n"+"\n"+resultsLength;
        console.log(message);
        if (resultsLength > 0) {
          console.log("Results: "+resultsLength);
        }
        res.json(contacts);
        //return results["rows"];
      }
    });
  } catch (e) {
    console.log("# filterxContacts : ", e);
  } finally {
    console.log("#06 filterxContacts Done: ");
  }
  console.log("### 07 ### filterxContacts Done: ###");
};

const getContacts = async (req, res) => {
  let data = req.body;
  console.log("getContacts : "+data);
  try {
    let searchContacts = data.searchcontacts;
    let searchtype = data.searchtype;
    let sqlString = 'SELECT a.userid, a.name, a.surname, b.email, b.cell_number, c.title, c.description FROM users a, contacts b, notes c WHERE a.userid = b.userid AND b.userid = a.userid AND c.userid = a.userid';
    db.pool.query(sqlString, (err, results) => {
      if (err) {
        console.log(" getContacts dberror: ", err);
        res.json({ContactsList: "dberror", Error: err});
        //return err;
      } else {
        contacts = results["rows"];
        let resultsLength = results["rows"].length;
        let userid = (resultsLength > 0) ? contacts[0]["userid"] : 0;
        let dblogin2 = (resultsLength > 0) ? 1 : 0;
        let subject = "#getUserID: "+dblogin2+", userid: "+userid;
        let message = "<h1>"+subject+"</h1>\n"+contacts+"\n"+resultsLength;
        console.log(message);
        if (resultsLength > 0) {
          console.log("Results: "+resultsLength);
        }
        res.json(contacts);
        //return results["rows"];
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
  getxContacts,
  getContacts
}
