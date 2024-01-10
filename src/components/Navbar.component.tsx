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
} from "@mui/material";
import { useState, useContext } from "react";
import React from "react";
import { userContext } from "../App";
import { useSession } from "../../common/hooks/useSession";
import { InterpreteMensajes } from "../../common/utils";
import { Constantes } from "../../config";
import { useAlerts } from "../../common/hooks/useAlerts";

interface NavbarProps {
  cambiarEstado: () => void;
}

export const Navbar = ({ cambiarEstado }: NavbarProps) => {
  // const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(true);
  const { sesionPeticion, cerrarSesion } = useSession();
  const { Alerta } = useAlerts();

  const sideMenuOpen = useContext(userContext).sideMenuOpen;
  const [auth, setAuth] = React.useState(true);
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
          <Grid container justifyContent={"flex-end"}>
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
                  Alan Brito Delgado
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
              >
                <MenuItem onClick={handleClose}>Cambiar Datos</MenuItem>
                <MenuItem><Button onClick={cerrarSesion}>Salir</Button></MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/*  <Sidebar sideMenuOpen={sideMenuOpen}/> */}
    </>
  );
};
