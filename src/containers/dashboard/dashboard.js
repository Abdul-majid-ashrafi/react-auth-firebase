import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signout } from '../../store/actions';
import { DashboardComponent } from '../../components';

export class DashboardContainer extends Component {

    onSignout = () => {
        this.props.signout();
    }

    render() {
        return (
            <React.Fragment>
                <DashboardComponent
                    onSignout={this.onSignout}
                    user={this.props.user}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (props) => {
    console.log(props)
    return {
        user: props.auth.user
    }
}
export default connect(mapStateToProps, { signout })(DashboardContainer);