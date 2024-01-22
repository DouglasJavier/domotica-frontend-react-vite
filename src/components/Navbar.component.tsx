import { AccountCircle, MenuOpenOutlined } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Sidebar } from "./Sidebar.component";
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
} from "@mui/material";
import { useState, useContext } from "react";
import React from "react";
import { userContext } from "../App";
import { useSession } from "../../common/hooks/useSession";
import { InterpreteMensajes } from "../../common/utils";
import { Constantes } from "../../config";
import { useAlerts } from "../../common/hooks/useAlerts";
import { useAuth } from "../../common/context/auth";
import { AlertDialog } from "../../common/components/ui";
import { ModalUsuarioPerfil } from "./usuario/ModalUsuarioPerfil.component";

interface NavbarProps {
  cambiarEstado: () => void;
}

export const Navbar = ({ cambiarEstado }: NavbarProps) => {
  // const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(true);
  const { sesionPeticion, cerrarSesion } = useSession();
  const { Alerta } = useAlerts();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const sideMenuOpen = useContext(userContext).sideMenuOpen;
  const [auth, setAuth] = React.useState(true);
  const { usuario } = useAuth();

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mostrarAlertaCerrarSesion, setMostrarAlertaCerrarSesion] =
    useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const abrirSide = () => {
    cambiarEstado();
  };

  const cerrarSide = () => {
    cambiarEstado();
  };

  /*  const abrirSide = () => {
    setSideMenuOpen(true);
  };

  const cerrarSide = () => {
    setSideMenuOpen(false);
  }; */
  const cerrarSesionModal = async () => {
    /*  setUsuario(usuarioData); */ // para mostrar datos de articulo en la alerta
    setMostrarAlertaCerrarSesion(true); // para mostrar alerta de articulos
  };
  const aceptarAlertaEliminarUsuario = async () => {
    setMostrarAlertaCerrarSesion(false);
    await cerrarSesion();
  };
  /// Método que cierra alerta de cambio de estado

  const cancelarAlertaEliminarUsuario = async () => {
    setMostrarAlertaCerrarSesion(false);
  };
  const cerrarUsuarioModal = async () => {
    setOpenModal(false);
  };
  const abrirUsuarioModal = async () => {
    setOpenModal(true);
  };
  console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
  console.log(usuario);
  console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSsSSS');
  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
      <Dialog
        open={openModal}
        onClose={cerrarUsuarioModal}
        fullWidth={true}
        maxWidth={"md"}
      >
        <ModalUsuarioPerfil
          usuario={usuario}
          accionCancelar={cerrarUsuarioModal}
          accionCorrecta={() => {
            cerrarUsuarioModal().finally();
          }}
        />
      </Dialog>
      <AlertDialog
        isOpen={mostrarAlertaCerrarSesion}
        titulo={"Alerta"}
        texto={`¿Está seguro de cerrar sessión?`}
      >
        <Button onClick={cancelarAlertaEliminarUsuario}>Cancelar</Button>
        <Button onClick={aceptarAlertaEliminarUsuario}>Aceptar</Button>
      </AlertDialog>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        style={{ borderBottom: "thin solid rgba(0, 0, 0, 0.05)", padding: "0" }}
      >
        <Toolbar>
          {sideMenuOpen ? (
            <Box onClick={cerrarSide}>
              <MenuOpenOutlined />
            </Box>
          ) : (
            <Box onClick={abrirSide}>
              <MenuIcon />{" "}
            </Box>
          )}
          <Grid
            container
            justifyContent={"flex-end"}
            alignContent={"center"}
            alignItems={"center"}
          >
            <Grid item>
              <Chip label={usuario?.rol} color="info" />
            </Grid>
            <Grid item>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Typography
                  color={"white"}
                  component="div"
                  sx={{ flexGrow: 1, fontWeight: "medium" }}
                >
                  {usuario?.usuario}
                </Typography>

                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{ marginTop: "5vh" }}
              >
                <MenuItem onClick={abrirUsuarioModal}>Cambiar Datos</MenuItem>
                <MenuItem>
                  <Button onClick={cerrarSesionModal}>Salir</Button>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/*  <Sidebar sideMenuOpen={sideMenuOpen}/> */}
    </>
  );
};
