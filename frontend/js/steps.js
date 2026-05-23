let currentStep = 1;

const totalSteps = 5;


/* SHOW STEP */
function showStep(stepNumber) {

    const steps = document.querySelectorAll(".form-step");

    steps.forEach((step) => {
        step.classList.remove("active");
    });

    const activeStep = document.getElementById(`step-${stepNumber}`);

    activeStep.classList.add("active");

    updateProgressBar();
}


/* NEXT STEP */
function nextStep() {

    if (currentStep < totalSteps) {

        currentStep++;

        showStep(currentStep);
    }

}


/* PREVIOUS STEP */
function prevStep() {

    if (currentStep > 1) {

        currentStep--;

        showStep(currentStep);
    }

}


/* UPDATE PROGRESS BAR */
function updateProgressBar() {

    const progressFill = document.getElementById("progressFill");

    const stepIndicator = document.getElementById("stepIndicator");

    const progressPercent = (currentStep / totalSteps) * 100;

    progressFill.style.width = `${progressPercent}%`;

    stepIndicator.textContent = `Step ${currentStep} of ${totalSteps}`;
}