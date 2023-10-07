const canvas=document.getElementById('mycanvas');
const range=document.getElementById('my_range');
const colorizer=document.getElementById('colorizer');
const clrButton=document.getElementById('clear');
const ctx=canvas.getContext('2d');

let isPressed=false;
let size=range.value;
let color=colorizer.value;
let x=undefined;
let y=undefined;

let Clear=function()
{
    canvas.width=1920;
    canvas.height=1080;
}
let DrawingStart=function()
{
    canvas.addEventListener("mousedown",Toogle)
    canvas.addEventListener("mouseup",Toogle)
    canvas.addEventListener('mousemove',PaintReg)   
}

let Toogle=function(e)
{    
    if (!isPressed)
    {
        isPressed=true;
        x=e.offsetX;
        y=e.offsetY;
    }   
    else isPressed=false;
}
 
let PaintReg=function(e)
{    
    if (isPressed)
        {
            const x2=e.offsetX;
            const y2=e.offsetY;
            size=range.value;
            color=colorizer.value;
            if (size>20)
            {
                DrawLine(x,y,x2,y2);
                Draw(x2,y2);
            }
            else DrawLine(x,y,x2,y2);
            x=x2;
            y=y2;
    }
}
function Draw(x,y)
{
    ctx.beginPath();
    ctx.arc(x,y,size,0,Math.PI*2);
    ctx.fillStyle=color;
    ctx.fill();
}
function DrawLine(x1,y1,x2,y2)
{
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle=color;
    ctx.lineWidth=size;
    ctx.stroke();
}

window.addEventListener('load',()=>{
    clrButton.addEventListener('click',()=>{Clear();})
    DrawingStart();
})
document.getElementById('regular').addEventListener('click',()=>{
    clrButton.addEventListener('click',()=>{
        Clear();
        })
    canvas.addEventListener("mousedown",Toogle)
    canvas.addEventListener("mouseup",Toogle)
    canvas.addEventListener('mousemove',DrawingStart)
    
})
document.getElementById('line').addEventListener('click',()=>{
    canvas.removeEventListener("mousedown",Toogle); 
    canvas.removeEventListener("mouseup",Toogle); 
    canvas.removeEventListener("mouseup",DrawingStart); 
    canvas.addEventListener("mousedown",(e)=>{
        isPressed=false;
        x=e.offsetX;
        y=e.offsetY;
    })
    canvas.addEventListener("mouseup",(e)=>{
        x2=e.offsetX;
        y2=e.offsetY;
        DrawLine(x,y,x2,y2);
        x=undefined;
        y=undefined;
    })
})
/*let imageObj=new Image();
imageObj.onload = function() {
    ctx.drawImage(imageObj, 0, 0,800,800);
  };
  imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';*/