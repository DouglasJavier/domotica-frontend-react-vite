import { Grid, Typography, Button, Chip, Stack, Dialog } from "@mui/material";
import { ReactNode, useState } from "react";
import { Paginacion } from "../components/common/components/ui/Paginacion";
import { ColumnaType } from "../components/common/types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Delete, Edit } from "@mui/icons-material";
import { CustomDataTable } from "../components/common/components/ui/CustomDataTable";
import { ModalUsuario } from "../components/usuario/ModalUsuario.component";
//import { ModalUsuario } from "../components/usuario/ModalUsuario.component";
//import { ModalUsuario } from "../components/usuarios/ModalUsuarios";

//import { ModalUsuarioFotos } from "../components/usuario-activacion/RowUsuarioActivacion.component";

interface UsuarioType {
  id: string;
  nombres: string;
  apellidos: string;
  usuario: string;
  contraseña: string;
  rol: string;
}

export const Usuarios_conf = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<UsuarioType | null>();
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

  const UsuariosData: UsuarioType[] = [
    {
      id: "1",
      nombres: "Alan",
      apellidos: "Brito Delgado",
      usuario: "AlanBrito123",
      contraseña: "123456",
      rol: "ADMNISTRADOR",
    },
    {
      id: "2",
      nombres: "Elva",
      apellidos: "Lazo Mata",
      usuario: "ElvaLazo",
      contraseña: "123456",
      rol: "USUARIO",
    },
    {
      id: "3",
      nombres: "Armando Esteban",
      apellidos: "Quito",
      usuario: "Armando007",
      contraseña: "123456",
      rol: "USUARIO",
    },
    {
      id: "4",
      nombres: "Zoila",
      apellidos: "Cerda",
      usuario: "ZoilaC",
      contraseña: "123456",
      rol: "USUARIO",
    },
  ];

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

  const obtenerUsuariosPeticion = async () => {
    console.log("obteniendo sistema");
  };

  const columnas: Array<ColumnaType> = [
    { campo: "id_usuario", nombre: "ID Usuario" },
    { campo: "nombre", nombre: "Nombres" },
    { campo: "apellidos", nombre: "Apellidos" },
    { campo: "usuario", nombre: "Usuario" },
    { campo: "rol", nombre: "Rol" },
    { campo: "acciones", nombre: "Acciones" },
  ];

  const contenidoTabla: Array<Array<ReactNode>> = UsuariosData.map(
    (UsuarioData, indexUsuario) => [
      <Typography
        key={`${UsuarioData.id}-${indexUsuario}-id_usuario`}
        variant={"body2"}
      >{`${UsuarioData.id}`}</Typography>,
      <Typography
        key={`${UsuarioData.nombres}-${indexUsuario}-nombres`}
        variant={"body2"}
      >{`${UsuarioData.nombres}`}</Typography>,
      <Typography
        key={`${UsuarioData.apellidos}-${indexUsuario}- apellidos`}
        variant={"body2"}
      >
        {`${UsuarioData.apellidos}`}
      </Typography>,
      <Typography
        key={`${UsuarioData.id}-${indexUsuario}- usuario`}
        variant={"body2"}
      >
        {`${UsuarioData.usuario}`}
      </Typography>,
      <>
        <Chip
          label={UsuarioData.rol}
          key={`${UsuarioData.id}-${indexUsuario}- rol`}
        />
      </>,
      <Grid key={`${UsuarioData.id}-${indexUsuario}-accion`}>
        {/* {permisos.update && rolUsuario?.nombre === ROL_USUARIO && ( */}
        <Grid>
          <Button
            variant={"text"}
            sx={{ ml: 1, mr: 1, textTransform: "none" }}
            key={`accionEditarUsuario`}
            size={"small"}
            //color="error"
            onClick={() => {
              editarUsuarioModal(UsuarioData);
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
        onClose={cerrarUsuarioModal}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <ModalUsuario
          usuario={usuario}
          accionCancelar={cerrarUsuarioModal}
          accionCorrecta={() => {
            cerrarUsuarioModal().finally();
            //obtenerAlarmasPeticion();
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
