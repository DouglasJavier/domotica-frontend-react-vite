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
  import { RowHistorialActivacion } from "../components/historial-activacion/RowHistorialActivacion.component";
  import { useState } from "react";
  //import { ModalHistorialFotos } from "../components/historial-activacion/RowHistorialActivacion.component";
  
  interface HistorialType {
    id: string;
    fecha: Date;
    ubicacion: string;
    detalles: string;
    fotos: string[];
  }
  export const Activ_desac_historial = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [activ_desac, setactiv_desac] = useState<HistorialType | null>();
  
    const cerrarFotoModal = async () => {
      setOpenModal(false);
      setactiv_desac(undefined);
    };
  
    const abrirFotoModal  = (historial : HistorialType | undefined) => {
      setOpenModal(true)
      setactiv_desac(historial)
    }
    const obteneractiv_desacPeticion = async () => {
      console.log("obteniendo sistema");
    };
  
    return (
      <Grid container justifyContent={"center"}>
        <Grid item xs={12} sm={12} md={10} lg={10} xl={10} marginTop={"3%"}>
          <Typography variant="h4">
            Historial de activación y desactivación de alarmas
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
                    <b>Alarma</b>
                  </TableCell>
                  <TableCell>
                    <b>Usuario</b>
                  </TableCell>
                  <TableCell>
                    <b>Acción</b>
                  </TableCell>
                  <TableCell>
                    <b>Acciones </b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <RowHistorialActivacion abrirFotoModal={abrirFotoModal}/>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  };
  