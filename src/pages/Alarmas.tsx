import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  Dialog,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { ModalAlarma } from "../components/alarma/ModalAlarma.component";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  AlertDialog,
  CustomDataTable,
  CustomDialog,
  Icono,
  IconoTooltip,
} from "../../common/components/ui";
//import { imprimir } from "../components/common/utils/imprimir";
import { Paginacion } from "../../common/components/ui/Paginacion";
import axios from "axios";
import {
  AlarmaCRUDType,
  AlarmaType,
  ContactoType,
  SimuladorType,
  UbicacionType,
} from "../components/alarma/types/alarmaCRUD";
import { Delete, Key } from "@mui/icons-material";
import { useAlerts } from "../../common/hooks";
import { InterpreteMensajes } from "../../common/utils/interpreteMensajes";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface ColumnaType {
  campo: string;
  nombre: string;
}

export const Activar_desactivar = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [alarma, setAlarma] = useState<AlarmaType | null>();
  const [alarmasData, setAlarmasData] = useState<AlarmaType[]>([]);
  const [errorArticulosData, setErrorArticulosData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  // Variables de páginado
  const [limite, setLimite] = useState<number>(10);
  const [pagina, setPagina] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [contactosData, setContactosData] = useState<ContactoType[]>([]);
  const [simuladoresData, setSimuladoresData] = useState<SimuladorType[]>([]);
  const [ubicacionesData, setUbicacionesData] = useState<UbicacionType[]>([]);
  const [mostrarAlertaEstadoAlarma, setMostrarAlertaEstadoAlarma] =
    useState(false);
  const [mostrarAlertaEliminarAlarma, setMostrarAlertaEliminarAlarma] =
    useState(false);

  const { Alerta } = useAlerts();

  /**********************************************************************************/
  const peticionAlarmas = async () => {
    console.log("Obteniendo datos");
    const data = await axios.get("http://localhost:5000/alarmas");
    setAlarmasData(data.data[0]);
  };
  const peticionContactos = async () => {
    const data = await axios.get("http://localhost:5000/contactos");
    setContactosData(data.data[0]);
  };
  const peticionUbicaciones = async () => {
    const data = await axios.get("http://localhost:5000/ubicaciones");
    setUbicacionesData(data.data[0]);
  };
  const peticionSimuladores = async () => {
    const data = await axios.get("http://localhost:5000/simuladores");
    setSimuladoresData(data.data[0]);
  };
  const cambiarEstadoAlarmaPeticion = async (alarmaData: AlarmaType) => {
    //setLoading(true);
    if (alarma?.estado !== "ENCENDIDO") {
      await axios
        .patch(`http://localhost:5000/alarmas/${alarma?.id}/encender`)
        .then((res) => {
          Alerta({ mensaje: `completado con exito`, variant: "success" });
          console.log("encendido");
        })
        .catch((err) => {
          Alerta({ mensaje: `${InterpreteMensajes(err)}`, variant: "error" });
        });
    } else {
      await axios
        .patch(`http://localhost:5000/alarmas/${alarma?.id}/apagar`)
        .then((res) => {
          Alerta({ mensaje: `completado con exito`, variant: "success" });
          console.log("");
        })
        .catch((err) => {
          Alerta({ mensaje: `${InterpreteMensajes(err)}`, variant: "error" });
        });
    }
  };
  const eliminarAlarmaPeticion = async (alarmaData: AlarmaType) => {
    //setLoading(true);
      await axios
        .patch(`http://localhost:5000/alarmas/${alarma?.id}/eliminar`)
        .then((res) => {
          Alerta({ mensaje: `completado con exito`, variant: "success" });
        })
        .catch((err) => {
          Alerta({ mensaje: `${InterpreteMensajes(err)}`, variant: "error" });
        });
    }
  /**********************************************************************************/
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

  const agregarAlarmaModal = () => {
    setAlarma(undefined);
    setOpenModal(true);
  };
  const editarAlarmaModal = (alarma: AlarmaType | undefined) => {
    setAlarma(alarma);
    setOpenModal(true);
  };

  const cerrarAlarmaModal = async () => {
    setOpenModal(false);
    setAlarma(undefined);
    //  await delay(500)
    //  setSistemaEdicion(undefined)
  };

  const refrescar = async () => {
    peticionAlarmas();
  };
  const verificarEncendido = () => {
    const encendido = alarmasData.filter(
      (alarmaData) => alarmaData.estado === "ENCENDIDO"
    );
    return encendido;
  };
  const generateTypographyElement = (label: string, value: any) => (
    <Grid container key={label} alignItems="center">
      <Grid item>
        {value ? (
          <CheckCircleIcon color="success" />
        ) : (
          <CancelIcon color="error" />
        )}
      </Grid>
      <Grid item>
        <Typography variant="body2">{label}</Typography>
      </Grid>
    </Grid>
  );

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const columnas: Array<ColumnaType> = [
    { campo: "id_alarma", nombre: "ID Alarma" },
    { campo: "nombre", nombre: "Nombre" },
    { campo: "detalles", nombre: "Detalles de la Alarma" },
    { campo: "tipo", nombre: "Contactos" },
    { campo: "idUbicaciones", nombre: "Ubicaciones" },
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
        {generateTypographyElement("Alerta de Sonido", alarmaData.sonido)}
        {generateTypographyElement(
          "Notificaciones a usuarios",
          alarmaData.notificacion
        )}

        {generateTypographyElement(
          "Seguridad para Personas",
          alarmaData.seguridadPersonas
        )}
        {generateTypographyElement(
          "Seguridad para Bienes",
          alarmaData.seguridadBienes
        )}
        <Typography
          variant="body2"
          key={`${alarmaData.id}-${indexAlarma}- envio_notificaciones`}
        >
          <b>Notificaciones a contactos:</b>{" "}
          {alarmaData.envio_noti === "3"
            ? "Preguntar primero"
            : alarmaData.envio_noti === "2"
            ? "Automáticamente"
            : "No"}
        </Typography>
        <Typography
          variant="body2"
          key={`${alarmaData.id}-${indexAlarma}- idSimulador`}
        >
          <b>Simulador de presencia:</b> {`${alarmaData.simulador.nombre}`}
        </Typography>
      </>,
      <Typography
        key={`${alarmaData.id}-${indexAlarma}-idContactos`}
        variant={"body2"}
      >
        {alarmaData.alarmaContactos.map((alarmaContacto, index) => (
          <span key={index + alarmaContacto.id + "contactos"}>
            {"* " +
              alarmaContacto.contacto.nombre +
              " " +
              alarmaContacto.contacto.apellido}
            {index < alarmaData.alarmaContactos.length - 1 && <br />}
          </span>
        ))}
      </Typography>,
      <Typography
        key={`${alarmaData.id}-${indexAlarma}-idUbicaciones`}
        variant={"body2"}
      >
        {alarmaData.ubicacionAlarmas.map((alarmaUbicacion, index) => (
          <Card key={index + alarmaUbicacion.id + "ubicaciones"}>
            {alarmaUbicacion.ubicacion.nombre}
            {index < alarmaData.ubicacionAlarmas.length - 1 && <br />}
          </Card>
        ))}
      </Typography>,
      <Grid
        key={`${alarmaData.id}-${indexAlarma}-accion`}
        flexDirection={"column"}
        alignContent={"center"}
        alignItems={"center"}
      >
        {/* {permisos.update && rolUsuario?.nombre === ROL_USUARIO && ( */}
        <Grid>
          <Switch
            {...label}
            key={`${alarmaData.id}-${indexAlarma}-accionActivar`}
            checked={alarmaData.estado === "ENCENDIDO"}
            onClick={async () => {
              await editarEstadoAlarmaModal(alarmaData);
            }}
            disabled={
              verificarEncendido().length > 0 &&
              !(verificarEncendido()[0].id === alarmaData.id)
            }
          />
        </Grid>
        <Grid>
          <Button
            variant={"text"}
            sx={{ ml: 1, mr: 1, textTransform: "none" }}
            key={`${alarmaData.id}-${indexAlarma}-accionEditar`}
            size={"small"}
            onClick={() => {
              editarAlarmaModal(alarmaData);
            }}
          >
            <EditIcon />
          </Button>
        </Grid>
        <Grid>
          <Button
            variant={"text"}
            sx={{ ml: 1, mr: 1, textTransform: "none" }}
            key={`accionEliminarAlarma`}
            size={"small"}
            color="error"
            onClick={async () => {
              await eliminarEstadoAlarmaModal(alarmaData);
            }}
          >
            <Delete />
          </Button>
        </Grid>
      </Grid>,
    ]
  );
  const editarEstadoAlarmaModal = async (alarma: AlarmaType) => {
    setAlarma(alarma); // para mostrar datos de articulo en la alerta
    setMostrarAlertaEstadoAlarma(true); // para mostrar alerta de articulos
  };
  const eliminarEstadoAlarmaModal = async (alarma: AlarmaType) => {
    setAlarma(alarma); // para mostrar datos de articulo en la alerta
    setMostrarAlertaEliminarAlarma(true); // para mostrar alerta de articulos
  };
  const aceptarAlertaEstadoAlarma = async () => {
    setMostrarAlertaEstadoAlarma(false);
    if (alarma) {
      await cambiarEstadoAlarmaPeticion(alarma);
    }
    setAlarma(null);
  };
  /// Método que cierra alerta de cambio de estado

  const cancelarAlertaEstadoAlarma = async () => {
    setMostrarAlertaEstadoAlarma(false);
    //await delay(500) // para no mostrar undefined mientras el modal se cierra
    setAlarma(null);
  };

  const aceptarAlertaEliminarAlarma = async () => {
    setMostrarAlertaEliminarAlarma(false);
    if (alarma) {
      await eliminarAlarmaPeticion(alarma);
    }
    setAlarma(null);
  };
  /// Método que cierra alerta de cambio de estado

  const cancelarAlertaEliminarAlarma = async () => {
    setMostrarAlertaEliminarAlarma(false);
    //await delay(500) // para no mostrar undefined mientras el modal se cierra
    setAlarma(null);
  };

  useEffect(() => {
    peticionAlarmas();
    peticionContactos();
    peticionUbicaciones();
    peticionSimuladores();
  }, []);
  useEffect(() => {
    peticionAlarmas();
  }, [alarma]);
  return (
    <>
      <AlertDialog
        isOpen={mostrarAlertaEstadoAlarma}
        titulo={"Alerta"}
        texto={`¿Está seguro de ${
          alarma?.estado == "ENCENDIDO" ? "Apagar" : "Encender"
        } a ${alarma?.nombre} ?`}
      >
        <Button onClick={cancelarAlertaEstadoAlarma}>Cancelar</Button>
        <Button onClick={aceptarAlertaEstadoAlarma}>Aceptar</Button>
      </AlertDialog>
      <AlertDialog
        isOpen={mostrarAlertaEliminarAlarma}
        titulo={"Alerta"}
        texto={`¿Está seguro de Eliminar a ${alarma?.nombre} ?`}
      >
        <Button onClick={cancelarAlertaEliminarAlarma}>Cancelar</Button>
        <Button onClick={aceptarAlertaEliminarAlarma}>Aceptar</Button>
      </AlertDialog>
      <Grid container marginTop={"3%"}>
        <Grid item xs={11} sm={11} md={7} lg={7} xl={7}>
          {verificarEncendido().length === 0 ? (
            <Card sx={{ marginLeft: "4%" }}>
              <Box border={2} borderColor="#FF9300" padding="2%">
                <Grid container flexDirection="row" alignItems="center">
                  <Grid item>
                    <WarningAmberIcon color="warning" sx={{ fontSize: 60 }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" color="#FF9300">
                      Ninguna alarma está activada
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          ) : (
            <Card sx={{ marginLeft: "4%" }}>
              <Box border={2} borderColor="#5ABC35" padding="2%">
                <Grid container flexDirection="row" alignItems="center">
                  <Grid item>
                    <CheckCircleOutlineIcon
                      scale={9}
                      sx={{ fontSize: 60, color: "#5ABC35" }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" color="#5ABC35">
                      {verificarEncendido()[0].nombre + "  ESTÁ ACTIVADA"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          )}
        </Grid>
        <Dialog
          open={openModal}
          onClose={cerrarAlarmaModal}
          fullWidth={true}
          maxWidth={"md"}
        >
          <ModalAlarma
            alarma={alarma}
            contactos={contactosData}
            ubicaciones={ubicacionesData}
            simuladores={simuladoresData}
            accionCancelar={cerrarAlarmaModal}
            accionCorrecta={() => {
              cerrarAlarmaModal().finally();
              refrescar().finally();
            }}
          />
        </Dialog>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} marginTop={"1%"}>
          <CustomDataTable
            titulo={""}
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
