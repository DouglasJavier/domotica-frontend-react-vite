import { Grid, Typography, Dialog, Button } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { ModalHistorialFotos } from "../components/historial-incidentes/ModalHistorialFotos";
import { Delete } from "@mui/icons-material";
import { ColumnaType } from "../../common/types";
import { AlertDialog, CustomDataTable } from "../../common/components/ui";
import { Paginacion } from "../../common/components/ui/Paginacion";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import axios from "axios";
import { HistorialType } from "../components/historial-incidentes/types/historialType";
import { useAlerts } from "../../common/hooks";
import { InterpreteMensajes } from "../../common/utils/interpreteMensajes";
import { ModalIncidente } from "../components/historial-incidentes/ModalIncidentes";
import { Constantes } from "../../config";
import { useSession } from "../../common/hooks/useSession";
import { useAuth } from "../../common/context/auth";

export const Incidentes_historial = () => {
  const { sesionPeticion } = useSession();
  const { usuario } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [incidentes, setIncidentes] = useState<HistorialType | null>();
  const [errorArticulosData, setErrorArticulosData] = useState<any>();
  const [modalHistorial, setModalHistorial] = useState<boolean>(false);
  const [historialIncidentesData, setHistorialIncidentesData] = useState<
    HistorialType[]
  >([]);
  const [historialIncidente, setHistorialIncidente] =
    useState<HistorialType | null>();
  const [mostrarAlertaEliminarHistorial, setMostrarAlertaEliminarHistorial] =
    useState(false);

  // Variables de páginado
  const [limite, setLimite] = useState<number>(10);
  const [pagina, setPagina] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
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
  const peticionHistorialIncidentes = async () => {
    try {
      setLoading(true);

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/historialIncidentes`,
        params: {
          pagina: pagina,
          limite: limite,
        },
      });
      setHistorialIncidentesData(respuesta[0]);
      setTotal(respuesta.datos?.total);
    } catch (e) {
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  const eliminarHistorialIncidentePeticion = async (
    historialData: HistorialType
  ) => {
    try {
      setLoading(true);

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/historialIncidentes/${historialIncidente?.id}/limpiar`,
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
  const cerrarFotoModal = async () => {
    setOpenModal(false);
    setIncidentes(undefined);
  };

  const abrirFotoModal = (historial: HistorialType | undefined) => {
    setOpenModal(true);
    setIncidentes(historial);
  };
  const cerrarHistorialModalEliminar = async () => {
    setModalHistorial(false);
  };
  const agregarhistorialModal = () => {
    setModalHistorial(true);
  };
  const columnas: Array<ColumnaType> = [
    { campo: "id_historial", nombre: "ID Historial" },
    { campo: "fecha", nombre: "Fecha" },
    { campo: "ubicacion", nombre: "Ubicación" },
    { campo: "detalles", nombre: "Detalles" },
    { campo: "fotos", nombre: "Fotos" },
    { campo: "acciones", nombre: "" },
  ];

  const contenidoTabla: Array<Array<ReactNode>> = historialIncidentesData.map(
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
        {`${historialData.sensor.ubicacion.nombre}`}
      </Typography>,
      <Typography
        key={`${historialData.id}-${indexHistorialAD}- detalles`}
        variant={"body2"}
      >
        {`El Sensor ${historialData.sensor.descripcion} detectó un incidente`}
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
    ]
  );

  const eliminarHistorialModal = async (historial: HistorialType) => {
    setHistorialIncidente(historial); // para mostrar datos de articulo en la alerta
    setMostrarAlertaEliminarHistorial(true); // para mostrar alerta de articulos
  };
  const aceptarAlertaEliminarAlarma = async () => {
    setMostrarAlertaEliminarHistorial(false);
    if (historialIncidente) {
      await eliminarHistorialIncidentePeticion(historialIncidente);
    }
    setHistorialIncidente(null);
  };

  const cancelarAlertaEliminarAlarma = async () => {
    setMostrarAlertaEliminarHistorial(false);
    setHistorialIncidente(null);
  };
  const refrescar = async () => {
    peticionHistorialIncidentes();
  };
  useEffect(() => {
    peticionHistorialIncidentes();
  }, []);

  useEffect(() => {
    peticionHistorialIncidentes();
  }, [historialIncidente]);

  return (
    <Grid container justifyContent={"center"}>
      <AlertDialog
        isOpen={mostrarAlertaEliminarHistorial}
        titulo={"Alerta"}
        texto={`¿Está seguro de Eliminar el registro de incidente ${historialIncidente?.id} ?`}
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
        <ModalIncidente
          accionCancelar={cerrarHistorialModalEliminar}
          accionCorrecta={() => {
            cerrarHistorialModalEliminar().finally();
            refrescar().finally();
          }}
        />
      </Dialog>
      <Dialog
        open={openModal}
        onClose={cerrarFotoModal}
        fullWidth={true}
        maxWidth={"md"}
      >
        <ModalHistorialFotos
          Fotos={incidentes?.fotos}
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
