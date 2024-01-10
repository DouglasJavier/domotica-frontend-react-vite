import { Grid, Typography, Button, Chip, Stack, Dialog } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { Paginacion } from "../../common/components/ui/Paginacion";
import { ColumnaType } from "../../common/types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Delete, Edit } from "@mui/icons-material";
import { CustomDataTable } from "../../common/components/ui/CustomDataTable";
import { ModalUsuario } from "../components/usuario/ModalUsuario.component";
import { UsuarioType } from "../components/usuario/types/usuarioCRUDType";
import axios from "axios";
import { InterpreteMensajes } from "../../common/utils/interpreteMensajes";
import { useAlerts } from "../../common/hooks";
import { AlertDialog } from "../../common/components/ui";
import { Constantes } from "../../config";
import { useSession } from "../../common/hooks/useSession";

export const Usuarios_conf = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<UsuarioType | null>();
  const [errorArticulosData, setErrorArticulosData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [usuariosData, setUsuariosData] = useState<UsuarioType[]>([]);
  const [mostrarAlertaEliminarUsuario, setMostrarAlertaEliminarUsuario] =
    useState(false);

  const { Alerta } = useAlerts();

  // Variables de páginado
  const [limite, setLimite] = useState<number>(10);
  const [pagina, setPagina] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const { sesionPeticion } = useSession();
  const acciones: Array<ReactNode> = [
    <Button
      variant={"contained"}
      sx={{ ml: 1, mr: 1, textTransform: "none" }}
      key={`accionAgregarUsuario`}
      size={"small"}
      color="success"
      onClick={() => {
        agregarUsuarioModal();
      }}
    >
      <AddCircleIcon /> Añadir Usuario
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

  const agregarUsuarioModal = () => {
    setUsuario(undefined);
    setOpenModal(true);
  };
  const editarUsuarioModal = (Usuario: UsuarioType | undefined) => {
    setUsuario(Usuario);
    setOpenModal(true);
  };

  const cerrarUsuarioModal = async () => {
    setOpenModal(false);
    setUsuario(undefined);
    //  await delay(500)
    //  setSistemaEdicion(undefined)
  };

  /**********************************************************************************/
  const peticionUsuarios = async () => {
  
    /* const data = await axios.get(`${Constantes.baseUrl}/usuarios`);
    setUsuariosData(data.data[0]); */
    try {
      setLoading(true);

      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/usuarios`,
        params: {
          pagina: pagina,
          limite: limite,
        },
      });
      setUsuariosData(respuesta[0]);
      setTotal(respuesta.datos?.total);
    } catch (e) {
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuarioPeticion = async () => {
    //setLoading(true);
    await axios
      .patch(`${Constantes.baseUrl}/usuarios/${usuario?.id}/inactivar`)
      .then((res) => {
        Alerta({ mensaje: `completado con exito`, variant: "success" });
      })
      .catch((err) => {
        Alerta({ mensaje: `${InterpreteMensajes(err)}`, variant: "error" });
      });
  };
  /**********************************************************************************/

  const columnas: Array<ColumnaType> = [
    { campo: "id_usuario", nombre: "ID Usuario" },
    { campo: "nombre", nombre: "Nombres" },
    { campo: "apellidos", nombre: "Apellidos" },
    { campo: "usuario", nombre: "Usuario" },
    { campo: "rol", nombre: "Rol" },
    { campo: "acciones", nombre: "Acciones" },
  ];

  const contenidoTabla: Array<Array<ReactNode>> = usuariosData.map(
    (usuarioData, indexUsuario) => [
      <Typography
        key={`${usuarioData.id}-${indexUsuario}-id_usuario`}
        variant={"body2"}
      >{`${usuarioData.id}`}</Typography>,
      <Typography
        key={`${usuarioData.nombres}-${indexUsuario}-nombres`}
        variant={"body2"}
      >{`${usuarioData.nombres}`}</Typography>,
      <Typography
        key={`${usuarioData.apellidos}-${indexUsuario}- apellidos`}
        variant={"body2"}
      >
        {`${usuarioData.apellidos}`}
      </Typography>,
      <Typography
        key={`${usuarioData.id}-${indexUsuario}- usuario`}
        variant={"body2"}
      >
        {`${usuarioData.usuario}`}
      </Typography>,
      <>
        <Chip
          label={usuarioData.rol}
          key={`${usuarioData.id}-${indexUsuario}- rol`}
        />
      </>,
      <Grid
        key={`${usuarioData.id}-${indexUsuario}-accion`}
        flexDirection={"column"}
        alignContent={"center"}
        alignItems={"center"}
      >
        {/* {permisos.update && rolUsuario?.nombre === ROL_USUARIO && ( */}
        <Grid>
          <Button
            variant={"text"}
            sx={{ ml: 1, mr: 1, textTransform: "none" }}
            key={`accionAgregarUsuario`}
            size={"small"}
            //color="error"
            onClick={() => {
              editarUsuarioModal(usuarioData);
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
              await eliminarUsuarioModal(usuarioData);
            }}
          >
            <Delete />
          </Button>
        </Grid>
        {/* )} */}
      </Grid>,
    ]
  );
  const eliminarUsuarioModal = async (usuarioData: UsuarioType) => {
    setUsuario(usuarioData); // para mostrar datos de articulo en la alerta
    setMostrarAlertaEliminarUsuario(true); // para mostrar alerta de articulos
  };
  const aceptarAlertaEliminarUsuario = async () => {
    setMostrarAlertaEliminarUsuario(false);
    if (usuario) {
      await eliminarUsuarioPeticion();
    }
    setUsuario(null);
  };
  /// Método que cierra alerta de cambio de estado

  const cancelarAlertaEliminarUsuario = async () => {
    setMostrarAlertaEliminarUsuario(false);
    //await delay(500) // para no mostrar undefined mientras el modal se cierra
    setUsuario(null);
  };
  useEffect(() => {
    peticionUsuarios();
  }, []);
  const refrescar = async () => {
    peticionUsuarios();
  };
  useEffect(() => {
    peticionUsuarios();
  }, [usuario]);
  return (
    <>
      <AlertDialog
        isOpen={mostrarAlertaEliminarUsuario}
        titulo={"Alerta"}
        texto={`¿Está seguro de Eliminar el usuario  ${
          usuario?.nombres + " " + usuario?.apellidos
        } ?`}
      >
        <Button onClick={cancelarAlertaEliminarUsuario}>Cancelar</Button>
        <Button onClick={aceptarAlertaEliminarUsuario}>Aceptar</Button>
      </AlertDialog>
      <Dialog
        open={openModal}
        onClose={cerrarUsuarioModal}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <ModalUsuario
          usuario={usuario}
          accionCancelar={cerrarUsuarioModal}
          accionCorrecta={() => {
            cerrarUsuarioModal().finally();
            refrescar().finally();
          }}
        />
      </Dialog>
      <Grid container justifyContent={"center"}>
        <Grid item xs={12} sm={12} md={10} lg={10} xl={10} marginTop={"3%"}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} marginTop={"1%"}>
            <CustomDataTable
              titulo={"Usuarios"}
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
