import { Grid, Typography, Button, Chip, Stack, Dialog } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { Paginacion } from "../../common/components/ui/Paginacion";
import { ColumnaType } from "../../common/types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Delete, Edit } from "@mui/icons-material";
import { CustomDataTable } from "../../common/components/ui/CustomDataTable";
import { ModalDispositivo } from "../components/dispositivo/ModalDispositivo.component";
import { DispositivoType } from "../components/dispositivo/types/dispositivoCRUDType";
import axios from "axios";
import { UbicacionType } from "../components/alarma/types/alarmaCRUD";
import { useAlerts } from "../../common/hooks";
import { InterpreteMensajes } from "../../common/utils/interpreteMensajes";
import { AlertDialog } from "../../common/components/ui";
import { Constantes } from '../../config'

export const Dispositivos_conf = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dispositivo, setDispositivo] = useState<DispositivoType | null>();
  const [dispositivosData, setDispositivosData] = useState<DispositivoType[]>(
    []
  );
  const [ubicacionesData, setUbicacionesData] = useState<
    UbicacionType[] | null
  >();
  const [mostrarAlertaEliminarDispositivo, setMostrarAlertaEliminarDispositivo] =
  useState(false);
  const { Alerta } = useAlerts();

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
      key={`accionAgregarDispositivo`}
      size={"small"}
      color="success"
      onClick={() => {
        agregarDispositivoModal();
      }}
    >
      <AddCircleIcon /> Añadir Dispositivo
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

  const agregarDispositivoModal = () => {
    setDispositivo(undefined);
    setOpenModal(true);
  };
  const editarDispositivoModal = (Dispositivo: DispositivoType | undefined) => {
    setDispositivo(Dispositivo);
    setOpenModal(true);
  };

  const cerrarDispositivoModal = async () => {
    setOpenModal(false);
    setDispositivo(undefined);
    //  await delay(500)
    //  setSistemaEdicion(undefined)
  };

  const obtenerDispositivosPeticion = async () => {
    console.log("obteniendo sistema");
  };
  /**********************************************************************************/
  const peticionDispositivos = async () => {
    console.log("Obteniendo datos");
    const data = await axios.get(`${Constantes.baseUrl}/dispositivos`);
    setDispositivosData(data.data[0]);
  };

  const peticionUbicaciones = async () => {
    console.log("Obteniendo datos");
    const data = await axios.get(`${Constantes.baseUrl}/ubicaciones`);
    setUbicacionesData(data.data[0]);
  };

  const eliminarDispositivoPeticion = async () => {
    //setLoading(true);
    await axios
      .patch(`${Constantes.baseUrl}/dispositivos/${dispositivo?.id}/inactivar`)
      .then((res) => {
        Alerta({ mensaje: `completado con exito`, variant: "success" });
      })
      .catch((err) => {
        Alerta({ mensaje: `${InterpreteMensajes(err)}`, variant: "error" });
      });
  };
  /**********************************************************************************/

  const columnas: Array<ColumnaType> = [
    { campo: "id_dispositivo", nombre: "ID Dispositivo" },
    { campo: "nombre", nombre: "Nombre" },
    { campo: "tipo", nombre: "Tipo" },
    { campo: "ubicaccion", nombre: "Ubicacion" },
    { campo: "direcciones", nombre: "Direcciones" },
    { campo: "sensores", nombre: "Sensores" },
    { campo: "actuadores", nombre: "Actuadores" },
    { campo: "acciones", nombre: "Acciones" },
  ];

  const contenidoTabla: Array<Array<ReactNode>> = dispositivosData.map(
    (dispositivoData, indexDispositivo) => [
      <Typography
        key={`${dispositivoData.id}-${indexDispositivo}-id_dispositivo`}
        variant={"body2"}
      >{`${dispositivoData.id}`}</Typography>,
      <Typography
        key={`${dispositivoData.nombre}-${indexDispositivo}-nombre`}
        variant={"body2"}
      >{`${dispositivoData.nombre}`}</Typography>,
      <Typography
        key={`${dispositivoData.id}-${indexDispositivo}- tipo`}
        variant={"body2"}
      >
        {`${dispositivoData.tipo}`}
      </Typography>,
      <Typography
        key={`${dispositivoData.id}-${indexDispositivo}- ubicacion`}
        variant={"body2"}
      >
        {`${dispositivoData.ubicacion.nombre}`}
      </Typography>,
      <>
        <Stack direction="column" spacing={1}>
          <Chip
            label={"LAN " + dispositivoData.direccionLan}
            key={`${dispositivoData.id}-${indexDispositivo}- lan`}
          />
          {dispositivoData.direccionWan && (
            <Chip
              label={"WAN " + dispositivoData.direccionWan}
              key={`${dispositivoData.id}-${indexDispositivo}- wan`}
            />
          )}
        </Stack>
      </>,
      <Grid>
        <Stack direction="column" spacing={1}>
          {dispositivoData.sensoresActuadores
            .filter((sensorActuador) => sensorActuador.tipo === "SENSOR")
            .map((sensor) => (
              <Chip
                label={sensor.pin + " " + sensor.descripcion}
                key={sensor.id}
              />
            ))}
        </Stack>
      </Grid>,
      ,
      <Grid>
        <Stack direction="column" spacing={1}>
          {dispositivoData.sensoresActuadores
            .filter((sensorActuador) => sensorActuador.tipo === "ACTUADOR")
            .map((actuador) => (
              <Chip
                label={actuador.pin + " " + actuador.descripcion}
                key={actuador.id}
              />
            ))}
        </Stack>
      </Grid>,
      <Grid
        key={`${dispositivoData.id}-${indexDispositivo}-accion`}
        flexDirection={"column"}
        alignContent={"center"}
        alignItems={"center"}
      >
        {/* {permisos.update && rolUsuario?.nombre === ROL_USUARIO && ( */}
        <Grid>
          <Button
            variant={"text"}
            sx={{ ml: 1, mr: 1, textTransform: "none" }}
            key={`accionAgregarArticulo`}
            size={"small"}
            //color="error"
            onClick={() => {
              editarDispositivoModal(dispositivoData);
            }}
          >
            <Edit />
          </Button>
        </Grid>
        <Grid>
          <Button
            variant={"text"}
            sx={{ ml: 1, mr: 1, textTransform: "none" }}
            key={`accionSimuladorAlarma`}
            size={"small"}
            color="error"
            onClick={async () => {
              await eliminarDispositivoModal(dispositivoData);
            }}
          >
            <Delete />
          </Button>
        </Grid>
        {/* )} */}
      </Grid>,
    ]
  );

  const eliminarDispositivoModal = async (dispositivoData: DispositivoType) => {
    setDispositivo(dispositivoData); // para mostrar datos de articulo en la alerta
    setMostrarAlertaEliminarDispositivo(true); // para mostrar alerta de articulos
  };
  const aceptarAlertaEliminarDispositivo = async () => {
    setMostrarAlertaEliminarDispositivo(false);
    if (dispositivo) {
      await eliminarDispositivoPeticion();
    }
    setDispositivo(null);
  };
  /// Método que cierra alerta de cambio de estado

  const cancelarAlertaEliminarDispositivo = async () => {
    setMostrarAlertaEliminarDispositivo(false);
    //await delay(500) // para no mostrar undefined mientras el modal se cierra
    setDispositivo(null);
  };

  useEffect(() => {
    peticionDispositivos();
    peticionUbicaciones();
  }, []);
  useEffect(() => {
    peticionDispositivos();
  }, [dispositivo]);
  const refrescar = async () => {
    peticionDispositivos();
  };
  return (
    <>
      <Dialog
        open={openModal}
        onClose={cerrarDispositivoModal}
        fullWidth={true}
        maxWidth={"md"}
      >
        <ModalDispositivo
          dispositivo={dispositivo}
          ubicaciones={ubicacionesData || []}
          accionCancelar={cerrarDispositivoModal}
          accionCorrecta={() => {
            cerrarDispositivoModal().finally();
            refrescar().finally();
          }}
        />
      </Dialog>
      <AlertDialog
        isOpen={mostrarAlertaEliminarDispositivo}
        titulo={"Alerta"}
        texto={`¿Está seguro de Eliminar el dispositivo  ${dispositivo?.nombre}`}
      >
        <Button onClick={cancelarAlertaEliminarDispositivo}>Cancelar</Button>
        <Button onClick={aceptarAlertaEliminarDispositivo}>Aceptar</Button>
      </AlertDialog>
      <Grid container justifyContent={"center"}>
        <Grid item xs={12} sm={12} md={10} lg={10} xl={10} marginTop={"3%"}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} marginTop={"1%"}>
            <CustomDataTable
              titulo={"Dispositivos"}
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
    </>
  );
};
