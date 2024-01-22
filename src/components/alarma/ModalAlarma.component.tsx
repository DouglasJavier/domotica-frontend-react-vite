import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Path, PathValue, useForm } from "react-hook-form";
import { FormInputText } from "../../../common/components/ui/form/FormInputText";
import { FormInputRadio } from "../../../common/components/ui/form/FormInputRadio";
import { FormInputSwitch } from "../../../common/components/ui/form/FormInputSwitch";
import { FormInputDropdownMultiple } from "../../../common/components/ui/form/FormInputDropdownMultiple";
import { FormInputDropdown } from "../../../common/components/ui/form/FormInputDropdown";
import { FormInputMultiCheckbox } from "../../../common/components/ui/form/FormInputMultiCheckbox";
import {
  AlarmaCRUDType,
  AlarmaType,
  ContactoType,
  SimuladorType,
  UbicacionType,
} from "./types/alarmaCRUD";
import axios from "axios";
import { useAlerts } from "../../../common/hooks";
import { InterpreteMensajes } from "../../../common/utils/interpreteMensajes";
import { Constantes } from "../../../config";
import { useSession } from "../../../common/hooks/useSession";

interface ModalAlarmaProps {
  alarma?: AlarmaType | null;
  contactos: ContactoType[];
  ubicaciones: UbicacionType[];
  simuladores: SimuladorType[];
  accionCancelar: () => void;
  accionCorrecta: () => void;
}
export const ModalAlarma = ({
  alarma,
  contactos,
  ubicaciones,
  simuladores,
  accionCancelar,
  accionCorrecta,
}: ModalAlarmaProps) => {
  const { Alerta } = useAlerts();
  const { sesionPeticion } = useSession();

  const [sim, setSim] = useState<number>(0);
  const { handleSubmit, control, watch, setValue, getValues } =
    useForm<AlarmaCRUDType>({
      defaultValues: {
        nombre: alarma?.nombre,
        sonido: alarma?.sonido || "2",
        envio_noti: alarma?.envio_noti ? alarma?.envio_noti : "1",
        idContactos: alarma
          ? alarma.alarmaContactos.map((contactos) => contactos.contacto.id)
          : [],
        idSimulador: alarma?.idSimulador ? alarma.idSimulador : "1",
        idUbicaciones: alarma
          ? alarma.ubicacionAlarmas.map((ubicacion) => ubicacion.ubicacion.id)
          : [],
        seguridadBienes: alarma?.seguridadBienes,
        sensoresHumo: alarma?.sensoresHumo,
        alumbradoAutomatico: alarma?.alumbradoAutomatico,
      },
    });
  console.log("*******************************************");
  console.log(getValues());
  console.log(alarma);
  console.log("*******************************************");
  const handleChange = (event: SelectChangeEvent) => {
    setSim(parseInt(event.target.value) as number);
  };

  const guardarActualizarAlarma = async (data: AlarmaCRUDType) => {
    try {
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/alarmas${
          alarma?.id ? `/${alarma.id}` : ""
        }`,
        tipo: alarma?.id ? "patch" : "post",
        body: data,
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
        <br />
        <Grid container direction={"row"}>
          <Grid item xs={12} sm={12} md={6}>
            <br />
            <FormInputSwitch
              id={"seguridadBienes"}
              control={control}
              name="seguridadBienes"
              label="Activar Seguridad para Bienes :"
            />
            <FormInputSwitch
              id={"sensoresHumo"}
              control={control}
              name="sensoresHumo"
              label="Activar sensores de humo :"
            />
            <FormInputSwitch
              id={"alumbradoAutomatico"}
              control={control}
              name="alumbradoAutomatico"
              label="Activar alumbrado automático :"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputRadio
              id={"sonido"}
              name="sonido"
              control={control}
              label="Activar alaerta de sonido :"
              options={[
                { label: "No", value: "1" },
                { label: "Preguntar primero", value: "2" },
                { label: "Automaticamente", value: "3" },
              ]}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container alignItems={"center"} direction={"row"}>
          <Grid item xs={12} sm={12} md={4}>
            <FormInputRadio
              id={"envio_noti"}
              name="envio_noti"
              control={control}
              label="Envio de notificaciones a contactos :"
              options={[
                { label: "No", value: "1" },
                { label: "Preguntar primero", value: "2" },
                { label: "Automaticamente", value: "3" },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={7}>
            {watch("envio_noti") !== "1" && (
              <FormInputDropdownMultiple
                id={"idContactos"}
                name="idContactos"
                control={control}
                label="Contactos a notificar:"
                options={contactos.map((contacto) => ({
                  key: contacto.id,
                  value: contacto.id,
                  label: contacto.nombre + " " + contacto.apellido,
                }))}
                rules={{ required: "Este campo es requerido" }}
              />
            )}
          </Grid>
        </Grid>
        <Grid container direction={"row"}>
          <Grid item xs={12} sm={12} md={7}>
            <FormInputDropdown
              id={"idSimulador"}
              name="idSimulador"
              control={control}
              label="Activar simulación de presencia:"
              options={simuladores.map((simulacion) => ({
                key: simulacion.id,
                value: simulacion.id,
                label: simulacion.nombre,
              }))}
              rules={{ required: "Este campo es requerido" }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormInputDropdownMultiple
              id={"idUbicaciones"}
              name="idUbicaciones"
              control={control}
              label="La alarma estará activa en las Ubicaciones:"
              options={ubicaciones.map((ubicacion) => ({
                key: ubicacion.id,
                value: ubicacion.id,
                label: ubicacion.nombre,
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
          {alarma ? "Editar alarma" : "Crear alarma"}
        </Button>
        <Button variant="contained" color="error" onClick={accionCancelar}>
          Salir
        </Button>
      </DialogActions>
    </form>
  );
};
