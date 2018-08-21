var alphabetsOnlyRegex = RegExp("^[a-zA-Z]+$");
var firstName = document.getElementById("first-name");
var lastName = document.getElementById("last-name");
var errors = document.getElementsByClassName("invalid");
var phoneNumberRegex = RegExp("^[7-9][0-9]{9}$");
var phone = document.getElementById("phone");
var emailRegex = RegExp("^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
var email = document.getElementById("email");
var genderChecked = null;
var genders = document.getElementsByName("gender");
var gender=document.getElementById("gender");
var city=document.getElementById("city");
function HideErrors() {
    for (i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}

document.getElementById("submit").addEventListener("click", function () {
    var flag = 0;
    HideErrors();
    if (!ValidateFirstName()) {
        flag = 1;
        firstName.nextElementSibling.style.display = "block";
    }
    if (lastName.value != "") {
        if (!ValidateLastName()) {
            flag = 1;
            lastName.nextElementSibling.style.display = "block";
        }
    }
    if (!ValidatePhoneNumber()) {
        flag = 1;
        phone.nextElementSibling.style.display = "block";
    }
    if (!ValidateEmail()) {
        flag = 1;
        email.nextElementSibling.style.display = "block";
    }
    if(city.value=="")
    {
        flag = 1;
        city.nextElementSibling.style.display = "block";
    }
    if (!ValidateGender()) {
        flag = 1;
        gender.nextElementSibling.style.display = "block";
    }
    if(flag==1)
    return;
    localStorage.setItem("FirstName", firstName.value);
    localStorage.setItem("LastName", lastName.value);
    localStorage.setItem("Number", phone.value);
    localStorage.setItem("Email", email.value);
    localStorage.setItem("Address", document.getElementById("address").value);
    localStorage.setItem("City", city.value);
    localStorage.setItem("Gender", genderChecked);
    location.href="User/Success.html";
});
function ValidateFirstName() {
    if (alphabetsOnlyRegex.test(firstName.value) == true)
        return true;
    return false;
}
function ValidateLastName() {
    if (alphabetsOnlyRegex.test(lastName.value) == true)
        return true;
    return false;
}
function ValidatePhoneNumber() {
    if (phoneNumberRegex.test(phone.value) == true)
        return true;
    return false;
}
function ValidateEmail() {
    if (emailRegex.test(email.value) == true)
        return true;
    return false;
}
function ValidateGender() {
    for (i = 0; i < genders.length; i++) {
        if (genders[i].checked == true) {
            genderChecked = genders[i].value;
            return true;
        }
    }
    return false;
}