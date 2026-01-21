import Modal from "../ui/Modal";
//import useModal from "../../hooks/useModal";
import { useEffect, useState } from "react";
import { authFetch } from "../../api/authFetch";
import FormExperiencia from "./FormExperiencia";
import ExperienciaFilter from "./ExperienciaFilter";
import { usePerfil } from "../../context/PerfilContext";
import { useCV } from "../../context/CVContext";
import Spinner from "../ui/Spinner";
import SkeletonCard from "../ui/Skeleton/SkeletonCard";
import ConfirmOverlay from "../ui/ConfirmOverlay";


export default function ExperienciaAdmin() {
  const { perfil } = usePerfil();
  const [openModal, setOpenModal] = useState(false); // Modal
  const { cvData, toggleItem, setCvData , cargarCV} = useCV();
  const [saving, setSaving] = useState(false); // Guarda / edita datos
  const [editando, setEditando] = useState(null);
  const [loadingList, setLoadingList] = useState(true); // Estado local de carga visual
  const [skeletonCount, setSkeletonCount] = useState(3); // Estado local: cantidad de skeletons
  const [togglingId, setTogglingId] = useState(null); // Estado local de animación por ID (Pulsar Toogle)
  // Estados de ConfirmOverlay
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

   
  const [filtros, setFiltros] = useState({
    cargo: "",
    empresa: ""
  });

  useEffect(() => {
  if (!cvData?.experiencia_laboral) return;

  const total = cvData.experiencia_laboral.length || 1;
  setSkeletonCount(Math.max(1, total));

  setLoadingList(true);

  const t = setTimeout(() => {
    setLoadingList(false);
  }, 500);

  return () => clearTimeout(t);
}, [cvData?.experiencia_laboral?.length]);

  // 🔐 Seguridad: si no hay perfil o CV
  if (!perfil || !cvData) {
    return (
      <div className="text-gray-500 text-center mt-10">
        Selecciona un perfil para continuar
      </div>
    );
  }



  // Fuente ÚNICA de experiencia
  const experiencia = cvData.experiencia_laboral || [];

  const filtrados = experiencia.filter(exp => {
    const cargo = exp.cargodesempenado?.toLowerCase() || "";
    const empresa = exp.nombrempresa?.toLowerCase() || "";

    return (
      cargo.includes(filtros.cargo.toLowerCase()) &&
      empresa.includes(filtros.empresa.toLowerCase())
    );
  });

  /* =========================
     GUARDAR / EDITAR
     ========================= */
  const guardar = async (data) => {
    setSaving(true);
    const url = editando
      ? `http://localhost:8000/api/admin/experiencia/${editando.idexperiencilaboral}/`
      : "http://localhost:8000/api/admin/experiencia/";

    await authFetch(url, {
      method: editando ? "PUT" : "POST",
      body: JSON.stringify({
        ...data,
        idperfil: perfil.idperfil
      })
    });

    setEditando(null);
    await cargarCV();   // 🔄 refresca CV global
    setSaving(false);
  };

  /* =========================
     ELIMINAR
     ========================= */
  const solicitarEliminar = (exp) => {
    setDeleteTarget(exp);
    setConfirmOpen(true);
  };

  const confirmarEliminar = async () => {
    if (!deleteTarget) return;

    await authFetch(
      `http://localhost:8000/api/admin/experiencia/${deleteTarget.idexperiencilaboral}/`,
      { method: "DELETE" }
    );

    // 🔄 eliminar del estado global
    setCvData({
      ...cvData,
      experiencia_laboral: experiencia.filter(
        exp => exp.idexperiencilaboral !== deleteTarget.idexperiencilaboral
      )
    });

    setConfirmOpen(false);
    setDeleteTarget(null);
  };


  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Experiencia – {perfil?.nombres} {perfil?.apellidos}
        </h1>

        <button
          onClick={() => {
            setEditando(null);
            setOpenModal(true);
          }}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          + Experiencia
        </button>
      </div>


      {/* FILTROS */}
      <ExperienciaFilter
        filtros={filtros}
        setFiltros={setFiltros}
      />
      {/* MODAL FORM */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={editando ? "✏️ Editar experiencia" : "➕ Nueva experiencia"}
      >
        <FormExperiencia
          initialData={editando}
          onSave={async (data) => {
            await guardar(data);
            setOpenModal(false);
          }}
          onCancel={() => setOpenModal(false)}
        />
      </Modal>


      {/* LISTADO */}
      {saving ? (<Spinner texto="Guardando experiencia..."/>
        ) : loadingList ? (
          <div className="grid gap-4">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <SkeletonCard 
              key={i} 
              delay={i * 120} // 👈 STAGGER REAL
               />
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {filtrados.map((exp, index) => (
              <div
                key={exp.idexperiencilaboral}
                // Wrapper animado para cada card
                className="animate-fade-slide"
                style={{
                  animationDelay: `${index * 60}ms`,
                  animationFillMode: "both"
                }}
              >
                <div
                  className={`
                    bg-white p-5 rounded-xl shadow transition-all duration-300
                    ${togglingId === exp.idexperiencilaboral
                      ? "opacity-70 scale-[0.98]"
                      : "opacity-100 scale-100"}
                  `}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {exp.cargodesempenado}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {exp.nombrempresa}
                      </p>

                      {exp.descripcionfunciones && (
                        <p className="text-sm text-gray-500 mt-2">
                          {exp.descripcionfunciones}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 items-end">
                      <button
                        onClick={() => {
                          setEditando(exp);
                          setOpenModal(true);
                        }}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => solicitarEliminar(exp)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Eliminar
                      </button>

                      {/* 🔥 TOGGLE LIVE UPDATE */}
                      <button
                        onClick={async () => {
                          // Marca la card cuando se hace toggle
                          setTogglingId(exp.idexperiencilaboral);
                          // 1️⃣ Update instantáneo
                          const rollback = toggleItem(
                            "experiencia_laboral",
                            "idexperiencilaboral",
                            exp.idexperiencilaboral
                          );

                          try {
                            // 2️⃣ Sync backend
                            await authFetch(
                              `http://localhost:8000/api/admin/experiencia/${exp.idexperiencilaboral}/`,
                              {
                                method: "PUT",
                                body: JSON.stringify({
                                  ...exp,
                                  activarparaqueseveaenfront:
                                    !exp.activarparaqueseveaenfront
                                })
                              }
                            );
                          } catch (e) {
                            // 3️⃣ Rollback si falla
                            setCvData(rollback);
                            alert("Error al actualizar visibilidad");
                          } finally {
                            setTimeout(() => setTogglingId(null), 300);
                          }
                        }}
                        className={`text-sm font-medium ${
                          exp.activarparaqueseveaenfront
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        {exp.activarparaqueseveaenfront
                          ? "Visible en CV"
                          : "Oculto"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filtrados.length === 0 && (
              <p className="text-center text-gray-500">
                No hay experiencias que coincidan con el filtro
              </p>
            )}
          </div>)}
          <ConfirmOverlay
            open={confirmOpen}
            title="🗑️ Eliminar experiencia"
            message={`¿Seguro que deseas eliminar "${deleteTarget?.cargodesempenado}"?`}
            confirmText="Sí, eliminar"
            onCancel={() => {
              setConfirmOpen(false);
              setDeleteTarget(null);
            }}
            onConfirm={confirmarEliminar}
          />
    </div>
  );
}
