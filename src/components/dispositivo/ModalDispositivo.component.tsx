import {
  Button,
  Card,
  CardMedia,
  DialogContent,
  DialogActions,
  DialogTitle,
  Paper,
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useFieldArray, useForm } from "react-hook-form";
import {
  FormInputText,
  FormInputMultiCheckbox,
  FormInputRadio,
  FormInputDropdownMultiple,
  FormInputDropdown,
  optionType,
} from "../common/components/ui/form";
import dayjs from "dayjs";
import { FormInputSwitch } from "../common/components/ui/form/FormInputSwitch";
import { useAlerts } from "../common/hooks";
import { useEffect, useState } from "react";
import { FormInputTime } from "../common/components/ui/form/FormInputTime";
// Hook para mostrar alertas
//const { Alerta } = useAlerts();

interface sensorType {
  //id: string;
  pin: number;
  tipo: string;
  ubicacion: string;
  subUbicacion?: string;
}
interface actuadorType {
  //id: string;
  pin: number;
  tipo: string;
  ubicacion: string;
  subUbicacion?: string;
}
interface DispositivoType {
  id: string;
  nombre: string;
  tipo: string;
  ubicacion: string;
  direccionLan: string;
  direccionWan?: string;
  sensores: sensorType[];
  actuadores: actuadorType[];
}

interface ModalDispositivoProps {
  dispositivo?: DispositivoType | null;
  accionCancelar: () => void;
  accionCorrecta: () => void;
}

export const ModalDispositivo = ({
  dispositivo,
  accionCancelar,
  accionCorrecta,
}: ModalDispositivoProps) => {
  const { handleSubmit, control, watch, setValue, getValues } =
    useForm<DispositivoType>({
      defaultValues: {
        id: dispositivo?.id,
        nombre: dispositivo?.nombre,
        tipo: dispositivo?.tipo,
        ubicacion: dispositivo?.ubicacion,
        direccionLan: dispositivo?.direccionLan,
        direccionWan: dispositivo?.direccionWan,
        sensores: dispositivo?.sensores,
        actuadores: dispositivo?.actuadores,
      },
    });
  const defaultOption = { key: "", value: "", label: "" };

  const [defaultActuadorData, setDefaultActuadorData] =
    useState<optionType>(defaultOption);
  const guardarActualizarDispositivo = async (data: DispositivoType) => {
    await guardarActualizarDispositivoPeticion(data);
  };
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
    name: "sensores",
  });
  const agregarSensoresDispositivo = async () => {
    appendSensores({
      pin: 0,
      tipo: "",
      ubicacion: "",
      subUbicacion: undefined,
    });
  };

  const {
    fields: fieldsActuadores,
    append: appendActuadores,
    remove: removeActuadores,
  } = useFieldArray({
    control,
    name: "actuadores",
  });
  const agregarActuadoresDispositivo = async () => {
    appendActuadores({
      pin: 0,
      tipo: "",
      ubicacion: "",
      subUbicacion: undefined,
    });
  };

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

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
        </Grid>
        <br />
        <Grid container direction={"column"}>
          <Grid item xs={12} sm={12} md={12}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>PIN</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Ubicación</TableCell>
                  <TableCell>Sub Ubicación</TableCell>
                </TableRow>
              </TableHead>
              {fieldsSensores.map((sensor, index) => (
                <TableRow>
                  <TableCell>
                    <FormInputText
                      id={`sensores.${index}.pin`}
                      control={control}
                      name={`sensores.${index}.pin`}
                      label=""
                      type={"number"}
                    />
                  </TableCell>
                  <TableCell>
                    <FormInputText
                      id={`sensores.${index}.tipo`}
                      control={control}
                      name={`sensores.${index}.tipo`}
                      label=""
                    />
                  </TableCell>
                  <TableCell>
                    <FormInputText
                      id={`sensores.${index}.ubicacion`}
                      control={control}
                      name={`sensores.${index}.ubicacion`}
                      label=""
                    />
                  </TableCell>
                  <TableCell>
                    <FormInputText
                      id={`sensores.${index}.subUbicacion`}
                      control={control}
                      name={`sensores.${index}.subUbicacion`}
                      label=""
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
                  > Agregar Sensor
                  </Button>
                </TableCell>
              </TableRow>
            </Table>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>PIN</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Ubicación</TableCell>
                  <TableCell>Sub Ubicación</TableCell>
                </TableRow>
              </TableHead>
              {fieldsActuadores.map((actuador, index) => (
                <TableRow>
                  <TableCell>
                    <FormInputText
                      id={`actuadores.${index}.pin`}
                      control={control}
                      name={`actuadores.${index}.pin`}
                      label=""
                      type={"number"}
                    />
                  </TableCell>
                  <TableCell>
                    <FormInputText
                      id={`actuadores.${index}.tipo`}
                      control={control}
                      name={`actuadores.${index}.tipo`}
                      label=""
                    />
                  </TableCell>
                  <TableCell>
                    <FormInputText
                      id={`actuadores.${index}.ubicacion`}
                      control={control}
                      name={`actuadores.${index}.ubicacion`}
                      label=""
                    />
                  </TableCell>
                  <TableCell>
                    <FormInputText
                      id={`actuadores.${index}.subUbicacion`}
                      control={control}
                      name={`actuadores.${index}.subUbicacion`}
                      label=""
                    />
                  </TableCell>
                  <TableCell sx={{ maxWidth: "100px" }}>
                    <Button
                      //variant="outlined"
                      //color="warning"
                      onClick={() => removeActuadores(index)}
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
                    onClick={() => agregarActuadoresDispositivo()}
                  >Agregar Actuador
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
          Añadir Dispositivo
        </Button>
        <Button variant="contained" color="error" onClick={accionCancelar}>
          Salir
        </Button>
      </DialogActions>
    </form>
  );
};
