import { Grid, Typography, Button, Chip, Dialog } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { Paginacion } from "../../common/components/ui/Paginacion";
import { ColumnaType } from "../../common/types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Delete } from "@mui/icons-material";
import { CustomDataTable } from "../../common/components/ui/CustomDataTable";
import { HistorialActivarDesactivarType } from "../components/historial-activacion/types/historialActivacionType";
import axios from "axios";
import { HistorialType } from "../components/historial-incidentes/types/historialType";
import { useAlerts } from "../../common/hooks";
import { InterpreteMensajes } from "../../common/utils/interpreteMensajes";
import { AlertDialog } from "../../common/components/ui";
import { ModalActivarDesactivar } from "../components/historial-activacion/ModalActivarDesactivar";
import { Constantes } from "../../config";
import { useSession } from "../../common/hooks/useSession";
import { useAuth } from "../../common/context/auth";

//import { ModalalarmaFotos } from "../components/historial-activacion/RowalarmaActivacion.component";

interface alarmaType {
  id: string;
  fecha: Date;
  usuario: String;
  alarma: string;
  accion: string;
}
export const Activ_desac_historial = () => {
  const { sesionPeticion } = useSession();
  const { usuario } = useAuth();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [alarma, setalarma] = useState<alarmaType | null>();
  const [errorArticulosData, setErrorArticulosData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  // Variables de páginado
  const [limite, setLimite] = useState<number>(10);
  const [pagina, setPagina] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [historialActivarDesactivarData, setHistorialActivarDesactivarData] =
    useState<HistorialActivarDesactivarType[]>([]);
  const [historialActivarDesactivar, setHistorialActivarDesactivar] =
    useState<HistorialActivarDesactivarType | null>();
  const [mostrarAlertaEliminarHistorial, setMostrarAlertaEliminarHistorial] =
    useState(false);
  const [modalHistorial, setModalHistorial] = useState<boolean>(false);

  const acciones: Array<ReactNode> = [
    usuario?.rol === "ADMINISTRADOR" && (
      <Button
        variant={"contained"}
        sx={{ ml: 1, mr: 1, textTransform: "none" }}
        key={`accionAgregarArticulo`}
        size={"small"}
        color="error"
        onClick={() => {
          agregarhistorialModal();
        }}
      >
        Eliminar historial
      </Button>
    ),
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
  const { Alerta } = useAlerts();

  /**************************************************************************/
  const peticionHistorialActivarDesactivar = async () => {
    try {
      setLoading(true);

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/historialActivarDesactivar`,
        params: {
          pagina: pagina,
          limite: limite,
        },
      });
      setHistorialActivarDesactivarData(respuesta[0]);
      setTotal(respuesta.datos?.total);
    } catch (e) {
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  const eliminarHistorialIncidentePeticion = async (
    historialData: HistorialActivarDesactivarType
  ) => {
    try {
      setLoading(true);

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}}/historialActivarDesactivar/${historialActivarDesactivar?.id}/limpiar`,
        tipo: "patch",
      });
      Alerta({
        mensaje: InterpreteMensajes(respuesta),
        variant: "success",
      });
    } catch (e) {
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  /**************************************************************************/
  const agregaralarmaModal = () => {
    setalarma(undefined);
    setOpenModal(true);
  };
  const editaralarmaModal = (alarma: alarmaType | undefined) => {
    setalarma(alarma);
    setOpenModal(true);
  };

  const cerraralarmaModal = async () => {
    setOpenModal(false);
    setalarma(undefined);
    //  await delay(500)
    //  setSistemaEdicion(undefined)
  };

  const obteneralarmasPeticion = async () => {
    console.log("obteniendo sistema");
  };

  const columnas: Array<ColumnaType> = [
    { campo: "id_historial", nombre: "ID Historial" },
    { campo: "fecha", nombre: "Fecha" },
    { campo: "usuario", nombre: "Usuario" },
    { campo: "alarma", nombre: "Alarma" },
    { campo: "accion", nombre: "Accion" },
    { campo: "acciones", nombre: "" },
  ];

  const contenidoTabla: Array<Array<ReactNode>> =
    historialActivarDesactivarData.map((historialData, index) => [
      <Typography
        key={`${historialData.id}-${index}-id_historial`}
        variant={"body2"}
      >{`${historialData.id}`}</Typography>,
      <Typography
        key={`${historialData.fecha}-${index}-fecha`}
        variant={"body2"}
      >{`${historialData.fecha}`}</Typography>,
      <Typography
        key={`${historialData.id}-${index}- usuario`}
        variant={"body2"}
      >
        {`${historialData.usuario.nombres}   ${historialData.usuario.apellidos}`}
      </Typography>,
      <Typography
        key={`${historialData.id}-${index}- alarma`}
        variant={"body2"}
      >
        {`${historialData.alarma.nombre}`}
      </Typography>,
      <Chip
        label={historialData.accion}
        key={`${historialData.id}-${index}- accion`}
      />,
      <Grid key={`${historialData.id}-${index}-accion`}>
        {usuario?.rol === "ADMINISTRADOR" && (
          <Grid>
            <Button
              variant={"text"}
              sx={{ ml: 1, mr: 1, textTransform: "none" }}
              key={`accionAgregarArticulo`}
              size={"small"}
              color="error"
              onClick={async () => {
                await eliminarHistorialModal(historialData);
              }}
            >
              <Delete />
            </Button>
          </Grid>
        )}
      </Grid>,
    ]);

  const agregarhistorialModal = () => {
    setModalHistorial(true);
  };
  const cerrarHistorialModalEliminar = async () => {
    setModalHistorial(false);
  };
  const eliminarHistorialModal = async (
    historial: HistorialActivarDesactivarType
  ) => {
    setHistorialActivarDesactivar(historial); // para mostrar datos de articulo en la alerta
    setMostrarAlertaEliminarHistorial(true); // para mostrar alerta de articulos
  };
  const aceptarAlertaEliminarAlarma = async () => {
    setMostrarAlertaEliminarHistorial(false);
    if (historialActivarDesactivar) {
      await eliminarHistorialIncidentePeticion(historialActivarDesactivar);
    }
    setHistorialActivarDesactivar(null);
  };
  const cancelarAlertaEliminarAlarma = async () => {
    setMostrarAlertaEliminarHistorial(false);
    setHistorialActivarDesactivar(null);
  };
  const refrescar = async () => {
    peticionHistorialActivarDesactivar();
  };
  useEffect(() => {
    peticionHistorialActivarDesactivar();
  }, []);

  useEffect(() => {
    peticionHistorialActivarDesactivar();
  }, [historialActivarDesactivar]);

  return (
    <Grid container justifyContent={"center"}>
      <AlertDialog
        isOpen={mostrarAlertaEliminarHistorial}
        titulo={"Alerta"}
        texto={`¿Está seguro de Eliminar el registro de incidente ${historialActivarDesactivar?.id} ?`}
      >
        <Button onClick={cancelarAlertaEliminarAlarma}>Cancelar</Button>
        <Button onClick={aceptarAlertaEliminarAlarma}>Aceptar</Button>
      </AlertDialog>
      <Dialog
        open={modalHistorial}
        onClose={cerrarHistorialModalEliminar}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <ModalActivarDesactivar
          accionCancelar={cerrarHistorialModalEliminar}
          accionCorrecta={() => {
            cerrarHistorialModalEliminar().finally();
            refrescar().finally();
          }}
        />
      </Dialog>
      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} marginTop={"3%"}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} marginTop={"1%"}>
          <CustomDataTable
            titulo={"Historial de activación y desactivación de alarmas"}
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
