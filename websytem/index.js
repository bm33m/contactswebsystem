var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var url = require('url');
var fs = require('fs');
const restadmin = require('./admin/adminapp');
const filteradmin = require('./admin/filtercontacts');
const deleteadmin = require('./admin/deletecontacts');
const updateadmin = require('./admin/updatecontacts');
const dbvalid = require('./services/dbvalidators');
const restcontacts = require('./contacts/usersapp');
const restusers = require('./contacts/restusers');

var appport = 9000;
var httpsport = 9090;
var peerport = 9080;
var app = express();
var now;
var dt = dbTime();
var pc = 0;
var users = [];
var records = [{soft_deleted: pc, contacts: pc, date_created: dbvalid.dbDateTime()}]

function chatid(){
  var rnd = Math.random().toString(36);
  var pstr = '0000000000000000000';
  var rndid = (rnd+pstr).substr(2, 16);
  return rndid;
}

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname+'/public'));

function dbTime(){
  now = new Date();
  return now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
}

app.set('port', (process.env.PORT || appport));
app.get('/', function(req, res) {
  var pd = pc++;
  var contactsid = restcontacts.contactsUUID(chatid());
  console.log("Home: "+ dbTime() +", chatd: "+ chatid() +", contactsid: "+contactsid+", #: "+ pc++);
  res.render('pages/home', {chattime: dbTime(), pd: pd,
  chattoken1: chatid(), chattoken2: chatid()});
});

app.get('/register', function(req, res) {
  let pd = pc++;
  console.log("Register: "+ dbTime()+", #: "+ pc++);
  res.render('pages/register', {chattime: dbTime(), pd: pd,
  chattoken1: chatid(), chattoken2: chatid(),
  results: "", message: pd,
  contacts: []});
});

app.get('/login', function(req, res) {
  let pd = pc++;
  console.log("Login: "+ dbTime()+", #: "+ pc++);
  res.render('pages/login', {chattime: dbTime(), pd: pd,
  chattoken1: chatid(), chattoken2: chatid(),
  message: pd, results: ""});
});

app.get('/logout', function(req, res) {
  let pd = pc++;
  console.log("Logout: "+ dbTime()+", #: "+ pc++);
  res.render('pages/home', {chattime: dbTime(), pd: pd,
  chattoken1: chatid(), chattoken2: chatid()});
});

app.get('/download', function(req, res) {
  console.log("Download: "+ dbTime() +", download: "+ chatid() +", #: "+ pc++);
  res.download('assets/readme.txt');
});

app.get('/admin', function(req, res) {
  var data = req.body;
  var pd = pc++;
  console.log("Admin: "+ dbTime() +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+req);
  console.log("Req: "+data.name);
  var userid = data.userid;
  res.render('pages/admin', {chattime: dbTime(), pd: pd,
  chattoken1: chatid(), chattoken2: chatid(),
  userid: userid,
  records: records,
  message: "",
  contacts: [] });
});

var contacts = [{
  name: "Admin",
  surname: "Cool",
  email: "admin1@webapp.org",
  cell_number: "0123456789",
  title: "Cool title",
  description: "Awesome super cool description...",
  userid: pc
}];

app.get('/contacts', function(req, res) {
  var data = req.body;
  var pd = pc++;
  console.log("Contacts: "+ dbTime() +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+req+", "+data+", "+req["name"]+", "+req.name);
  console.log("Req: "+data.name);
  contacts.userid = pd;
  filteradmin.getContacts(data, contacts, res, pd);

  //res.render('pages/contacts', {chattime: dbTime(), pd: pd,
  //searchContacts: "searchContacts", searchtype: "searchtype",
  //message: "message: "+pd, chattoken: chatid(),
  //chattoken2: chatid(), userid: contacts[0].userid, contacts: contacts,
  //results: contacts});
});

app.get('/contacts/update', function(req, res) {
  var data = req.query;
  var userid = req.query.userid;
  var contacts2 = [{
    name: data.firstname,
    surname: data.surname,
    email: data.email,
    cell_number: data.cell_number,
    title: data.title,
    description: data.description,
    userid: data.userid
  }];
  var pd = pc++;
  console.log("contacts/update: "+ dbTime() +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+data);
  console.log("Userid: "+userid);
  console.log("Req: "+req);
  console.log("Contacts: "+contacts2);
  //var records = pd;
  res.render('pages/admin', {chattime: dbTime(), pd: pd,
  chattoken1: chatid(), chattoken2: chatid(),
  userid: userid,
  records: records,
  message: 'Update: '+userid,
  contacts: contacts2[0] });
});

