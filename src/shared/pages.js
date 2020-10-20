import React from 'react';
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

export const NoRecordFound = (props) => {
    return (
        <div className='noRecord' style={{ top: props.daily ? '17%' : '', left: props.daily ? '25%' : '' }}>
            <h1>{props.children ? props.children : 'No Kitchen Available'}</h1>
            {/* <button type='primary' className='createWeeklyDealsCloseModal continue-button background-color' onClick={history.goBack}>Back</button> */}
        </div>
    )
}

export const PageNotFound = () => {
    return (
        <Result
            status='404'
            title='404 That’s an error.'
            subTitle='The requested URL was not found on this server'
            extra={
                <Link to='/'>
                    <Button type='primary'>Back Home</Button>
                </Link>
            }
        />
    );
};