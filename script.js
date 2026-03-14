let currentStep = 1;
const totalSteps = 2;
const USD_TO_INR_RATE = 83.12; // Current conversion rate (update as needed)

// Form data storage
let formData = {
    project: {},
    aws: {}
};

// Project form required fields
const projectRequiredFields = {
    projectName: {
        type: 'text',
        message: 'Project Name is required'
    },
    projectType: {
        type: 'select',
        message: 'Project Type is required'
    },
    totalBudgetUSD: {
        type: 'number',
        min: 0,
        message: 'Total Budget is required'
    },
    duration: {
        type: 'number',
        min: 1,
        message: 'Duration is required (minimum 1 month)'
    },
    teamSize: {
        type: 'number',
        min: 1,
        message: 'Team Size is required'
    },
    complexityLevel: {
        type: 'select',
        message: 'Complexity Level is required'
    },
    stakeholders: {
        type: 'number',
        min: 1,
        message: 'Number of Stakeholders is required'
    }
};

// AWS form required fields
const awsRequiredFields = {
    accountId: {
        type: 'text',
        minLength: 12,
        message: 'AWS Account ID is required (12 digits)'
    },
    monthlySpendUSD: {
        type: 'number',
        min: 0,
        message: 'Monthly AWS Spend is required'
    },
    ec2Instances: {
        type: 'number',
        min: 0,
        message: 'Total EC2 Instances is required'
    },
    s3Storage: {
        type: 'number',
        min: 0,
        message: 'S3 Storage is required'
    },
    rdsInstances: {
        type: 'number',
        min: 0,
        message: 'RDS Instances is required'
    },
    lambdaInvocations: {
        type: 'number',
        min: 0,
        message: 'Monthly Lambda Invocations is required'
    }
};

// Convert USD to INR
function convertUSDToINR(usdValue) {
    if (!usdValue || isNaN(usdValue)) return '';
    return (parseFloat(usdValue) * USD_TO_INR_RATE).toFixed(2);
}

// Setup currency conversion for budget fields
function setupCurrencyConversion(usdFieldId, inrFieldId) {
    const usdField = document.getElementById(usdFieldId);
    const inrField = document.getElementById(inrFieldId);

    if (!usdField || !inrField) return;

    usdField.addEventListener('input', function() {
        const inrValue = convertUSDToINR(this.value);
        inrField.value = inrValue;
    });
}

// Validate individual field
function validateField(fieldName, isAWSForm = false) {
    const field = document.getElementById(fieldName);
    if (!field) return true;

    const errorDiv = field.parentElement.querySelector('.error-message');
    const rules = isAWSForm ? awsRequiredFields[fieldName] : projectRequiredFields[fieldName];

    if (!rules) return true;

    let isValid = true;
    let errorMessage = '';

    // Check if empty
    if (field.value.trim() === '') {
        isValid = false;
        errorMessage = rules.message;
    } else if (field.type === 'text' && rules.minLength && field.value.trim().length < rules.minLength) {
        isValid = false;
        errorMessage = rules.message;
    } else if (field.type === 'number') {
        const numValue = parseFloat(field.value);
        if (isNaN(numValue) || (rules.min !== undefined && numValue < rules.min)) {
            isValid = false;
            errorMessage = rules.message;
        }
    }

    // Update UI
    if (isValid) {
        field.parentElement.classList.remove('error');
        if (errorDiv) {
            errorDiv.classList.remove('show');
            errorDiv.textContent = '';
        }
    } else {
        field.parentElement.classList.add('error');
        if (errorDiv) {
            errorDiv.classList.add('show');
            errorDiv.textContent = '✗ ' + errorMessage;
        }
    }

    return isValid;
}

// Setup real-time validation for project form
function setupProjectFormValidation() {
    Object.keys(projectRequiredFields).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!field) return;
        
        field.addEventListener('blur', () => validateField(fieldName, false));
        field.addEventListener('input', () => {
            if (field.parentElement.classList.contains('error')) {
                validateField(fieldName, false);
            }
        });
        field.addEventListener('change', () => {
            if (field.parentElement.classList.contains('error')) {
                validateField(fieldName, false);
            }
        });
    });
}

// Setup real-time validation for AWS form
function setupAWSFormValidation() {
    Object.keys(awsRequiredFields).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!field) return;
        
        field.addEventListener('blur', () => validateField(fieldName, true));
        field.addEventListener('input', () => {
            if (field.parentElement.classList.contains('error')) {
                validateField(fieldName, true);
            }
        });
        field.addEventListener('change', () => {
            if (field.parentElement.classList.contains('error')) {
                validateField(fieldName, true);
            }
        });
    });
}

