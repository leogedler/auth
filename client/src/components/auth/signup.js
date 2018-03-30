import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

    renderField(field) {
        const { meta: { touched, error } } = field;

        console.log('error', error);
        return (
            <fieldset className="form-group">
                <label>{field.label}:</label>
                <input {...field.input} type={field.type} className="form-control" />
                <div className="error">
                    {touched ? error : ''}
                </div>
            </fieldset>
        )
    }

    handleFormSubmit = (values) => {
        console.log('Submit', values);
        // Call action creator
        this.props.signupUser(values);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Field
                    label="Email"
                    name="email"
                    type="email"
                    component={this.renderField}
                />
                <Field
                    label="Password"
                    name="password"
                    type="password"
                    component={this.renderField}
                />
                <Field
                    label="Confirm Password"
                    name="passwordConfirm"
                    type="password"
                    component={this.renderField}
                />
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up!</button>
            </form>
        )
    }
}


function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Please enter an email'
    }

    if (!values.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation'
    }

    if (!values.password) {
        errors.password = 'Please enter a password'
    }

    if (values.password !== values.passwordConfirm) {
        errors.password = 'Passwords must match';
    }

    return errors;
}


function mapStateToProps(state) {
    return { errorMessage: state.auth.error }
}

export default reduxForm({
    form: 'signup',
    validate
})(
    connect(mapStateToProps, actions)(Signup)
);