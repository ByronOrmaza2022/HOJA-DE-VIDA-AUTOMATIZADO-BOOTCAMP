import Modal from "../ui/Modal";
//import useModal from "../../hooks/useModal";
import { useEffect, useState } from "react";
import { authFetch } from "../../api/authFetch";
import FormCurso from "./FormCurso";
import CursoFilter from "./CursosFilter";
import { usePerfil } from "../../context/PerfilContext";
import { useCV } from "../../context/CVContext";
import Spinner from "../ui/Spinner";
import SkeletonCard from "../ui/Skeleton/SkeletonCard";
import ConfirmOverlay from "../ui/ConfirmOverlay";

export default function CursosAdmin() {
  const { perfil } = usePerfil();
  const { cvData, toggleItem, setCvData, cargarCV } = useCV();
  const [openModal, setOpenModal] = useState(false); // Modal
  const [saving, setSaving] = useState(false); // Guarda o edita datos
  const [loadingList, setLoadingList] = useState(true); // Estado local de carga visual
  const [skeletonCount, setSkeletonCount] = useState(3); // Estado local: cantidad de skeletons
  const [togglingId, setTogglingId] = useState(null); // Estado local de animación por ID (Pulsar Toogle) 
  // Estados de ConfirmOverlay
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [editando, setEditando] = useState(null);
  const [filtros, setFiltros] = useState({
    nombre: "",
    institucion: ""
  });
  
   useEffect(() => {
    if (!cvData?.cursos) return;

    const total = cvData.cursos.length || 1;
    setSkeletonCount(Math.max(1, total));
    
    setLoadingList(true);

    const t = setTimeout(() => {
      setLoadingList(false);
    }, 500); // ⏱️ tiempo mínimo visible

    return () => clearTimeout(t);
  }, [cvData?.cursos?.length]);

  // 🛡️ Seguridad: si no hay perfil o CV
  if (!perfil || !cvData) {
    return (
      <div className="text-gray-500 text-center mt-10">
        Selecciona un perfil para continuar
      </div>
    );
  }

  // 📌 Fuente ÚNICA
  const cursos = cvData.cursos || [];

  const filtrados = cursos.filter(curso => {
    const nombre = curso.nombrecurso?.toLowerCase() || "";
    const institucion = curso.entidadpatrocinadora?.toLowerCase() || "";

    return (
      nombre.includes(filtros.nombre.toLowerCase()) &&
      institucion.includes(filtros.institucion.toLowerCase())
    );
  });

  /* =========================
     GUARDAR / EDITAR
     ========================= */
  const guardar = async (data) => {
    setSaving(true);

    const url = editando
      ? `http://localhost:8000/api/admin/cursos/${editando.idcursorealizado}/`
      : "http://localhost:8000/api/admin/cursos/";

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
  const solicitarEliminar = (curso) => {
    setDeleteTarget(curso);
    setConfirmOpen(true);
  };

  const confirmarEliminar = async () => {
    if (!deleteTarget) return;

    await authFetch(
      `http://localhost:8000/api/admin/cursos/${deleteTarget.idcursorealizado}/`,
      { method: "DELETE" }
    );

    // 🔄 eliminar del estado global
    setCvData({
      ...cvData,
      cursos: cursos.filter(
        curso => curso.idcursorealizado !== deleteTarget.idcursorealizado
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
          Cursos de {perfil.nombres} {perfil.apellidos}
        </h1>

        <button
          onClick={() => {
            setEditando(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Curso
        </button>
      </div>

      {/* FILTROS */}
      <CursoFilter filtros={filtros} setFiltros={setFiltros} />
          
      {/* MODAL FORM */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={editando ? "✏️ Editar curso" : "➕ Nuevo curso"}
      >
        <FormCurso
          initialData={editando}
          onSave={async (data) => {
            await guardar(data);
            setOpenModal(false);
          }}
          onCancel={() => setOpenModal(false)}
        />
      </Modal>      
      {/* LISTADO */}
      {saving ? (
        <Spinner texto="Actualizando cursos..." />
        ): loadingList ? (
          <div className="grid gap-4">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <SkeletonCard key={i} delay={i * 120} />
            ))}
          </div>
        ) : (
        <div className="grid gap-4">
          {filtrados
            .filter(curso => curso.idcursorealizado != null) // 🛡️ protección
            .map((curso, index) => (
            <div
              key={curso.idcursorealizado}
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
                    ${togglingId === curso.idcursorealizado
                      ? "opacity-70 scale-[0.98]"
                      : "opacity-100 scale-100"}
                  `}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{curso.nombrecurso}</h3>
                    <p className="text-sm text-gray-600">
                      {curso.entidadpatrocinadora} - {curso.totalhoras} horas
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 items-end">
                    <button
                      onClick={() => {
                        setEditando(curso);
                          setOpenModal(true);
                      }}
                      className="text-blue-600 text-sm"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => solicitarEliminar(curso)}
                      className="text-red-600 text-sm"
                    >
                      Eliminar
                    </button>

                    {/* 🔥 TOGGLE LIVE */}
                    <button
                      onClick={async () => {
                        // Marca la card cuando se hace toggle
                        setTogglingId(curso.idcursorealizado);
                        // 1️⃣ Update instantáneo
                        const rollback = toggleItem(
                          "cursos",
                          "idcursorealizado",
                          curso.idcursorealizado
                        );

                        try {
                          // 2️⃣ Sync backend
                          await authFetch(
                            `http://localhost:8000/api/admin/cursos/${curso.idcursorealizado}/`,
                            {
                              method: "PUT",
                              body: JSON.stringify({
                                ...curso,
                                activarparaqueseveaenfront:
                                  !curso.activarparaqueseveaenfront
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
                        curso.activarparaqueseveaenfront
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {curso.activarparaqueseveaenfront
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
              No hay cursos registrados
            </p>
          )}
        </div>
      )}
      <ConfirmOverlay
        open={confirmOpen}
        title="🗑️ Eliminar experiencia"
        message={`¿Seguro que deseas eliminar "${deleteTarget?.nombrecurso}"?`}
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
