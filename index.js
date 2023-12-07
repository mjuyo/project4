/********f************
    
	Project 4 Javascript
	Name: Marco Juyo
	Date: Nov 21, 2023
	Description: JavaScript for Project 4

*********************/

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the submit event
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
	//	Hides all error elements on the page
	hideAllErrors();

	//	Determine if the form has errors
	if (formHasErrors()) {
		// 	Prevents the form from submitting
		e.preventDefault();
		return false;
	}
	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e A reference to the reset event
 * return  True allows the reset to happen; False prevents
 *         the browser from resetting the form.
 */
function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Reset Form?')) {
		// Ensure all error fields are hidden
		hideAllErrors();

		// Set focus to the first text field on the page
		document.getElementById("fname").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
	// Code below here
	let errorFlag = false;

	// Validation for empty text fields
	let requiredFields = ["fname","phone","email","feedback"];

	for(let i = 0; i < requiredFields.length; i++){
		let textField = document.getElementById(requiredFields[i]);
		if(!textField.value || textField.value == ""){
			document.getElementById(requiredFields[i] + "_error").style.display = "block";
		
			if(!errorFlag){
				textField.focus();
				textField.select();
			}
			errorFlag = true;
		}
	}

	// Validation for phone number
	let regexPhone = new RegExp(/(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/);
	let phoneValue = document.getElementById("phone").value;

	if(!regexPhone.test(phoneValue)){
		document.getElementById("phoneformat_error").style.display = "block";

		if(!errorFlag){
			document.getElementById("phone").focus();
			document.getElementById("phone").select();
		}
		errorFlag = true;
	}

	// Validation for email
	let regexEmail = new RegExp(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi);
	let emailValue = document.getElementById("email").value;

	if (!regexEmail.test(emailValue)) {
		document.getElementById("emailformat_error").style.display = "block";

		if (!errorFlag) {
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}
		errorFlag = true;
	}
	return errorFlag;
}

/*
 * Resets (hides) all of the error messages on the page.
 */
function hideAllErrors() {
	// Get an array of the error fields
	let errorFields = document.getElementsByClassName("error");
	for(let i = 0; i < errorFields.length; i++){
		errorFields[i].style.display = "none";
	}
}

function load() {
	// Hide errors when the function loads
	hideAllErrors();

	// Add event listener for the form submit
	document.getElementById("survey-form").addEventListener("submit", validate);

	// Reset the form using the default browser reset
	// This is done to ensure the radio buttons are unchecked when the page is refreshed
	// This line of code must be done before attaching the event listener for the customer reset
	//document.getElementById("survey-form").reset();

	// Add event listener for our custom form submit function
	document.getElementById("survey-form").addEventListener("reset", resetForm);
}

// Add the event listener for the document load
document.addEventListener("DOMContentLoaded", load);