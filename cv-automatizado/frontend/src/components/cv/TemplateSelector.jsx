import { usePerfil } from "../../context/PerfilContext";

export default function TemplateSelector({ template, setTemplate }) {
  const { perfil } = usePerfil();
  const disabled = !perfil;
  
  const Button = ({ value, label }) => (
    <button
      disabled={disabled}
      onClick={() => setTemplate(value)}
      className={`px-4 py-2 rounded-lg text-sm transition-all
        ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : template === value
            ? "bg-blue-600 text-white"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-gray-600">
        Plantillas&nbsp;
        &nbsp; <Button value="template1" label="Moderno" /> 
        &nbsp; <Button value="template2" label="Minimal" /> 
        &nbsp; <Button value="template3" label="Sidebar Oscuro" />
        &nbsp; <Button value="template4" label="Clásica" />
      </h4>
      

      {/*<div className="flex gap-2">
        <Button value="template1" label="Clásica" />
        <Button value="template2" label="Minimal" />
        <Button value="template3" label="Sidebar Oscuro" />
      </div>*/}

      {!perfil && (
        <p className="text-xs text-gray-500 mt-2">
          Selecciona un perfil para habilitar las plantillas
        </p>
      )}
    </div>
  );
}