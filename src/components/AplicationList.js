
import React from 'react';
import AllApplicationsSummary from "./AllApplicationsSummary";
import {Layout} from 'antd';
import ApplicationStatus from "./ApplicationStatus";

const AplicationList = () => {

    return (
        <>
            <Layout style={{ padding: '20px' }}>
            <ApplicationStatus />
            <AllApplicationsSummary />
            </Layout>
        </>
    )
}

export default AplicationList;
