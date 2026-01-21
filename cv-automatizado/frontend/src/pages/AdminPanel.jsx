import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import CursosAdmin from "../components/admin/CursosAdmin";
import ExperienciaAdmin from "../components/admin/ExperienciaAdmin";
import ReconocimientosAdmin from "../components/admin/ReconocimientosAdmin";
import CVPreview from "../components/cv/CVPreview";
import TemplateSelector from "../components/cv/TemplateSelector";
import PerfilesAdmin from "../components/admin/PerfilesAdmin";
import CVProgressBar from "../components/cv/CVProgressBar";
import CVActions from "../components/cv/CVActions";
//import CVPrint from "../components/cv/CVPrint";
import { usePerfil } from "../context/PerfilContext";
import { useCV } from "../context/CVContext";

export default function AdminPanel() {
  const { perfil } = usePerfil();
  const { loading, cvData} = useCV();
  const [template, setTemplate] = useState("template1"); 
  //const [tab, setTab] = useState("perfiles");
  const [searchParams, setSearchParams] = useSearchParams();

  const VALID_TABS = ["perfiles", "experiencia", "cursos", "reconocimientos"];

  const tabFromUrl = searchParams.get("tab");

  const tab = VALID_TABS.includes(tabFromUrl)
    ? tabFromUrl
    : "perfiles";

  const setTab = (newTab) => {
    setSearchParams({ tab: newTab });
  };
  const renderTab = () => {
    if (tab === "perfiles") return <PerfilesAdmin />;
    if (!perfil) {
      return (
        <div className="text-gray-500 text-center mt-10">
          Selecciona un perfil para continuar
        </div>
      );
    }
    if (tab === "experiencia") return <ExperienciaAdmin />;
    if (tab === "cursos") return <CursosAdmin />;
    if (tab === "reconocimientos") return <ReconocimientosAdmin />;
  };

  useEffect(() => {
  if (!perfil) {
    setTab("perfiles");
  }
}, [perfil]);

  return (
    <div className="admin-ui">

      <div className="h-screen flex overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar tab={tab} setTab={setTab} />

        {/* Panel central (formularios) */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#f5f7fb]">
          <div className="bg-white rounded-xl shadow-sm border p-5">
            {renderTab()}
          </div>
        </div>

        {/* Preview CV */}
        <div className="w-[45%] bg-[#f0f3f8] overflow-y-auto p-4 flex flex-col gap-4">

          {/* CV PREVIEW */}
          <div className="flex justify-center items-start w-full max-w-[900px] max-h-[calc(100vh-140px)] mx-auto overflow-y-auto overflow-x-hidden">
            {!perfil ? (
              <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                Selecciona un perfil para ver el CV
              </div>
            ) : loading ? (
              <div className="flex items-center gap-3 text-gray-500">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-600" />
                Cargando preview del CV...
              </div>
            ) : (
              <div className="bg-gray-200 p-3 rounded-xl shadow-inner overflow-hiddenr">
                <div className="scale-[0.85] mx-auto inline-block">
                  <CVPreview template={template} mode="admin"/>
                </div>
              </div>
            )}
          </div>
          
          {/* BLOQUE UNIFICADO */}
          <div className="bg-white rounded-xl shadow p-4 space-y-4">
          
            {/* PROGRESO */}
            <CVProgressBar cvData={cvData} />
          
            {/* SEPARADOR */}
            <div className="border-t" />
          
            {/* PLANTILLAS */}
            <TemplateSelector
              template={template}
              setTemplate={setTemplate}
              disabled={!perfil}
            />

            {/* ACCIONES PDF */}
            <CVActions disabled={!perfil}/>
          </div>
        </div>
      </div>
    </div>
  );
}

