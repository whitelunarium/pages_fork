const canvas = document.getElementById("display1");
const ctx = canvas.getContext("2d");

function start(){
    console.log("start");
    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 100, 100);
}

