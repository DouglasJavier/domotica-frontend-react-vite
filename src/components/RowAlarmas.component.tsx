import {
  TableRow,
  TableCell,
  Button,
  Switch,
  SwitchProps,
  styled,
  FormControlLabel,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";


interface CrearEditarAlarmaCRUDType {
  nombre: String;
  sonido: boolean;
  notificacion: boolean;
  envio_noti: number;
  simulador: number;
  ubicaciones: number; 
}

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

interface RowAlarmasProps{
  editarAlarmaModal: (alarma: CrearEditarAlarmaCRUDType | undefined) => void
 }
export const RowAlarmas = ({editarAlarmaModal}:RowAlarmasProps) => {
  const [alarma, setAlarma] = useState<CrearEditarAlarmaCRUDType>()
  return (
    <TableRow>
      <TableCell>123</TableCell>
      <TableCell>Nombre Alarma 1</TableCell>
      <TableCell>
        <p>Sonar alarma: si </p>
        <p>Notificar a contactos: primero preguntar</p>
        <p>Simulación de presencia: Todos en casa</p>
      </TableCell>
      <TableCell>seguridad para personas</TableCell>
      <TableCell>
        <p>Cámara de cocina</p>
        <p>Cámara de sala</p>
      </TableCell>
      {/* <TableCell>{noticia.imagen}</TableCell> */}
      <TableCell>
        <Button color="success" onClick={() => editarAlarmaModal(alarma)}>
          <EditIcon />
        </Button>
        <Button color="error">
          <DeleteOutlineIcon />
        </Button>
      </TableCell>
      <TableCell>
        {" "}
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
          label=""
        />
      </TableCell>
    </TableRow>
  );
};
