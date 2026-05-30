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
employeeForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const isValid =
        validateBankDetails();

    if (!isValid) {
        return;
    }

    const formData =
        collectFormData();

    console.log(formData);

    const submissionResponse =
        await submitEmployeeForm(formData);

    console.log(
        "Submission Result:",
        submissionResponse
    );

    if (submissionResponse.success) {

        alert(
            "Employee form submitted successfully!"
        );

    } else {

        alert(
            "Form submission failed!"
        );
    }
});


/* Collect Complete Form Data */
function collectFormData() {

    return {

        personalInfo: {

            email:
                document.getElementById("email").value,

            fullName:
                document.getElementById("fullName").value,

            dob:
                document.getElementById("dob").value,

            contactNumber:
                document.getElementById("contactNumber").value,

            parentsName:
                document.getElementById("parentsName").value,

            gender:
                document.querySelector(
                    'input[name="gender"]:checked'
                )?.value || "",

            address:
                document.getElementById("address").value,

            socialLinks:
                document.getElementById("socialLinks").value,

            maritalStatus:
                document.querySelector(
                    'input[name="maritalStatus"]:checked'
                )?.value || ""
        },



        qualificationInfo: {

            highestDegree:
                document.getElementById("highestDegree").value,

            institutionName:
                document.getElementById("institutionName").value,

            yearOfPassing:
                document.getElementById("yearOfPassing").value,

            awardsParticipation:
                document.getElementById("awardsParticipation").value
        },



        employmentInfo: {

            isFresher:
                document.getElementById("isFresher").checked,

            organizationName:
                document.getElementById("organizationName").value,

            pastDesignation:
                document.getElementById("pastDesignation").value,

            workedFrom:
                document.getElementById("workedFrom").value,

            workedTill:
                document.getElementById("workedTill").value,

            referenceDetails:
                document.getElementById("referenceDetails").value
        },



        medicalInfo: {

            medicalHistory:
                document.getElementById("medicalHistory").value
        },



        bankInfo: {

            bankName:
                document.getElementById("bankName").value,

            accountHolderName:
                document.getElementById("accountHolderName").value,

            accountType:
                document.getElementById("accountType").value,

            accountNumber:
                document.getElementById("accountNumber").value,

            ifscCode:
                document.getElementById("ifscCode").value,

            bankAddress:
                document.getElementById("bankAddress").value
        },



        documents:
            uploadedFilesData,



        metadata: {

            submittedAt:
                new Date().toISOString()
        }
    };
}