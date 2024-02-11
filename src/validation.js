export default function validateForm(formDataObject) {
    const errors = {};

    const errorMessages = {
        'name': 'Name is required',
        'email': 'Invalid email address',
        'phone': 'Invalid phone number',
        'message': 'Message is required'
    };

    Object.keys(formDataObject).forEach((key) => {
        const value = formDataObject[key];
        if (!value.trim()) {
            errors[key] = errorMessages[key];
        } else if (key === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            errors[key] = errorMessages[key];
        } else if (key === 'phone' && !/^(\+7 \(\d{3}\) \d{3}-\d{2}-\d{2})$/.test(value)) {
            errors[key] = errorMessages[key];
        }
    });

    if (Object.keys(errors).length > 0) {
        return {
            status: "error",
            fields: errors
        };
    } else {
        return {}; 
    }
}
