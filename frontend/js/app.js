/*
const employeeForm = document.getElementById("employeeForm");

/* FORM SUBMIT 
employeeForm.addEventListener("submit", function (event) {

    event.preventDefault();

    alert("Form Submitted Successfully!");

});
*/

const employeeForm =
    document.getElementById("employeeForm");


/* Form Submit */
employeeForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const isValid =
        validateBankDetails();

    if (!isValid) {
        return;
    }

    alert("Validation successful!");
});