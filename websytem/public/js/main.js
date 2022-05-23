var pduration2 = 10;
var ptime22;
var now2;
var x1 = document.getElementById('output1');
var x2 = document.getElementById('output2');
var x3 = document.getElementById('output3');
var data2 = ["<h1>Accessing XML in PHP using DOM Functions.</h1>",
"<p>The DOM XML extension has been part of PHP since version 4 but was complelety overhauled in PHP 5.</p>",
"<p>The primary change was to include the DOM functionality within a default installation of PHP, which is to say that no additional libraries or extensions need to be installed or configured to use these functions.</p>",
"<b>DOM stands for Document Object Model.</b>",
"<p>The purpose of DOM functions is to allow you to work with data stored in an XML document using DOM API.</p>"];
var data3 = ['<h1>Converting audio formats.</h1>',
"<p>There’s often a need to convert audio from one format to another, also known as transcoding.</p>",
"<p>For example, many transcription engines require audio samples collected to be in a certain format for them to be interpreted properly.</p>",
"<p>You may have collected some files that were not this format; for example, most audio samples are collected at 44100 Hz and have 2 channels.</p>"];
var d2 = 0;
var d3 = 0;
var dl2 = data2.length;
var dl3 = data3.length;

function dbTime2(){
  now2 = new Date();
  return now2.getHours()+":"+now2.getMinutes()+":"+now2.getSeconds();
}

function mpsetup() {
  var sec1 = 1 * 1000;
  setInterval(() => {
    pduration2 -= 1;
    ptime22 = dbTime2();
    document.getElementById('pduration').innerHTML = pduration2;
    document.getElementById('ptime2').innerHTML = ptime22;
    if(pduration2 < 1){
      pduration2 = 5;
      x1.textContent = now2;
      x2.innerHTML = data3[d3];
      x3.innerHTML = data2[d2];
      infodata();
    }
  }, sec1);
  console.log("Done. "+pduration2, ptime22);
}

function infodata(){
  d2++;
  d3++;
  if (d2 >= dl2) {
    d2 = 0;
  }
  if (d3 >= dl3) {
    d3 = 0;
  }
}

window.onload = () => {
  mpsetup();
};
