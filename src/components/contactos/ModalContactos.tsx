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
} from "../common/components/ui/form";
import { useState } from "react";

interface AlarmaType {
  id: string;
  nombre: string;
  sonido: boolean;
  notificacion: boolean;
  envio_noti: string;
  contactos: string[];
  simulador: string;
  ubicaciones: string[];
  tipo: string[];
}
interface ContactoType {
  id: string;
  nombre: string;
  apellido: string;
  numero_Tel1: String;
  numero_Tel2?: String;
  alarmas: AlarmaType[];
}
interface ContactoCRUDType {
  id: string;
  nombre: string;
  apellido: string;
  numero_Tel1: String;
  numero_Tel2?: String;
  alarmas: string[];
}
interface ModalContactoProps {
  contacto?: ContactoType | null;
  alarmas: AlarmaType[];
  accionCancelar: () => void;
  accionCorrecta: () => void;
}

export const ModalContacto = ({
  contacto,
  alarmas,
  accionCancelar,
  accionCorrecta,
}: ModalContactoProps) => {
  const { handleSubmit, control, watch, setValue, getValues } =
    useForm<ContactoCRUDType>({
      defaultValues: {
        id: contacto?.id,
        nombre: contacto?.nombre,
        apellido: contacto?.apellido,
        numero_Tel1: contacto?.numero_Tel1,
        numero_Tel2: contacto?.numero_Tel2,
        alarmas: contacto?.alarmas.map((alarma)=>(alarma.id)),
      },
    });
  const defaultOption = { key: "", value: "", label: "" };

  const [defaultActuadorData, setDefaultActuadorData] =
    useState<optionType>(defaultOption);
  const guardarActualizarContacto = async (data: ContactoCRUDType) => {
    await guardarActualizarContactoPeticion(data);
  };
  const guardarActualizarContactoPeticion = async (alarma: ContactoCRUDType) => {
    console.log(alarma);
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
              name="numero_Tel1"
              label="Numero telefónico principal"
              // disabled={loadingModal}
              rules={{ required: "Este campo es requerido" }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputText
              id={"apellido"}
              control={control}
              name="numero_Tel2"
              label="Numero telefónico secundario"
              // disabled={loadingModal}
              //rules={{ required: "Este campo es requerido" }}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputDropdownMultiple
              id={"contactos"}
              name="alarmas"
              control={control}
              label="Contactos a notificar:"
              options={alarmas.map((alarma) => ({
                key: alarma.id,
                value: alarma.id,
                label: alarma.nombre,
              }))}
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
          Crear alarma
        </Button>
        <Button variant="contained" color="error" onClick={accionCancelar}>
          Salir
        </Button>
      </DialogActions>
    </form>
  );
};
