import React from 'react';
import { Layout } from 'antd';

import TableCS2 from "../components/TableCS2";
import TableDOTA2 from "../components/TableDOTA2";
// import SendData from "../utils/SendData";
import MatchesListCs2 from "../components/etl/MatchesListCS2";
import CS2PlayerRating from "../components/CS2PlayerRating";

const API = () => {

    return (
        <>
        <Layout>
        <Layout.Content style={{ padding: "10px", width: "80%", margin: "0 auto" }}>
            <MatchesListCs2 />
            <CS2PlayerRating />
            <TableCS2 />
            <TableDOTA2 />
        </Layout.Content>
        </Layout>
        </>
    )
}
export default API;
