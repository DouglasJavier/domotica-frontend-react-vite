import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import {
  Box,
  Breakpoint,
  Button,
  Card,
  Dialog,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { RowAlarmas } from "../components/RowAlarmas.component";
import { useState } from "react";
import { ModalAlarma } from "../components/ModalAlarma.componetn";

interface CrearEditarAlarmaCRUDType {
  nombre: String;
  sonido: boolean;
  notificacion: boolean;
  envio_noti: number;
  simulador: number;
  ubicaciones: number; 
}

export const Activar_desactivar = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [alarma, setAlarma] = useState<CrearEditarAlarmaCRUDType | null>();

  const agregarAlarmaModal = () => {
    setAlarma(undefined);
    setOpenModal(true);
  };
  const editarAlarmaModal = (alarma: CrearEditarAlarmaCRUDType | undefined) => {
    setAlarma(alarma);
    setOpenModal(true);
  };

  const cerrarAlarmaModal = async () => {
    setOpenModal(false);
    setAlarma(undefined)
    //  await delay(500)
    //  setSistemaEdicion(undefined)
  };

  const obtenerAlarmasPeticion = async () => {
    console.log("obteniendo sistema")
  };

  return (
    <>
      <Grid container marginTop={"2%"}>
        <Grid item xs={11} sm={11} md={7} lg={7} xl={7}>
          <Card>
            <Box border={2} borderColor={"#FF9300"} padding={"2%"}>
              <Grid container flexDirection={"row"}>
                <Grid item>
                  <Typography variant="h4" color="#FF9300">
                    Ninguna alarma esta activada
                  </Typography>
                </Grid>
                <Grid item>
                  <WarningAmberIcon
                    scale={9}
                    color="warning"
                    sx={{ fontSize: 60 }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} marginTop={"1%"}>
          <Button
            variant="contained"
            color="success"
            onClick={agregarAlarmaModal}
          >
            <AddCircleIcon /> Añadir alarma
          </Button>
        </Grid>
        <Dialog
          open={openModal}
          onClose={cerrarAlarmaModal}
          fullWidth={true}
          maxWidth={"sm"}
        >
          <ModalAlarma
            Alarma={alarma}
            accionCancelar={cerrarAlarmaModal}
            accionCorrecta={() => {
              cerrarAlarmaModal().finally();
              obtenerAlarmasPeticion();
            }}
          />
        </Dialog>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} marginTop={"1%"}>
          <TableContainer sx={{ backgroundColor: "white" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>ID Alarma</b>
                  </TableCell>
                  <TableCell>
                    <b>Nombre</b>
                  </TableCell>
                  <TableCell>
                    <b>Detalles de la Alarma</b>
                  </TableCell>
                  <TableCell>
                    <b>Tipo de seguridad</b>
                  </TableCell>
                  <TableCell>
                    <b>Detectar </b>
                  </TableCell>
                  <TableCell>
                    <b>Acciones </b>
                  </TableCell>
                  <TableCell>
                    <b>Activar </b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <RowAlarmas editarAlarmaModal={editarAlarmaModal}/>
                <RowAlarmas editarAlarmaModal={editarAlarmaModal}/>
                <RowAlarmas editarAlarmaModal={editarAlarmaModal}/>
                <RowAlarmas editarAlarmaModal={editarAlarmaModal}/>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};
