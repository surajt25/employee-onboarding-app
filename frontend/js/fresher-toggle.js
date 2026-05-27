/* ----- Toggle Fresher UI ----- */
function toggleFresherFields() {

    const isFresher =
        document.getElementById("isFresher").checked;

    const employerFields =
        document.getElementById("pastEmployerFields");

    const experienceSection =
        document.getElementById("experienceLettersSection");

    const payslipsSection =
        document.getElementById("payslipsSection");


    if (isFresher) {

        employerFields.style.display = "none";

        experienceSection.style.display = "none";

        payslipsSection.style.display = "none";

    } else {

        employerFields.style.display = "block";

        experienceSection.style.display = "block";

        payslipsSection.style.display = "block";
    }
}


/* ----- Initialize Toggle ----- */
document.addEventListener("DOMContentLoaded", () => {

    const fresherCheckbox =
        document.getElementById("isFresher");

    if (fresherCheckbox) {

        fresherCheckbox.addEventListener(
            "change",
            toggleFresherFields
        );

        toggleFresherFields();
    }
});