// Project form submission
document.getElementById('projectForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all required fields
    let allValid = true;
    Object.keys(projectRequiredFields).forEach(fieldName => {
        if (!validateField(fieldName, false)) {
            allValid = false;
        }
    });

    if (!allValid) {
        console.log('Project form has validation errors');
        return;
    }

    // Store project data
    formData.project = {
        projectName: document.getElementById('projectName').value,
        projectType: document.getElementById('projectType').value,
        totalBudgetUSD: parseFloat(document.getElementById('totalBudgetUSD').value),
        totalBudgetINR: parseFloat(document.getElementById('totalBudgetINR').value),
        duration: parseInt(document.getElementById('duration').value),
        teamSize: parseInt(document.getElementById('teamSize').value),
        complexityLevel: document.getElementById('complexityLevel').value,
        stakeholders: parseInt(document.getElementById('stakeholders').value),
        description: document.getElementById('projectDescription').value
    };

    console.log('Project Data Saved:', formData.project);

    // Move to next step
    goToStep(2);
});

// AWS form submission
document.getElementById('awsForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all required fields
    let allValid = true;
    Object.keys(awsRequiredFields).forEach(fieldName => {
        if (!validateField(fieldName, true)) {
            allValid = false;
        }
    });

    if (!allValid) {
        console.log('AWS form has validation errors');
        return;
    }

    // Store AWS data
    formData.aws = {
        accountId: document.getElementById('accountId').value,
        monthlySpendUSD: parseFloat(document.getElementById('monthlySpendUSD').value),
        monthlySpendINR: parseFloat(document.getElementById('monthlySpendINR').value),
        ec2Instances: parseInt(document.getElementById('ec2Instances').value),
        s3Storage: parseInt(document.getElementById('s3Storage').value),
        rdsInstances: parseInt(document.getElementById('rdsInstances').value),
        lambdaInvocations: parseInt(document.getElementById('lambdaInvocations').value),
        instanceDetails: {
            type: document.getElementById('instanceType').value || 'Not specified',
            region: document.getElementById('region').value || 'Not specified',
            runningHours: document.getElementById('runningHours').value || 'Not specified',
            cpuUtilization: document.getElementById('cpuUtilization').value || 'Not specified'
        }
    };

    // Log complete form data
    console.log('Complete Form Data:', formData);

    // Show success message
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('show');
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);

    // Here you would typically send data to backend
    // Example: sendToBackend(formData);
});

// Navigate to step
function goToStep(step) {
    if (step < 1 || step > totalSteps) return;

    // Hide current step
    document.getElementById(`step${currentStep}`).classList.remove('active');
    
    // Update progress
    document.querySelectorAll('.progress-step').forEach(el => {
        el.classList.remove('active');
    });

    // Show new step
    currentStep = step;
    document.getElementById(`step${currentStep}`).classList.add('active');
    document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');

    // Setup validation for the new step
    if (currentStep === 1) {
        setupProjectFormValidation();
    } else if (currentStep === 2) {
        setupAWSFormValidation();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Previous step
function previousStep() {
    goToStep(currentStep - 1);
}

// Go to home
function goToHome() {
    if (confirm('Are you sure you want to go back to home? Your progress will be lost.')) {
        window.location.href = '/';
    }
}

// Format account ID input (only numbers)
document.addEventListener('DOMContentLoaded', function() {
    // Setup currency conversions
    setupCurrencyConversion('totalBudgetUSD', 'totalBudgetINR');
    setupCurrencyConversion('monthlySpendUSD', 'monthlySpendINR');

    const accountIdField = document.getElementById('accountId');
    if (accountIdField) {
        accountIdField.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 12);
        });
    }

    // Setup initial validation
    setupProjectFormValidation();

    // Setup exit button
    document.querySelector('.exit-btn').addEventListener('click', function() {
        if (confirm('Are you sure you want to exit?')) {
            window.location.href = '/';
        }
    });

    // Setup add instance button
    const addInstanceBtn = document.getElementById('addInstanceBtn');
    if (addInstanceBtn) {
        addInstanceBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Add instance feature would create additional instance details sections');
        });
    }

    // Log conversion rate info
    console.log(`Currency conversion rate: 1 USD = ₹${USD_TO_INR_RATE}`);
});