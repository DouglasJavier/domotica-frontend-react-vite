import { Grid, Typography, Button, Chip, Stack, Dialog } from "@mui/material";
import { ReactNode, useState } from "react";
import { Paginacion } from "../components/common/components/ui/Paginacion";
import { ColumnaType } from "../components/common/types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Delete, Edit } from "@mui/icons-material";
import { CustomDataTable } from "../components/common/components/ui/CustomDataTable";
import { ModalDispositivo } from "../components/dispositivo/ModalDispositivo.component";
//import { ModalDispositivo } from "../components/dispositivos/ModalDispositivos";

//import { ModalDispositivoFotos } from "../components/dispositivo-activacion/RowDispositivoActivacion.component";

interface sensorType {
  id: string;
  pin: number;
  tipo: string;
  ubicacion: string;
  subUbicacion?: string;
}
interface actuadorType {
  id: string;
  pin: number;
  tipo: string;
  ubicacion: string;
  subUbicacion?: string;
}
interface DispositivoType {
  id: string;
  nombre: string;
  tipo: string;
  ubicacion: string;
  direccionLan: string;
  direccionWan?: string;
  sensores: sensorType[];
  actuadores: actuadorType[];
}

export const Dispositivos_conf = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dispositivo, setDispositivo] = useState<DispositivoType | null>();
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

  const DispositivosData: DispositivoType[] = [
    {
      id: "1",
      nombre: "Cámara 1",
      tipo: "esp32CAM",
      ubicacion: "Patio principal",
      direccionLan: "192.168.0.28",
      direccionWan: "10.165.156.10:3245",
      sensores: [
        {
          id: "1",
          pin: 14,
          tipo: "PIR",
          ubicacion: "Patio principal",
          subUbicacion: "Puerta ingreso",
        },
        {
          id: "2",
          pin: 16,
          tipo: "Ultra Sónico",
          ubicacion: "Patio principal",
          subUbicacion: "Puerta garaje",
        },
      ],
      actuadores: [
        {
          id: "1",
          pin: 15,
          tipo: "Foco",
          ubicacion: "Patio Principal",
        },
      ],
    },
    {
      id: "2",
      nombre: "Cámara 2",
      tipo: "esp32CAM",
      ubicacion: "Patio principal",
      direccionLan: "192.168.0.28",
      direccionWan: "10.165.156.10:3245",
      sensores: [
        {
          id: "4",
          pin: 14,
          tipo: "PIR",
          ubicacion: "Sala principal",
        },
        {
          id: "5",
          pin: 15,
          tipo: "PIR",
          ubicacion: "Escritorio",
        },
      ],
      actuadores: [
        {
          id: "4",
          pin: 17,
          tipo: "Foco",
          ubicacion: "Sala Principal",
        },
        {
          id: "5",
          pin: 18,
          tipo: "Foco",
          ubicacion: "Escritorio",
        },
      ],
    },
    {
      id: "3",
      nombre: "Cámara 3",
      tipo: "esp32CAM",
      ubicacion: "Cocina",
      direccionLan: "192.168.0.28",
      direccionWan: "10.165.156.10:3245",
      sensores: [
        {
          id: "4",
          pin: 14,
          tipo: "CO2",
          ubicacion: "Cocina",
        },
        {
          id: "5",
          pin: 15,
          tipo: "PIR",
          ubicacion: "Cocina",
        },
      ],
      actuadores: [
        {
          id: "4",
          pin: 17,
          tipo: "Foco",
          ubicacion: "Concina",
        },
      ],
    },
  ];

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

  const contenidoTabla: Array<Array<ReactNode>> = DispositivosData.map(
    (DispositivoData, indexDispositivo) => [
      <Typography
        key={`${DispositivoData.id}-${indexDispositivo}-id_dispositivo`}
        variant={"body2"}
      >{`${DispositivoData.id}`}</Typography>,
      <Typography
        key={`${DispositivoData.nombre}-${indexDispositivo}-nombre`}
        variant={"body2"}
      >{`${DispositivoData.nombre}`}</Typography>,
      <Typography
        key={`${DispositivoData.id}-${indexDispositivo}- tipo`}
        variant={"body2"}
      >
        {`${DispositivoData.tipo}`}
      </Typography>,
      <Typography
      key={`${DispositivoData.id}-${indexDispositivo}- ubicacion`}
      variant={"body2"}
    >
      {`${DispositivoData.ubicacion}`}
    </Typography>,
      <>
        <Stack direction="column" spacing={1}>
          <Chip
            label={'LAN '+DispositivoData.direccionLan}
            key={`${DispositivoData.id}-${indexDispositivo}- lan`}
          />
          {DispositivoData.direccionWan && (
            <Chip
              label={'WAN '+DispositivoData.direccionWan}
              key={`${DispositivoData.id}-${indexDispositivo}- wan`}
            />
          )}
        </Stack>
      </>,
      <Grid>
        <Stack direction="column" spacing={1}>
          {DispositivoData.sensores.map((sensor) => (
            <Chip label={sensor.pin +' '+sensor.tipo} key={sensor.id} />
          ))}
        </Stack>
      </Grid>,
      ,
      <Grid>
        <Stack direction="column" spacing={1}>
          {DispositivoData.actuadores.map((actuador) => (
            <Chip label={actuador.pin +' '+actuador.tipo} key={actuador.id} />
          ))}
        </Stack>
      </Grid>,
      <Grid key={`${DispositivoData.id}-${indexDispositivo}-accion`}>
        {/* {permisos.update && rolUsuario?.nombre === ROL_USUARIO && ( */}
        <Grid>
          <Button
            variant={"text"}
            sx={{ ml: 1, mr: 1, textTransform: "none" }}
            key={`accionAgregarArticulo`}
            size={"small"}
            //color="error"
            onClick={() => {
              editarDispositivoModal(DispositivoData);
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
        onClose={cerrarDispositivoModal}
        fullWidth={true}
        maxWidth={"md"}
      >
        <ModalDispositivo
          dispositivo={dispositivo}
          accionCancelar={cerrarDispositivoModal}
          accionCorrecta={() => {
            cerrarDispositivoModal().finally();
            //obtenerAlarmasPeticion();
          }}
        />
      </Dialog>
      <Grid container justifyContent={"center"}>
        <Grid item xs={12} sm={12} md={10} lg={10} xl={10} marginTop={"3%"}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} marginTop={"1%"}>
            <CustomDataTable
              titulo={
                "Dispositivos"
              }
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
