import { useState } from "react";
import Etl4FinalReport from "../components/etl/Etl4FinalReport";
import Gallery from "../components/etl/GalleryETL4";
import EtlLink from "../components/etl/EtlLinks";
import TournamentDescription from "../components/etl/TournamentDescription";
import Etl2FinalReport from "../components/etl/Etl2FinalReport";
import Etl3FinalReport from "../components/etl/Etl3FinalReport";

const ETL = () => {
    // State для отслеживания видимости контента ETL
    const [showEtl2Content, setShowEtl2Content] = useState(false);
    const [showEtl3Content, setShowEtl3Content] = useState(false);
    const [showEtl4Content, setShowEtl4Content] = useState(false);
    const [showGallery, setShowGallery] = useState(false); // Состояние для галереи

    // Функции переключения видимости с учетом других открытых секций
    const toggleEtl2Content = () => {
        if (showEtl2Content) {
            // Если контент уже показан, просто скрываем его
            setShowEtl2Content(false);
        } else {
            // Если контент скрыт, показываем его и скрываем другие
            setShowEtl2Content(true);
            setShowEtl3Content(false);
            setShowEtl4Content(false);
            setShowGallery(false);
        }
    };

    const toggleEtl3Content = () => {
        if (showEtl3Content) {
            // Если контент уже показан, просто скрываем его
            setShowEtl3Content(false);
        } else {
            // Если контент скрыт, показываем его и скрываем другие
            setShowEtl3Content(true);
            setShowEtl2Content(false);
            setShowEtl4Content(false);
            setShowGallery(false);
        }
    };

    const toggleEtl4Content = () => {
        if (showEtl4Content) {
            // Если контент уже показан, просто скрываем его
            setShowEtl4Content(false);
            setShowGallery(false); // Также скрываем галерею
        } else {
            // Если контент скрыт, показываем его и скрываем другие
            setShowEtl4Content(true);
            setShowEtl2Content(false);
            setShowEtl3Content(false);
        }
    };

    // Функция для переключения галереи без влияния на ETL4
    const toggleGallery = () => {
        setShowGallery(!showGallery);
    };

    // Текст кнопок в зависимости от состояния
    const etl1ButtonText = "Читать";
    const etl2ButtonText = showEtl2Content ? "Скрыть" : "Читать";
    const etl3ButtonText = showEtl3Content ? "Скрыть" : "Читать";
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
                onToggleETL2={toggleEtl2Content}
                onToggleETL3={toggleEtl3Content}
                onToggleETL4={toggleEtl4Content}
            />

            {/* Условное отображение контента ETL */}
            {showEtl2Content && (
                <Etl2FinalReport style={{ maxWidth: "80%", margin: "0 auto", padding: 20 }} />
            )}

            {showEtl3Content && (
                <Etl3FinalReport style={{ maxWidth: "80%", margin: "0 auto", padding: 20 }} />
            )}

            {showEtl4Content && (
                <>
                    <Etl4FinalReport />
                    <div style={{ maxWidth: "80%", margin: "0 auto", padding: 20 }}>
                        {/* Кнопка для показа/скрытия галереи */}
                        <button
                            onClick={toggleGallery}
                            style={{
                                display: "block",
                                width: "fit-content",
                                margin: "20px auto",
                                padding: "10px 20px",
                                backgroundColor: "#FEA202",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            {showGallery ? "Скрыть фотоотчет" : "Посмотреть фотоотчет"}
                        </button>
                        {/* Условное отображение галереи */}
                        {showGallery && <Gallery />}
                    </div>
                </>
            )}
        </>
    );
};

export default ETL;

// import { useState } from "react";
// import Etl4FinalReport from "../components/etl/Etl4FinalReport";
// import Gallery from "../components/etl/GalleryETL4";
// import EtlLink from "../components/etl/EtlLinks";
// import TournamentDescription from "../components/etl/TournamentDescription";
// import Etl2FinalReport from "../components/etl/Etl2FinalReport";
// import Etl3FinalReport from "../components/etl/Etl3FinalReport";

// const ETL = () => {
//     // State для отслеживания видимости контента ETL
//     const [showEtl2Content, setShowEtl2Content] = useState(false);
//     const [showEtl3Content, setShowEtl3Content] = useState(false);
//     const [showEtl4Content, setShowEtl4Content] = useState(false);
//     const [showGallery, setShowGallery] = useState(false); // Новое состояние для галереи

//     // Функции переключения видимости
//     const toggleEtl2Content = () => setShowEtl2Content(!showEtl2Content);
//     const toggleEtl3Content = () => setShowEtl3Content(!showEtl3Content);
//     const toggleEtl4Content = () => setShowEtl4Content(!showEtl4Content);
//     const toggleGallery = () => setShowGallery(!showGallery); // Функция для переключения галереи

//     // Текст кнопок
//     const etl1ButtonText = "Читать";
//     const etl2ButtonText = showEtl2Content ? "Скрыть" : "Читать";
//     const etl3ButtonText = showEtl3Content ? "Скрыть" : "Читать";
//     const etl4ButtonText = showEtl4Content ? "Скрыть" : "Читать";
//     const etl5ButtonText = "Читать";
//     const etl6ButtonText = "Читать";
//     const etl7ButtonText = "Читать";
//     const etl8ButtonText = "Читать";

//     return (
//         <>
//             <TournamentDescription />
//             <EtlLink
//                 etl1ButtonText={etl1ButtonText}
//                 etl2ButtonText={etl2ButtonText}
//                 etl3ButtonText={etl3ButtonText}
//                 etl4ButtonText={etl4ButtonText}
//                 etl5ButtonText={etl5ButtonText}
//                 etl6ButtonText={etl6ButtonText}
//                 etl7ButtonText={etl7ButtonText}
//                 etl8ButtonText={etl8ButtonText}
//                 onToggleETL2={toggleEtl2Content}
//                 onToggleETL3={toggleEtl3Content}
//                 onToggleETL4={toggleEtl4Content}
//             />

//             {/* Условное отображение контента ETL */}
//             {showEtl2Content && (
//                 <Etl2FinalReport style={{ maxWidth: "80%", margin: "0 auto", padding: 20 }} />
//             )}

//             {showEtl3Content && (
//                 <Etl3FinalReport style={{ maxWidth: "80%", margin: "0 auto", padding: 20 }} />
//             )}

//             {showEtl4Content && (
//                 <>
//                     <Etl4FinalReport />
//                     <div style={{ maxWidth: "80%", margin: "0 auto", padding: 20 }}>
//                         {/* Кнопка для показа/скрытия галереи */}
//                         <button
//                             onClick={toggleGallery}
//                             style={{
//                                 display: "block",
//                                 width: "fit-content",
//                                 margin: "20px auto",
//                                 padding: "10px 20px",
//                                 backgroundColor: "#FEA202",
//                                 color: "#fff",
//                                 border: "none",
//                                 borderRadius: "5px",
//                                 cursor: "pointer",
//                             }}
//                         >
//                             {showGallery ? "Скрыть фотоотчет" : "Посмотреть фотоотчет"}
//                         </button>
//                         {/* Условное отображение галереи */}
//                         {showGallery && <Gallery />}
//                     </div>
//                 </>
//             )}
//         </>
//     );
// };

// export default ETL;

// import { useState } from "react";
// import Etl4FinalReport from "../components/etl/Etl4FinalReport";
// import Gallery from "../components/etl/GalleryETL4";
// import EtlLink from "../components/etl/EtlLinks";
// import TournamentDescription from "../components/etl/TournamentDescription";
// import Etl2FinalReport from "../components/etl/Etl2FinalReport";

// const ETL = () => {
//     // State to track visibility of ETL content
//     const [showEtl2Content, setShowEtl2Content] = useState(false);
//     const [showEtl4Content, setShowEtl4Content] = useState(false);

//     // Toggle function for ETL
//     const toggleEtl2Content = () => { setShowEtl2Content(!showEtl2Content); };
//     const toggleEtl4Content = () => {
//         setShowEtl4Content(!showEtl4Content);
//     };

//     // Button texts
//     const etl1ButtonText = 'Читать';
//     const etl2ButtonText = showEtl2Content ? "скрыть" : "Читать";
//     const etl3ButtonText = "Читать";
//     const etl4ButtonText = showEtl4Content ? "Скрыть" : "Читать";
//     const etl5ButtonText = "Читать";
//     const etl6ButtonText = "Читать";
//     const etl7ButtonText = "Читать";
//     const etl8ButtonText = "Читать";

//     return (
//         <>
//             <TournamentDescription />
//             <EtlLink
//                 etl1ButtonText={etl1ButtonText}
//                 etl2ButtonText={etl2ButtonText}
//                 etl3ButtonText={etl3ButtonText}
//                 etl4ButtonText={etl4ButtonText}
//                 etl5ButtonText={etl5ButtonText}
//                 etl6ButtonText={etl6ButtonText}
//                 etl7ButtonText={etl7ButtonText}
//                 etl8ButtonText={etl8ButtonText}
//                 onToggleETL2={toggleEtl2Content}
//                 onToggleETL4={toggleEtl4Content}
//             />

//             {/* Conditional rendering of ETL content */}
//             {showEtl2Content && (
//                 <>
//                 <Etl2FinalReport style={{ maxWidth: "80%", margin: '0 auto', padding: 20 }} />
//                 </>
//             )}
//             {showEtl4Content && (
//                 <>
//                     <Etl4FinalReport />
//                     <div style={{ maxWidth: "80%", margin: '0 auto', padding: 20 }}>
//                         <Gallery />
//                     </div>
//                 </>
//             )}
//         </>
//     );
// };

// export default ETL;
