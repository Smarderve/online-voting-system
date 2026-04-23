//countdown timer to resend OTP

let timer;

//---------------------------------------------Rgister form to Otp form switch--------------------------------------------------

//Function to handle continue button click

function handleContinue() {

//Get registration form element

const registrationForm = document.getElementById("register-form");

//check form is valid

if(registrationForm.checkValidity()) {
    
//Switch to OTP form

document.getElementById("register-form").style.display = "none";
document.getElementById("otp-form").style.display = "flex";
document.querySelectorAll('.otp-box')[0].focus();

//Start countdown timer for resend OTP

  startTimer(60);

} else {

//If form is invalid, show validation errors

    registrationForm.reportValidity();
  }

}



//Function to start countdown timer

 function startTimer(timerSeconds) {
    let timeLeft = timerSeconds;
    const secondsDisplay = document.getElementById("timerSeconds");
    const resendOtp = document.getElementById("resend-otp");
    const otpTimer = document.getElementById("otp-timer");

// Reset UI in case of a resend click

    resendOtp.style.display = "none";
    otpTimer.style.display = "inline-block";

//Stop any existing timer

    clearInterval(timer);

//Start new timer

    timer = setInterval(() => {
        timeLeft--;
        secondsDisplay.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);

//Show resend link and hide timer countdown

            otpTimer.style.display = "none";
            resendOtp.style.display = "inline-block";
        }

    }, 1000);

 }


 //--------------------------------------------Email and Phone toggle--------------------------------------------------


 function toggleContact(method) {
    const emailBox = document.getElementById("email-box");
    const phoneBox = document.getElementById("phone-box");
    const regNoInput = document.getElementById("RegNo");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");

    if (method === "phone") {

//Switch input type to phone

        emailBox.style.display = "none";
        phoneBox.style.display = "flex";

//disable email required and enable phone required

        emailInput.required = false;
        emailInput.value = "";
        phoneInput.required = true;
        regNoInput.required = true;

    } else {

//Switch input type to email

        emailBox.style.display = "flex";
        phoneBox.style.display = "none";

//disable phone required and enable email required

        phoneInput.required = false;
        phoneInput.value = "";
        emailInput.inputMode.required = true;
        regNoInput.required = true;

    }

 }


 //--------------------------------------------OTP input navigation--------------------------------------------------

//Function to move to next input box

    function moveNext(current, index) {

        const inputs = document.querySelectorAll(".otp-box");

//If input has a value, move to next input 

        if (current.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();

        }

}

//Function to move to previous input box

    function moveBack(event, index) {

        const inputs = document.querySelectorAll(".otp-box");

//If backspace is pressed and current input is empty, move to previous input

        if (event.key === "Backspace" && inputs[index].value === "" && index > 0) {
            inputs[index - 1].focus();

        }

    }