import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Card,
  Dialog,
  Grid,
  Typography,
} from "@mui/material";
import { RowAlarmas } from "../components/RowAlarmas.component";
import { ReactNode, useState } from "react";
import { ModalAlarma } from "../components/ModalAlarma.componetn";

import {
  AlertDialog,
  CustomDataTable,
  CustomDialog,
  Icono,
  IconoTooltip,
} from "../components/common/components/ui";
//import { imprimir } from "../components/common/utils/imprimir";
import { Paginacion } from "../components/common/components/ui/Paginacion";
interface AlarmaCRUDType {
  id: string;
  nombre: string;
  sonido: boolean;
  notificacion: boolean;
  envio_noti: string;
  contactos: string[];
  simulador: string;
  ubicaciones: string[];
  tipo: string[];
}
interface ColumnaType {
  campo: string;
  nombre: string;
}

export const Activar_desactivar = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [alarma, setAlarma] = useState<AlarmaCRUDType | null>();
  const [errorArticulosData, setErrorArticulosData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
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
      color="success"
      onClick={() => {
        agregarAlarmaModal();
      }}
    >
      <AddCircleIcon /> Añadir alarma
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

  const alarmasData: AlarmaCRUDType[] = [
    {
      id: "1",
      nombre: "Alarma 1",
      sonido: true,
      notificacion: true,
      envio_noti: "1",
      contactos: ["1", "2", "3"],
      simulador: "1",
      ubicaciones: ["1", "2", "3", "4"],
      tipo: ["1", "2"],
    },
    {
      id: "2",
      nombre: "Alarma 2",
      sonido: true,
      notificacion: true,
      envio_noti: "1",
      contactos: ["1", "2", "3"],
      simulador: "1",
      ubicaciones: ["1", "2", "3", "4"],
      tipo: ["1", "2"],
    },
    {
      id: "3",
      nombre: "Alarma 3",
      sonido: true,
      notificacion: true,
      envio_noti: "1",
      contactos: ["1", "2", "3"],
      simulador: "1",
      ubicaciones: ["1", "2", "3", "4"],
      tipo: ["1", "2"],
    },
    {
      id: "4",
      nombre: "Alarma 4",
      sonido: true,
      notificacion: true,
      envio_noti: "1",
      contactos: ["1", "2", "3"],
      simulador: "1",
      ubicaciones: ["1", "2", "3", "4"],
      tipo: ["1", "2"],
    },
    {
      id: "5",
      nombre: "Alarma 5",
      sonido: true,
      notificacion: true,
      envio_noti: "1",
      contactos: ["1", "2", "3"],
      simulador: "1",
      ubicaciones: ["1", "2", "3", "4"],
      tipo: ["1", "2"],
    },
  ];

  const agregarAlarmaModal = () => {
    setAlarma(undefined);
    setOpenModal(true);
  };
  const editarAlarmaModal = (alarma: AlarmaCRUDType | undefined) => {
    setAlarma(alarma);
    setOpenModal(true);
  };

  const cerrarAlarmaModal = async () => {
    setOpenModal(false);
    setAlarma(undefined);
    //  await delay(500)
    //  setSistemaEdicion(undefined)
  };

  const obtenerAlarmasPeticion = async () => {
    console.log("obteniendo sistema");
  };

  const columnas: Array<ColumnaType> = [
    { campo: "id_alarma", nombre: "ID Alarma" },
    { campo: "nombre", nombre: "Nombre" },
    { campo: "detalles", nombre: "Detalles de la Alarma" },
    { campo: "tipo", nombre: "Contactos" },
    { campo: "ubicaciones", nombre: "Ubicaciones" },
    { campo: "acciones", nombre: "Acciones" },
  ];

  const contenidoTabla: Array<Array<ReactNode>> = alarmasData.map(
    (alarmaData, indexAlarma) => [
      <Typography
        key={`${alarmaData.id}-${indexAlarma}-id_alarma`}
        variant={"body2"}
      >{`${alarmaData.id}`}</Typography>,
      <Typography
        key={`${alarmaData.nombre}-${indexAlarma}-nombre`}
        variant={"body2"}
      >{`${alarmaData.nombre}`}</Typography>,
      <>
        <Typography
          key={`${alarmaData.id}-${indexAlarma}- sonido`}
          variant={"body2"}
        >
          {`${alarmaData.sonido}`}
        </Typography>
        <Typography
          key={`${alarmaData.id}-${indexAlarma}- notificaciones`}
          variant={"body2"}
        >
          {`${alarmaData.envio_noti}`}
        </Typography>
        <Typography
          key={`${alarmaData.id}-${indexAlarma}- envio_notificaciones`}
          variant={"body2"}
        >
          {`${alarmaData.envio_noti}`}
        </Typography>
        <Typography
          key={`${alarmaData.id}-${indexAlarma}- tipo`}
          variant={"body2"}
        >
          {`${alarmaData.tipo}`}
        </Typography>
        <Typography
          key={`${alarmaData.id}-${indexAlarma}- simulador`}
          variant={"body2"}
        >
          {`${alarmaData.simulador}`}
        </Typography>
      </>,
      <Typography
        key={`${alarmaData.id}-${indexAlarma}-contactos`}
        variant={"body2"}
      >{`${alarmaData.contactos}`}</Typography>,
      <Typography
        key={`${alarmaData.id}-${indexAlarma}-ubicaciones`}
        variant={"body2"}
      >{`${alarmaData.ubicaciones}`}</Typography>,
      <Grid key={`${alarmaData.id}-${indexAlarma}-accion`}>
        {/* {permisos.update && rolUsuario?.nombre === ROL_USUARIO && ( */}
        <Grid>
          <Button
            variant={'text'}
            sx={{ ml: 1, mr: 1, textTransform: "none" }}
            key={`accionAgregarArticulo`}
            size={"small"}
            onClick={() => {
              agregarAlarmaModal();
            }}
          >
            <EditIcon/>
          </Button>
        </Grid>
        {/* )} */}
      </Grid>,
    ]
  );

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
        {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} marginTop={"1%"}>
          <Button
            variant="contained"
            color="success"
            onClick={agregarAlarmaModal}
          >
            <AddCircleIcon /> Añadir alarma
          </Button>
        </Grid> */}
        <Dialog
          open={openModal}
          onClose={cerrarAlarmaModal}
          fullWidth={true}
          maxWidth={"md"}
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
          <CustomDataTable
            titulo={''}
            error={!!errorArticulosData}
            cargando={loading}
            acciones={acciones}
            columnas={columnas}
            paginacion={paginacion}
            contenidoTabla={contenidoTabla}
          />
        </Grid>
      </Grid>
    </>
  );
};
