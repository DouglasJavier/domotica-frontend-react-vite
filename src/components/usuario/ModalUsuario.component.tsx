import {
  Button,
  Card,
  CardMedia,
  DialogContent,
  DialogActions,
  DialogTitle,
  Paper,
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useFieldArray, useForm } from "react-hook-form";
import {
  FormInputText,
  FormInputMultiCheckbox,
  FormInputRadio,
  FormInputDropdownMultiple,
  FormInputDropdown,
  optionType,
} from "../common/components/ui/form";
import dayjs from "dayjs";
import { FormInputSwitch } from "../common/components/ui/form/FormInputSwitch";
import { useAlerts } from "../common/hooks";
import { useEffect, useState } from "react";
import { FormInputTime } from "../common/components/ui/form/FormInputTime";
// Hook para mostrar alertas
//const { Alerta } = useAlerts();

interface UsuarioType {
  id: string;
  nombres: string;
  apellidos: string;
  usuario: string;
  contraseña: string;
  rol: string;
}

interface ModalSimulacionProps {
  usuario?: UsuarioType | null;
  accionCancelar: () => void;
  accionCorrecta: () => void;
}

export const ModalUsuario = ({
  usuario,
  accionCancelar,
  accionCorrecta,
}: ModalSimulacionProps) => {
  const { handleSubmit, control, watch, setValue, getValues } =
    useForm<UsuarioType>({
      defaultValues: {
        id: usuario?.id,
        nombres: usuario?.nombres,
        apellidos: usuario?.apellidos,
        usuario: usuario?.usuario,
        rol: usuario?.rol,
      },
    });
  const defaultOption = { key: "", value: "", label: "" };

  const [defaultActuadorData, setDefaultActuadorData] =
    useState<optionType>(defaultOption);
  const guardarActualizarUsuario = async (data: UsuarioType) => {
    await guardarActualizarUsuarioPeticion(data);
  };
  const guardarActualizarUsuarioPeticion = async (usuario: UsuarioType) => {
    console.log(usuario);
  };

  return (
    <form onSubmit={handleSubmit(guardarActualizarUsuario)}>
      <DialogTitle>
        {usuario ? "Editar usuario" : "Agregar nuevo usuario"}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
          <Grid item xs={12} sm={6} md={6}>
            <FormInputText
              id={"nombre"}
              control={control}
              name="nombres"
              label="Nombre del usuario"
              // disabled={loadingModal}
              rules={{ required: "Este campo es requerido" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormInputText
              id={"apellidos"}
              control={control}
              name="apellidos"
              label="Apellidos del usuario"
              // disabled={loadingModal}
              rules={{ required: "Este campo es requerido" }}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
          <Grid item xs={12} sm={6} md={6}>
            <FormInputText
              id={"direccionLan"}
              control={control}
              name="usuario"
              label="Usuario"
              // disabled={loadingModal}
              rules={{ required: "Este campo es requerido" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormInputDropdown
              id={"direccionWan"}
              control={control}
              name="rol"
              label="Rol"
              directionColumn = {true}
              options={[
                {
                  key: 'Admin',
                  value: 'ADMINISTRADOR',
                  label: 'Administrador',
                },
                {
                  key: 'User',
                  value: 'USUARIO',
                  label: 'Usuario',
                },
              ]}
              // disabled={loadingModal}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          my: 1,
          mx: 2,
          justifyContent: {
            lg: "flex-end",
            md: "flex-end",
            xs: "center",
            sm: "center",
          },
        }}
      >
        <Button variant="contained" color="success" type="submit">
          Añadir Usuario
        </Button>
        <Button variant="contained" color="error" onClick={accionCancelar}>
          Salir
        </Button>
      </DialogActions>
    </form>
  );
};
