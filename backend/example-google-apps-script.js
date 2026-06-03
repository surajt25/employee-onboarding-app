/*
GOOGLE APPS SCRIPT BACKEND

----- IMPORTANT: -----
This file is the local backup/source
for the deployed Apps Script backend.

After modifying this file:
1. Copy code into Apps Script
2. Redeploy web app

*/
function testAuth() {

  SpreadsheetApp.openById(SPREADSHEET_ID);

  DriveApp.getFolderById(DRIVE_FOLDER_ID);

}



/* GOOGLE DRIVE FOLDER ID */

const DRIVE_FOLDER_ID =
    "1mEEHaoRrQMXCYDHWdqJYNtvxipgt_nox";


/* GOOGLE SHEET ID */

const SPREADSHEET_ID =
    "18GVgG78xxZHozRoQ4TjN6L-RT9AxF6DvbV9JofsciS0";


/* SHEET NAME */

const SHEET_NAME =
    "Employee_Data";


/* HANDLE POST REQUEST */

function doPost(e) {

    try {

        const data =
            JSON.parse(e.postData.contents);

        const action =
            data.action;

        /* Upload File 
        if (action === "uploadFile") {

            return handleFileUpload(data);
        }*/

        /* Submit Employee Form */
        if (action === "submitEmployeeForm") {

            return handleEmployeeFormSubmission(data);
        }


        return createJsonResponse({
            success: false,
            message: "Invalid action"
        });

    } catch (error) {

        return createJsonResponse({
            success: false,
            error: error.toString()
        });
    }
}

/* HANDLE EMPLOYEE FORM */

function handleEmployeeFormSubmission(data) {

    try {

        const formData =
            data.formData;

        /* Generate Employee ID */
        const employeeId =
            generateEmployeeId();

        /* Employee Name */
        const employeeName =
            formData.personalInfo.fullName;

        /* Create Employee Folder Name */
        const employeeFolderName =
            `${employeeId}_${employeeName}`;

        /* Root Folder */
        const rootFolder =
            DriveApp.getFolderById(
                DRIVE_FOLDER_ID
            );

        /* Create Employee Folder */
        const employeeFolder =
            rootFolder.createFolder(
                employeeFolderName
            );

        /* Upload Documents */
        uploadEmployeeDocuments(

            formData.documents,

            employeeFolder
        );


        /* Save Employee Record */
        saveEmployeeRecord(

            formData,

            employeeId,

            employeeFolder
        );




        return createJsonResponse({

            success: true,

            employeeId: employeeId,

            employeeFolderId:
                employeeFolder.getId(),

            employeeFolderUrl:
                employeeFolder.getUrl()
        });

    } catch (error) {

        return createJsonResponse({

            success: false,

            error: error.toString()
        });
    }
}




/* GENERATE EMPLOYEE ID */

function generateEmployeeId() {

    const timestamp =
        new Date().getTime();

    return `EMP_${timestamp}`;
}


/* UPLOAD EMPLOYEE DOCUMENTS */

function uploadEmployeeDocuments(

    documents,
    employeeFolder

) {

    for (const documentType in documents) {

        /* Create Subfolder */
        const subFolder =
            employeeFolder.createFolder(
                documentType
            );

        const files =
            documents[documentType];

        files.forEach((fileData) => {

            /* Remove Base64 Prefix */
            const base64Data =
                fileData.base64.split(",")[1];

            /* Create Blob */
            const blob =
                Utilities.newBlob(

                    Utilities.base64Decode(
                        base64Data
                    ),

                    fileData.mimeType,

                    fileData.fileName
                );

            /* Upload File 
            subFolder.createFile(blob);*/
            const uploadedFile =
                subFolder.createFile(blob);

            fileData.fileUrl =
                uploadedFile.getUrl();

        });
    }
}


      /* SAVE EMPLOYEE RECORD */

        function saveEmployeeRecord(

            formData,
            employeeId,
            employeeFolder

        ) {

            const spreadsheet =
                SpreadsheetApp.openById(
                  "Your_Google_Sheet_ID_Here"
                );

            const sheet =
                spreadsheet.getSheetByName(
                    "Employee_Data"
                );

            /* Document URLs */
            const documents =
                formData.documents;

            sheet.appendRow([

                employeeId,

                formData.personalInfo.fullName,

                formData.personalInfo.email,

                formData.personalInfo.contactNumber,

                formData.qualificationInfo.highestDegree,

                formData.employmentInfo.isFresher
                    ? "Yes"
                    : "No",

                formData.employmentInfo.organizationName,

                formData.medicalInfo.medicalHistory,

                formData.bankInfo.bankName,

                new Date(),

                employeeFolder.getUrl(),

                getDocumentUrls(
                    documents.addressProof
                ),

                getDocumentUrls(
                    documents.idProof
                ),

                getDocumentUrls(
                    documents.experienceLetters
                ),

                getDocumentUrls(
                    documents.payslips
                ),

                getDocumentUrls(
                    documents.degreeCertificates
                ),

                getDocumentUrls(
                    documents.passportPhotos
                )
            ]);
        }


      /* GET DOCUMENT URLS */

      function getDocumentUrls(files) {

          if (!files || files.length === 0) {

              return "";
          }

          return files
              .map((file) => file.fileUrl || "")
              .join(" , ");
      }



/* JSON RESPONSE HELPER */

function createJsonResponse(data) {

    return ContentService
        .createTextOutput(
            JSON.stringify(data)
        )
        .setMimeType(
            ContentService.MimeType.JSON
        );
}