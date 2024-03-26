import {
  Button,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
} from "@mui/material";

import { useForm } from "react-hook-form";
import {
  FormInputText,
  FormInputDropdown,
  optionType,
} from "../../../common/components/ui/form";
import { useState } from "react";
import { CambioUsuarioType, UsuarioType } from "./types/usuarioCRUDType";
import axios from "axios";
import { useAlerts } from "../../../common/hooks";
import { InterpreteMensajes } from "../../../common/utils/interpreteMensajes";
import { AlertDialog } from "../../../common/components/ui";
import { Constantes } from "../../../config";
import { useSession } from "../../../common/hooks/useSession";
import { useAuth } from "../../../common/context/auth";

interface ModalSimulacionProps {
  usuario?: UsuarioType | null;
  accionCancelar: () => void;
  accionCorrecta: () => void;
}

export const ModalUsuarioPerfil = ({
  accionCancelar,
  accionCorrecta,
}: ModalSimulacionProps) => {
  const { usuario } = useAuth();

  const { handleSubmit, control, getValues, watch } =
    useForm<CambioUsuarioType>({
      defaultValues: {
        id: usuario?.id,
        nombres: usuario?.nombres,
        apellidos: usuario?.apellidos,
        usuario: usuario?.usuario,
        rol: usuario?.rol,
        idTelegram: usuario?.idTelegram,
        contrasenia1: "",
        contrasenia2: "",
      },
    });
  const { Alerta } = useAlerts();
  const { sesionPeticion } = useSession();

  console.log("*******************************************");
  console.log(getValues());
  console.log("*******************************************");
  const defaultOption = { key: "", value: "", label: "" };

  const guardarActualizarUsuario = async (data: UsuarioType) => {
    try {
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/usuarios/editar`,
        tipo: "patch",
        body: {
          usuario: watch("usuario"),
          contrasenia1: btoa(watch("contrasenia1")),
          contrasenia2: btoa(watch("contrasenia2")),
        },
      });
      Alerta({
        mensaje: InterpreteMensajes(respuesta),
        variant: "success",
      });
      accionCorrecta();
    } catch (e) {
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: "error" });
    } finally {
    }
  };

  const [defaultActuadorData, setDefaultActuadorData] =
    useState<optionType>(defaultOption);

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
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormInputText
              id={"apellidos"}
              control={control}
              name="apellidos"
              label="Apellidos del usuario"
              disabled
            />
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
          <Grid item xs={12} sm={6} md={6}>
            <FormInputText
              id={"rol"}
              control={control}
              name="rol"
              label="Rol"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormInputText
              id={"usuario"}
              control={control}
              name="usuario"
              label="Usuario"
              // disabled={loadingModal}
              rules={{ required: "Este campo es requerido" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormInputText
              id={"idTelegram"}
              control={control}
              name="idTelegram"
              label="ID Telegram"
              // disabled={loadingModal}
              rules={{ required: "Este campo es requerido" }}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
          <Grid item xs={12} sm={6} md={6}>
            <FormInputText
              id={"contrasena"}
              control={control}
              name="contrasenia1"
              label="Contraseña Actual"
              size={"medium"}
              labelVariant={"subtitle1"}
              type={"password"}
              /*             disabled={progresoLogin} */
              rules={{
                required: "Este campo es requerido",
                minLength: {
                  value: 3,
                  message: "Mínimo 3 caracteres",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormInputText
              id={"contrasena"}
              control={control}
              name="contrasenia2"
              label="Nueva Contraseña"
              size={"medium"}
              labelVariant={"subtitle1"}
              type={"password"}
              /*             disabled={progresoLogin} */
              rules={{
                required: "Este campo es requerido",
                minLength: {
                  value: 3,
                  message: "Mínimo 3 caracteres",
                },
              }}
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
          {usuario ? "Editar Usuario" : "Añadir Usuario"}
        </Button>
        <Button variant="contained" color="error" onClick={accionCancelar}>
          Salir
        </Button>
      </DialogActions>
    </form>
  );
};
