import { Sidebar } from "./components/Sidebar.component";
import { Navbar } from "./components/Navbar.component";
import { Routes, Route } from "react-router-dom";
import { Activ_desac_historial } from "./pages/Activ_desac_historial";
import { Activar_desactivar } from "./pages/Alarmas";
import { Camaras } from "./pages/Camaras";
import { Contactos_conf } from "./pages/Contactos_conf";
import { Dispositivos_conf } from "./pages/Dispositivos_conf";
import { Incidentes_historial } from "./pages/Incidentes_historial";
import { Simulacion_presencia_conf } from "./pages/Simulacion_presencia_conf";
import { Usuarios_conf } from "./pages/Usuarios_conf";

import { createContext, useState } from "react";
import { Default } from "./pages/Default";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { SnackbarProvider } from "notistack";

interface MenuSide {
  sideMenuOpen: boolean;
  // setSideMenuOpen: () => void
}
export const userContext = createContext<MenuSide>({} as MenuSide);

function App() {
  document.body.style.backgroundColor = "#E5E5E5";
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const md = useMediaQuery(theme.breakpoints.only("md"));
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const [openMenuSide, setOpenMenuSide] = useState<boolean>(
    sm || xs || md ? false : true
  );

  const cambiarEstado = () => {
    setOpenMenuSide(!openMenuSide);
  };

  return (
    <>
      <userContext.Provider
        value={{
          sideMenuOpen: openMenuSide,
        }}
      >
        <SnackbarProvider maxSnack={1}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar cambiarEstado={cambiarEstado} />
                  <Sidebar />
                </>
              }
            >
              <Route path="/" element={<Camaras />} />
              <Route
                path="activar_desactivar"
                element={<Activar_desactivar />}
              />
              <Route path="incidentes" element={<Incidentes_historial />} />
              <Route
                path="/historial_activ_desact"
                element={<Activ_desac_historial />}
              />
              <Route
                path="/simulacion_presencia"
                element={<Simulacion_presencia_conf />}
              />
              <Route path="config_contactos" element={<Contactos_conf />} />
              <Route path="config_disp" element={<Dispositivos_conf />} />
              <Route path="config_usuarios" element={<Usuarios_conf />} />
              <Route path="*" element={<Default />} />
            </Route>
          </Routes>
        </SnackbarProvider>
        {/* <Navbar cambiarEstado={cambiarEstado} />
          <Sidebar/> */}
      </userContext.Provider>
    </>
  );
}

export default App;
