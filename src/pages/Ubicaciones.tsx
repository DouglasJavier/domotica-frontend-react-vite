import { Grid, Typography, Button, Chip, Stack, Dialog } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { Paginacion } from "../../common/components/ui/Paginacion";
import { ColumnaType } from "../../common/types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Delete, Edit } from "@mui/icons-material";
import { CustomDataTable } from "../../common/components/ui/CustomDataTable";
import { ModalUbicacion } from "../components/ubicacion/ModalUbicacion.component";
import { UbicacionType } from "../components/ubicacion/types/ubicacionCRUDType";
import axios from "axios";
import { InterpreteMensajes } from "../../common/utils/interpreteMensajes";
import { useAlerts } from "../../common/hooks";
import { AlertDialog } from "../../common/components/ui";
import { Constantes } from '../../config'

export const Ubicaciones_conf = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [ubicacion, setUbicacion] = useState<UbicacionType | null>();
  const [errorArticulosData, setErrorArticulosData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [ubicacionesData, setUbicacionesData] = useState<UbicacionType[]>([]);
  const [mostrarAlertaEliminarUbicacion, setMostrarAlertaEliminarUbicacion] =
    useState(false);

  const { Alerta } = useAlerts();

  // Variables de páginado
  const [limite, setLimite] = useState<number>(10);
  const [pagina, setPagina] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const acciones: Array<ReactNode> = [
    <Button
      variant={"contained"}
      sx={{ ml: 1, mr: 1, textTransform: "none" }}
      key={`accionAgregarUbicacion`}
      size={"small"}
      color="success"
      onClick={() => {
        agregarUbicacionModal();
      }}
    >
      <AddCircleIcon /> Añadir Ubicacion
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

  const agregarUbicacionModal = () => {
    setUbicacion(undefined);
    setOpenModal(true);
  };
  const editarUbicacionModal = (Ubicacion: UbicacionType | undefined) => {
    setUbicacion(Ubicacion);
    setOpenModal(true);
  };

  const cerrarUbicacionModal = async () => {
    setOpenModal(false);
    setUbicacion(undefined);
    //  await delay(500)
    //  setSistemaEdicion(undefined)
  };

  /**********************************************************************************/
  const peticionUbicaciones = async () => {
    console.log("Obteniendo datos");
    const data = await axios.get(`${Constantes.baseUrl}/ubicaciones`);
    setUbicacionesData(data.data[0]);
  };

  const eliminarUbicacionPeticion = async () => {
    //setLoading(true);
    await axios
      .patch(`${Constantes.baseUrl}/ubicaciones/${ubicacion?.id}/inactivar`)
      .then((res) => {
        Alerta({ mensaje: `completado con exito`, variant: "success" });
      })
      .catch((err) => {
        Alerta({ mensaje: `${InterpreteMensajes(err)}`, variant: "error" });
      });
  };
  /**********************************************************************************/

  const columnas: Array<ColumnaType> = [
    { campo: "id_ubicacion", nombre: "ID Ubicacion" },
    { campo: "nombre", nombre: "Nombres" },
    { campo: "acciones", nombre: "Acciones" },
  ];

  const contenidoTabla: Array<Array<ReactNode>> = ubicacionesData.map(
    (ubicacionData, indexUbicacion) => [
      <Typography
        key={`${ubicacionData.id}-${indexUbicacion}-id_ubicacion`}
        variant={"body2"}
      >{`${ubicacionData.id}`}</Typography>,
      <Typography
        key={`${ubicacionData.nombre}-${indexUbicacion}-nombre`}
        variant={"body2"}
      >{`${ubicacionData.nombre}`}</Typography>,
      <Grid
        key={`${ubicacionData.id}-${indexUbicacion}-accion`}
        flexDirection={"column"}
        alignContent={"center"}
        alignItems={"center"}
      >
        {/* {permisos.update && rolUbicacion?.nombre === ROL_USUARIO && ( */}
        <Grid>
          <Button
            variant={"text"}
            sx={{ ml: 1, mr: 1, textTransform: "none" }}
            key={`accionAgregarUbicacion`}
            size={"small"}
            //color="error"
            onClick={() => {
              editarUbicacionModal(ubicacionData);
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
              await eliminarUbicacionModal(ubicacionData);
            }}
          >
            <Delete />
          </Button>
        </Grid>
        {/* )} */}
      </Grid>,
    ]
  );
  const eliminarUbicacionModal = async (ubicacionData: UbicacionType) => {
    setUbicacion(ubicacionData); // para mostrar datos de articulo en la alerta
    setMostrarAlertaEliminarUbicacion(true); // para mostrar alerta de articulos
  };
  const aceptarAlertaEliminarUbicacion = async () => {
    setMostrarAlertaEliminarUbicacion(false);
    if (ubicacion) {
      await eliminarUbicacionPeticion();
    }
    setUbicacion(null);
  };
  /// Método que cierra alerta de cambio de estado

  const cancelarAlertaEliminarUbicacion = async () => {
    setMostrarAlertaEliminarUbicacion(false);
    //await delay(500) // para no mostrar undefined mientras el modal se cierra
    setUbicacion(null);
  };
  useEffect(() => {
    peticionUbicaciones();
  }, []);
  const refrescar = async () => {
    peticionUbicaciones();
  };
  useEffect(() => {
    peticionUbicaciones();
  }, [ubicacion]);
  return (
    <>
      <AlertDialog
        isOpen={mostrarAlertaEliminarUbicacion}
        titulo={"Alerta"}
        texto={`¿Está seguro de Eliminar el ubicacion  ${
          ubicacion?.nombre
        } ?`}
      >
        <Button onClick={cancelarAlertaEliminarUbicacion}>Cancelar</Button>
        <Button onClick={aceptarAlertaEliminarUbicacion}>Aceptar</Button>
      </AlertDialog>
      <Dialog
        open={openModal}
        onClose={cerrarUbicacionModal}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <ModalUbicacion
          ubicacion={ubicacion}
          accionCancelar={cerrarUbicacionModal}
          accionCorrecta={() => {
            cerrarUbicacionModal().finally();
            refrescar().finally();
          }}
        />
      </Dialog>
      <Grid container justifyContent={"center"}>
        <Grid item xs={12} sm={12} md={10} lg={10} xl={10} marginTop={"3%"}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} marginTop={"1%"}>
            <CustomDataTable
              titulo={"Ubicaciones"}
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
