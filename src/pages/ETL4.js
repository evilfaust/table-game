import Etl4FinalReport from "../components/etl/Etl4FinalReport";
import Gallery from "../components/etl/GalleryETL4";
import EtlLink from "../components/etl/EtlLinks";


const ETL4 = () => {


    const etl1ButtonText = 'Читать';
    const etl2ButtonText = "Читать";
    const etl3ButtonText = "Читать";
    const etl4ButtonText = "Читать";
    const etl5ButtonText = "Читать";
    const etl6ButtonText = "Читать";
    const etl7ButtonText = "Читать";
    const etl8ButtonText = "Читать";







    return (
        <>
            <EtlLink
                etl1ButtonText={etl1ButtonText}
                etl2ButtonText={etl2ButtonText}
                etl3ButtonText={etl3ButtonText}
                etl4ButtonText={etl4ButtonText}
                etl5ButtonText={etl5ButtonText}
                etl6ButtonText={etl6ButtonText}
                etl7ButtonText={etl7ButtonText}
                etl8ButtonText={etl8ButtonText}
            />
            <Etl4FinalReport />
            <div style={{ maxWidth: "80%", margin: '0 auto', padding: 20 }}>
                <Gallery />
            </div>
            
        </>
    )
}

export default ETL4