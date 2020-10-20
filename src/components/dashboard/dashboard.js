import React from "react";

const DashboardComponent = (props) => {
    const { user = {}, onSignout } = props;
    return (
        <React.Fragment>
            <button onClick={() => { onSignout() }}>Sign out</button>
            <h1>Hello {user.displayName || user.email}</h1>
        </React.Fragment>
    );
};
export default DashboardComponent;