app.get('/contacts/delete', function(req, res) {
  var data = req.query;
  var userid = req.query.userid;
  var pd = pc++;
  console.log("Admin: "+ dbTime() +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+data);
  console.log("Userid: "+userid);
  console.log("Req: "+req);
  //var records = pd;
  res.render('pages/admin', {chattime: dbTime(), pd: pd,
  chattoken1: chatid(), chattoken2: chatid(),
  userid: userid,
  records: records,
  message: 'Delete: '+userid,
  contacts: [] });
});

app.get('/usersapp/contacts/update', function(req, res) {
  var data = req.query;
  var userid = req.query.userid;
  var contacts2 = [{
    name: data.firstname,
    surname: data.surname,
    email: data.email,
    cell_number: data.cell_number,
    title: data.title,
    description: data.description,
    userid: data.userid
  }];
  var pd = pc++;
  console.log("contacts/update: "+ dbTime() +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+data);
  console.log("Userid: "+userid);
  console.log("Req: "+req);
  console.log("Contacts: "+contacts2);
  //var records = pd;
  res.render('pages/admin', {chattime: dbTime(), pd: pd,
  chattoken1: chatid(), chattoken2: chatid(),
  userid: userid,
  records: records,
  message: 'Update: '+userid,
  contacts: contacts2[0] });
});

app.get('/usersapp/contacts/delete', function(req, res) {
  var data = req.query;
  var userid = req.query.userid;
  var pd = pc++;
  console.log("Admin: "+ dbTime() +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+data);
  console.log("Userid: "+userid);
  console.log("Req: "+req);
  //var records = pd;
  res.render('pages/admin', {chattime: dbTime(), pd: pd,
  chattoken1: chatid(), chattoken2: chatid(),
  userid: userid,
  records: records,
  message: 'Delete: '+userid,
  contacts: [] });
});

//app.post('/usersapp/login2', function(req, res) {});
app.post('/usersapp/login', async function(req, res) {
  var data = req.body;
  var pd = pc++;
  var username = data.username;
  var password = data.loginpassword;
  console.log("login: "+ dbTime() +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+req+", "+data);
  console.log("Req: "+username+", "+password);
  var pd = pc++;
  var ref = chatid();
  //var username20 = restcontacts.checkData(username);
  var username2 = await dbvalid.checkData(username);
  var password2 = await dbvalid.checkData(password);
  var hashPassword = await dbvalid.db3hashData(username2+"+"+password2);
  var contactsUUID = dbvalid.contactsUUID(ref);
  var message = " Welcome back "+username2+", Verifiying Password... in Pogress..."+pd;
  //var hashPassword3 = restcontacts.checkPassword(username2, password);
  var dbResults = await restadmin.loginUsers(data, records, hashPassword, res, pd);

  console.log("Login: "+ dbTime()+"\n#Username: "+username2+", \n#hashPassword: "+hashPassword+", \n#contactsUUID: "+contactsUUID+" \n#ref: "+ref);
  message = message+" "+hashPassword;
  console.log("Login: "+ dbTime()+", \n#: "+message+",\n dbResults: "+dbResults+", \npd:"+pd);
  //res.render('pages/login', {chattime: dbTime(), pd: pd,
  //chattoken1: chatid(), chattoken2: chatid(),
  //message: message, results: dbResults});
});

app.post('/usersapp/register', function(req, res) {
  var data = req.body;
  var dbResults = "";
  var pd = pc++;
  var username = data.username;
  var password = data.password;
  var contactsid = restcontacts.contactsUUID(chatid());
  var username2 = restcontacts.checkData(username);
  var hashPassword = restcontacts.checkPassword(username2, password);
  var ref = chatid();
  var dbResults = restadmin.registerContacts(data, ref, res);

  console.log("Register: "+ dbTime() +", chatd: "+ chatid() +", contactsid: "+contactsid+", #: "+ pc++);
  console.log("Post Register: "+ dbTime() +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+req+", "+data+", \n dbResults: "+dbResults);
  console.log("Req: "+data.name+", "+data.surname);
  //res.render('pages/register', {name: data.name+pd, chattoken: chatid(),
  //chatsid: chatid(), results: dbResults});
});

app.post('/usersapp/searchcontacts', function(req, res) {
  var apptime = dbTime();
  var pd = pc++;
  var data = req.body;
  var searchContacts = data.searchcontacts;
  var searchtype = data.searchtype;
  var message = "<h1> Results: </h1> <p>"+searchtype+"</p>";
  console.log("SearchContacts: "+ apptime +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+req+", "+data);
  console.log("Search Contacts: "+searchContacts+", type: "+searchtype);
  var dbResults = filteradmin.filterContacts(data, contacts, res, pd);
  console.log("dbResults: "+dbResults);


  //res.render('pages/contacts', {chattime: dbTime(), pd: pd,
  //searchContacts: searchContacts, searchtype: searchtype,
  //message: message, chattoken: chatid(),
  //chattoken2: chatid(), userid: "", contacts: [],
  //results: []});
});

