var display = document.getElementById("display");
var numbers = document.getElementsByClassName("button");
var operations=document.getElementsByClassName("operation");
function ClearScreen() {
    display.value = "";
}
var calculated = 0;
for (var i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("mousedown", function () {
        if (calculated == 1) {
            calculated = 0;
            ClearScreen();
        }
        display.value += this.innerHTML;
    });
}
for (var i = 0; i < operations.length; i++) {
    operations[i].addEventListener("mousedown", function () {
        if (calculated == 1) {
            calculated = 0;
            ClearScreen();
        }
        display.value += this.innerHTML;
    });
}
function CalculateAnswer() {
    if (calculated == 1) {
        calculated=0;
        return;
    }
    calculated=1;
    var answer=eval(display.value);
    display.value = eval(answer);
}
document.getElementById("equals").addEventListener("mousedown", function () {
    CalculateAnswer();
});
document.getElementById("AC").addEventListener("mousedown", function () {
    ClearScreen();
})

document.addEventListener("keypress", function (e) {
    if (calculated == 1) {
        calculated = 0;
        ClearScreen();
    }
    if (e.keyCode >= 48 && e.keyCode <= 57) {
        display.value += Number(e.keyCode) - 48;
    }
    else if (e.keyCode >= 96 && e.keyCode <= 105) {
        display.value += Number(e.keyCode) - 48;
    }
    else if (e.key == "/") {
        display.value += "/";
    }
    else if (e.key == "+") {
        display.value += "+";
    }
    else if (e.key == "-") {
        display.value += "-";
    }
    else if (e.key == "*") {
        display.value += "*";
    }
    else if (e.keyCode == 13 || e.keyCode == 32) {
        CalculateAnswer();
    }
    else if (e.keyCode == 27) {
        ClearScreen();
    }
}
);