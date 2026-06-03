
/* Test Backend Connection */
async function testBackendConnection() {

    try {
        const response =
            await fetch(API_URL, {

                method: "POST",

                body: JSON.stringify({
                    test: "Frontend connected"
                })


            });

        const data =
            await response.json();

        console.log(
            "Backend Response:",
            data
        );

        alert(
            "Backend connected successfully!"
        );

    } catch (error) {
        console.error(
            "Backend Connection Error:",
            error
        );

        alert(
            "Backend connection failed!"
        );
    }
}


/* Upload File To Drive */
async function uploadFileToDrive(fileData) {

    try {
        const response =
            await fetch(API_URL, {

                method: "POST",

                body: JSON.stringify({

                    action: "uploadFile",

                    fileName: fileData.fileName,

                    mimeType: fileData.mimeType,

                    base64: fileData.base64
                })

            });

        const data =
            await response.json();

        console.log(
            "Upload Response:",
            data
        );

        return data;

    } catch (error) {

        console.error(
            "File Upload Error:",
            error
        );

        return {

            success: false,

            error: error.toString()
        };
    }
}


/* Submit Employee Form */
async function submitEmployeeForm(formData) {

    try {

        const response =
            await fetch(API_URL, {

                method: "POST",

                body: JSON.stringify({

                    action: "submitEmployeeForm",

                    formData: formData
                })
            });

        const data =
            await response.json();

        console.log(
            "Form Submission Response:",
            data
        );

        return data;

    } catch (error) {

        console.error(
            "Form Submission Error:",
            error
        );

        return {

            success: false,

            error: error.toString()
        };
    }
}