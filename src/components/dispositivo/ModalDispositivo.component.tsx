import {
  Button,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useFieldArray, useForm } from "react-hook-form";
import {
  FormInputDropdown,
  FormInputText,
  optionType,
} from "../../../common/components/ui/form";
import { useState } from "react";
import {
  DispositivoCRUDType,
  DispositivoType,
} from "./types/dispositivoCRUDType";
import { UbicacionType } from "../alarma/types/alarmaCRUD";
import axios from "axios";
import { InterpreteMensajes } from "../../../common/utils/interpreteMensajes";
import { useAlerts } from "../../../common/hooks";
import {
  Constantes,
  tipoActuadorConst,
  tipoDispositivoConst,
  tipoSensorConst,
} from "../../../config";
import { useSession } from "../../../common/hooks/useSession";

interface TipoType {
  id: string;
  tipo: string;
}
interface ModalDispositivoProps {
  dispositivo?: DispositivoType | null;
  ubicaciones: UbicacionType[];
  accionCancelar: () => void;
  accionCorrecta: () => void;
}

export const ModalDispositivo = ({
  dispositivo,
  ubicaciones,
  accionCancelar,
  accionCorrecta,
}: ModalDispositivoProps) => {
  const { Alerta } = useAlerts();
  const { sesionPeticion } = useSession();

  const { handleSubmit, control, watch } = useForm<DispositivoCRUDType>({
    defaultValues: {
      id: dispositivo?.id,
      nombre: dispositivo?.nombre,
      tipo: dispositivo?.tipo || tipoDispositivoConst[0],
      idUbicacion: dispositivo?.ubicacion.id,
      direccionLan: dispositivo?.direccionLan,
      direccionWan: dispositivo?.direccionWan,
      contrasenia: "",
      sensoresActuadores: dispositivo?.sensoresActuadores.map((sensores) => ({
        ...sensores,
        idUbicacion: sensores.ubicacion.id,
      })),
    },
  });

  const defaultOption = { key: "", value: "", label: "" };

  const [defaultActuadorData, setDefaultActuadorData] =
    useState<optionType>(defaultOption);
  const guardarActualizarDispositivoPeticion = async (
    dispositivo: DispositivoType
  ) => {
    console.log(dispositivo);
  };
  const {
    fields: fieldsSensores,
    append: appendSensores,
    remove: removeSensores,
  } = useFieldArray({
    control,
    name: "sensoresActuadores",
  });
  const agregarSensoresDispositivo = async () => {
    appendSensores({
      pin: "0",
      tipo: "",
      descripcion: "",
      idUbicacion: "",
    });
  };

  const opcionesTipo: TipoType[] = [
    { id: "1", tipo: "SENSOR" },
    { id: "2", tipo: "ACTUADOR" },
  ];

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const guardarActualizarDispositivo = async (data: DispositivoCRUDType) => {
    data.contrasenia = btoa(watch("contrasenia"));
    try {
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/dispositivos${
          dispositivo?.id ? `/${dispositivo.id}` : ""
        }`,
        tipo: dispositivo?.id ? "patch" : "post",
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
    <form onSubmit={handleSubmit(guardarActualizarDispositivo)}>
      <DialogTitle>
        {dispositivo
          ? "Editar dispositivo de presencia"
          : "Agregar nuevo dispositivo de presencia"}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
          <Grid item xs={12} sm={6} md={6}>
            <FormInputText
              id={"nombre"}
              control={control}
              name="nombre"
              label="Nombre del dispositivo"
              // disabled={loadingModal}
              rules={{ required: "Este campo es requerido" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormInputText
              id={"tipo"}
              control={control}
              name="tipo"
              label="Tipo de board"
             disabled
              rules={{ required: "Este campo es requerido" }}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
          <Grid item xs={12} sm={6} md={6}>
            <FormInputText
              id={"direccionLan"}
              control={control}
              name="direccionLan"
              label="Direccion LAN"
              // disabled={loadingModal}
              rules={{ required: "Este campo es requerido" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormInputText
              id={"direccionWan"}
              control={control}
              name="direccionWan"
              label="Direccion WAN"
              // disabled={loadingModal}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormInputDropdown
              id={"idSimulador"}
              name={`idUbicacion`}
              control={control}
              label="Ubicación del dispositivo"
              options={ubicaciones.map((ubicacion) => ({
                key: ubicacion.id,
                value: ubicacion.id,
                label: ubicacion.nombre,
              }))}
              rules={{ required: "Este campo es requerido" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormInputText
              id={"contrasena"}
              control={control}
              name="contrasenia"
              label="Contraseña"
              size={"medium"}
              labelVariant={"subtitle1"}
              type={"password"}
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
        <br />
        <Grid container direction={"column"}>
          <Grid item xs={12} sm={12} md={12}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>PIN</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Ubicación</TableCell>
                </TableRow>
              </TableHead>
              {fieldsSensores.map((sensor, index) => (
                <TableRow>
                  <TableCell sx={{ width: "100px" }}>
                    <FormInputText
                      id={`sensoresActuadores.${index}.pin`}
                      control={control}
                      name={`sensoresActuadores.${index}.pin`}
                      label=""
                      type={"number"}
                    />
                  </TableCell>
                  <TableCell>
                    <FormInputDropdown
                      id={"tipo"}
                      name={`sensoresActuadores.${index}.tipo`}
                      control={control}
                      label=""
                      options={opcionesTipo.map((tipo) => ({
                        key: tipo.id,
                        value: tipo.tipo,
                        label: tipo.tipo,
                      }))}
                      rules={{ required: "Este campo es requerido" }}
                    />
                  </TableCell>
                  <TableCell>
                    <FormInputDropdown
                      id={"tipo"}
                      name={`sensoresActuadores.${index}.descripcion`}
                      control={control}
                      label=""
                      options={
                        watch(`sensoresActuadores.${index}.tipo`) === "ACTUADOR"
                          ? tipoActuadorConst.map((tipo) => ({
                              key: tipo,
                              value: tipo,
                              label: tipo,
                            }))
                          : tipoSensorConst.map((tipo) => ({
                              key: tipo,
                              value: tipo,
                              label: tipo,
                            }))
                      }
                      disabled={!watch(`sensoresActuadores.${index}.tipo`)}
                      rules={{ required: "Este campo es requerido" }}
                    />
                  </TableCell>
                  <TableCell>
                    <FormInputDropdown
                      id={"idSimulador"}
                      name={`sensoresActuadores.${index}.idUbicacion`}
                      control={control}
                      label=""
                      options={ubicaciones.map((ubicacion) => ({
                        key: ubicacion.id,
                        value: ubicacion.id,
                        label: ubicacion.nombre,
                      }))}
                      rules={{ required: "Este campo es requerido" }}
                    />
                  </TableCell>
                  <TableCell sx={{ maxWidth: "100px" }}>
                    <Button
                      //variant="outlined"
                      //color="warning"
                      onClick={() => removeSensores(index)}
                    >
                      <HighlightOffIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={5}>
                  <Button
                    variant="outlined"
                    onClick={() => agregarSensoresDispositivo()}
                  >
                    {" "}
                    Agregar Sensor/Actuador
                  </Button>
                </TableCell>
              </TableRow>
            </Table>
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
          {dispositivo ? "Editar Dispositivo" : "Añadir Dispositivo"}
        </Button>
        <Button variant="contained" color="error" onClick={accionCancelar}>
          Salir
        </Button>
      </DialogActions>
    </form>
  );
};
