import React from 'react';

export const ErrorMessage = (props) => {
    const error = props.errors && props.errors.find(field => field.param === props.field);
    if (error){
        return (
            <span className="text-danger">{error.msg}</span>
        )
    } else {
        return ''
    }
}