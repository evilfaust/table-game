import React from "react";
// import TournamentBracket from "../components/TournamentBracket";
import { Layout } from 'antd';
import TableCS2 from "../components/TableCS2";
import TableDOTA2 from "../components/TableDOTA2";


const ESL = () => {
    return (
        <>
        <Layout>
        <Layout.Content style={{ padding: "10px", width: "80%", margin: "0 auto" }}>
            <TableCS2 />
            <TableDOTA2 />
        </Layout.Content>
        </Layout>
        {/* <div>
            <h1>ESL</h1>
        {/* <TournamentBracket /> 
        </div> */}
        </>

    )
}

export default ESL