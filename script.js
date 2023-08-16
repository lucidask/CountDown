let set = document.getElementById("set");
let reset = document.getElementById("reset");
let succes = document.getElementById("succes");
let inputTitle = document.getElementById("inputTitle");
let inputDateTime = document.getElementById("inputDateTime");
let title = document.querySelector("span");
let finish = document.querySelectorAll("span")[1];
let d = document.querySelectorAll("p")[0];
let h = document.querySelectorAll("p")[1];
let m = document.querySelectorAll("p")[2];
let s = document.querySelectorAll("p")[3];
let objectCount = {};

let local = JSON.parse( localStorage.getItem( "details" ));
let interval = "";

try {
  if (local.deadline > 0 ) {
    set.style.display = "none";
    succes.style.display = "none";
    reset.style.display = "block";
    interval = setInterval( function() { countDown( local.title, local.deadline ); }
          , 1000 );
} else {
  clearInterval (interval);
}
}catch (e) {

}

function clearBox (element){
    element.innerHTML = "";
}

function addText (txt, txtAttach){
  let t = document.createTextNode(txt);
  txtAttach.appendChild (t);
}

function convertMilliSecond (milli) {
  let total_seconds = parseInt(Math.floor(milli / 1000));
  let total_minutes = parseInt(Math.floor(total_seconds / 60));
  let total_hours = parseInt(Math.floor(total_minutes / 60));
  let days = parseInt(Math.floor(total_hours / 24));

  let seconds = parseInt(total_seconds % 60);
  let minutes = parseInt(total_minutes % 60);
  let hours = parseInt(total_hours % 24);
  
  let o = { d: days, h: hours, m: minutes, s: seconds };
  return o;
}

function countDown (ti, dead) {
    let now = new Date().getTime();
    let timeOut = dead - now;
    if (timeOut > 0) {
      let conv = convertMilliSecond (timeOut);
      clearBox(title);
      clearBox(d);
      clearBox(h);
      clearBox(m);
      clearBox(s);

      addText (ti.toUpperCase(), title);
      addText (conv.d +"d", d); 
      addText (conv.h +"h", h); 
      addText (conv.m +"m", m); 
      addText (conv.s +"s", s); 

      (conv.d === 0) ? d.style.display = "none" : d.style.display = "block" ;
      (conv.h === 0) ? h.style.display = "none" : h.style.display = "block" ;
      (conv.m === 0) ? m.style.display = "none" : m.style.display = "block" ;
      (conv.s === 0) ? s.style.display = "none" : s.style.display = "block" ; 
    }else {
      clearInterval (interval);
      localStorage.removeItem("details");
      set.style.display = "none";
      reset.style.display = "none";
      succes.style.display = "block";
      clearBox(finish);
      let t = objectCount.title;
      let f = document.createTextNode(t.toUpperCase() + ": Finish with succes");
      finish.appendChild(f)
    }
}

function onStartPress () {
  if (inputTitle.value.length > 0 && new Date(inputDateTime.value).getTime() > 0) {
    set.style.display = "none";
    succes.style.display = "none";
    reset.style.display = "block";
    objectCount = {title: inputTitle.value, 
      deadline: new Date(inputDateTime.value).getTime()};
      localStorage.setItem("details", JSON.stringify(objectCount));
      let object = JSON.parse (localStorage.getItem("details"));
       interval = setInterval( function() { 
          countDown( object.title,object.deadline ); }
        , 1000 );
  }else {
    alert ("Fill all the input")
  }
}

function onResetPress (){
  clearInterval (interval);
  reset.style.display = "none";
  succes.style.display = "none";
  set.style.display = "block";
  localStorage.removeItem("details");

  objectCount.title = "";
  objectCount.deadline = "";

  inputTitle.value = "";
  inputDateTime.value = "";
}

function onOkPress (){
  clearInterval (interval);
  reset.style.display = "none";
  succes.style.display = "none";
  set.style.display = "block";
 
  localStorage.removeItem("details");

  objectCount.title = "";
  objectCount.deadline = "";

  inputTitle.value = "";
  inputDateTime.value = "";
}




