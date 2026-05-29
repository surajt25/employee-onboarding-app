
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