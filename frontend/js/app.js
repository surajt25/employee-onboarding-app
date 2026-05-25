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


/* FORM SUBMIT */
employeeForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const isValid =
        validateStep5();

    if (!isValid) {
        return;
    }

    alert("Validation successful!");
});