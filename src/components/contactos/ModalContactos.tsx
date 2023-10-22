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
} from "../../../common/components/ui/form";
import { useState } from "react";
import { ContactoCRUDType, ContactoType } from "./types/contactosCRUDType";
import axios from "axios";
import { useAlerts } from "../../../common/hooks";
import { InterpreteMensajes } from "../../../common/utils/interpreteMensajes";
import { Constantes } from '../../../config'
interface ModalContactoProps {
  contacto?: ContactoType | null;
  accionCancelar: () => void;
  accionCorrecta: () => void;
}

export const ModalContacto = ({
  contacto,
  accionCancelar,
  accionCorrecta,
}: ModalContactoProps) => {
  const { Alerta } = useAlerts();

  const { handleSubmit, control, watch, setValue, getValues } =
    useForm<ContactoCRUDType>({
      defaultValues: {
        id: contacto?.id,
        nombre: contacto?.nombre,
        apellido: contacto?.apellido,
        numeroTel1: contacto?.numeroTel1,
        numeroTel2: contacto?.numeroTel2
      },
    });
  const defaultOption = { key: "", value: "", label: "" };

  const [defaultActuadorData, setDefaultActuadorData] =
    useState<optionType>(defaultOption);
  const guardarActualizarContacto = async (data: ContactoCRUDType) => {
    if (contacto) {
      await patchContactoPeticion(data);
      accionCorrecta();
    } else {
      await postContactoPeticion(data);
      accionCorrecta();
    }
  };
  const postContactoPeticion = async (elem: ContactoCRUDType) => {
    console.log("enviado datos");
    const subiendo = await axios
      .post(`${Constantes.baseUrl}/contactos`, elem)
      .then((res) => {
        Alerta({ mensaje: `completado con exito`, variant: "success" });
      })
      .catch((err) => {
        Alerta({ mensaje: `${InterpreteMensajes(err)}`, variant: "error" });
      });
  };
  const patchContactoPeticion = async (elem: ContactoCRUDType) => {
    console.log("enviado datos");
    const subiendo = await axios
      .patch(`${Constantes.baseUrl}/contactos/${contacto?.id}`, elem)
      .then((res) => {
        Alerta({ mensaje: `completado con exito`, variant: "success" });
      })
      .catch((err) => {
        Alerta({ mensaje: `${InterpreteMensajes(err)}`, variant: "error" });
      });
  };
  return (
    <form onSubmit={handleSubmit(guardarActualizarContacto)}>
      <DialogTitle>
        {contacto ? "Editar contacto" : "Agregar nuevo contacto"}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputText
              id={"nombre"}
              control={control}
              name="nombre"
              label="Nombres del contacto"
              // disabled={loadingModal}
              rules={{ required: "Este campo es requerido" }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputText
              id={"apellido"}
              control={control}
              name="apellido"
              label="Apellidos del contacto"
              // disabled={loadingModal}
              rules={{ required: "Este campo es requerido" }}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputText
              id={"nombre"}
              control={control}
              name="numeroTel1"
              label="Numero telefónico principal"
              // disabled={loadingModal}
              rules={{ required: "Este campo es requerido" }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputText
              id={"apellido"}
              control={control}
              name="numeroTel2"
              label="Numero telefónico secundario"
              // disabled={loadingModal}
              //rules={{ required: "Este campo es requerido" }}
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
          {contacto ? 'Editar' : 'Crear'}
        </Button>
        <Button variant="contained" color="error" onClick={accionCancelar}>
          Salir
        </Button>
      </DialogActions>
    </form>
  );
};
