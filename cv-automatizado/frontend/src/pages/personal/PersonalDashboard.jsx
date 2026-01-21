import { useAuth } from "../../auth/AuthContext";
import { useCV } from "../../context/CVContext";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaGraduationCap,
  FaAward,
  FaUserCheck,
  FaFilePdf,
  FaEye
} from "react-icons/fa";
import { useEffect, useState } from "react";
import DataLoadingOverlay from "../../components/ui/DataLoadingOverlay";

export default function PersonalDashboard() {
  const { user } = useAuth();
  const { cvData, loading } = useCV();

  const experienciaCount = cvData?.experiencia_laboral?.length || 0;
  const cursosCount = cvData?.cursos?.length || 0;
  const reconocimientosCount = cvData?.reconocimientos?.length || 0;

  const perfilPercent = (() => {
  if (!cvData) return 0;

  let score = 0;

  if (cvData.perfil) score += 25;
  if (experienciaCount > 0) score += 25;
  if (cursosCount > 0) score += 25;
  if (reconocimientosCount > 0) score += 25;

  return score;
})();

  
  const [transitionLoading, setTransitionLoading] = useState(true);

  useEffect(() => {
    setTransitionLoading(true);

    const timer = setTimeout(() => {
      setTransitionLoading(false);
    }, 500); // duración ms de carga

    return () => clearTimeout(timer);
  }, []);

  // 🟦 Loading real de backend
  if (loading) {
    return <DataLoadingOverlay text="Cargando tu información..." />;
  }
  
  // 🟨 Transición visual de vista
  if (transitionLoading) {
    return <DataLoadingOverlay text="Cargando vista..." />;
  }

  return (
    <div className="space-y-8">

      {/* 👋 Bienvenida */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Hola, {user?.first_name || user?.username} 👋
        </h1>
        <p className="text-gray-500">
          Bienvenido a tu panel personal
        </p>
      </div>

      {/* 📊 Métricas */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12
            }
          }
        }}
      >
        <AnimatedCard>
          <MetricCard
            loading={loading}
            icon={<FaBriefcase />}
            label="Experiencia"
            value={experienciaCount}
          />
        </AnimatedCard>
      
        <AnimatedCard>
          <MetricCard
            loading={loading}
            icon={<FaGraduationCap />}
            label="Cursos"
            value={cursosCount}
          />
        </AnimatedCard>
      
        <AnimatedCard>
          <MetricCard
            loading={loading}
            icon={<FaAward />}
            label="Reconocimientos"
            value={reconocimientosCount}
          />
        </AnimatedCard>
      
        <AnimatedCard>
          <ProfileProgress percent={perfilPercent} loading={loading} />
        </AnimatedCard>
      </motion.div>


      {/* ⚡ Acciones rápidas */}
      <div>
        <h2 className="font-semibold text-gray-700 mb-3">
          Acciones rápidas
        </h2>

        <div className="flex flex-wrap gap-3">
          <QuickAction
            icon={<FaEye />}
            label="Ver CV"
            onClick={() => window.open("/cv", "_blank")}
          />

          <QuickAction
            icon={<FaFilePdf />}
            label="Descargar PDF"
            onClick={() => alert("Próximamente PDF 😄")}
          />
        </div>
      </div>
    </div>
  );
}

/* ================================
   🧩 COMPONENTES INTERNOS
   ================================ */
function AnimatedCard({ children }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}


function MetricCard({ icon, label, value, loading }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">

      <div className="flex items-center gap-3 text-blue-600 mb-3">
        <div className="text-xl">{icon}</div>
        <span className="font-medium">{label}</span>
      </div>

      {loading ? (
        <div className="h-6 w-16 bg-gray-200 animate-pulse rounded" />
      ) : (
        typeof value === "string" || typeof value === "number" ? (
        <div className="text-2xl font-bold text-gray-800">
          {value}
        </div>
      ) : null)}
    </div>
  );
}

function QuickAction({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2 shadow-sm hover:shadow transition text-sm font-medium"
    >
      <span className="text-blue-600">{icon}</span>
      {label}
    </button>
  );
}

function ProfileProgress({ percent, loading }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">

      <div className="flex items-center gap-3 text-blue-600 mb-3">
        <div className="text-xl">
          <FaUserCheck />
        </div>
        <span className="font-medium">Perfil completo</span>
      </div>

      {loading ? (
        <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
      ) : (
        <>
          <div className="flex items-center justify-between mb-1 text-sm">
            <span className="text-gray-500">Progreso</span>
            <span className="font-medium">{percent}%</span>
          </div>

          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}
