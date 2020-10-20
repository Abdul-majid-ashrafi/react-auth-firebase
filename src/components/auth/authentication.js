import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const AuthenticationComponent = (props) => {
    const {
        email,
        password,
        isHaveAnAccount,
        onAuthenticationHandler,
        onAuthChangeHandler,
        onChangeHandler,
        isLoading,
        onAuthWithFacebook,
        onAuthWithGoogle
    } = props;
    return (
        <div>
            {(isLoading) ? <h1>Prosessing..</h1> : null}

            {(isHaveAnAccount) ? <h1>Sign In</h1> : <h1>Sign Up</h1>
            }
            <div>
                <form>
                    <label htmlFor="userEmail">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="E.g: majid@gmail.com"
                        id="userEmail"
                        onChange={(event) => onChangeHandler(event)}
                    />
                    <label htmlFor="userPassword">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Your Password"
                        id="userPassword"
                        onChange={(event) => onChangeHandler(event)}
                    />
                    <button onClick={(event) => { onAuthenticationHandler(event, email, password) }}>
                        {(isHaveAnAccount) ? "Sign In" : "Sign Up"}
                    </button>
                </form>

                <p>or</p>
                <button onClick={() => { onAuthWithGoogle() }}> Auth With Google</button>
                <button onClick={() => { onAuthWithFacebook() }}> Auth With Faeebook</button>
                <p>
                    {(isHaveAnAccount) ?
                        <React.Fragment>
                            Don't have an account?
                    <Button type="link" onClick={() => { onAuthChangeHandler() }}>
                                Sign up here
                    </Button>
                        </React.Fragment> :
                        <React.Fragment>
                            have an account?
                 <Button type="link" onClick={() => { onAuthChangeHandler() }}>
                                Sign in here
                 </Button>
                        </React.Fragment>

                    }
                    <br />
                    <br />
                    <Link to="passwordReset">
                        Forgot Password?
                    </Link>
                </p>
            </div>
        </div>
    );
};
export default AuthenticationComponent;