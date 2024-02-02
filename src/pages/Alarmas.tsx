import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { Constantes } from "../../config";
import { useSession } from "../../common/hooks/useSession";
import { VerificarIncidentes } from "../components/VerificarIncidentes.component";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { ModalBoton } from "../components/alarma/ModalBoton.component";
interface ColumnaType {
  campo: string;
  nombre: string;
}

export const Activar_desactivar = () => {
  /* console.log("*************************************************");
  console.log(Constantes.baseUrl);
  console.log("*************************************************"); */
  const { sesionPeticion } = useSession();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [alarma, setAlarma] = useState<AlarmaType | null>();
  const [idAlarma, setIdAlarma] = useState<string | null>();
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
    useState<boolean>(false);
  const [mostrarActivarBotonPanico, setActivarBotonPanico] =
    useState<boolean>(false);
  const [mostrarAlertaEliminarAlarma, setMostrarAlertaEliminarAlarma] =
    useState<boolean>(false);

  const { Alerta } = useAlerts();

  /**********************************************************************************/
  const peticionAlarmas = async () => {
    try {
      setLoading(true);

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/alarmas`,
        params: {
          pagina: pagina,
          limite: limite,
        },
      });
      setAlarmasData(respuesta[0]);
      setTotal(respuesta.datos?.total);
    } catch (e) {
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  const peticionContactos = async () => {
    try {
      setLoading(true);

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/contactos`,
      });
      setContactosData(respuesta[0]);
    } catch (e) {
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  const peticionUbicaciones = async () => {
    try {
      setLoading(true);

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/ubicaciones`,
      });
      setUbicacionesData(respuesta[0]);
    } catch (e) {
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  const peticionSimuladores = async () => {
    try {
      setLoading(true);

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/simuladores`,
      });
      setSimuladoresData(respuesta[0]);
    } catch (e) {
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  const cambiarEstadoAlarmaPeticion = async (alarmaData: AlarmaType) => {
    //setLoading(true);
    if (alarma?.estado !== "ENCENDIDO") {
      try {
        setLoading(true);

        const respuesta = await sesionPeticion({
          url: `${Constantes.baseUrl}/alarmas/${alarma?.id}/${
            alarma?.estado !== "ENCENDIDO" ? "encender" : "apagar"
          }`,
          tipo: "patch",
        });
        Alerta({
          mensaje: `${InterpreteMensajes(respuesta)}`,
          variant: "success",
        });
      } catch (e) {
        Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: "error" });
      } finally {
        setLoading(false);
      }
    }
  };
  const eliminarAlarmaPeticion = async (alarmaData: AlarmaType) => {
    try {
      setLoading(true);

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/alarmas/${alarma?.id}/eliminar`,
        tipo: "patch",
      });

      Alerta({
        mensaje: `${InterpreteMensajes(respuesta)}`,
        variant: "success",
      });
    } catch (e) {
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: "error" });
    } finally {
      setLoading(false);
    }
  };
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
  const verficarBotonPanico = (alarma: AlarmaType) => {
    if (alarma?.id === "1" || alarma?.id === "2") return true;
    return false;
  };
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
        {generateTypographyElement(
          "Seguridad para Bienes",
          alarmaData.seguridadBienes
        )}
        {generateTypographyElement("Sensores de humo", alarmaData.sensoresHumo)}
        {generateTypographyElement(
          "Alumbrado automático",
          alarmaData.alumbradoAutomatico
        )}
        <Typography
          variant="body2"
          key={`${alarmaData.id}-${indexAlarma}- alerta_sonido`}
        >
          <b>Alerta de sonido:</b>{" "}
          {alarmaData.sonido === "2"
            ? "Preguntar primero"
            : alarmaData.sonido === "3"
            ? "Automáticamente"
            : "No"}
        </Typography>
        <Typography
          variant="body2"
          key={`${alarmaData.id}-${indexAlarma}- notificacion_contactos`}
        >
          <b>Notificaciones a contactos:</b>{" "}
          {alarmaData.envio_noti === "2"
            ? "Preguntar primero"
            : alarmaData.envio_noti === "3"
            ? "Automáticamente"
            : "No"}
        </Typography>
        <Typography
          variant="body2"
          key={`${alarmaData.id}-${indexAlarma}- idSimulador`}
        >
          <b>Simulador de presencia:</b>{" "}
          {`${
            alarmaData?.simulador?.nombre ? alarmaData?.simulador?.nombre : ""
          }`}
        </Typography>
      </>,
      <Typography
        key={`${alarmaData.id}-${indexAlarma}-idContactos`}
        variant={"body2"}
      >
        {alarmaData.alarmaContactos?.map((alarmaContacto, index) => (
          <span key={index + alarmaContacto.id + "contactos"}>
            {"* " +
              alarmaContacto.contacto.nombre +
              " " +
              alarmaContacto.contacto.apellido}
            {index <
              (alarmaData.alarmaContactos
                ? alarmaData.alarmaContactos.length - 1
                : 0) && <br />}
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
          {!verficarBotonPanico(alarmaData) && (
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
          )}
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
        {!verficarBotonPanico(alarmaData) && (
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
        )}
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
  const activarBotonModal = async (id: string) => {
    setIdAlarma(id);
    setActivarBotonPanico(true);
  };
  const cerrarBotonModal = () => {
    setIdAlarma(null);
    setAlarma(null);
    setActivarBotonPanico(false);
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

  const activarBoton = (id: string) => {
    const alarma = alarmasData.filter((alarma) => alarma.id === id);
    setAlarma(alarma[0]);
    activarBotonModal(id);
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
      <VerificarIncidentes />
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
      <Dialog
        open={mostrarActivarBotonPanico}
        onClose={cerrarBotonModal}
        maxWidth={"md"}
      >
        <ModalBoton
          accionCancelar={cerrarBotonModal}
          accionCorrecta={cerrarBotonModal}
          idAlarma={idAlarma}
          alarma={alarma}
        />
      </Dialog>
      <AlertDialog
        isOpen={mostrarAlertaEstadoAlarma}
        titulo={"Alerta"}
        texto={`¿Está seguro de activar alerta de pánico ${
          idAlarma == "1" ? "Sonoro" : "Silencioso"
        }?`}
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
        <Grid item xs={11} sm={11} md={5} lg={5} xl={5}>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#6D21D9", // Color verde (success)
              "&:hover": {
                backgroundColor: "#451786", // Cambio de color en hover
              },
              width: "31%", // Ajusta el ancho para que todos los botones tengan el mismo tamaño
              margin: "1%",
            }}
            key="accionAgregarArticulo"
            size="small"
            onClick={() => {
              activarBoton("1");
            }}
          >
            <VolumeUpIcon sx={{ fontSize: 30, marginRight: 1 }} />
            <Typography variant="subtitle1" sx={{ fontSize: 16 }}>
              Pánico sonoro
            </Typography>
          </Button>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#289DE1", // Color verde (success)
              "&:hover": {
                backgroundColor: "#1A628C", // Cambio de color en hover
              },
              width: "31%", // Ajusta el ancho para que todos los botones tengan el mismo tamaño
              margin: "1%",
            }}
            key="accionAgregarArticulo"
            size="small"
            onClick={() => {
              activarBoton("2");
            }}
          >
            <VolumeMuteIcon sx={{ fontSize: 30, marginRight: 1 }} />
            <Typography variant="subtitle1" sx={{ fontSize: 16 }}>
              Pánico insonoro
            </Typography>
          </Button>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#748198", // Color verde (success)
              "&:hover": {
                backgroundColor: "#44587A", // Cambio de color en hover
              },
              width: "31%", // Ajusta el ancho para que todos los botones tengan el mismo tamaño
              margin: "1%",
            }}
            key="accionAgregarArticulo"
            size="small"
            onClick={() => {
              activarBoton("SIRENA");
            }}
          >
            <VolumeOffIcon sx={{ fontSize: 30, marginRight: 1 }} />
            <Typography variant="subtitle1" sx={{ fontSize: 16 }}>
              Apagar sirenas
            </Typography>
          </Button>
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
