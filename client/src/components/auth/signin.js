import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; 
import { connect } from 'react-redux';
import * as actions from '../../actions';


class Signin extends Component{

    renderField(field){
        return (
            <fieldset className="form-group">
                <label>{field.label}:</label>
                <input {...field.input} type={field.type} className="form-control" />
            </fieldset>
        )
    }

    handleFormSubmit = ({email, password}) => {
        console.log(email, password);
        console.log(this.props);
        // Need to do something to log user in

        this.props.signinUser({email, password});

    }

    renderAlert(){
        if(this.props.errorMessage){
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render(){
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Field 
                    label="Email"
                    type="email"
                    name="email"
                    component={this.renderField}
                />
                <Field 
                    label="Password"
                    type="password"
                    name="password"
                    component={this.renderField}
                />
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        )

    }
}

function mapStateToProps(state){
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form:'signin'
})(
    connect(mapStateToProps, actions)(Signin)
)

