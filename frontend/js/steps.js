let currentStep = 1;

const totalSteps = 6;


/* Show Step */
function showStep(stepNumber) {

    const steps = document.querySelectorAll(".form-step");

    steps.forEach((step) => {
        step.classList.remove("active");
    });

    const activeStep = document.getElementById(`step-${stepNumber}`);

    activeStep.classList.add("active");

    updateProgressBar();
}

/* Next Step */
function nextStep() {
    let isStepValid = true;
    switch (currentStep) {
        case 1:
            isStepValid = validatePersonalInfo();
            break;
        case 2:
            isStepValid = validateQualification();
            break;
        case 3:
            isStepValid = validatePastEmployer();
            break;
        case 4:
            isStepValid = validateMedicalHistory();
            break;
        case 5:
            isStepValid = validateUploads();
            break;
    }

    if (!isStepValid) {
        return;
    }

    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
    }
}


/* Previous Step */
function prevStep() {

    if (currentStep > 1) {

        currentStep--;

        showStep(currentStep);
    }

}


/* Update Progress Bar */
function updateProgressBar() {

    const progressFill = document.getElementById("progressFill");

    const stepIndicator = document.getElementById("stepIndicator");

    const progressPercent = (currentStep / totalSteps) * 100;

    progressFill.style.width = `${progressPercent}%`;

    stepIndicator.textContent = `Step ${currentStep} of ${totalSteps}`;
}