import React from "react";

const DashboardComponent = (props) => {
    const { user = {}, onSignout } = props;
    // console.log(user)
    return (
        <React.Fragment>
            <button onClick={() => { onSignout() }}>Sign out</button>
            <h1>Hello {user.displayName || user.email}</h1>
            <h2>Email {user.emailVerified ? "verified" : "non-verified"}</h2>
        </React.Fragment>
    );
};
export default DashboardComponent;