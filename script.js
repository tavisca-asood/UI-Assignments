var names = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
var inputBox = document.getElementById("suggestion");
var unorderedList = document.getElementById("autocomplete-list");
var clearButton = document.getElementById("clear");
var currentFocus;
String.prototype.insert = function (index, string) {
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);
    else
        return string + this;
};
function strip_html_tags(str) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    return str.replace(/<[^>]*>/g, '');
}
inputBox.addEventListener("input", function (e) {
    var input = inputBox.value;
    clearList();
    if (!input)
        return;
    currentFocus = -1;
    unorderedList.style.display = "block";
    clear.style.display = "inline";
    var flag = 0;
    for (i = 0; i < names.length; i++) {
        if (names[i].toUpperCase().includes(input.toUpperCase())) {
            flag = 1;
            names[i] = names[i].replace('amp;', '');
            var start = names[i].toUpperCase().indexOf(input.toUpperCase());
            var text = names[i].insert(start, "<strong>");
            text = text.insert(start + input.length + 8, "</strong>");
            var item = document.createElement("li");
            item.innerHTML = text;
            item.addEventListener("mousedown", function () {
                inputBox.value = strip_html_tags(this.innerHTML);
                clearList();
                clearButton.style.display = "inline";
            })  ;
            unorderedList.appendChild(item);
        }
    }
    if (flag == 0) {
        var item = document.createElement("li");
        item.innerHTML = "No Data Found!";
        unorderedList.appendChild(item);
        return;
    }
})

function clearList() {
    while (unorderedList.firstChild) {
        unorderedList.removeChild(unorderedList.firstChild);
    }
    unorderedList.style.display = "none";
    clearButton.style.display = "none";
}
clearButton.addEventListener("click", function () {
    inputBox.value = "";
    clearList();
});
inputBox.addEventListener("keydown", function (e) {
    if (e.keyCode == 40 && currentFocus < unorderedList.childElementCount - 1) {
        currentFocus++;
        AddFocus("down");
    }
    else if (e.keyCode == 38 && currentFocus > 0) {
        currentFocus--;
        AddFocus("up");
    }
    else if (e.keyCode == 13 || e.keyCode == 32) {
        try {
            inputBox.value = strip_html_tags(document.getElementsByClassName("selected")[0].innerHTML);
            clearList();
            clearButton.style.display = "inline";
        }
        catch
        { }
    }
});
function AddFocus(key) {
    if (currentFocus >= 0 && currentFocus < unorderedList.childElementCount) {
        unorderedList.childNodes[currentFocus].className = "selected";
        unorderedList.childNodes[currentFocus].focus();
        try {
            unorderedList.childNodes[currentFocus - 2].scrollIntoView();
        }
        catch
        {

        }
        RemoveFocus(key);
    }
}
function RemoveFocus(key) {
    if (key == "down") {
        if (currentFocus > 0) {
            unorderedList.childNodes[currentFocus - 1].className = "";
        }
    }
    if (key == "up") {
        if (currentFocus < unorderedList.childElementCount - 1) {
            unorderedList.childNodes[currentFocus + 1].className = "";
        }
    }
}
document.getElementsByTagName("body")[0].addEventListener("mousedown", function () {
    unorderedList.style.display = "none";
    inputBox.addEventListener("click", function () {
        unorderedList.style.display = "block";
    });
});
inputBox.addEventListener("click", function () {
    unorderedList.style.display = "block";
});