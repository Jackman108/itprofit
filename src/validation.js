export function validateForm(formData) {
    const errors = {};

    const errorMessages = {
        'name': 'Name is required',
        'email': 'Invalid email address',
        'phone': 'Invalid phone number',
        'message': 'Message is required'
    };

    formData.forEach((value, key) => {
        if (!value.trim()) {
            errors[key] = errorMessages[key];
        } else if (key === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            errors[key] = errorMessages[key];
        } else if (key === 'phone' && !/^(\+7 \(\d{3}\) \d{3}-\d{2}-\d{2})$/.test(value)) {
            errors[key] = errorMessages[key];
        }
    });

    return errors;
}
