const matrixeffect=()=>{
  var c = document.getElementById("c")
  var ctx=c.getContext("2d");
  for(var s=window.screen,
    w = c.width = s.width,
      h = c.height=s.height,
      m=Math.random,
      p=[],
      i=0;
      i<210;
      p[i++]=1);
      setInterval(() => {
        ctx.fillStyle = 'rgba(0,0,0,0.07)';

        ctx.fillRect(0,0,w,h);

        ctx.fillStyle = 'rgba(130,255,70,0.19)';

        p.map(
function (v,i){
var randomNum = m() *70;

var randomAsianChar = String.fromCharCode(15000 + randomNum);
ctx.font = "20px Arial";
ctx.fillText(
randomAsianChar,
i*21,
v
  );
var minHeight = 800;
var num = minHeight + m() * 8000;

p[i] = (v > num) ? 0 : v +20;
}
            )
      }, 39)
}
matrixeffect();



var f=function(){

var main_text = document.getElementById('main_block');
if(main_text)
main_text.className += " opacity_1";
var event = function(e){
var arrowc = document.getElementById('arrow');
var y =window.scrollY;
if(arrowc)
if (y >= 1){
  arrowc.className += " display_none";
}
else{
  arrowc.className = "link_on_proj without_underline";
}
}
window.addEventListener('scroll',event,false);
}

document.addEventListener('DOMContentLoaded',f,false);