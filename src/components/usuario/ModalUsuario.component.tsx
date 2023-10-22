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
import { UsuarioType } from "./types/usuarioCRUDType";
import axios from "axios";
import { useAlerts } from "../../../common/hooks";
import { InterpreteMensajes } from "../../../common/utils/interpreteMensajes";
import { AlertDialog } from "../../../common/components/ui";
import { Constantes } from '../../../config'

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
    const { Alerta } = useAlerts();
  console.log("*******************************************");
  console.log(getValues());
  console.log("*******************************************");
  const defaultOption = { key: "", value: "", label: "" };

  const guardarActualizarUsuario = async (data: UsuarioType) => {
    if (usuario) {
      await patchUsuarioPeticion(data);
      accionCorrecta();
    } else {
      await postUsuarioPeticion(data);
      accionCorrecta();
    }
  };

  const postUsuarioPeticion = async (elem: UsuarioType) => {
    console.log("enviado datos");
    const subiendo = await axios
      .post(`${Constantes.baseUrl}/usuarios`, elem)
      .then((res) => {
        Alerta({ mensaje: `completado con exito`, variant: "success" });
      })
      .catch((err) => {
        Alerta({ mensaje: `${InterpreteMensajes(err)}`, variant: "error" });
      });
  };
  const patchUsuarioPeticion = async (elem: UsuarioType) => {
    console.log("enviado datos");
    const subiendo = await axios
      .patch(`${Constantes.baseUrl}/usuarios/${usuario?.id}`, elem)
      .then((res) => {
        Alerta({ mensaje: `completado con exito`, variant: "success" });
      })
      .catch((err) => {
        Alerta({ mensaje: `${InterpreteMensajes(err)}`, variant: "error" });
      });
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
              //directionColumn={true}
              options={[
                {
                  key: "ADMINISTRADOR",
                  value: "ADMINISTRADOR",
                  label: "Administrador",
                },
                {
                  key: "USUARIO",
                  value: "USUARIO",
                  label: "Usuario",
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
          {usuario ? 'Editar Usuario' : 'Añadir Usuario' }
        </Button>
        <Button variant="contained" color="error" onClick={accionCancelar}>
          Salir
        </Button>
      </DialogActions>
    </form>
  );
};
