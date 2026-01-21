import Template1 from "./templates/template1/CVLayout";
import Template2 from "./templates/template2/CVLayout";
import Template3 from "./templates/template3/CVLayout";
import Template4 from "./templates/template4/CVLayout";

export default function CVRenderer({ data, template }) {
  switch (template) {
    case "template2":
      return <Template2 data={data} />;
    case "template3":
      return <Template3 data={data} />;
    case "template4":
      return <Template4 data={data} />;
    default:
      return <Template1 data={data} />;
  }
}
