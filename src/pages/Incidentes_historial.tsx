import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Dialog,
} from "@mui/material";
import { RowIncidentes } from "../components/historial-incidentes/RowIncidentes.component";
import { useState } from "react";
import { ModalHistorialFotos } from "../components/historial-incidentes/ModalHistorialFotos";

interface HistorialType {
  id: string;
  fecha: Date;
  ubicacion: string;
  detalles: string;
  fotos: string[];
}
export const Incidentes_historial = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [incidentes, setIncidentes] = useState<HistorialType | null>();

  const cerrarFotoModal = async () => {
    setOpenModal(false);
    setIncidentes(undefined);
  };

  const abrirFotoModal  = (historial : HistorialType | undefined) => {
    setOpenModal(true)
    setIncidentes(historial)
  }
  const obtenerIncidentesPeticion = async () => {
    console.log("obteniendo sistema");
  };

  return (
    <Grid container justifyContent={"center"}>
      <Dialog
        open={openModal}
        onClose={cerrarFotoModal}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <ModalHistorialFotos
          Fotos={incidentes}
          accionCancelar={cerrarFotoModal}
        />
      </Dialog>
      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} marginTop={"3%"}>
        <Typography variant="h4">
          Historial de incidentes de seguridad
        </Typography>
        <br />
        <TableContainer sx={{ backgroundColor: "white" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>ID</b>
                </TableCell>
                <TableCell>
                  <b>Fecha</b>
                </TableCell>
                <TableCell>
                  <b>Hora</b>
                </TableCell>
                <TableCell>
                  <b>Ubicación</b>
                </TableCell>
                <TableCell>
                  <b>Detalles</b>
                </TableCell>
                <TableCell>
                  <b>Fotos </b>
                </TableCell>
                <TableCell>
                  <b>Acciones </b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <RowIncidentes abrirFotoModal={abrirFotoModal}/>
              <RowIncidentes abrirFotoModal={abrirFotoModal}/>
              <RowIncidentes abrirFotoModal={abrirFotoModal}/>
              <RowIncidentes abrirFotoModal={abrirFotoModal}/>
              <RowIncidentes abrirFotoModal={abrirFotoModal}/>
              <RowIncidentes abrirFotoModal={abrirFotoModal}/>
              <RowIncidentes abrirFotoModal={abrirFotoModal}/>
              <RowIncidentes abrirFotoModal={abrirFotoModal}/>
              <RowIncidentes abrirFotoModal={abrirFotoModal}/>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
