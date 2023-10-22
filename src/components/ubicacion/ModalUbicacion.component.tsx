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
import { UbicacionType } from "./types/ubicacionCRUDType";
import axios from "axios";
import { useAlerts } from "../../../common/hooks";
import { InterpreteMensajes } from "../../../common/utils/interpreteMensajes";
import { AlertDialog } from "../../../common/components/ui";
import { Constantes } from '../../../config'

interface ModalSimulacionProps {
  ubicacion?: UbicacionType | null;
  accionCancelar: () => void;
  accionCorrecta: () => void;
}

export const ModalUbicacion = ({
  ubicacion,
  accionCancelar,
  accionCorrecta,
}: ModalSimulacionProps) => {
  const { handleSubmit, control, watch, setValue, getValues } =
    useForm<UbicacionType>({
      defaultValues: {
        id: ubicacion?.id,
        nombre: ubicacion?.nombre,
      },
    });
    const { Alerta } = useAlerts();
  console.log("*******************************************");
  console.log(getValues());
  console.log("*******************************************");
  const defaultOption = { key: "", value: "", label: "" };

  const guardarActualizarUbicacion = async (data: UbicacionType) => {
    if (ubicacion) {
      await patchUbicacionPeticion(data);
      accionCorrecta();
    } else {
      await postUbicacionPeticion(data);
      accionCorrecta();
    }
  };

  const postUbicacionPeticion = async (elem: UbicacionType) => {
    console.log("enviado datos");
    const subiendo = await axios
      .post(`${Constantes.baseUrl}/ubicaciones`, elem)
      .then((res) => {
        Alerta({ mensaje: `completado con exito`, variant: "success" });
      })
      .catch((err) => {
        Alerta({ mensaje: `${InterpreteMensajes(err)}`, variant: "error" });
      });
  };
  const patchUbicacionPeticion = async (elem: UbicacionType) => {
    console.log("enviado datos");
    const subiendo = await axios
      .patch(`${Constantes.baseUrl}/ubicaciones/${ubicacion?.id}`, elem)
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
    <form onSubmit={handleSubmit(guardarActualizarUbicacion)}>
      <DialogTitle>
        {ubicacion ? "Editar ubicacion" : "Agregar nuevo ubicacion"}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
          <Grid item xs={12} sm={12} md={12}>
            <FormInputText
              id={"nombre"}
              control={control}
              name="nombre"
              label="Nombre de la ubicacion"
              // disabled={loadingModal}
              rules={{ required: "Este campo es requerido" }}
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
          {ubicacion ? 'Editar Ubicacion' : 'Añadir Ubicacion' }
        </Button>
        <Button variant="contained" color="error" onClick={accionCancelar}>
          Salir
        </Button>
      </DialogActions>
    </form>
  );
};
