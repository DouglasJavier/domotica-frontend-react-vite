import {
  Button,
  DialogContent,
  DialogActions,
  DialogTitle,
  Paper,
  Card,
  CardMedia,
  Typography,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import {
  AtenderIncidenteType,
  FotoType,
  HistorialType,
} from "./types/historialType";
import { Constantes } from "../../../config";
import { useSession } from "../../../common/hooks/useSession";
import { useEffect, useState } from "react";
import { AlarmaType } from "../alarma/types/alarmaCRUD";
import { useAlerts } from "../../../common/hooks";
import { InterpreteMensajes, leerCookie } from "../../../common/utils";
import { useForm } from "react-hook-form";
import { FormInputSwitch } from "../../../common/components/ui/form/FormInputSwitch";
interface ModalAlarmaProps {
  incidente?: HistorialType | null;
  accionCorrecta: () => void;
  accionCancelar: () => void;
}
export const ModalHistorialFotos = ({
  incidente,
  accionCancelar,
  accionCorrecta,
}: ModalAlarmaProps) => {
  const { sesionPeticion } = useSession();
  const [alarma, setAlarma] = useState<AlarmaType | null>();
  const { Alerta } = useAlerts();
  const { handleSubmit, control, watch, setValue, getValues } =
    useForm<AtenderIncidenteType>({
      defaultValues: {
        activarSonido: false,
        notificacionContactos: alarma?.envio_noti === "3" ? true : false,
      },
    });
  const peticionAlarma = async () => {
    try {
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/alarmas/${incidente?.alarma.id}`,
      });
      setAlarma(respuesta);
    } catch (e) {
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: "error" });
    } finally {
    }
  };
  const atenderIncidente = async (data: AtenderIncidenteType) => {
    try {
      /* if (alarma?.sonido === "1" || alarma?.sonido === '3')
      data.activarSonido = false
      if (alarma?.envio_noti === "1" || alarma?.envio_noti === '3') */

      /* data.activarSonido = false */
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/historialIncidentes/${incidente?.id}/atender`,
        tipo: "patch",
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
  const descartarIncidente = async () => {
    try {
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/historialIncidentes/${incidente?.id}/descartar`,
        tipo: "patch",
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
  useEffect(() => {
    peticionAlarma();
  }, []);
  useEffect(() => {
    setValue("activarSonido", alarma?.sonido === "3" ? true : false);
    setValue(
      "notificacionContactos",
      alarma?.envio_noti === "3" ? true : false
    );
  }, [alarma]);
  return (
    <>
      <form onSubmit={handleSubmit(atenderIncidente)}>
        <DialogTitle>{"Registro de Fotos del incidente"}</DialogTitle>
        <DialogContent dividers>
          <Carousel>
            {incidente?.fotos?.map((item, i) => (
              <Item key={i} foto={item} />
            ))}
          </Carousel>
          {incidente?.estado === "DESATENDIDO" &&
            incidente?.alarma.id !== "1" &&
            incidente?.alarma.id !== "2" && (
              <>
                <FormInputSwitch
                  id={"activarSonido"}
                  control={control}
                  name="activarSonido"
                  label={`Activar Alerta de sonido:`}
                  disabled={alarma?.sonido === "2" ? false : true}
                />
                <Typography variant="subtitle2">
                  {alarma?.sonido === "1"
                    ? "(No)"
                    : alarma?.sonido === "2"
                    ? "(Preguntar primero)"
                    : "(Automaticamente)"}
                </Typography>
                <br />
                <FormInputSwitch
                  id={"notificacionContactos"}
                  control={control}
                  name="notificacionContactos"
                  label={`Enviar notificación a contactos :`}
                  disabled={alarma?.envio_noti === "2" ? false : true}
                />
                <Typography variant="subtitle2">
                  {alarma?.envio_noti === "1"
                    ? "(No)"
                    : alarma?.envio_noti === "2"
                    ? "(Preguntar primero)"
                    : "(Automaticamente)"}
                </Typography>
                {watch("notificacionContactos") && (
                  <>
                    <Typography variant="subtitle2">
                      Las notificaciones se enviaran a:
                    </Typography>
                    {alarma?.alarmaContactos?.map((contacto) => (
                      <Typography
                        variant="subtitle2"
                        key={"contacto" + contacto.id}
                      >
                        {"* " +
                          contacto.contacto.nombre +
                          " " +
                          contacto.contacto.apellido}
                      </Typography>
                    ))}
                  </>
                )}
              </>
            )}
        </DialogContent>
        <DialogActions>
          {incidente?.estado === "DESATENDIDO" && (
            <>
              <Button
                variant="contained"
                color="error"
                onClick={async () => {
                  await descartarIncidente();
                  accionCorrecta();
                }}
              >
                Descartar
              </Button>
              <Button variant="contained" type="submit" color="success">
                Atender
              </Button>
            </>
          )}
          <Button variant="outlined" onClick={accionCancelar}>
            Salir
          </Button>
        </DialogActions>
      </form>
    </>
  );
};
interface ItemProps {
  foto: {
    id: string;
    foto: string;
  };
}
function Item({ foto }: ItemProps) {
  return (
    <Paper>
      <Card>
        <CardMedia
          component="img"
          height="500"
          image={`${Constantes.baseUrl}/historialIncidentes/fotos/${
            foto.foto
          }?token=${leerCookie("token")}`}
        />
      </Card>
    </Paper>
  );
}
