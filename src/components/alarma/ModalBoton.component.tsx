import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import { AlarmaCRUDType, AlarmaType } from "./types/alarmaCRUD";
import axios from "axios";
import { useAlerts } from "../../../common/hooks";
import { InterpreteMensajes } from "../../../common/utils/interpreteMensajes";
import { Constantes } from "../../../config";
import { useSession } from "../../../common/hooks/useSession";
import { watch } from "fs";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface ModalAlarmaProps {
  idAlarma?: string | null;
  alarma?: AlarmaType | null;
  accionCancelar: () => void;
  accionCorrecta: () => void;
}
export const ModalBoton = ({
  idAlarma,
  alarma,
  accionCancelar,
  accionCorrecta,
}: ModalAlarmaProps) => {
  const { Alerta } = useAlerts();
  const { sesionPeticion } = useSession();

  const activarBoton = async () => {
    if (idAlarma !== "SIRENA") {
      try {
        const respuesta = await sesionPeticion({
          url: `${Constantes.baseUrl}/historialIncidentes/${idAlarma}/botonPanico`,
          tipo: "post",
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
    } else {
      try {
        const respuesta = await sesionPeticion({
          url: `${Constantes.baseUrl}/alarmas/apagarSirenas`,
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
    }
  };
  const activar = async () => {
    await activarBoton();
    accionCorrecta;
  };
  return (
    <>
      <DialogTitle sx={{ m: 1, p: 2, display: "flex", alignItems: "center" }}>
        <WarningAmberIcon color="warning" sx={{ fontSize: 60, mr: 2 }} />{" "}
        <Typography color={"MenuText"} variant="h6">
          {idAlarma === "SIRENA"
            ? "¿Quieres apagar las sirenas?"
            : "¿Quieres activar Botón de pánico " +
              (idAlarma === "1"
                ? "Sonoro"
                : idAlarma === "2"
                ? "Silencioso"
                : "") +
              "?"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {idAlarma !== "SIRENA" && alarma && (
            <>
              <Typography>
                Se enviarán notificaciones a los siguientes contactos:
              </Typography>
              {alarma?.alarmaContactos.map((contacto) => (
                <Typography>
                  {"* " +
                    contacto.contacto.nombre +
                    " " +
                    contacto.contacto.apellido}
                </Typography>
              ))}
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => accionCancelar()}>Cerrar</Button>
        <Button onClick={() => activar()}>Aceptar</Button>
      </DialogActions>
    </>
  );
};
