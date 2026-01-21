import Modal from "../ui/Modal";
import { useEffect, useState } from "react";
import { authFetch } from "../../api/authFetch";
import FormReconocimiento from "./FormReconocimiento";
import ReconocimientosFilter from "./ReconocimientosFilter";
import { usePerfil } from "../../context/PerfilContext";
import { useCV } from "../../context/CVContext";
import Spinner from "../ui/Spinner";
import SkeletonCard from "../ui/Skeleton/SkeletonCard";
import ConfirmOverlay from "../ui/ConfirmOverlay";

export default function ReconocimientosAdmin() {
  const { perfil } = usePerfil();
  const [openModal, setOpenModal] = useState(false); // Modal
  const { cvData, toggleItem, setCvData, cargarCV } = useCV();
  const [saving, setSaving] = useState(false);
  const [editando, setEditando] = useState(null);
  const [loadingList, setLoadingList] = useState(true); // Estado local de carga visual
  const [skeletonCount, setSkeletonCount] = useState(3); // Estado local: cantidad de skeletons
  const [togglingId, setTogglingId] = useState(null); // Estado local de animación por ID (Pulsar Toogle) 
  // Estados de ConfirmOverlay
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [filtros, setFiltros] = useState({
    tipo: "",
    entidad: ""
  });
  useEffect(() => {
    if (!cvData?.reconocimientos) return;

    const total = cvData.reconocimientos.length || 1;
    setSkeletonCount(Math.max(1, total));

    setLoadingList(true);

    const t = setTimeout(() => {
      setLoadingList(false);
    }, 500);

    return () => clearTimeout(t);
  }, [cvData?.reconocimientos?.length]);



  // 🔐 Protección: si no hay perfil o CV
  if (!perfil || !cvData) {
    return (
      <div className="text-gray-500 text-center mt-10">
        Selecciona un perfil para continuar
      </div>
    );
  }

  // 🔹 Fuente ÚNICA de datos
  const items = cvData.reconocimientos || [];

  /* =========================
     FILTRADO (SOLO VISUAL)
     ========================= */
  const filtrados = items.filter(item => {
    const tipo = item.tiporeconocimiento?.toLowerCase() || "";
    const entidad = item.entidadpatrocinadora?.toLowerCase() || "";

    return (
      tipo.includes(filtros.tipo.toLowerCase()) &&
      entidad.includes(filtros.entidad.toLowerCase())
    );
  });

  /* =========================
     GUARDAR / EDITAR
     ========================= */
  const guardar = async (data) => {
    setSaving(true);
    const url = editando
      ? `http://localhost:8000/api/admin/reconocimientos/${editando.idreconocimiento}/`
      : "http://localhost:8000/api/admin/reconocimientos/";

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

  const solicitarEliminar = (item) => {
    setDeleteTarget(item);
    setConfirmOpen(true);
  };

  const confirmarEliminar = async () => {
    if (!deleteTarget) return;

    await authFetch(
      `http://localhost:8000/api/admin/reconocimientos/${deleteTarget.idreconocimiento}/`,
      { method: "DELETE" }
    );
    
    // 🔄 Actualiza estado global (sin refetch)
    setCvData({
      ...cvData,
      reconocimientos: items.filter(
        item => item.idreconocimiento !== deleteTarget.idreconocimiento
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
          Reconocimientos – {perfil?.nombres} {perfil?.apellidos}
        </h1>

        <button
          onClick={() => {
            setEditando(null);
            setOpenModal(true);
          }}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          + Reconocimiento
        </button>
      </div>


      {/* FILTROS */}
      <ReconocimientosFilter
        filtros={filtros}
        setFiltros={setFiltros}
      />

      {/* MODAL FORM */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={editando ? "✏️ Editar reconocimiento" : "➕ Nuevo reconocimiento"}
      >
        <FormReconocimiento
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
          <Spinner texto="Guardando reconocimiento"/>
        ) : loadingList ? (
          <div className="grid gap-4">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <SkeletonCard key={i} delay={i * 120}/>
            ))}
          </div>
        ) : (
        <div className="grid gap-4">
          {filtrados
            .filter(item => item.idreconocimiento != null) // 🛡️ protección
            .map((item, index) => (
            <div
                key={item.idreconocimiento}
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
                    ${togglingId === item.idreconocimiento
                      ? "opacity-70 scale-[0.98]"
                      : "opacity-100 scale-100"}
                  `}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.tiporeconocimiento}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.entidadpatrocinadora}
                    </p>

                    {item.descripcion && (
                      <p className="text-sm text-gray-500 mt-2">
                        {item.descripcion}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => {
                          setEditando(item);
                          setOpenModal(true);
                        }}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => solicitarEliminar(item)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Eliminar
                    </button>

                    {/* 🔥 TOGGLE LIVE UPDATE */}
                    <button
                      onClick={async () => {
                        setTogglingId(item.idreconocimiento);
                        // 1️⃣ Update optimista
                        const rollback = toggleItem(
                          "reconocimientos",
                          "idreconocimiento",
                          item.idreconocimiento
                        );

                        try {
                          // 2️⃣ Sync backend
                          await authFetch(
                            `http://localhost:8000/api/admin/reconocimientos/${item.idreconocimiento}/`,
                            {
                              method: "PUT",
                              body: JSON.stringify({
                                ...item,
                                activarparaqueseveaenfront:
                                  !item.activarparaqueseveaenfront
                              })
                            }
                          );
                        } catch {
                          // 3️⃣ Rollback
                          setCvData(rollback);
                          alert("Error al actualizar visibilidad");
                        } finally {
                          setTimeout(() => setTogglingId(null), 300);
                        }
                      }}
                      className={`text-sm font-medium ${
                        item.activarparaqueseveaenfront
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {item.activarparaqueseveaenfront
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
              No hay reconocimientos que coincidan con el filtro
            </p>
          )}
        </div>
      )}
      <ConfirmOverlay
        open={confirmOpen}
        title="🗑️ Eliminar experiencia"
        message={`¿Seguro que deseas eliminar "${deleteTarget?.tiporeconocimiento}"?`}
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
