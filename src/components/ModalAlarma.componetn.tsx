import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { Path, PathValue, useForm } from "react-hook-form";
import { FormInputText } from "./common/components/ui/form/FormInputText";
import { FormInputRadio } from "./common/components/ui/form/FormInputRadio";
import { FormInputSwitch } from "./common/components/ui/form/FormInputSwitch";
import { FormInputDropdownMultiple } from "./common/components/ui/form/FormInputDropdownMultiple";
import { FormInputDropdown } from "./common/components/ui/form/FormInputDropdown";
import { FormInputMultiCheckbox } from "./common/components/ui/form/FormInputMultiCheckbox";

interface CrearEditarAlarmaCRUDType {
  nombre: String;
  sonido: boolean;
  notificacion: boolean;
  envio_noti: string;
  contactos: string[];
  simulador: string;
  ubicaciones: string[];
  tipo: string[];
}

interface ModalAlarmaProps {
  alarma?: CrearEditarAlarmaCRUDType | null;
  accionCancelar: () => void;
  accionCorrecta: () => void;
}
export const ModalAlarma = ({
  alarma,
  accionCancelar,
  accionCorrecta,
}: ModalAlarmaProps) => {
  const [errorNombre, setErrorNombre] = useState<boolean>(false);
  const [sim, setSim] = useState<number>(0);
  const { handleSubmit, control, watch, setValue } = useForm<CrearEditarAlarmaCRUDType>({
    defaultValues: {
      nombre: alarma?.nombre,
      sonido: alarma?.sonido,
      notificacion: alarma?.notificacion,
      envio_noti: alarma?.envio_noti,
      contactos: alarma?.contactos,
      simulador: alarma?.simulador,
      ubicaciones: alarma?.ubicaciones,
      tipo: alarma?.tipo,
    },
  });
  const handleChange = (event: SelectChangeEvent) => {
    setSim(parseInt(event.target.value) as number);
  };
  const contactos = [
    {
      id: "1",
      nombre: "Carlos",
    },
    {
      id: "2",
      nombre: "Maria",
    },
    {
      id: "3",
      nombre: "Tereza",
    },
  ];
  const simulaciones = [
    {
      id: "0",
      nombre: "Ninguno ",
    },
    {
      id: "1",
      nombre: "Todos en casa ",
    },
    {
      id: "2",
      nombre: "Algunos en casa",
    },
    {
      id: "3",
      nombre: "Uno en casa",
    },
  ];
  const ubicaciones = [
    {
      id: "1",
      nombre: "Patio principal",
    },
    {
      id: "2",
      nombre: "Sala Principal",
    },
    {
      id: "3",
      nombre: "Cocina",
    },
    {
      id: "4",
      nombre: "Dormitorio principal",
    },
  ];
  const tipos = [
    {
      id: "1",
      nombre: "Seguridad de Bienes",
    },
    {
      id: "2",
      nombre: "Seguridad de Personas",
    },
  ];
  const guardarActualizarAlarma = async (
    data: CrearEditarAlarmaCRUDType
  ) => {
    await guardarActualizarAlarmaPeticion(data)
  }
  const guardarActualizarAlarmaPeticion = async (
    alarma: CrearEditarAlarmaCRUDType
  ) => {
    console.log(alarma)
  }

  return (
     <form onSubmit={handleSubmit(guardarActualizarAlarma)}>
      <DialogTitle>
        {alarma ? "Editar alarma" : "Agregar nueva alarma"}
      </DialogTitle>
      <DialogContent dividers>
        <FormInputText
          id={"nombre"}
          control={control}
          name="nombre"
          label="Nombre de la alarma"
          // disabled={loadingModal}
          rules={{ required: "Este campo es requerido" }}
        />
        <Grid container direction={"column"}>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputMultiCheckbox
              id={"tipo"}
              name="tipo"
              control={control}
              label="Seguridad dirigida para :"
              options={tipos.map((tipo) => ({
                key: tipo.id,
                value: tipo.id,
                label: tipo.nombre,
              }))}
              rules={{ required: "Este campo es requerido" }}
              setValue={setValue}
              />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputSwitch
              id={"sonido"}
              control={control}
              name="sonido"
              label="Activar alerta de sonido :"
            />
            <FormInputSwitch
              id={"notificacion"}
              control={control}
              name="notificacion"
              label="Enviar notificación a usuarios :"
            />
          </Grid>
        </Grid>

        <Grid container alignItems={"center"} direction={"row"}>
          <Grid item xs={12} sm={12} md={4}>
            <FormInputRadio
              id={"envio_noti"}
              name="envio_noti"
              control={control}
              label="Envio de notificaciones a contactos :"
              options={[
                { label: "No", value: "0" },
                { label: "Preguntar primero", value: "1" },
                { label: "Automaticamente", value: "2" },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={7}>
            {watch("envio_noti") !== "0" && (
              <FormInputDropdownMultiple
                id={"contactos"}
                name="contactos"
                control={control}
                label="Contactos a notificar:"
                options={contactos.map((contacto) => ({
                  key: contacto.id,
                  value: contacto.id,
                  label: contacto.nombre,
                }))}
                rules={{ required: "Este campo es requerido" }}
              />
            )}
          </Grid>
        </Grid>
        <FormInputDropdown
          id={"simulador"}
          name="simulador"
          control={control}
          label="Activar simulación de presencia:"
          options={simulaciones.map((simulacion) => ({
            key: simulacion.id,
            value: simulacion.id,
            label: simulacion.nombre,
          }))}
          rules={{ required: "Este campo es requerido" }}
        />
        <FormInputDropdownMultiple
          id={"ubicaciones"}
          name="ubicaciones"
          control={control}
          label="La alarma estará activa en las ubicaciones:"
          options={ubicaciones.map((ubicacion) => ({
            key: ubicacion.id,
            value: ubicacion.id,
            label: ubicacion.nombre,
          }))}
          rules={{ required: "Este campo es requerido" }}
        />
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
