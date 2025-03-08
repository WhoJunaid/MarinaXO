let mode = "XY"
document.querySelector(".themebutton").onclick = function changeTheme() {
    if (mode === "XY") {
        mode = "XX"
        document.querySelector(".body").style.backgroundColor = "#FFB8E0"
    } else {
           mode = "XY"
        document.querySelector(".body").style.backgroundColor = "#C7D9DD"
    } 
}
let winningPattern = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], 
[0, 3, 6], [1, 4, 7], [2, 5, 8],
[0, 4, 8], [2, 4, 6] ]
let boxes = document.querySelectorAll("#box");
let box0 = document.querySelector(".box0");
let box1 = document.querySelector(".box1");
let box2 = document.querySelector(".box2");
let box3 = document.querySelector(".box3");
let box4 = document.querySelector(".box4");
let box5 = document.querySelector(".box5");
let box6 = document.querySelector(".box6");
let box7 = document.querySelector(".box7");
let box8 = document.querySelector(".box8");
let resultArea = document.querySelector(".resultarea");
let result = document.querySelector(".result");

document.querySelector(".playagain").onclick = function restart() {
    location.reload();
}


