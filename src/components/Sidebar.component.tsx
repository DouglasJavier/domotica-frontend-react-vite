import {
  Box,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import CameraIndoorIcon from "@mui/icons-material/CameraIndoor";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import { Children, FC, PropsWithChildren, useState, useContext } from "react";

import { userContext } from "../App";
import { NavLink, Outlet } from "react-router-dom";

const drawerWidth = 240;

interface Props {
  // sideMenuOpen: boolean
}

export const Sidebar: FC<PropsWithChildren<Props>> = ({ children }) => {
  const sideMenuOpen = useContext(userContext).sideMenuOpen;

  //const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(true);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const md = useMediaQuery(theme.breakpoints.only("md"));
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  /* const closeSideMenu = () => {
    setSidebarOpen(false);
  }; */

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Drawer
          variant={sm || xs || md ? "temporary" : "persistent"}
          open={sideMenuOpen}
          /* onClose={closeSideMenu} */
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            width: sideMenuOpen ? drawerWidth : `0`,
            border: "none",
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              borderWidth: 0.0,
              boxSizing: "border-box",
            },
            transition: "all 0.1s ease-out",
            bgcolor: "#F6F6F6",
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "flex" }}>
            <List>
              <ListItem>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    m: 0,
                    borderRadius: 1,
                    alignItems: "center",
                  }}
                >
                  <Box width={"10px"} />
                  <Typography variant={"body2"} color={"text.secondary"}>
                    Inicio
                  </Typography>
                </Box>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/"
                  sx={{
                    "&.active": {
                      backgroundColor: "#E5E5E5",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      p: "1 2 3 4",
                      m: 0,
                      borderRadius: 1,
                      alignItems: "center",
                    }}
                  >
                    <Box width={"20px"} />
                    <CameraIndoorIcon />
                    <Box width={"20px"} />
                    <Typography variant={"body1"}>Cámaras</Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/activar_desactivar"
                  sx={{
                    "&.active": {
                      backgroundColor: "#E5E5E5",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      p: "1 2 3 4",
                      m: 0,
                      borderRadius: 1,
                      alignItems: "center",
                    }}
                  >
                    <Box width={"20px"} />
                    <AddModeratorIcon />
                    <Box width={"20px"} />
                    <Typography variant={"body1"}>
                      Activar / Desactivar
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    m: 0,
                    borderRadius: 1,
                    alignItems: "center",
                  }}
                >
                  <Box width={"10px"} />
                  <Typography variant={"body2"} color={"text.secondary"}>
                    Historial
                  </Typography>
                </Box>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/incidentes"
                  sx={{
                    "&.active": {
                      backgroundColor: "#E5E5E5",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      p: "1 2 3 4",
                      m: 0,
                      borderRadius: 1,
                      alignItems: "center",
                    }}
                  >
                    <Box width={"20px"} />
                    <SafetyCheckIcon />
                    <Box width={"20px"} />
                    <Typography variant={"body1"}>
                      Incidentes de seguridad
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/historial_activ_desact"
                  sx={{
                    "&.active": {
                      backgroundColor: "#E5E5E5",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      p: "1 2 3 4",
                      m: 0,
                      borderRadius: 1,
                      alignItems: "center",
                    }}
                  >
                    <Box width={"20px"} />
                    <ManageHistoryIcon />
                    <Box width={"20px"} />
                    <Typography variant={"body1"}>
                      Activación / Desactivación
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    m: 0,
                    borderRadius: 1,
                    alignItems: "center",
                  }}
                >
                  <Box width={"10px"} />
                  <Typography variant={"body2"} color={"text.secondary"}>
                    Configuración
                  </Typography>
                </Box>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/simulacion_presencia"
                  sx={{
                    "&.active": {
                      backgroundColor: "#E5E5E5",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      p: "1 2 3 4",
                      m: 0,
                      borderRadius: 1,
                      alignItems: "center",
                    }}
                  >
                    <Box width={"20px"} />
                    <AddHomeWorkIcon />
                    <Box width={"20px"} />
                    <Typography variant={"body1"}>
                      Simulación de presencia
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
              {/* <ListItem disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/config_alarmas"
                  sx={{
                    "&.active": {
                      backgroundColor: "#E5E5E5",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      p: "1 2 3 4",
                      m: 0,
                      borderRadius: 1,
                      alignItems: "center",
                    }}
                  >
                    <Box width={"20px"} />
                    <RoomPreferencesIcon />
                    <Box width={"20px"} />
                    <Typography variant={"body1"}>Alarmas</Typography>
                  </Box>
                </ListItemButton>
              </ListItem> */}
              <ListItem disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/config_contactos"
                  sx={{
                    "&.active": {
                      backgroundColor: "#E5E5E5",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      p: "1 2 3 4",
                      m: 0,
                      borderRadius: 1,
                      alignItems: "center",
                    }}
                  >
                    <Box width={"20px"} />
                    <ConnectWithoutContactIcon />
                    <Box width={"20px"} />
                    <Typography variant={"body1"}>
                      Gestionar contactos
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/config_disp"
                  sx={{
                    "&.active": {
                      backgroundColor: "#E5E5E5",
                    },
                  }}
                >

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      p: "1 2 3 4",
                      m: 0,
                      borderRadius: 1,
                      alignItems: "center",
                    }}
                  >
                    <Box width={"20px"} />
                    <SettingsInputComponentIcon />
                    <Box width={"20px"} />
                    <Typography variant={"body1"}>Dispositivos</Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/config_usuarios"
                  sx={{
                    "&.active": {
                      backgroundColor: "#E5E5E5",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      p: "1 2 3 4",
                      m: 0,
                      borderRadius: 1,
                      alignItems: "center",
                    }}
                  >
                    <Box width={"20px"} />
                    <ManageAccountsIcon />
                    <Box width={"20px"} />
                    <Typography variant={"body1"}>Usuarios</Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Outlet />
        {/* {children} */}
      </Box>
    </>
  );
};
