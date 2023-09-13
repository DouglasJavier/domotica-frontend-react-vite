import {
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { Paginacion } from "../../common/components/ui/Paginacion";
import { ColumnaType } from "../../common/types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Delete } from "@mui/icons-material";
import { CustomDataTable } from "../../common/components/ui/CustomDataTable";

//import { ModalalarmaFotos } from "../components/historial-activacion/RowalarmaActivacion.component";

interface alarmaType {
  id: string;
  fecha: Date;
  usuario: String;
  alarma: string;
  accion: string;
}
export const Activ_desac_historial = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [alarma, setalarma] = useState<alarmaType | null>();
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
        agregaralarmaModal();
      }}
    >
      <AddCircleIcon /> Añadir alarma
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

  const alarmasData: alarmaType[] = [
    {
      id: "1",
      fecha: new Date("2023/05/26"),
      alarma: "Alarma 1",
      usuario: "Alan Brito Delgado",
      accion: "Activo",
    },
    {
      id: "1",
      fecha: new Date("2023/05/26"),
      alarma: "Alarma 1",
      usuario: "Alan Brito Delgado",
      accion: "Activo",
    },
    {
      id: "1",
      fecha: new Date("2023/05/26"),
      alarma: "Alarma 1",
      usuario: "Alan Brito Delgado",
      accion: "Activo",
    },
    {
      id: "1",
      fecha: new Date("2023/05/26"),
      alarma: "Alarma 1",
      usuario: "Alan Brito Delgado",
      accion: "Activo",
    },
    {
      id: "1",
      fecha: new Date("2023/05/26"),
      alarma: "Alarma 1",
      usuario: "Alan Brito Delgado",
      accion: "Activo",
    },
  ];

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

  const contenidoTabla: Array<Array<ReactNode>> = alarmasData.map(
    (alarmaData, indexalarma) => [
      <Typography
        key={`${alarmaData.id}-${indexalarma}-id_historial`}
        variant={"body2"}
      >{`${alarmaData.id}`}</Typography>,
      <Typography
        key={`${alarmaData.fecha}-${indexalarma}-fecha`}
        variant={"body2"}
      >{`${alarmaData.fecha}`}</Typography>,
      <Typography
        key={`${alarmaData.id}-${indexalarma}- usuario`}
        variant={"body2"}
      >
        {`${alarmaData.usuario}`}
      </Typography>,
      <Typography
        key={`${alarmaData.id}-${indexalarma}- alarma`}
        variant={"body2"}
      >
        {`${alarmaData.alarma}`}
      </Typography>,
      <Typography
        key={`${alarmaData.id}-${indexalarma}- accion`}
        variant={"body2"}
      >
        {`${alarmaData.accion}`}
      </Typography>,
      <Grid key={`${alarmaData.id}-${indexalarma}-accion`}>
        {/* {permisos.update && rolUsuario?.nombre === ROL_USUARIO && ( */}
        <Grid>
          <Button
            variant={"text"}
            sx={{ ml: 1, mr: 1, textTransform: "none" }}
            key={`accionAgregarArticulo`}
            size={"small"}
            color="error"
            onClick={() => {
              agregaralarmaModal();
            }}
          >
            <Delete />
          </Button>
        </Grid>
        {/* )} */}
      </Grid>,
    ]
  );

  return (
    <Grid container justifyContent={"center"}>
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
