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
  Button,
} from "@mui/material";
import { RowIncidentes } from "../components/historial-incidentes/RowIncidentes.component";
import { ReactNode, useState } from "react";
import { ModalHistorialFotos } from "../components/historial-incidentes/ModalHistorialFotos";
import { Delete } from "@mui/icons-material";
import { ColumnaType } from "../components/common/types";
import { CustomDataTable } from "../components/common/components/ui";
import { Paginacion } from "../components/common/components/ui/Paginacion";
import BurstModeIcon from "@mui/icons-material/BurstMode";


interface HistorialType {
  id: string;
  fecha: Date;
  ubicacion: string;
  detalles: string;
  fotos: string[];
}
export const Incidentes_historial = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [incidentes, setIncidentes] = useState<HistorialType | null>();
  const [errorArticulosData, setErrorArticulosData] = useState<any>();
  // Variables de páginado
  const [limite, setLimite] = useState<number>(10);
  const [pagina, setPagina] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const acciones: Array<ReactNode> = [
    <Button
      variant={"contained"}
      sx={{ ml: 1, mr: 1, textTransform: "none" }}
      key={`accionAgregarArticulo`}
      size={"small"}
      color="error"
      onClick={() => {
        //agregarHistorialADModal();
      }}
    >
      Eliminar historial
    </Button>,
  ];
  const paginacion = (
    <Paginacion
      pagina={pagina}
      limite={limite}
      total={total}
      cambioPagina={setPagina}
      cambioLimite={setLimite}
    />
  );

  const historialData: HistorialType[] = [
    {
      id: "1",
      fecha: new Date("2023/05/26"),
      ubicacion: "Patio Principal",
      detalles: "el sensor PIR detectó movimientos",
      fotos: ["1", "2", "3"],
    },
    {
      id: "2",
      fecha: new Date("2023/05/23"),
      ubicacion: "Patio Principal",
      detalles: "el sensor PIR detectó movimientos",
      fotos: ["1", "2", "3"],
    },
    {
      id: "3",
      fecha: new Date("2023/05/21"),
      ubicacion: "Cocina",
      detalles: "Se detectó altas concentraciones de CO2",
      fotos: ["1", "2", "3"],
    },
    {
      id: "4",
      fecha: new Date("2023/05/19"),
      ubicacion: "Sala principal",
      detalles: "El sensor de la puerta detectó movimientos",
      fotos: ["1", "2", "3"],
    },
  ];

  const cerrarFotoModal = async () => {
    setOpenModal(false);
    setIncidentes(undefined);
  };

  const abrirFotoModal = (historial: HistorialType | undefined) => {
    setOpenModal(true);
    setIncidentes(historial);
  };
  const obtenerIncidentesPeticion = async () => {
    console.log("obteniendo sistema");
  };
  const columnas: Array<ColumnaType> = [
    { campo: "id_historial", nombre: "ID Historial" },
    { campo: "fecha", nombre: "Fecha" },
    { campo: "ubicacion", nombre: "Ubicación" },
    { campo: "detalles", nombre: "Detalles" },
    { campo: "fotos", nombre: "Fotos" },
    { campo: "acciones", nombre: "" },
  ];

  const contenidoTabla: Array<Array<ReactNode>> = historialData.map(
    (historialData, indexHistorialAD) => [
      <Typography
        key={`${historialData.id}-${indexHistorialAD}-id_historial`}
        variant={"body2"}
      >{`${historialData.id}`}</Typography>,
      <Typography
        key={`${historialData.fecha}-${indexHistorialAD}-fecha`}
        variant={"body2"}
      >{`${historialData.fecha}`}</Typography>,
      <Typography
        key={`${historialData.id}-${indexHistorialAD}- ubicacion`}
        variant={"body2"}
      >
        {`${historialData.ubicacion}`}
      </Typography>,
      <Typography
        key={`${historialData.id}-${indexHistorialAD}- detalles`}
        variant={"body2"}
      >
        {`${historialData.detalles}`}
      </Typography>,
      <Grid key={`${historialData.id}-${indexHistorialAD}-fotos`}>
        {/* {permisos.update && rolUsuario?.nombre === ROL_USUARIO && ( */}
        <Grid>
          <Button
            variant={"text"}
            sx={{ ml: 1, mr: 1, textTransform: "none" }}
            key={`accionAgregarArticulo`}
            size={"small"}
            color="secondary"
            onClick={() => abrirFotoModal(historialData)}
          >
            <BurstModeIcon />
          </Button>
        </Grid>
        {/* )} */}
      </Grid>,
      <Grid key={`${historialData.id}-${indexHistorialAD}-accion`}>
        {/* {permisos.update && rolUsuario?.nombre === ROL_USUARIO && ( */}
        <Grid>
          <Button
            variant={"text"}
            sx={{ ml: 1, mr: 1, textTransform: "none" }}
            key={`accionAgregarArticulo`}
            size={"small"}
            color="error"
            onClick={() => {
              // agregarHistorialADModal();
            }}
          >
            <Delete />
          </Button>
        </Grid>
        {/* )} */}
      </Grid>,
    ]
  );

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
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} marginTop={"1%"}>
          <CustomDataTable
            titulo={"Historial de incidentes de seguridad detectados"}
            error={!!errorArticulosData}
            cargando={loading}
            acciones={acciones}
            columnas={columnas}
            paginacion={paginacion}
            contenidoTabla={contenidoTabla}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
