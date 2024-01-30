import { AccountCircle, MenuOpenOutlined } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Sidebar } from "./Sidebar.component";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  FormControlLabel,
  useMediaQuery,
  useTheme,
  FormGroup,
  Switch,
  Grid,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import React from "react";
import { userContext } from "../App";
import { useSession } from "../../common/hooks/useSession";
import { InterpreteMensajes } from "../../common/utils";
import { Constantes } from "../../config";
import { useAlerts } from "../../common/hooks/useAlerts";
import { useAuth } from "../../common/context/auth";
import { AlertDialog } from "../../common/components/ui";
import { ModalUsuarioPerfil } from "./usuario/ModalUsuarioPerfil.component";
import { useNavigate } from "react-router-dom";
import { TransitionZoom } from "../../common/components/ui/Animations";

interface NavbarProps {
  cambiarEstado: () => void;
}

export const VerificarIncidentes = () => {
  // const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(true);
  const { sesionPeticion } = useSession();
  const { Alerta } = useAlerts();

  const navigate = useNavigate();

  const [mostrarAlertaIncidente, setMostrarAlertaIncidente] = useState(false);
  const historialIncidentes = () => {
    navigate("/admin/incidentes", { replace: true });
  };
  const consultaIncidentes = async () => {
    try {
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/historialIncidentes`,
        params: {
          estado: "DESATENDIDO",
        },
      });
      if (respuesta[0].length > 0) setMostrarAlertaIncidente(true);
    } catch (e) {
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: "error" });
    } finally {
    }
  };
  useEffect(() => {
    consultaIncidentes();
  }, []);
  return (
    <>
      <Dialog
        open={mostrarAlertaIncidente}
        TransitionComponent={TransitionZoom}
      >
        <DialogTitle sx={{ m: 1, p: 2, display: "flex", alignItems: "center" }}>
          <WarningAmberIcon color="warning" sx={{ fontSize: 60,  mr: 2 }} />{" "}
          <Typography color={"MenuText"} variant="h6"> Alerta</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography component={"span"}>
              {"Tienes incidentes de seguridad sin atender"}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMostrarAlertaIncidente(false)}>
            Cerrar
          </Button>
          <Button onClick={() => historialIncidentes()}>Revisar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
