//import { Outlet } from "react-router-dom";
import PersonalSidebar from "./PersonalSidebar";
import { Outlet, useLocation } from "react-router-dom";

export default function PersonalLayout() {
  const location = useLocation();

  return (
    <div className="personal-ui">
      <div className="ms-layout">
        <PersonalSidebar />
        <main className="ms-content">
          {/*<Outlet />*/}
          {<Outlet key={location.pathname} /> }
        </main>
      </div>
    </div>
  );
}
