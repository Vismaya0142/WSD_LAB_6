// script.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const dobInput = document.getElementById("dob");
    const submitBtn = document.getElementById("submitBtn");
    const modal = document.getElementById("successModal");
    const closeModal = document.getElementsByClassName("close")[0];

    // Helper function to check age
    function calculateAge(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // Validation functions
    function validateName() {
        const nameValue = nameInput.value.trim();
        const valid = /^[a-zA-Z\s]{3,}$/.test(nameValue);
        setValidationState(nameInput, valid);
        return valid;
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
        setValidationState(emailInput, valid);
        return valid;
    }

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();
        const valid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(passwordValue);
        setValidationState(passwordInput, valid);
        return valid;
    }

    function validateConfirmPassword() {
        const confirmPasswordValue = confirmPasswordInput.value.trim();
        const valid = passwordInput.value.trim() === confirmPasswordValue;
        setValidationState(confirmPasswordInput, valid);
        return valid;
    }

    function validateDob() {
        const dobValue = dobInput.value;
        const age = calculateAge(dobValue);
        const valid = age >= 18;
        setValidationState(dobInput, valid);
        submitBtn.disabled = !valid;
        return valid;
    }

    // Helper function to set validation state
    function setValidationState(input, isValid) {
        const feedback = input.nextElementSibling;
        if (isValid) {
            input.classList.remove("invalid");
            input.classList.add("valid");
            feedback.textContent = "✔";
            feedback.classList.add("valid");
        } else {
            input.classList.remove("valid");
            input.classList.add("invalid");
            feedback.textContent = "✘";
            feedback.classList.remove("valid");
        }
    }

    // Attach event listeners
    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    passwordInput.addEventListener("input", validatePassword);
    confirmPasswordInput.addEventListener("input", validateConfirmPassword);
    dobInput.addEventListener("input", validateDob);

    // Final validation on form submission
    form.addEventListener("submit", (e) => {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isDobValid = validateDob();

        if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isDobValid) {
            e.preventDefault();  // Prevent form submission if validation fails
        } else {
            e.preventDefault();  // Prevent form from submitting to display the success message

            // Display the modal
            modal.style.display = "block";

            // Optionally, reset the form after displaying the success message
            form.reset();

            // Reset the validation states
            nameInput.classList.remove("valid", "invalid");
            emailInput.classList.remove("valid", "invalid");
            passwordInput.classList.remove("valid", "invalid");
            confirmPasswordInput.classList.remove("valid", "invalid");
            dobInput.classList.remove("valid", "invalid");

            // Disable submit button after successful registration
            submitBtn.disabled = true;
        }
    });

    // Close the modal when the user clicks on <span> (x)
    closeModal.onclick = function() {
        modal.style.display = "none";
    };

    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});


