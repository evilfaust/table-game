import { useState } from "react";
import Etl4FinalReport from "../components/etl/Etl4FinalReport";
import Gallery from "../components/etl/GalleryETL4";
import EtlLink from "../components/etl/EtlLinks";
import TournamentDescription from "../components/etl/TournamentDescription";

const ETL = () => {
    // State to track visibility of ETL4 content
    const [showEtl4Content, setShowEtl4Content] = useState(false);

    // Toggle function for ETL4
    const toggleEtl4Content = () => {
        setShowEtl4Content(!showEtl4Content);
    };

    // Button texts
    const etl1ButtonText = 'Читать';
    const etl2ButtonText = "Читать";
    const etl3ButtonText = "Читать";
    const etl4ButtonText = showEtl4Content ? "Скрыть" : "Читать";
    const etl5ButtonText = "Читать";
    const etl6ButtonText = "Читать";
    const etl7ButtonText = "Читать";
    const etl8ButtonText = "Читать";

    return (
        <>
            <TournamentDescription />
            <EtlLink
                etl1ButtonText={etl1ButtonText}
                etl2ButtonText={etl2ButtonText}
                etl3ButtonText={etl3ButtonText}
                etl4ButtonText={etl4ButtonText}
                etl5ButtonText={etl5ButtonText}
                etl6ButtonText={etl6ButtonText}
                etl7ButtonText={etl7ButtonText}
                etl8ButtonText={etl8ButtonText}
                onToggleETL4={toggleEtl4Content}
            />

            {/* Conditional rendering of ETL4 content */}
            {showEtl4Content && (
                <>
                    <Etl4FinalReport />
                    <div style={{ maxWidth: "80%", margin: '0 auto', padding: 20 }}>
                        <Gallery />
                    </div>
                </>
            )}
        </>
    );
};

export default ETL;
