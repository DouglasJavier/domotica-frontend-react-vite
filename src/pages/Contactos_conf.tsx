import { Grid, Typography, Button, Chip, Stack, Dialog } from "@mui/material";
import { ReactNode, useState } from "react";
import { Paginacion } from "../components/common/components/ui/Paginacion";
import { ColumnaType } from "../components/common/types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Delete, Edit } from "@mui/icons-material";
import { CustomDataTable } from "../components/common/components/ui/CustomDataTable";
import { ModalContacto } from "../components/contactos/ModalContactos";

//import { ModalContactoFotos } from "../components/contacto-activacion/RowContactoActivacion.component";

interface AlarmaType {
  id: string;
  nombre: string;
  sonido: boolean;
  notificacion: boolean;
  envio_noti: string;
  contactos: string[];
  simulador: string;
  ubicaciones: string[];
  tipo: string[];
}
interface ContactoType {
  id: string;
  nombre: string;
  apellido: string;
  numero_Tel1: String;
  numero_Tel2?: String;
  alarmas: AlarmaType[];
}

export const Contactos_conf = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [contacto, setContacto] = useState<ContactoType | null>();
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
      key={`accionAgregarContacto`}
      size={"small"}
      color="success"
      onClick={() => {
        agregarContactoModal();
      }}
    >
      <AddCircleIcon /> Añadir Contacto
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
  const alarmasData: AlarmaType[] = [
    {
      id: "1",
      nombre: "Alarma 1",
      sonido: true,
      notificacion: true,
      envio_noti: "1",
      contactos: ["1", "2", "3"],
      simulador: "1",
      ubicaciones: ["1", "2", "3", "4"],
      tipo: ["1", "2"],
    },
    {
      id: "2",
      nombre: "Alarma 2",
      sonido: true,
      notificacion: true,
      envio_noti: "1",
      contactos: ["1", "2", "3"],
      simulador: "1",
      ubicaciones: ["1", "2", "3", "4"],
      tipo: ["1", "2"],
    },
    {
      id: "3",
      nombre: "Alarma 3",
      sonido: true,
      notificacion: true,
      envio_noti: "1",
      contactos: ["1", "2", "3"],
      simulador: "1",
      ubicaciones: ["1", "2", "3", "4"],
      tipo: ["1", "2"],
    },
    {
      id: "4",
      nombre: "Alarma 4",
      sonido: true,
      notificacion: true,
      envio_noti: "1",
      contactos: ["1", "2", "3"],
      simulador: "1",
      ubicaciones: ["1", "2", "3", "4"],
      tipo: ["1", "2"],
    },
    {
      id: "5",
      nombre: "Alarma 5",
      sonido: true,
      notificacion: true,
      envio_noti: "1",
      contactos: ["1", "2", "3"],
      simulador: "1",
      ubicaciones: ["1", "2", "3", "4"],
      tipo: ["1", "2"],
    },
  ];

  const ContactosData: ContactoType[] = [
    {
      id: "1",
      nombre: "Carlos",
      apellido: "Caballero",
      numero_Tel1: "7123456",
      alarmas: [alarmasData[0], alarmasData[1]],
    },
    {
      id: "2",
      nombre: "Jose Manuel",
      apellido: "Carbajal",
      numero_Tel1: "7123456",
      numero_Tel2: "6987451",
      alarmas: [alarmasData[1]],
    },
    {
      id: "1",
      nombre: "Jorge Luis",
      apellido: "Gonzalez",
      numero_Tel1: "7123456",
      alarmas: [alarmasData[3], alarmasData[4]],
    },
    {
      id: "1",
      nombre: "Elba",
      apellido: "Lazo",
      numero_Tel1: "7123456",
      numero_Tel2: "7987654",
      alarmas: [],
    },
  ];

  const agregarContactoModal = () => {
    setContacto(undefined);
    setOpenModal(true);
  };
  const editarContactoModal = (Contacto: ContactoType | undefined) => {
    setContacto(Contacto);
    setOpenModal(true);
  };

  const cerrarContactoModal = async () => {
    setOpenModal(false);
    setContacto(undefined);
    //  await delay(500)
    //  setSistemaEdicion(undefined)
  };

  const obtenerContactosPeticion = async () => {
    console.log("obteniendo sistema");
  };

  const columnas: Array<ColumnaType> = [
    { campo: "id_contacto", nombre: "ID Contacto" },
    { campo: "nombre", nombre: "Nombres" },
    { campo: "apellidos", nombre: "Apellidos" },
    { campo: "numeros", nombre: "Numeros de celular" },
    { campo: "accion", nombre: "Alarmas" },
    { campo: "acciones", nombre: "Acciones" },
  ];

  const contenidoTabla: Array<Array<ReactNode>> = ContactosData.map(
    (ContactoData, indexContacto) => [
      <Typography
        key={`${ContactoData.id}-${indexContacto}-id_contacto`}
        variant={"body2"}
      >{`${ContactoData.id}`}</Typography>,
      <Typography
        key={`${ContactoData.nombre}-${indexContacto}-nombre`}
        variant={"body2"}
      >{`${ContactoData.nombre}`}</Typography>,
      <Typography
        key={`${ContactoData.id}-${indexContacto}- apellido`}
        variant={"body2"}
      >
        {`${ContactoData.apellido}`}
      </Typography>,
      <>
        <Stack direction="column" spacing={1}>
          <Chip
            label={ContactoData.numero_Tel1}
            key={`${ContactoData.id}-${indexContacto}- numero1`}
          />
          {ContactoData.numero_Tel2 && (
            <Chip
              label={ContactoData.numero_Tel2}
              key={`${ContactoData.id}-${indexContacto}- numero2`}
            />
          )}
        </Stack>
      </>,
      <Grid>
        <Stack direction="column" spacing={1}>
          {ContactoData.alarmas.map((alarma) => (
            <Chip label={alarma.nombre} key={alarma.id} />
          ))}
        </Stack>
      </Grid>,
      <Grid key={`${ContactoData.id}-${indexContacto}-accion`}>
        {/* {permisos.update && rolUsuario?.nombre === ROL_USUARIO && ( */}
        <Grid>
          <Button
            variant={"text"}
            sx={{ ml: 1, mr: 1, textTransform: "none" }}
            key={`accionAgregarArticulo`}
            size={"small"}
            //color="error"
            onClick={() => {
              editarContactoModal(ContactoData);
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
        onClose={cerrarContactoModal}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <ModalContacto
          contacto={contacto}
          alarmas={alarmasData}
          accionCancelar={cerrarContactoModal}
          accionCorrecta={() => {
            cerrarContactoModal().finally();
            //obtenerAlarmasPeticion();
          }}
        />
      </Dialog>
      <Grid container justifyContent={"center"}>
        <Grid item xs={12} sm={12} md={10} lg={10} xl={10} marginTop={"3%"}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} marginTop={"1%"}>
            <CustomDataTable
              titulo={"Contacto de activación y desactivación de Contactos"}
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
