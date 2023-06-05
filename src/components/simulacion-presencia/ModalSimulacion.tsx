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

import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useFieldArray, useForm } from "react-hook-form";
import {
  FormInputText,
  FormInputDropdown,
  optionType,
} from "../common/components/ui/form";
import dayjs from "dayjs";
import { FormInputSwitch } from "../common/components/ui/form/FormInputSwitch";
import { useEffect, useState } from "react";
import { FormInputTime } from "../common/components/ui/form/FormInputTime";
interface horario {
  horaInicio: Date;
  horaFin: Date;
}
interface actuadorType {
  id: string;
  nombre: string;
  tipo: string;
  ubicacion: string;
}
interface actuadorSimuladorType {
  id: string;
  actuador: actuadorType;
  horarios: horario[];
}
interface simuladorCRUDType {
  id: string;
  nombre: string;
  estado: string;
  actuadoresSimulacion: actuadorSimuladorType[];
}

interface CrearEditarSimuladorCRUDType {
  id: string;
  nombre: string;
  estado: string;
  actuadoresSimulacion: actuadorSimuladorType[];
  actuadorDropdown: string;
}

interface actuadorType {
  id: string;
  nombre: string;
  tipo: string;
  ubicacion: string;
}

interface ModalSimulacionProps {
  simulacion?: simuladorCRUDType | null;
  actuadores: actuadorType[];
  accionCancelar: () => void;
  accionCorrecta: () => void;
}

