import React from 'react';

const FormErrorMessage = ({ message }) => {
    if(message) {
        return <span className="error-message">{message}</span>
    }
}

export default FormErrorMessage
