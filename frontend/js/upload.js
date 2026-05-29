/* Global File Storage */
const uploadedFilesData = {};

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
document.addEventListener("DOMContentLoaded", () => {

    uploadInputs.forEach((config) => {

        const input =
            document.getElementById(config.inputId);

        if (input) {

            input.addEventListener("change", () => {

                handleFilePreview(config);

            });
        }

    });

});


/* Handle File Preview */
async function handleFilePreview(config) {

    const input =
        document.getElementById(config.inputId);

    const previewContainer =
        document.getElementById(config.previewId);

    const files =
        Array.from(input.files);


    /* Valid FIle Storage */
    const validFiles = [];

    /* Clear Old Preview */
    previewContainer.innerHTML = "";

    /* Reset Stored Data */
    uploadedFilesData[config.inputId] = [];

    /* File Count Validation */
    if (files.length > config.maxFiles) {

        alert(
            `Maximum ${config.maxFiles} files allowed`
        );

        input.value = "";

        return;
    }


    /* Create File Cards */
    for (const [index, file] of files.entries()) {

        /* File Type Validation */
        if (!validateFileType(file, config.allowedTypes)) {

            alert(
                `${file.name} has invalid file type`
            );

            continue;
        }

        /* Base64 Conversion */ 
        const base64Data =
            await convertFileToBase64(file);


        /* Store Valid File */
        validFiles.push(file);

        let uploadResponse = null;

        /* Upload Address Proof To Drive */
        uploadResponse =
            await uploadFileToDrive({

                fileName: file.name,

                mimeType: file.type,

                base64: base64Data
            });

        console.log(
            "Drive Upload Result:",
            uploadResponse
        );

        
        /* Store File Data */
        uploadedFilesData[config.inputId].push({

            fileName: file.name,

            fileSize: file.size,

            mimeType: file.type,

            fileId:
                uploadResponse?.fileId || null,

            fileUrl:
                uploadResponse?.fileUrl || null
        });


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

    };

    /* Update Input Files */
    const dt =
        new DataTransfer();

    validFiles.forEach((file) => {

        dt.items.add(file);

    });

    input.files = dt.files;

    console.log(uploadedFilesData);
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


/* Convert File To BASE64 */
function convertFileToBase64(file) {

    return new Promise((resolve, reject) => {

        const reader =
            new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {

            resolve(reader.result);

        };

        reader.onerror = (error) => {

            reject(error);

        };

    });

}


/* Remove File */
async function removeFile(config, removeIndex) {

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

    await handleFilePreview(config);

    console.log(uploadedFilesData);
}