export const ModalSimulador = ({
  simulacion,
  actuadores,
  accionCancelar,
  accionCorrecta,
}: ModalSimulacionProps) => {
  const { handleSubmit, control, watch, setValue, getValues } =
    useForm<CrearEditarSimuladorCRUDType>({
      defaultValues: {
        id: simulacion?.id,
        nombre: simulacion?.nombre,
        estado: simulacion?.estado,
        actuadoresSimulacion: simulacion?.actuadoresSimulacion,
        actuadorDropdown: "",
      },
    });
  const defaultOption = { key: "", value: "", label: "" };

  const [defaultActuadorData, setDefaultActuadorData] =
    useState<optionType>(defaultOption);
  const guardarActualizarSimulador = async (data: simuladorCRUDType) => {
    await guardarActualizarSimuladorPeticion(data);
  };
  const guardarActualizarSimuladorPeticion = async (
    alarma: simuladorCRUDType
  ) => {
    console.log(alarma);
  };
  const {
    fields: fieldsActuadores,
    append: appendActuadores,
    remove: removeActuadores,
    update: updateActuadores,
  } = useFieldArray({
    control,
    name: "actuadoresSimulacion",
  });
  const agregarActuadorSimulador = async (
    actuadorSeleccionado: actuadorType
  ) => {
    const existeActuador = getValues().actuadoresSimulacion.find(
      (actuadorSimulador) =>
        actuadorSimulador.actuador.id === actuadorSeleccionado.id
    );

    if (existeActuador) {
      /* return Alerta({
        mensaje: "Ya se agregó el actuador",
        variant: "info",
      }); */
    } else {
      const nuevoActuadorSimulador = actuadores.find(
        (actuador) => actuador.id === actuadorSeleccionado.id
      );
      if (!nuevoActuadorSimulador) {
        /* Alerta({
          mensaje: "Artículo no existe",
          variant: "error",
        }); */
      } else {
        appendActuadores({
          id: actuadorSeleccionado?.id + "",
          actuador: actuadorSeleccionado,
          horarios: [
            {
              horaInicio: dayjs("2022-04-17T15:30").toDate(),
              horaFin: dayjs("2022-04-17T15:30").toDate(),
            },
          ],
        });
      }
    }
  };
  const agregarHorario = async (index: number) => {
    const horario = {
      horaInicio: dayjs("2022-04-17T00:00").toDate(),
      horaFin: dayjs("2022-04-17T00:00").toDate(),
    };

    updateActuadores(index, {
      horarios: [...fieldsActuadores[index].horarios, horario],
      id: fieldsActuadores[index].id,
      actuador: fieldsActuadores[index].actuador,
    });
  };
  const eliminarHorario = (index: number, index2: number) => {
    const horarios = fieldsActuadores[index].horarios;
    const a = horarios.splice(index2, 1);
    updateActuadores(index, {
      horarios: horarios,
      id: fieldsActuadores[index].id,
      actuador: fieldsActuadores[index].actuador,
    });
  };
  const actualizarHorarioInicio = (index: number, index2: number, e: Date) => {
    const horarios = fieldsActuadores[index].horarios;
    horarios[index2].horaInicio = e;
    updateActuadores(index, {
      ...fieldsActuadores[index],
      horarios: horarios,
    });
  };
  const actualizarHorarioFin = (index: number, index2: number, e: Date) => {
    const horarios = fieldsActuadores[index].horarios;
    horarios[index2].horaFin = e;
    updateActuadores(index, {
      ...fieldsActuadores[index],
      horarios: horarios,
    });
  };

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <form onSubmit={handleSubmit(guardarActualizarSimulador)}>
      <DialogTitle>
        {simulacion
          ? "Editar simulador de presencia"
          : "Agregar nuevo simulador de presencia"}
      </DialogTitle>
      <DialogContent dividers>
        <FormInputText
          id={"nombre"}
          control={control}
          name="nombre"
          label="Nombre del simulador"
          // disabled={loadingModal}
          rules={{ required: "Este campo es requerido" }}
        />
        <br />
        <Grid container direction={"column"}>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputDropdown
              id={"simulador"}
              name="actuadorDropdown"
              control={control}
              label="Activar simulación de presencia:"
              defaultValue={defaultActuadorData}
              options={actuadores.map((actuador) => ({
                key: actuador.id,
                value: actuador.id,
                label: actuador.nombre,
              }))}
              //rules={{ required: "Este campo es requerido" }}
              onChange={(e) => {
                const current = actuadores.find(
                  (actuador) => `${actuador.id}` === e.target.value
                );
                if (current) {
                  setDefaultActuadorData({
                    key: ``,
                    value: ``,
                    label: ``,
                  });
                  agregarActuadorSimulador(current);
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {fieldsActuadores.map((actuador, index) => (
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <b>{`${actuador.actuador.nombre} ${actuador.actuador.ubicacion}`}</b>
                    </TableCell>
                    <TableCell sx={{ maxWidth: "100px" }}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => removeActuadores(index)}
                      >
                        <DeleteForeverIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {xs
                  ? actuador.horarios.map((horario, index2) => (
                      <>
                        <TableRow>
                          <TableCell colSpan={4}>
                            <Grid container direction={"column"} justifyContent={"space-between"}>
                              <Grid item >
                                <FormInputTime
                                  id={`actuadoresSimulacion.${index} `}
                                  control={control}
                                  value={actuador.horarios[index2].horaInicio}
                                  name={`actuadoresSimulacion.${index}.horarios.${index2}.horaInicio`}
                                  label="Hora inicio"
                                  onChange={(e) => {
                                    actualizarHorarioInicio(index, index2, e);
                                  }}
                                />
                              </Grid>
                              <Grid item  marginTop={'8px'}>
                                <FormInputTime
                                  id={`ingresoArticulo[${index}].id `}
                                  control={control}
                                  value={actuador.horarios[index2].horaFin}
                                  name={`actuadoresSimulacion.${index}.horarios.${index2}.horaFin`}
                                  label="Hora fin"
                                  onChange={(e) => {
                                    actualizarHorarioFin(index, index2, e);
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </TableCell>

                          <TableCell sx={{ maxWidth: "100px" }}>
                            <Button
                              //variant="outlined"
                              //color="warning"
                              onClick={() => eliminarHorario(index, index2)}
                            >
                              <HighlightOffIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      </>
                    ))
                  : actuador.horarios.map((horario, index2) => (
                      <TableRow>
                        <TableCell>Hora inicio</TableCell>
                        <TableCell>
                          <FormInputTime
                            id={`actuadoresSimulacion.${index} `}
                            control={control}
                            value={actuador.horarios[index2].horaInicio}
                            name={`actuadoresSimulacion.${index}.horarios.${index2}.horaInicio`}
                            label=""
                            onChange={(e) => {
                              actualizarHorarioInicio(index, index2, e);
                            }}
                          />
                        </TableCell>
                        <TableCell>Hora fin</TableCell>
                        <TableCell>
                          <FormInputTime
                            id={`ingresoArticulo[${index}].id `}
                            control={control}
                            value={actuador.horarios[index2].horaFin}
                            name={`actuadoresSimulacion.${index}.horarios.${index2}.horaFin`}
                            label=""
                            onChange={(e) => {
                              actualizarHorarioFin(index, index2, e);
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ maxWidth: "100px" }}>
                          <Button
                            //variant="outlined"
                            //color="warning"
                            onClick={() => eliminarHorario(index, index2)}
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
                      onClick={() => agregarHorario(index)}
                    >
                      <AddIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              </Table>
            ))}
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
