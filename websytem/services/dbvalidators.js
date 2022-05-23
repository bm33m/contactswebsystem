//////////////////////////
//
// dbvalidator.js
// @ Author: Brian
//
//////////////////////////

const config = require('../configs');
let createHashJS = require("crypto-js");
let dv = 0;
let pc = 0;

let generateProductCode = async () => {
  //
  //The frontend is used for testability generated productCode.
  //The backend unique generated productCode is the final one.
  //
  /*
  Each product should contain
  a uniquely generated product code
  including a year month and sequential
  code ‘yyyyMM-###’ e.g., 202111-023
  */
  let now = new Date();
  let monthX = now.getMonth()+1;
  let xy = this.randColor(true);
  let code1 = "yyyy:"+now.getFullYear()+"/MM:"+now.getMonth()+"-d"+now.getDate()+"-h"+now.getHours()+"-m"+now.getMinutes()+"-s"+now.getSeconds()+"";
  let code = now.getFullYear()+""+monthX+"-"+now.getDate()+""+now.getHours()+""+now.getMinutes()+""+now.getSeconds()+""+xy;
  console.log(now+"\n"+code1+" productCode: "+code);
  return code;
};

let checkCategoryCode = async (code) => {
  /*
  Check category code for each Category,
  containing 3 alphabet letters and three
  numeric characters e.g., ABC123.
  */
  let code1 = code.length;
  console.log("categoryCode: "+code+"\n#"+code1);
  if (code1 != 6) {
    return false;
  }
  let pattern01 = "^[a-zA-Z]{3}[0-9]{3}$";
  let attributes = "i";
  let pattern = new RegExp(pattern01, attributes);
  //let qcpp5 = pattern.exactMatch(code);
  let codeMatch = code.match(pattern);
  console.log("pattern: "+pattern+"\n#codeTest: "+code1+"\n#codeMatch: "+codeMatch);
  return codeMatch;
};

let checkNumber = async (data) => {
  try {
    let data2 = parseInt(data);
    console.log("checkNumber: "+data2);
    if (isNaN(data2)){
      return null;
    }
    return data2;
  } catch (e) {
    console.log(e);
    return null;
  }
};

let checkData = async (data, option = 0) => {
  try {
    var dl1 = data.length;
    var data2 = data.trim();
    var dl = data2.length;
    //console.log(dbTime(), "checkData01: "+data2+" "+dl+": "+dl1+" option: "+option);
    if((data2.length) && (dl < 350)){
      return data2;
    }
  } catch (e) {
    console.log(dbTime(), "checkData02: "+e+" ////: "+dv++);
  }
  //console.log(dbTime(), "checkData03: "+option);
  if (option == 1){
    return null;
  }
  return null;
};

let offset = async (xpage = 1, xlimit = config.dblist) => {
  let x = parseInt(xpage - 1);
  let y = parseInt(xlimit);
  return x*y;
};

let limit = async (xlimit = config.dblist) => {
  let y = parseInt(xlimit);
  return y;
};

let dbpaginator = async (paginator, xpage = "List") => {
  try {
    //console.log(dbTime(), "Pagination: "+xpage);
    let pg = paginator.split(',');
    let orderby = pg[1];
    let page = pg[2];
    let xlimit = pg[3];
    let offset2 = offset(page, xlimit);
    let limit2 = limit(xlimit);
    let orderby2 = checkData(orderby, 1);
    await offset2;
    await limit2;
    await orderby2;
    return [orderby2, offset2, limit2, 1];
  } catch (e) {
    console.log(dbTime(), "PaginationError: "+e+" ///@: "+dv++);
  }
  return [0, 0, 0, 0];
};

let db3hashData = async (data) => {
  let data256;
  try {
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
    console.log(dbTime()+"\n#00 db2Data: "+e)
  } finally {
    console.log(dbTime()+"\n#08 db2Data: done");
  }
  console.log(dbTime()+"\n#09 db2Data: "+data256);
  return data256+'+==';
};

let db2hashData = async (data) => {
  let data256;
  try {
    let sha2562022 = 'sha256';
    let data2 = data[2]+"cry5*"+sha2562022[4]+"*pto6"+data;
    let hashData3 = data2+"";
    for (let i = data2.length - 1; i >= 0; i--){
      hashData3 += data2[i];
      console.log(i+" "+data2[i]);
    }
    console.log(dbTime()+"#001............ createHash ...........#")
    const { createHmac } = await import('crypto');
    const hmac = createHmac(sha2562022, data2);
    hmac.on('readable', () => {
      const data4 = hmac.read();
      if(data4){
        data256 =  data4.toString('hex');
        console.log(dbTime()+"#01 data256: "+data256);
      }
      console.log(dbTime()+"#02 data4: "+data4);
    });
    hamac.write(hashData3);
    hamac.end();
    console.log(dbTime()+"\n#03 data256: "+data256);
    return data256;
  } catch (e) {
    console.log(dbTime()+"\n#00 db2Data: "+e);
  } finally {
    console.log(dbTime()+"\n#04 db2Data: done");
  }
  console.log(dbTime()+"\n#05 db2Data: "+data256);
  //return data256;
};

let db3Data = async (data="db3") => {
  let ref = dbTime();
  try {
    ref = require('crypto').randomBytes(10).toString('hex');
    console.log(dbTime()+"#\n#"+data+"#\n#ref: "+ref);
    return ref;
  } catch (e) {
    console.log(dbTime()+" db3Data: "+pc++, e);
  } finally {
    console.log(dbTime()+" db3Data Done  @: "+pc++, ref);
  }
  return ref;
};

//Date.
const dbDate = () => {
  let now = new Date();
  return now.getFullYear()+"/"+(now.getMonth()+1)+"/"+now.getDate();
};

const dbDateTime = () => {
  let now = new Date();
  return now.getFullYear()+"/"+(now.getMonth()+1)+"/"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"::"+now.getMilliseconds();
};

//Time.
const dbTime = () => {
  let now = new Date();
  return now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"::"+now.getMilliseconds();
};

module.exports = {
  generateProductCode,
  checkCategoryCode,
  checkData,
  checkNumber,
  db3hashData,
  db3Data,
  offset,
  limit,
  dbpaginator,
  dbDate,
  dbTime,
  dbDateTime
}
