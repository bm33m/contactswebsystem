
var dv = 0;

function checkData(data, option = 0){
  try {
    var dl1 = data.length;
    var data2 = data.trim();
    var dl = data2.length;
    console.log(dbTime(), "checkData01: "+data2+" "+dl+": "+dl1+" option: "+option);
    if((data2.length) && (dl < 1350)){
      return data2;
    }
  } catch (e) {
    dv += 1;
    console.log(dbTime(), "checkData02: "+e+" ////: "+dv);
  }
  //console.log(dbTime(), "checkData03: "+option);
  return null;
}

function checkPassword(username, data, option = 0){
  try {
    var dl1 = data.length;
    var data2 = data.trim();
    var dat3 = username.trim();
    var password = data2+"+"+dat3;
    var dl = data2.length;
    console.log(dbTime(), "checkData01: "+data2+" "+dl+": "+dl1+" option: "+option);
    if((data2.length) && (dl < 1350)){
      return db3hashData(password);
    }
  } catch (e) {
    console.log(dbTime(), "checkPassword: "+e+" ////: "+dv);
  }
  //console.log(dbTime(), "checkData03: "+option);
  return null;
}

//let db3hashData3 = async (data) => {};
let db3hashData = (data) => {
  let data256;
  try {
    let createHashJS = require("crypto-js");
    let sha2562022 = 'sha256';
    let data2 = data[2]+"cry5*"+sha2562022[4]+"*pto6"+data;
    let hashData3 = data2+"";
    for (let i = data2.length - 1; i >= 0; i--){
      hashData3 += data2[i];
      //console.log(i+" "+data2[i]);
    }
    console.log(dbTime()+"#001............ createHash ...........#")
    const hash = createHashJS.HmacSHA256(hashData3, data2);
    //console.log(dbTime()+"#\n#"+hash+"\n#002............ createHash ...........#")
    let hash2 = createHashJS.HmacSHA256(hash, hashData3);
    //console.log(dbTime()+"\n#03 hash2: "+hash2);
    let hash3 =  {ct: createHashJS.HmacSHA256(hash2, hash)};
    //console.log(dbTime()+"\n#04 hash3: "+hash3["ct"]);
    let hash4 = JSON.stringify(hash3);
    //console.log(dbTime()+"\n#05 hash4: "+hash4);
    let hash5 = createHashJS.enc.Base64.parse(hash4);
    //console.log(dbTime()+"\n#06 hash5: "+hash5);
    let hash6 = createHashJS.enc.Hex.parse(hash4);
    //console.log(dbTime()+"\n#07 hash6: "+hash6);
    data256 = createHashJS.HmacSHA256(hash5, hash6);
    console.log(dbTime()+"\n#08 data256: "+data256);
    //console.log(data256);
    return data256+'+==';
  } catch (e) {
    console.log(dbTime()+"\n#00 db2Data: "+e);
  } finally {
    console.log(dbTime()+"\n#08 db2Data: done");
  }
  console.log(dbTime()+"\n#09 db2Data: "+data256);
  return data256+'+==';
};

let contactsUUID = (data) =>{
  let contactsUUIDv4 = data;
  try {
    const uuidv4 = require('uuid/v4');
    contactsUUIDv4 = uuidv4();
    return contactsUUIDv4;
  } catch (e) {
    console.log(dbTime()+"\n#00 UUIDv4: "+e);
  } finally {
    console.log(dbTime()+"\n Data:"+data+" "+"\n#00 UUIDv4: "+contactsUUIDv4);
  }
  return contactsUUIDv4;
}

//Time.
const dbTime = () => {
  var now = new Date();
  return now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"::"+now.getMilliseconds();
};


module.exports = {
  checkData,
  checkPassword,
  contactsUUID,
}
