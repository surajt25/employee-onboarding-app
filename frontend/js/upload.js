/* File Input Config */
const uploadInputs = [
    {
        inputId: "addressProof",
        previewId: "addressProofPreview",
        maxFiles: 1,
        allowedTypes: [
            "application/pdf",
            "image/jpeg",
            "image/jpg",
            "image/png"
        ]
    },

    {
        inputId: "idProof",
        previewId: "idProofPreview",
        maxFiles: 1,
        allowedTypes: [
            "application/pdf",
            "image/jpeg",
            "image/jpg",
            "image/png"
        ]
    },

    {
        inputId: "experienceLetters",
        previewId: "experienceLettersPreview",
        maxFiles: 5,
        allowedTypes: [
            "application/pdf",
            "image/jpeg",
            "image/jpg",
            "image/png"
        ]
    },

    {
        inputId: "payslips",
        previewId: "payslipsPreview",
        maxFiles: 5,
        allowedTypes: [
            "application/pdf",
            "image/jpeg",
            "image/jpg",
            "image/png"
        ]
    },

    {
        inputId: "degreeCertificates",
        previewId: "degreeCertificatesPreview",
        maxFiles: 5,
        allowedTypes: [
            "application/pdf",
            "image/jpeg",
            "image/jpg",
            "image/png"
        ]
    },

    {
        inputId: "passportPhotos",
        previewId: "passportPhotosPreview",
        maxFiles: 1,
        allowedTypes: [
            "image/jpeg",
            "image/jpg",
            "image/png"
        ]
    }

];


/* Initialize Uploads */
uploadInputs.forEach((config) => {

    const input =
        document.getElementById(config.inputId);

    input.addEventListener("change", () => {

        handleFilePreview(config);

    });

});


/* Handle File Preview */
function handleFilePreview(config) {

    const input =
        document.getElementById(config.inputId);

    const previewContainer =
        document.getElementById(config.previewId);

    const files =
        Array.from(input.files);


    /* Clear Old Preview */
    previewContainer.innerHTML = "";


    /* File Count Validation */
    if (files.length > config.maxFiles) {

        alert(
            `Maximum ${config.maxFiles} files allowed`
        );

        input.value = "";

        return;
    }


    /* Create File Cards */
    files.forEach((file, index) => {

        /* File Type Validation */
        if (!validateFileType(file, config.allowedTypes)) {

            alert(
                `${file.name} has invalid file type`
            );

            input.value = "";

            previewContainer.innerHTML = "";

            return;
        }

        const fileCard =
            document.createElement("div");

        fileCard.className =
            "file-preview-card";

        
        const fileCardLeft =
            document.createElement("div");

        fileCardLeft.className =
            "file-card-left";

        const fileInfo =
            document.createElement("div");
            
        fileInfo.className =
            "file-info";

        
        /* File Name */
        const fileName =
            document.createElement("div");

        fileName.className =
            "file-name";

        fileName.innerText =
            file.name;


        /* File Size */
        const fileSize =
            document.createElement("div");

        fileSize.className =
            "file-size";

        fileSize.innerText =
            formatFileSize(file.size);

        /* File Status */
        const fileStatus =
            document.createElement("div");

        fileStatus.className =
            "file-status";

        fileStatus.innerText =
            "Ready to upload";


        /* Remove Button */
        const removeBtn =
            document.createElement("button");

        removeBtn.className =
            "remove-file-btn";

        removeBtn.type = "button";

        removeBtn.innerText = "Remove";


        /* Remove Action */
        removeBtn.addEventListener("click", () => {

            removeFile(
                config,
                index
            );

        });


        /* Append */
        fileInfo.appendChild(fileName);

        fileInfo.appendChild(fileSize);

        fileCardLeft.appendChild(fileInfo);

        fileCardLeft.appendChild(fileStatus);

        fileCard.appendChild(fileCardLeft);

        fileCard.appendChild(removeBtn);

        previewContainer.appendChild(fileCard);

    });

}

/* Format File Size */
function formatFileSize(bytes) {

    const kb = bytes / 1024;

    const mb = kb / 1024;

    if (mb >= 1) {

        return `${mb.toFixed(2)} MB`;

    }

    return `${kb.toFixed(2)} KB`;
}

/* VALIDATE FILE TYPE */
function validateFileType(file, allowedTypes) {

    return allowedTypes.includes(file.type);
}


/* Remove File */
function removeFile(config, removeIndex) {

    const input =
        document.getElementById(config.inputId);

    const dt =
        new DataTransfer();

    const files =
        Array.from(input.files);


    files.forEach((file, index) => {

        if (index !== removeIndex) {

            dt.items.add(file);

        }

    });

    input.files = dt.files;

    handleFilePreview(config);
}