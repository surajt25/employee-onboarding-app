
/* ----- SHOW ERROR -----*/
function showError(input, message) {

    clearError(input);

    input.classList.add("input-error");

    const error = document.createElement("div");

    error.className = "error-message";

    error.innerText = message;

    input.parentElement.appendChild(error);
}

/* ----- CLEAR ERROR ----- */
function clearError(input) {

    input.classList.remove("input-error");

    const existingError =
        input.parentElement.querySelector(".error-message");

    if (existingError) {
        existingError.remove();
    }
}


/* ----- EMAIL VALIDATION ----- */
function isValidEmail(email) {

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
}


/* ----- PHONE VALIDATION ----- */
function isValidPhone(phone) {

    const phoneRegex =
        /^[0-9]{10}$/;

    return phoneRegex.test(phone);
}


/* ----- IFSC VALIDATION ----- */
function isValidIFSC(ifsc) {

    const ifscRegex =
        /^[A-Z]{4}0[A-Z0-9]{6}$/;

    return ifscRegex.test(ifsc);
}


/* ----- FILE SIZE VALIDATION ----- */
function validateFileSize(file, maxMB = 10) {

    const maxBytes = maxMB * 1024 * 1024;

    return file.size <= maxBytes;
}


/* ----- VALIDATE STEP 1 ----- */
function validateStep1() {

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


    /* FULL NAME */
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


    /* CONTACT */
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

    /* PARENTS */
    const parents =
        document.getElementById("parentsName");

    if (!parents.value.trim()) {
        showError(parents, "Parents name is required");
        isValid = false;

    } else {
        clearError(parents);
    }


    /* ADDRESS */
    const address =
        document.getElementById("address");

    if (!address.value.trim()) {
        showError(address, "Address is required");
        isValid = false;

    } else {
        clearError(address);
    }


    /* SOCIAL */
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


/* ----- VALIDATE STEP 2 ------ */
function validateStep2() {

    let isValid = true;

    const degree =
        document.getElementById("highestDegree");

    const institute =
        document.getElementById("institutionName");

    const year =
        document.getElementById("yearOfPassing");


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


/* ------- VALIDATE STEP 3 ----- */
function validateStep3() {

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


/* ----- VALIDATE STEP 4 ------- */
function validateStep4() {

    let isValid = true;

    const fileInputs = [
        "addressProof",
        "idProof",
        "experienceLetters",
        "payslips",
        "degreeCertificates",
        "passportPhotos"
    ];

    fileInputs.forEach((id) => {

        const input =
            document.getElementById(id);

        if (input.files.length === 0) {

            showError(input, "This upload is required");

            isValid = false;

        } else {
            clearError(input);

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




/* ----- VALIDATE STEP 4 ----- */
function validateStep4() {

    let isValid = true;

    /* ----- FILE INPUTS ----- */
    const fileInputs = [
        "addressProof",
        "idProof",
        "experienceLetters",
        "payslips",
        "degreeCertificates",
        "passportPhotos"
    ];

    /* ----- UPLOAD RULES ----- */
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

        /* REQUIRED CHECK */
        if (input.files.length === 0) {

            showError(
                input,
                "This upload is required"
            );

            isValid = false;

        } else {

            clearError(input);

            /* MAX FILE COUNT CHECK */
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

            /* FILE SIZE CHECK */
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


/* ----- VALIDATE STEP 5 ----- */
function validateStep5() {

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