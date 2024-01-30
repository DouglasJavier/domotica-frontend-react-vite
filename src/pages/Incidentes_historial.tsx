import { Grid, Typography, Dialog, Button, Chip, Box } from "@mui/material";
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
import { VerificarIncidentes } from "../components/VerificarIncidentes.component";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VisibilityIcon from '@mui/icons-material/Visibility';

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
  const [mostrarAlertaIncidente, setMostrarAlertaIncidente] = useState(false);

  // Variables de páginado
  const [limite, setLimite] = useState<number>(10);
  const [pagina, setPagina] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const acciones: Array<ReactNode> = [
    mostrarAlertaIncidente && (
      <Box sx={{ m: 1, p: 2, display: "flex", alignItems: "center" }}>
        <WarningAmberIcon color="warning" sx={{ fontSize: 30 }} />{" "}
        <Typography>Tienes incidentes de seguridad sin atender</Typography>
      </Box>
    ),
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
      setTotal(respuesta[1]);
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
  const consultaIncidentes = async () => {
    try {
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/historialIncidentes`,
        params: {
          estado: "DESATENDIDO",
        },
      });
      if (respuesta[0].length > 0) setMostrarAlertaIncidente(true);
    } catch (e) {
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: "error" });
    } finally {
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
  const getEstadoLabel = (estado: string) => {
    return estado === "DESATENDIDO" ? "SIN ATENDER" : estado;
  };

  const getEstadoVariant = (estado: string) => {
    switch (estado) {
      case "ATENDIDO":
        return "success";
      case "DESCARTADO":
        return "info";
      default:
        return "error";
    }
  };
  const columnas: Array<ColumnaType> = [
    { campo: "id_historial", nombre: "ID Historial" },
    { campo: "fecha", nombre: "Fecha" },
    { campo: "ubicacion", nombre: "Ubicación" },
    { campo: "detalles", nombre: "Detalles" },
    { campo: "estado", nombre: "Estado" },
    { campo: "acciones", nombre: "Acciones" },
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

      <Chip
        label={getEstadoLabel(historialData.estado)}
        key={`${historialData.id}-${historialData.estado}-estado`}
        color={getEstadoVariant(historialData.estado)}
        variant="outlined"
      />,
      <Grid container>
        <Grid item key={`${historialData.id}-${indexHistorialAD}-fotos`}>
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
              <VisibilityIcon/>
            </Button>
          </Grid>
          {/* )} */}
        </Grid>
        <Grid item key={`${historialData.id}-${indexHistorialAD}-accion`}>
          {usuario?.rol === "ADMINISTRADOR" && historialData.estado !== 'DESATENDIDO' && (
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
        </Grid>
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
    consultaIncidentes();
  }, []);

  useEffect(() => {
    peticionHistorialIncidentes();
  }, [historialIncidente]);

  return (
    <Grid container justifyContent={"center"}>
      {/* <VerificarIncidentes /> */}
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
          incidente={incidentes}
          accionCancelar={cerrarFotoModal}
          accionCorrecta={() => {
            cerrarFotoModal().finally();
            refrescar().finally();
          }}
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
