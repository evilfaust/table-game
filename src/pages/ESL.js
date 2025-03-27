import React from "react";
// import TournamentBracket from "../components/TournamentBracket";
import { Layout } from 'antd';
// import TableCS2 from "../components/TableCS2";
// import TableDOTA2 from "../components/TableDOTA2";
import LeagueDashboard from "../components/LeagueDashboard";
// import VideoFeed from "../components/base/VideoFeed";
// import TournamentList from "../components/TournamentList";
// import MatchesListCs2 from "../components/etl/MatchesListCs2";
// import CS2PlayerRating from "../components/CS2PlayerRating";

import {useMediaQuery} from "react-responsive";



const ESL = () => {
    // Мобильная версия
  const isMobile = useMediaQuery({ maxWidth: 768 });
    return (
        <>
        <Layout>
        <Layout.Content style={{ padding: "10px", width: isMobile ? "97%" : "80%", margin: "0 auto" }}>
            <LeagueDashboard />
            {/* <VideoFeed /> */}
            {/* <MatchesListCs2 />
            <CS2PlayerRating /> */}
            {/*<TableCS2 />*/}
            {/*<TableDOTA2 />*/}
        </Layout.Content>
        </Layout>
        {/*<div>*/}
        {/*    <h1>ESL</h1>*/}
        {/* <TournamentBracket tournamentIdentifier="3s6p9ikb" /> */}
        {/* <TournamentList /> */}
        {/*</div>*/}
        </>

    )
}

export default ESL