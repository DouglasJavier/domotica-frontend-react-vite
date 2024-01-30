import {
  Grid,
  Typography,
  Dialog,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { Paginacion } from "../../common/components/ui/Paginacion";
import { ColumnaType } from "../../common/types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Delete, Edit } from "@mui/icons-material";
import { CustomDataTable } from "../../common/components/ui/CustomDataTable";
import { ModalSimulador } from "../components/simulacion-presencia/ModalSimulacion";
import dayjs from "dayjs";
import axios from "axios";
import {
  ActuadorType,
  SimuladorType,
} from "../components/simulacion-presencia/types/SimuladorCRUDType";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import { useAlerts } from "../../common/hooks";
import { InterpreteMensajes } from "../../common/utils/interpreteMensajes";
import { AlertDialog } from "../../common/components/ui";
import { Constantes } from "../../config";
import { useSession } from "../../common/hooks/useSession";
import { useAuth } from "../../common/context/auth";
import { VerificarIncidentes } from "../components/VerificarIncidentes.component";

export const Simulacion_presencia_conf = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [simulador, setSimulador] = useState<SimuladorType | null>();
  const [simuladoresData, setSimuladoresData] = useState<SimuladorType[]>([]);
  const [actuadoresData, setActuadoresData] = useState<ActuadorType[]>([]);
  const [errorArticulosData, setErrorArticulosData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  // Variables de páginado
  const [limite, setLimite] = useState<number>(10);
  const [pagina, setPagina] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [mostrarAlertaEliminarSimulador, setMostrarAlertaEliminarSimulador] =
    useState(false);
  const { Alerta } = useAlerts();
  const { sesionPeticion } = useSession();
  const { usuario } = useAuth();

  const acciones: Array<ReactNode> = [
    usuario?.rol === "ADMINISTRADOR" && (
      <Button
        variant={"contained"}
        sx={{ ml: 1, mr: 1, textTransform: "none" }}
        key={`accionAgregarArticulo`}
        size={"small"}
        color="success"
        onClick={() => {
          agregarsimuladorModal();
        }}
      >
        <AddCircleIcon /> Añadir simulador
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

  const agregarsimuladorModal = () => {
    setSimulador(undefined);
    setOpenModal(true);
  };
  const editarSimuladorModal = (simulador: SimuladorType | undefined) => {
    setSimulador(simulador);
    setOpenModal(true);
  };

  const cerrarSimuladorModal = async () => {
    setOpenModal(false);
    setSimulador(undefined);
    //  await delay(500)
    //  setSistemaEdicion(undefined)
  };
  /**********************************************************************************/
  const peticionSimuladores = async () => {
    try {
      setLoading(true);

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/simuladores`,
        params: {
          pagina: pagina,
          limite: limite,
        },
      });
      setSimuladoresData(respuesta[0]);
      setTotal(respuesta.datos?.total);
    } catch (e) {
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const peticionActuadores = async () => {
    try {
      setLoading(true);

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/dispositivos/listarActuadores`,
      });
      setActuadoresData(respuesta[0]);
    } catch (e) {
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const eliminarSimuladorPeticion = async () => {
    try {
      setLoading(true);

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/simuladores/${simulador?.id}/inactivar`,
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
  /**********************************************************************************/

  const columnas: Array<ColumnaType> = [
    { campo: "id_simulador", nombre: "ID Simulador" },
    { campo: "nombre", nombre: "Nombre" },
    { campo: "actuadoresSimulacion", nombre: "Actuadores" },
    { campo: "acciones", nombre: "" },
  ];
  const contenidoTabla: Array<Array<ReactNode>> = simuladoresData
    .slice(1)
    .map((simuladorData, indexsimulador) => [
      <Typography
        key={`${simuladorData.id}-${indexsimulador}-id_simulador`}
        variant={"body2"}
      >{`${simuladorData.id}`}</Typography>,
      <Typography
        key={`${simuladorData.nombre}-${indexsimulador}-nombre`}
        variant={"body2"}
      >{`${simuladorData.nombre}`}</Typography>,
      <>
        <List>
          {simuladorData.simuladoresActuadores.map((actuador, index) => (
            <ListItem key={actuador.actuador + " " + index}>
              <Accordion sx={{ width: "100%" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">
                    {actuador.actuador.descripcion}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    - Ubicación: {actuador.actuador.ubicacion.nombre}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle2" color="textSecondary">
                    Horarios:
                  </Typography>
                  <List>
                    {actuador.horarios.map((horario, index) => (
                      <ListItem key={index}>
                        <Chip
                          label={`${dayjs(horario.horaInicio).format(
                            "HH:mm"
                          )} - ${dayjs(horario.horaFin).format("HH:mm")}`}
                          size="small"
                          color="primary"
                        />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </ListItem>
          ))}
        </List>
      </>,
      <Grid
        key={`${simuladorData?.id}-${indexsimulador}-accion`}
        flexDirection={"column"}
        alignContent={"center"}
        alignItems={"center"}
      >
        {usuario?.rol === "ADMINISTRADOR" && (
          <>
            <Grid>
              <Button
                variant={"text"}
                sx={{ ml: 1, mr: 1, textTransform: "none" }}
                key={`${simuladorData.id}-${indexsimulador}-accionEditar`}
                size={"small"}
                onClick={() => {
                  editarSimuladorModal(simuladorData);
                }}
              >
                <EditIcon />
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
                  await eliminarSimuladorModal(simuladorData);
                }}
              >
                <Delete />
              </Button>
            </Grid>
          </>
        )}
      </Grid>,
    ]);

  const eliminarSimuladorModal = async (simuladorData: SimuladorType) => {
    setSimulador(simuladorData); // para mostrar datos de articulo en la alerta
    setMostrarAlertaEliminarSimulador(true); // para mostrar alerta de articulos
  };

  const aceptarAlertaEliminarAlarma = async () => {
    setMostrarAlertaEliminarSimulador(false);
    if (simulador) {
      await eliminarSimuladorPeticion();
    }
    setSimulador(null);
  };
  /// Método que cierra alerta de cambio de estado

  const cancelarAlertaEliminarAlarma = async () => {
    setMostrarAlertaEliminarSimulador(false);
    //await delay(500) // para no mostrar undefined mientras el modal se cierra
    setSimulador(null);
  };

  useEffect(() => {
    peticionSimuladores();
    peticionActuadores();
  }, []);
  useEffect(() => {
    peticionSimuladores();
  }, [simulador]);
  const refrescar = async () => {
    peticionSimuladores();
  };
  return (
    <>
      <VerificarIncidentes />
      <Dialog
        open={openModal}
        onClose={cerrarSimuladorModal}
        fullWidth={true}
        maxWidth={"md"}
      >
        <ModalSimulador
          simulacion={simulador}
          actuadores={actuadoresData}
          accionCancelar={cerrarSimuladorModal}
          accionCorrecta={() => {
            cerrarSimuladorModal().finally();
            refrescar().finally();
          }}
        />
      </Dialog>
      <AlertDialog
        isOpen={mostrarAlertaEliminarSimulador}
        titulo={"Alerta"}
        texto={`¿Está seguro de Eliminar el simulador de presencia  ${simulador?.nombre} ?`}
      >
        <Button onClick={cancelarAlertaEliminarAlarma}>Cancelar</Button>
        <Button onClick={aceptarAlertaEliminarAlarma}>Aceptar</Button>
      </AlertDialog>
      <Grid container justifyContent={"center"}>
        <Grid item xs={12} sm={12} md={10} lg={11} xl={11} marginTop={"3%"}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} marginTop={"1%"}>
            <CustomDataTable
              titulo={"Historial de activación y desactivación de simuladors"}
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
