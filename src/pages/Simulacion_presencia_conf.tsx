import {
  Grid,
  Typography,
  Dialog,
  Button,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { Paginacion } from "../../common/components/ui/Paginacion";
import { ColumnaType } from "../../common/types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Delete, Edit } from "@mui/icons-material";
import { CustomDataTable } from "../../common/components/ui/CustomDataTable";
import { ModalSimulador } from "../components/simulacion-presencia/ModalSimulacion";
import dayjs from "dayjs";
interface horario {
  horaInicio: Date;
  horaFin: Date;
}
interface actuadorType {
  id: string;
  nombre: string;
  tipo: string;
  ubicacion: string;
}
interface actuadorSimuladorType {
  id: string;
  actuador: actuadorType;
  horarios: horario[];
}
interface simuladorType {
  id: string;
  nombre: string;
  estado: string;
  actuadoresSimulacion: actuadorSimuladorType[];
}
export const Simulacion_presencia_conf = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [simulador, setsimulador] = useState<simuladorType | null>();
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
        agregarsimuladorModal();
      }}
    >
      <AddCircleIcon /> Añadir simulador
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

  const simuladorsData: simuladorType[] = [
    {
      id: "1",
      nombre: "Todos en casa",
      estado: "ACTIVADO",
      actuadoresSimulacion: [
        {
          id: "1",
          actuador: {
            id: "1",
            nombre: "Foco sala principal",
            tipo: "foco",
            ubicacion: "Sala Principal",
          },
          horarios: [
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
          ],
        },
        {
          id: "2",
          actuador: {
            id: "2",
            nombre: "Foco cocina",
            tipo: "foco",
            ubicacion: "cocina",
          },
          horarios: [
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate()},
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate()},
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
          ],
        },
        {
          id: "3",
          actuador: {
            id: "3",
            nombre: "Foco dormitorio",
            tipo: "foco",
            ubicacion: "Sala Principal",
          },
          horarios: [
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate()},
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
          ],
        },
      ],
    },
    {
      id: "2",
      nombre: "Algunos en casa",
      estado: "INACTIVO",
      actuadoresSimulacion: [
        {
          id: "1",
          actuador: {
            id: "1",
            nombre: "Foco sala principal",
            tipo: "foco",
            ubicacion: "Sala Principal",
          },
          horarios: [
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
          ],
        },
        {
          id: "2",
          actuador: {
            id: "2",
            nombre: "Foco cocina",
            tipo: "foco",
            ubicacion: "cocina",
          },
          horarios: [
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
          ],
        },
        {
          id: "3",
          actuador: {
            id: "3",
            nombre: "Foco dormitorio",
            tipo: "foco",
            ubicacion: "Sala Principal",
          },
          horarios: [
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
          ],
        },
      ],
    },
    {
      id: "3",
      nombre: "Uno en casa",
      estado: "INACTIVO",
      actuadoresSimulacion: [
        {
          id: "1",
          actuador: {
            id: "1",
            nombre: "Foco sala principal",
            tipo: "foco",
            ubicacion: "Sala Principal",
          },
          horarios: [
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate()},
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
          ],
        },
        {
          id: "2",
          actuador: {
            id: "2",
            nombre: "Foco cocina",
            tipo: "foco",
            ubicacion: "cocina",
          },
          horarios: [
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
          ],
        },
        {
          id: "3",
          actuador: {
            id: "3",
            nombre: "Foco dormitorio",
            tipo: "foco",
            ubicacion: "Sala Principal",
          },
          horarios: [
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
            { horaInicio: dayjs("2022-04-17T08:30").toDate(), horaFin: dayjs("2022-04-17T08:30").toDate() },
          ],
        },
      ],
    },
  ];

  const actuadoresData = [
    {
      id: "3",
      nombre: "Foco dormitorio",
      tipo: "foco",
      ubicacion: "Sala Principal",
    },
    {
      id: "2",
      nombre: "Foco cocina",
      tipo: "foco",
      ubicacion: "cocina",
    },
    {
      id: "1",
      nombre: "Foco sala principal",
      tipo: "foco",
      ubicacion: "Sala Principal",
    }
  ];

  const agregarsimuladorModal = () => {
    setsimulador(undefined);
    setOpenModal(true);
  };
  const editarSimuladorModal = (simulador: simuladorType | undefined) => {
    setsimulador(simulador);
    setOpenModal(true);
  };

  const cerrarSimuladorModal = async () => {
    setOpenModal(false);
    setsimulador(undefined);
    //  await delay(500)
    //  setSistemaEdicion(undefined)
  };

  const obtenerSimuladorPeticion = async () => {
    console.log("obteniendo sistema");
  };

  const columnas: Array<ColumnaType> = [
    { campo: "id_simulador", nombre: "ID Simulador" },
    { campo: "nombre", nombre: "Nombre" },
    { campo: "estado", nombre: "Estado" },
    { campo: "actuadoresSimulacion", nombre: "Actuadores" },
    { campo: "ubicaciones", nombre: "Ubicaciones" },
    { campo: "acciones", nombre: "" },
  ];

  const contenidoTabla: Array<Array<ReactNode>> = simuladorsData.map(
    (simuladorData, indexsimulador) => [
      <Typography
        key={`${simuladorData.id}-${indexsimulador}-id_simulador`}
        variant={"body2"}
      >{`${simuladorData.id}`}</Typography>,
      <Typography
        key={`${simuladorData.nombre}-${indexsimulador}-nombre`}
        variant={"body2"}
      >{`${simuladorData.nombre}`}</Typography>,
      <Typography
        key={`${simuladorData.id}-${indexsimulador}- estado`}
        variant={"body2"}
      >
        {`${simuladorData.estado}`}
      </Typography>,
      <>
        {simuladorData.actuadoresSimulacion.map((actua) => {
          return <p> {actua.actuador.nombre} </p>;
        })}
      </>,
      <>
        {simuladorData.actuadoresSimulacion.map((actua) => {
          return <p> {actua.actuador.ubicacion} </p>;
        })}
      </>,
      <Grid key={`${simuladorData.id}-${indexsimulador}-accion`}>
        {/* {permisos.update && rolUsuario?.nombre === ROL_USUARIO && ( */}
        <Grid>
          <Button
            variant={"text"}
            sx={{ ml: 1, mr: 1, textTransform: "none" }}
            key={`accionAgregarArticulo`}
            size={"small"}
            onClick={() => {
              editarSimuladorModal(simuladorData);
            }}
          >
            <Edit />
          </Button>
        </Grid>
        {/* )} */}
      </Grid>,
    ]
  );

  return (
    <>
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
            //obtenerAlarmasPeticion();
          }}
        />
      </Dialog>
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
