import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthenticationComponent } from "../../components";
import { signin, signup, authWithGoogle,authWithFacebook } from '../../store/actions';

class AuthenticationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isHaveAnAccount: true
        };
    }

    onAuthChangeHandler = () => {
        this.setState({ isHaveAnAccount: !this.state.isHaveAnAccount });
    }

    onAuthenticationHandler = (event) => {
        event.preventDefault();
        const { isHaveAnAccount, email, password, error } = this.state;
        if (error) {
            return;
        }
        if (isHaveAnAccount) {
            // login
            this.props.signin({ email, password });
        } else {
            this.props.signup({ email, password });
        }
    }

    onAuthWithGoogle = () => {
        this.props.authWithGoogle();
    }
    
    onAuthWithFacebook = () => {
        this.props.authWithFacebook();
    }

    onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <div>
                <AuthenticationComponent
                    email={this.state.email}
                    password={this.state.password}
                    isHaveAnAccount={this.state.isHaveAnAccount}
                    onAuthenticationHandler={this.onAuthenticationHandler}
                    onAuthChangeHandler={this.onAuthChangeHandler}
                    onChangeHandler={this.onChangeHandler}
                    onAuthWithFacebook={this.onAuthWithFacebook}
                    onAuthWithGoogle={this.onAuthWithGoogle}
                    isLoading={this.props.isLoading}
                />
            </div>
        );
    }
}

const mapStateToProps = (props) => {
    return {
        isLoading: props.auth.isLoading
    };
};

export default connect(mapStateToProps, { signin, signup, authWithGoogle,authWithFacebook })(AuthenticationContainer);
