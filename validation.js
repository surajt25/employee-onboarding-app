
/* ----- Show Error -----*/
function showError(input, message) {

    clearError(input);

    input.classList.add("input-error");

    const error = document.createElement("div");

    error.className = "error-message";

    error.innerText = message;

    input.parentElement.appendChild(error);
}

/* ----- Clear Error ----- */
function clearError(input) {

    input.classList.remove("input-error");

    const existingError =
        input.parentElement.querySelector(".error-message");

    if (existingError) {
        existingError.remove();
    }
}


/* ----- EMAIL Validation ----- */
function isValidEmail(email) {

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
}


/* ----- Phone Validation ----- */
function isValidPhone(phone) {

    const phoneRegex =
        /^[0-9]{10}$/;

    return phoneRegex.test(phone);
}


/* ----- IFSC Validation ----- */
function isValidIFSC(ifsc) {

    const ifscRegex =
        /^[A-Z]{4}0[A-Z0-9]{6}$/;

    return ifscRegex.test(ifsc);
}


/* ----- File Size Validation ----- */
function validateFileSize(file, maxMB = 10) {

    const maxBytes = maxMB * 1024 * 1024;

    return file.size <= maxBytes;
}


/* ----- Validate Step 1 ----- */
function validatePersonalInfo() {

    let isValid = true;

    /* EMAIL */
    const email =
        document.getElementById("email");

    if (!email.value.trim()) {
        showError(email, "Email is required");
        isValid = false;

    } else if (!isValidEmail(email.value.trim())) {
        showError(email, "Enter valid email");
        isValid = false;

    } else {
        clearError(email);
    }


    /* Full Name */
    const fullName =
        document.getElementById("fullName");

    if (!fullName.value.trim()) {
        showError(fullName, "Full name is required");
        isValid = false;

    } else {
        clearError(fullName);
    }

    /* DOB */
    const dob =
        document.getElementById("dob");

    if (!dob.value) {
        showError(dob, "Date of birth is required");
        isValid = false;

    } else {
        clearError(dob);
    }


    /* Contact */
    const contact =
        document.getElementById("contactNumber");

    if (!contact.value.trim()) {
        showError(contact, "Contact number is required");
        isValid = false;

    } else if (!isValidPhone(contact.value.trim())) {
        showError(contact, "Enter valid 10-digit mobile number");
        isValid = false;

    } else {
        clearError(contact);
    }

    /* Parents */
    const parents =
        document.getElementById("parentsName");

    if (!parents.value.trim()) {
        showError(parents, "Parents name is required");
        isValid = false;

    } else {
        clearError(parents);
    }


    /* Address */
    const address =
        document.getElementById("address");

    if (!address.value.trim()) {
        showError(address, "Address is required");
        isValid = false;

    } else {
        clearError(address);
    }


    /* Social */
    const social =
        document.getElementById("socialLinks");

    if (!social.value.trim()) {
        showError(social, "Social links are required");
        isValid = false;

    } else {
        clearError(social);
    }

    return isValid;
}


/* ----- Validate Step 2 ----- */
function validateQualification() {

    let isValid = true;

    const degree =
        document.getElementById("highestDegree");

    const institute =
        document.getElementById("institutionName");

    const year =
        document.getElementById("yearOfPassing");
    
    const currentYear = new Date().getFullYear();
    if (
        year.value < 1950 ||
        year.value > currentYear + 1
    )


    if (!degree.value.trim()) {
        showError(degree, "Degree is required");
        isValid = false;

    } else {
        clearError(degree);
    }

    if (!institute.value.trim()) {
        showError(institute, "Institution is required");
        isValid = false;

    } else {
        clearError(institute);
    }

    if (!year.value.trim()) {
        showError(year, "Year is required");
        isValid = false;

    } else {
        clearError(year);
    }

    return isValid;
}


