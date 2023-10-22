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
  optionType,
  FormInputDropdownMultiple,
  FormInputDate,
} from "../../../common/components/ui/form";
import { useState } from "react";
import axios from "axios";
import { useAlerts } from "../../../common/hooks";
import { InterpreteMensajes } from "../../../common/utils/interpreteMensajes";
import dayjs from "dayjs";
import { Constantes } from '../../../config'

interface IntervaloFechaType {
  fechaInicio: string;
  fechaFin: string;
}
interface ModalActivarDesactivarProps {
  accionCancelar: () => void;
  accionCorrecta: () => void;
}

export const ModalActivarDesactivar = ({
  accionCancelar,
  accionCorrecta,
}: ModalActivarDesactivarProps) => {
  const { handleSubmit, control, watch, setValue, getValues } =
    useForm<IntervaloFechaType>({
      defaultValues: {
        fechaInicio: "",
        fechaFin: "",
      },
    });
  const { Alerta } = useAlerts();

  const defaultOption = { key: "", value: "", label: "" };

 /*  const [defaultActuadorData, setDefaultActuadorData] =
    useState<optionType>(defaultOption); */
  const guardarEliminarHistorial = async (data: IntervaloFechaType) => {
    await peticionEliminarHistorial(data);
    accionCorrecta();
  };
  const peticionEliminarHistorial = async (historial: IntervaloFechaType) => {
    {
      //setLoading(true);
      await axios
        .patch(
          `${Constantes.baseUrl}/historialActivarDesactivar/limpiarPorFecha`, 
            {
              fechaInicio: dayjs(getValues().fechaInicio).format('DD/MM/YYYY'),
              fechaFin: dayjs(getValues().fechaFin).format('DD/MM/YYYY')
            },
        )
        .then((res) => {
          Alerta({ mensaje: `completado con exito`, variant: "success" });
        })
        .catch((err) => {
          Alerta({ mensaje: `${InterpreteMensajes(err)}`, variant: "error" });
        });
    }
  };
  return (
    <form onSubmit={handleSubmit(guardarEliminarHistorial)}>
      <DialogTitle>
        {" Eliminar historial de incidentes de seguridad: "}
      </DialogTitle>
      
      <DialogContent dividers>
        <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputDate
              id={"fechaInicio"}
              control={control}
              name="fechaInicio"
              label="Fecha Incio *"
              rules={{
                required: "Este campo es requerido",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputDate
              id={"fechaFin"}
              control={control}
              name="fechaFin"
              label="Fecha Fin *"
              rules={{
                required: "Este campo es requerido",
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
          Eliminar
        </Button>
        <Button variant="contained" color="error" onClick={accionCancelar}>
          Salir
        </Button>
      </DialogActions>
    </form>
  );
};