app.post('/usersapp/searchid', function(req, res) {
  var apptime = dbTime();
  var pd = pc++;
  var data = req.body;
  var searchid = data.searchid;
  console.log("SearchID: "+ apptime +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+req+", "+data);
  console.log("Search User ID: "+searchid );
  var dbResults = filteradmin.filterContacts(data, contacts, res, pd);
  console.log("dbResults: "+dbResults);

  //var message = "<h1> Results: </h1> <p>"+searchid+"</p>";
  //res.render('pages/contacts', {chattime: dbTime(), pd: pd,
  //userid: searchid,
  //message: message, chattoken: chatid(),
  //chattoken2: chatid(), searchContacts: "", contacts: [],
  //results: []});
});

app.post('/admin/update', function(req, res) {
  var data = req.body;
  var pd = pc++;
  console.log("Admin: "+ dbTime() +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+req);
  console.log("Req: "+data.firstname);
  var userid = data.userid;
  //var records = pd;

  res.render('pages/admin', {chattime: dbTime(), pd: pd,
  chattoken1: chatid(), chattoken2: chatid(),
  userid: userid,
  records: records,
  message: '',
  contacts: data });
});

app.post('/admin/updatecontacts', function(req, res) {
  var data = req.body;
  var pd = pc++;
  console.log("Admin: "+ dbTime() +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+req);
  console.log("Req: "+data.firstname);
  var userid = data.userid;
  var results = updateadmin.updateData(data, records, res, pc);
  console.log("Update: "+userid+"\n Results: "+results);
  //var records = pd;
  //res.render('pages/admin', {chattime: dbTime(), pd: pd,
  //chattoken1: chatid(), chattoken2: chatid(),
  //userid: userid,
  //records: records,
  //contacts: [] });
});

app.post('/admin/deleteuserid', function(req, res) {
  var data = req.body;
  var pd = pc++;
  var userid = data.deleteuserid;
  console.log("Admin: "+ dbTime() +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+req);
  console.log("deleteUsersID: "+userid);

  deleteadmin.softDelete(data, records, res, pd);
  //var records = pd;
  //res.render('pages/admin', {chattime: dbTime(), pd: pd,
  //chattoken1: chatid(), chattoken2: chatid(),
  //userid: userid,
  //records: records,
  //contacts: [] });
});

app.post('/admin/batchdeletion', function(req, res) {
  var data = req.body;
  var pd = pc++;
  console.log("Admin: "+ dbTime() +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+req);
  console.log("deleteData: "+data);

  deleteadmin.deleteData(data, records, res, pd);
  //var userid = data.userid;
  //var records = pd;
  //res.render('pages/admin', {chattime: dbTime(), pd: pd,
  //chattoken1: chatid(), chattoken2: chatid(),
  //userid: userid, contacts: [],
  //records: records });
});

app.get('/exit', function(req, res) {
  var pd = pc++;
  console.log("Exit: "+ dbTime() +", chatd: "+ chatid() +", #: "+ pc++);
  res.render('pages/appindex', {chattime: dbTime(), pd: pd,
  chattoken1: chatid(), chattoken2: chatid()});
  //res.render("pages/index", {chatsid: chatid(), pd: pd});
  //res.render('pages/home', {chattime: dbTime(), pd: pd,
  //chattoken1: chatid(), chattoken2: chatid()});
});

//http://localhost:9000/api/getxcontacts?searchtype=name&searchcontacts=Admin
app.use('/api/getxcontacts', restusers.getxContacts);
//http://localhost:9000/api/getcontacts
app.use('/api/getcontacts', restusers.getContacts);

const pport = app.get('port');
const myServer = app.listen(pport, function() {
  console.log('App is now running at http://localhost:'+pport+'/');
  console.log('Hit CTRL-C to stop the server');
  console.log(now, " "+ dbTime() +" "+ chatid() +" "+ pc++);
});


if(records != null){
  console.log("Records: "+records+", \n"+records.length+", "+dbTime());
}else{
  console.log("Records: "+dbTime());
}

var test = null;
if(test != null){
  console.log("Test Records: "+records+", \n"+records.length+", "+dbTime());
}else{
  console.log("Test Records: "+dbTime());
}