/* ----- Validate Step 3 ----- */
function validatePastEmployer() {

    let isValid = true;

    const isFresher =
        document.getElementById("isFresher").checked;

    const organization =
        document.getElementById("organizationName");

    const designation =
        document.getElementById("pastDesignation");

    const workedFrom =
        document.getElementById("workedFrom");

    const workedTill =
        document.getElementById("workedTill");

    const reference =
        document.getElementById("referenceDetails");

    /* Skip Validation For Freshers */
    if (isFresher) {
        return true;
    }


    /* Organization */
    if (!organization.value.trim()) {

        showError(
            organization,
            "Organization name is required"
        );

        isValid = false;

    } else {
        clearError(organization);
    }


    /* Designation */
    if (!designation.value.trim()) {

        showError(
            designation,
            "Designation is required"
        );

        isValid = false;

    } else {
        clearError(designation);
    }


    /* Worked From */
    if (!workedFrom.value) {

        showError(
            workedFrom,
            "Worked from date is required"
        );

        isValid = false;

    } else {
        clearError(workedFrom);
    }


    /* Worked Till */
    if (!workedTill.value) {

        showError(
            workedTill,
            "Worked till date is required"
        );

        isValid = false;

    } else if (
        workedTill.value < workedFrom.value
    ) {

        showError(
            workedTill,
            "Worked till date cannot be before worked from date"
        );

        isValid = false;

    } else {
        clearError(workedTill);
    }


    /* Reference */
    if (!reference.value.trim()) {

        showError(
            reference,
            "Reference details are required"
        );

        isValid = false;

    } else {
        clearError(reference);
    }

    return isValid;
    /* return true; */
}


/* ------- Validate Step 4 ----- */
function validateMedicalHistory() {

    let isValid = true;

    const medical =
        document.getElementById("medicalHistory");

    if (!medical.value.trim()) {

        showError(
            medical,
            "Medical history field is required"
        );

        isValid = false;

    } else {
        clearError(medical);
    }

    return isValid;
}


/* ----- Validate Step 5 ----- */
function validateUploads() {

    let isValid = true;

    const isFresher =
        document.getElementById("isFresher").checked;

    const fileInputs = [
        "addressProof",
        "idProof",
        "degreeCertificates",
        "passportPhotos"
    ];

    /* Non-Fresher Required File Inputs */
    if (!isFresher) {

        fileInputs.push(
            "experienceLetters",
            "payslips"
        );
    }


    /* ----- Upload Rules ----- */
    const uploadRules = {

        addressProof: {
            maxFiles: 1
        },

        idProof: {
            maxFiles: 1
        },

        experienceLetters: {
            maxFiles: 5
        },

        payslips: {
            maxFiles: 5
        },

        degreeCertificates: {
            maxFiles: 5
        },

        passportPhotos: {
            maxFiles: 1
        }
    };

    fileInputs.forEach((id) => {

        const input =
            document.getElementById(id);

        const rules =
            uploadRules[id];

        /* Required CHeck */
        if (input.files.length === 0) {

            showError(
                input,
                "This upload is required"
            );

            isValid = false;

        } else {
            clearError(input);

            /* Max File Count Check */
            if (
                rules &&
                input.files.length > rules.maxFiles
            ) {

                showError(
                    input,
                    `Maximum ${rules.maxFiles} file(s) allowed`
                );

                isValid = false;
            }

            /* File Size Check */
            Array.from(input.files).forEach((file) => {

                if (!validateFileSize(file)) {

                    showError(
                        input,
                        "File exceeds 10 MB limit"
                    );

                    isValid = false;
                }
            });
        }

    });

    return isValid;
}


/* ----- Validate Step 6 ----- */
function validateBankDetails() {

    let isValid = true;

    const bankName =
        document.getElementById("bankName");

    const holder =
        document.getElementById("accountHolderName");

    const type =
        document.getElementById("accountType");

    const number =
        document.getElementById("accountNumber");

    const ifsc =
        document.getElementById("ifscCode");

    const address =
        document.getElementById("bankAddress");


    if (!bankName.value.trim()) {
        showError(bankName, "Bank name is required");
        isValid = false;

    } else {
        clearError(bankName);
    }


    if (!holder.value.trim()) {
        showError(holder, "Account holder is required");
        isValid = false;

    } else {
        clearError(holder);
    }


    if (!type.value.trim()) {
        showError(type, "Select account type");
        isValid = false;

    } else {
        clearError(type);
    }


    if (!number.value.trim()) {
        showError(number, "Account number required");
        isValid = false;

    } else {
        clearError(number);
    }


    if (!ifsc.value.trim()) {
        showError(ifsc, "IFSC required");
        isValid = false;

    } else if (!isValidIFSC(ifsc.value.trim())) {
        showError(ifsc, "Invalid IFSC format");
        isValid = false;

    } else {
        clearError(ifsc);
    }


    if (!address.value.trim()) {
        showError(address, "Bank address required");
        isValid = false;

    } else {
        clearError(address);
    }

    return isValid;
}