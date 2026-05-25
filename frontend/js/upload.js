/* File Input Config */
const uploadInputs = [
    {
        inputId: "addressProof",
        previewId: "addressProofPreview",
        maxFiles: 1
    },

    {
        inputId: "idProof",
        previewId: "idProofPreview",
        maxFiles: 1
    },

    {
        inputId: "experienceLetters",
        previewId: "experienceLettersPreview",
        maxFiles: 5
    },

    {
        inputId: "payslips",
        previewId: "payslipsPreview",
        maxFiles: 5
    },

    {
        inputId: "degreeCertificates",
        previewId: "degreeCertificatesPreview",
        maxFiles: 5
    },

    {
        inputId: "passportPhotos",
        previewId: "passportPhotosPreview",
        maxFiles: 1
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

        const fileCard =
            document.createElement("div");

        fileCard.className =
            "file-preview-card";


        /* File Info */
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

        fileCard.appendChild(fileInfo);

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