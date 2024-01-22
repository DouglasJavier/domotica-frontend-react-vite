import { Grid, Typography, Button, Chip, Stack, Dialog } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { Paginacion } from "../../common/components/ui/Paginacion";
import { ColumnaType } from "../../common/types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Delete, Edit } from "@mui/icons-material";
import { CustomDataTable } from "../../common/components/ui/CustomDataTable";
import { ModalContacto } from "../components/contactos/ModalContactos";
import { ContactoType } from "../components/contactos/types/contactosCRUDType";
import axios from "axios";
import { useAlerts } from "../../common/hooks";
import { InterpreteMensajes } from "../../common/utils/interpreteMensajes";
import { AlertDialog } from "../../common/components/ui";
import { Constantes } from "../../config";
import { useSession } from "../../common/hooks/useSession";
import { useAuth } from "../../common/context/auth";

//import { ModalContactoFotos } from "../components/contacto-activacion/RowContactoActivacion.component";
export const Contactos_conf = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [contacto, setContacto] = useState<ContactoType | null>();
  const [errorArticulosData, setErrorArticulosData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [contactosData, setContactosData] = useState<ContactoType[]>([]);
  const [mostrarAlertaEliminarContacto, setMostrarAlertaEliminarContacto] =
    useState(false);

  const { Alerta } = useAlerts();
  const { sesionPeticion } = useSession();
  const { usuario } = useAuth();

  // Variables de páginado
  const [limite, setLimite] = useState<number>(10);
  const [pagina, setPagina] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const acciones: Array<ReactNode> = [
    usuario?.rol === "ADMINISTRADOR" && (
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

  /**********************************************************************************/
  const peticionContactos = async () => {
    try {
      setLoading(true);

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/contactos`,
        params: {
          pagina: pagina,
          limite: limite,
        },
      });
      setContactosData(respuesta[0]);
      setTotal(respuesta.datos?.total);
    } catch (e) {
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  const eliminarContactoPeticion = async () => {
    //setLoading(true);
    try {
      setLoading(true);

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/contactos/${contacto?.id}/inactivar`,
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

  const contenidoTabla: Array<Array<ReactNode>> = contactosData.map(
    (contactoData, indexContacto) => [
      <Typography
        key={`${contactoData.id}-${indexContacto}-id_contacto`}
        variant={"body2"}
      >{`${contactoData.id}`}</Typography>,
      <Typography
        key={`${contactoData.nombre}-${indexContacto}-nombre`}
        variant={"body2"}
      >{`${contactoData.nombre}`}</Typography>,
      <Typography
        key={`${contactoData.id}-${indexContacto}- apellido`}
        variant={"body2"}
      >
        {`${contactoData.apellido}`}
      </Typography>,
      <>
        <Stack direction="column" spacing={1}>
          <Chip
            label={contactoData.numeroTel1}
            key={`${contactoData.id}-${indexContacto}- numero1`}
          />
          {contactoData.numeroTel2 && (
            <Chip
              label={contactoData.numeroTel2}
              key={`${contactoData.id}-${indexContacto}- numero2`}
            />
          )}
        </Stack>
      </>,
      <Grid>
        <Stack direction="column" spacing={1}>
          {contactoData.alarmaContactos.map((alarma) => (
            <Chip label={alarma.alarma.nombre} key={alarma.id} />
          ))}
        </Stack>
      </Grid>,
      <Grid
        key={`${contactoData.id}-${indexContacto}-accion`}
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
                key={`accionAgregarArticulo`}
                size={"small"}
                //color="error"
                onClick={() => {
                  editarContactoModal(contactoData);
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
                  await eliminarContactoModal(contactoData);
                }}
              >
                <Delete />
              </Button>
            </Grid>
          </>
        )}
      </Grid>,
    ]
  );

  const eliminarContactoModal = async (contactoData: ContactoType) => {
    setContacto(contactoData); // para mostrar datos de articulo en la alerta
    setMostrarAlertaEliminarContacto(true); // para mostrar alerta de articulos
  };
  const aceptarAlertaEliminarContacto = async () => {
    setMostrarAlertaEliminarContacto(false);
    if (contacto) {
      await eliminarContactoPeticion();
    }
    setContacto(null);
  };
  /// Método que cierra alerta de cambio de estado

  const cancelarAlertaEliminarContacto = async () => {
    setMostrarAlertaEliminarContacto(false);
    //await delay(500) // para no mostrar undefined mientras el modal se cierra
    setContacto(null);
  };

  useEffect(() => {
    peticionContactos();
  }, []);
  const refrescar = async () => {
    peticionContactos();
  };
  useEffect(() => {
    peticionContactos();
  }, [contacto]);
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
          accionCancelar={cerrarContactoModal}
          accionCorrecta={() => {
            cerrarContactoModal().finally();
            refrescar().finally();
          }}
        />
      </Dialog>
      <AlertDialog
        isOpen={mostrarAlertaEliminarContacto}
        titulo={"Alerta"}
        texto={`¿Está seguro de Eliminar el contacto  ${
          contacto?.nombre + " " + contacto?.apellido
        } ?`}
      >
        <Button onClick={cancelarAlertaEliminarContacto}>Cancelar</Button>
        <Button onClick={aceptarAlertaEliminarContacto}>Aceptar</Button>
      </AlertDialog>
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
