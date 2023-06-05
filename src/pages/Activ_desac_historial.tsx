import {
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { Paginacion } from "../components/common/components/ui/Paginacion";
import { ColumnaType } from "../components/common/types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Delete } from "@mui/icons-material";
import { CustomDataTable } from "../components/common/components/ui/CustomDataTable";

//import { ModalHistorialADFotos } from "../components/historial-activacion/RowHistorialADActivacion.component";

interface HistorialADType {
  id: string;
  fecha: Date;
  usuario: String;
  HistorialAD: string;
  accion: string;
}
export const Activ_desac_historial = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [HistorialAD, setHistorialAD] = useState<HistorialADType | null>();
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
        agregarHistorialADModal();
      }}
    >
      <AddCircleIcon /> Añadir HistorialAD
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

  const HistorialADsData: HistorialADType[] = [
    {
      id: "1",
      fecha: new Date("2023/05/26"),
      HistorialAD: "Alarma 1",
      usuario: "Alan Brito Delgado",
      accion: "Activo",
    },
    {
      id: "1",
      fecha: new Date("2023/05/26"),
      HistorialAD: "Alarma 1",
      usuario: "Alan Brito Delgado",
      accion: "Activo",
    },
    {
      id: "1",
      fecha: new Date("2023/05/26"),
      HistorialAD: "Alarma 1",
      usuario: "Alan Brito Delgado",
      accion: "Activo",
    },
    {
      id: "1",
      fecha: new Date("2023/05/26"),
      HistorialAD: "Alarma 1",
      usuario: "Alan Brito Delgado",
      accion: "Activo",
    },
    {
      id: "1",
      fecha: new Date("2023/05/26"),
      HistorialAD: "Alarma 1",
      usuario: "Alan Brito Delgado",
      accion: "Activo",
    },
  ];

  const agregarHistorialADModal = () => {
    setHistorialAD(undefined);
    setOpenModal(true);
  };
  const editarHistorialADModal = (HistorialAD: HistorialADType | undefined) => {
    setHistorialAD(HistorialAD);
    setOpenModal(true);
  };

  const cerrarHistorialADModal = async () => {
    setOpenModal(false);
    setHistorialAD(undefined);
    //  await delay(500)
    //  setSistemaEdicion(undefined)
  };

  const obtenerHistorialADsPeticion = async () => {
    console.log("obteniendo sistema");
  };

  const columnas: Array<ColumnaType> = [
    { campo: "id_historial", nombre: "ID Historial" },
    { campo: "fecha", nombre: "Fecha" },
    { campo: "usuario", nombre: "Usuario" },
    { campo: "HistorialAD", nombre: "Alarma" },
    { campo: "accion", nombre: "Accion" },
    { campo: "acciones", nombre: "" },
  ];

  const contenidoTabla: Array<Array<ReactNode>> = HistorialADsData.map(
    (HistorialADData, indexHistorialAD) => [
      <Typography
        key={`${HistorialADData.id}-${indexHistorialAD}-id_historial`}
        variant={"body2"}
      >{`${HistorialADData.id}`}</Typography>,
      <Typography
        key={`${HistorialADData.fecha}-${indexHistorialAD}-fecha`}
        variant={"body2"}
      >{`${HistorialADData.fecha}`}</Typography>,
      <Typography
        key={`${HistorialADData.id}-${indexHistorialAD}- usuario`}
        variant={"body2"}
      >
        {`${HistorialADData.usuario}`}
      </Typography>,
      <Typography
        key={`${HistorialADData.id}-${indexHistorialAD}- HistorialAD`}
        variant={"body2"}
      >
        {`${HistorialADData.HistorialAD}`}
      </Typography>,
      <Typography
        key={`${HistorialADData.id}-${indexHistorialAD}- accion`}
        variant={"body2"}
      >
        {`${HistorialADData.accion}`}
      </Typography>,
      <Grid key={`${HistorialADData.id}-${indexHistorialAD}-accion`}>
        {/* {permisos.update && rolUsuario?.nombre === ROL_USUARIO && ( */}
        <Grid>
          <Button
            variant={"text"}
            sx={{ ml: 1, mr: 1, textTransform: "none" }}
            key={`accionAgregarArticulo`}
            size={"small"}
            color="error"
            onClick={() => {
              agregarHistorialADModal();
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
            titulo={"Historial de activación y desactivación de HistorialADs"}
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
