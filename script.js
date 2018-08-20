var display = document.getElementById("display");
var numbers = document.getElementsByClassName("button");
for (var i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function () {
        display.value += this.innerHTML;
    });
}
function CalculateAnswer() {
    display.value=eval(display.value);
}
document.getElementById("equals").addEventListener("click", function () {
    CalculateAnswer();
});
document.getElementById("AC").addEventListener("click", function () {
    display.value = "";
    key = "";
})

document.addEventListener("keypress", function (e) {
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
    else if (e.key == "Escape") {
        display.value = "";
        key = "";
    }
}
);