var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var url = require('url');
var fs = require('fs');
const restcontacts = require('./contacts/usersapp');
//const restadmin = require('./admin/adminapp');

var appport = 9000;
var httpsport = 9090;
var peerport = 9080;
var app = express();
var now;
var dt = dbTime();
var pc = 0;
var users = [];

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
  chattoken1: chatid(), chattoken2: chatid()});
});

app.get('/login', function(req, res) {
  let pd = pc++;
  console.log("Login: "+ dbTime()+", #: "+ pc++);
  res.render('pages/login', {chattime: dbTime(), pd: pd,
  chattoken1: chatid(), chattoken2: chatid(),
  message: pd});
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
  console.log("Req: "+req)
  console.log("Req: "+data.name)
  var userid = data.userid;
  var records = pd;
  res.render('pages/admin', {chattime: dbTime(), pd: pd,
  chattoken1: chatid(), chattoken2: chatid(),
  userid: userid,
  records: records });
});

app.get('/contacts', function(req, res) {
  var data = req.body;
  var pd = pc++;
  console.log("Contacts: "+ dbTime() +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+req+", "+data+", "+req["name"]+", "+req.name)
  console.log("Req: "+data.name)
  res.render('pages/contacts', {name: 'guest'+pd, chattoken: chatid(),
  chatsid: chatid()});
});

app.post('/usersapp/login', function(req, res) {
  var data = req.body;
  var pd = pc++;
  var username = data.username;
  var password = data.loginpassword;
  console.log("login: "+ dbTime() +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+req+", "+data);
  console.log("Req: "+username+", "+password);
  var pd = pc++;
  var username2 = restcontacts.checkData(username);
  var message = " Welcome back "+username2+", Busyy Verifiying Password..."+pd;
  var hashPassword = restcontacts.checkPassword(username2, password);

  console.log("Login: "+ dbTime()+", #: "+hashPassword+", "+ pc++);
  message = message+" "+hashPassword;
  res.render('pages/login', {chattime: dbTime(), pd: pd,
  chattoken1: chatid(), chattoken2: chatid(),
  message: message});
});

app.post('/usersapp/register', function(req, res) {
  var data = req.body;
  var dbResults = "";
  var pd = pc++;
  var username = data.username;
  var password = data.loginpassword;
  var contactsid = restcontacts.contactsUUID(chatid());
  var username2 = restcontacts.checkData(username);
  var hashPassword = restcontacts.checkPassword(username2, password);
  //var dbResults = restadmin.postContacts(data, hashPassword, contactsid);

  console.log("Register: "+ dbTime() +", chatd: "+ chatid() +", contactsid: "+contactsid+", #: "+ pc++);
  console.log("Post Register: "+ dbTime() +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+req+", "+data+", \n dbResults: "+dbResults);
  console.log("Req: "+data.name+", "+data.surname)
  res.render('pages/register', {name: data.name+pd, chattoken: chatid(),
  chatsid: chatid()});
});

app.post('/usersapp/searchcontacts', function(req, res) {
  var apptime = dbTime();
  var pd = pc++;
  var data = req.body;
  var searchContacts = data.searchcontacts;
  var searchtype = data.searchtype;
  var message = "<h1> Results: </h1> <p>"+searchtype+"</p>";
  console.log("SearchContacts: "+ apptime +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+req+", "+data)
  console.log("Search Contacts: "+searchContacts+", type: "+searchtype);
  res.render('pages/contacts', {chattime: dbTime(), pd: pd,
  searchContacts: searchContacts, searchtype: searchtype,
  results: chatid(),
  message: message, chattoken: chatid(),
  chattoken2: chatid(), userid: "", contacts: ""});
});

app.post('/usersapp/searchid', function(req, res) {
  var apptime = dbTime();
  var pd = pc++;
  var data = req.body;
  var searchid = data.searchid;
  console.log("SearchID: "+ apptime +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+req+", "+data)
  console.log("Search User ID: "+searchid );
  var message = "<h1> Results: </h1> <p>"+searchid+"</p>";
  res.render('pages/contacts', {chattime: dbTime(), pd: pd,
  userid: searchid, results: chatid(),
  message: message, chattoken: chatid(),
  chattoken2: chatid(), searchContacts: "", contacts: ""});
});

app.post('/admin/update', function(req, res) {
  var data = req.body;
  var pd = pc++;
  console.log("Admin: "+ dbTime() +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+req)
  console.log("Req: "+data.name)
  var userid = data.userid;
  var records = pd;
  res.render('pages/admin', {chattime: dbTime(), pd: pd,
  chattoken1: chatid(), chattoken2: chatid(),
  userid: userid,
  records: records });
});

app.post('/admin/deleteuserid', function(req, res) {
  var data = req.body;
  var pd = pc++;
  console.log("Admin: "+ dbTime() +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+req)
  console.log("Req: "+data.name)
  var userid = data.userid;
  var records = pd;
  res.render('pages/admin', {chattime: dbTime(), pd: pd,
  chattoken1: chatid(), chattoken2: chatid(),
  userid: userid,
  records: records });
});

app.post('/admin/batchdeletion', function(req, res) {
  var data = req.body;
  var pd = pc++;
  console.log("Admin: "+ dbTime() +", chatd: "+ chatid() +", #: "+ pc++);
  console.log("Req: "+req)
  console.log("Req: "+data.name)
  var userid = data.userid;
  var records = pd;
  res.render('pages/admin', {chattime: dbTime(), pd: pd,
  chattoken1: chatid(), chattoken2: chatid(),
  userid: userid,
  records: records });
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

//app.use('/api/register', restusers.postUsers);
//app.use('/api/login', restusers.loginUsers);
//app.use('/api/logout', restcontacts.postContacts);


const pport = app.get('port');
const myServer = app.listen(pport, function() {
  console.log('App is now running at http://localhost:'+pport+'/');
  console.log('Hit CTRL-C to stop the server');
  console.log(now, " "+ dbTime() +" "+ chatid() +" "+ pc++);
});
