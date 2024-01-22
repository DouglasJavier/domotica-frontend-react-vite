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
} from "../../../common/components/ui/form";
import dayjs from "dayjs";
import { FormInputSwitch } from "../../../common/components/ui/form/FormInputSwitch";
import { useEffect, useState } from "react";
import { FormInputTime } from "../../../common/components/ui/form/FormInputTime";
import {
  ActuadorType,
  SimuladorCRUDType,
  SimuladorType,
} from "./types/SimuladorCRUDType";
import { useAlerts } from "../../../common/hooks";
import axios from "axios";
import { InterpreteMensajes } from "../../../common/utils/interpreteMensajes";
import { Constantes } from '../../../config'
import { useSession } from "../../../common/hooks/useSession";
/* interface horario {
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
interface SimuladorCRUDType {
  id: string;
  nombre: string;
  estado: string;
  simuladoresActuadores: actuadorSimuladorType[];
}

interface CrearEditarSimuladorCRUDType {
  id: string;
  nombre: string;
  estado: string;
  simuladoresActuadores: actuadorSimuladorType[];
  actuadorDropdown: string;
}

interface actuadorType {
  id: string;
  nombre: string;
  tipo: string;
  ubicacion: string;
} */

interface ModalSimulacionProps {
  simulacion?: SimuladorType | null;
  actuadores: ActuadorType[];
  accionCancelar: () => void;
  accionCorrecta: () => void;
}

export const ModalSimulador = ({
  simulacion,
  actuadores,
  accionCancelar,
  accionCorrecta,
}: ModalSimulacionProps) => {
  const { Alerta } = useAlerts();
  const { sesionPeticion } = useSession();

  const { handleSubmit, control, watch, setValue, getValues } =
    useForm<SimuladorCRUDType>({
      defaultValues: {
        nombre: simulacion?.nombre || "",
        simuladoresActuadores: simulacion
          ? simulacion?.simuladoresActuadores.map((actuador) => {
              return {
                idActuador: actuador?.idActuador || "",
                actuador: actuador.actuador,
                horarios:
                  actuador?.horarios?.map((horario) => {
                    return {
                      horaInicio: dayjs(horario?.horaInicio).toDate(),
                      horaFin: dayjs(horario?.horaFin).toDate(),
                    };
                  }) || [], // Asegúrate de manejar el caso en el que no haya horarios
              };
            })
          : [],
        actuadorDropdown: "",
      },
    });
  const defaultOption = { key: "", value: "", label: "" };

  const [defaultActuadorData, setDefaultActuadorData] =
    useState<optionType>(defaultOption);
  
  const {
    fields: fieldsActuadores,
    append: appendActuadores,
    remove: removeActuadores,
    update: updateActuadores,
  } = useFieldArray({
    control,
    name: "simuladoresActuadores",
  });
  const agregarActuadorSimulador = async (
    actuadorSeleccionado: ActuadorType
  ) => {
    const existeActuador = getValues().simuladoresActuadores.find(
      (actuadorSimulador) =>
        actuadorSimulador.idActuador === actuadorSeleccionado.id
    );

    if (existeActuador) {
      return Alerta({
        mensaje: "Ya se agregó el actuador",
        variant: "info",
      });
    } else {
      const nuevoActuadorSimulador = actuadores.find(
        (actuador) => actuador.id === actuadorSeleccionado.id
      );
      if (!nuevoActuadorSimulador) {
        Alerta({
          mensaje: "El actuador no existe",
          variant: "error",
        });
      } else {
        appendActuadores({
          idActuador: actuadorSeleccionado?.id + "",
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
      idActuador: fieldsActuadores[index].idActuador,
      actuador: fieldsActuadores[index].actuador
    });
  };
  const eliminarHorario = (index: number, index2: number) => {
    const horarios = fieldsActuadores[index].horarios;
    const a = horarios.splice(index2, 1);
    updateActuadores(index, {
      horarios: horarios,
      idActuador: fieldsActuadores[index].idActuador,
      actuador: fieldsActuadores[index].actuador
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
  const guardarActualizarSimulador = async (data: SimuladorCRUDType) => {
    try {
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/simuladores${
          simulacion?.id ? `/${simulacion.id}` : ""
        }`,
        tipo: simulacion?.id ? "patch" : "post",
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
              label="Activar simulación de presencia en:"
              //defaultValue={defaultActuadorData}
              options={actuadores.map((actuador) => ({
                key: actuador.id,
                value: actuador.id,
                label: actuador.descripcion + ' - ' + actuador.ubicacion.nombre,
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
                      <b>{`${actuador.actuador.descripcion} ${actuador.actuador.ubicacion.nombre}`}</b>
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
                            <Grid
                              container
                              direction={"column"}
                              justifyContent={"space-between"}
                            >
                              <Grid item>
                                <FormInputTime
                                  id={`simuladoresActuadores.${index} `}
                                  control={control}
                                  value={actuador.horarios[index2].horaInicio}
                                  name={`simuladoresActuadores.${index}.horarios.${index2}.horaInicio`}
                                  label="Hora inicio"
                                  onChange={(e) => {
                                    actualizarHorarioInicio(index, index2, e);
                                  }}
                                />
                              </Grid>
                              <Grid item marginTop={"8px"}>
                                <FormInputTime
                                  id={`ingresoArticulo[${index}].id `}
                                  control={control}
                                  value={actuador.horarios[index2].horaFin}
                                  name={`simuladoresActuadores.${index}.horarios.${index2}.horaFin`}
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
                            id={`simuladoresActuadores.${index} `}
                            control={control}
                            value={actuador.horarios[index2].horaInicio}
                            name={`simuladoresActuadores.${index}.horarios.${index2}.horaInicio`}
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
                            name={`simuladoresActuadores.${index}.horarios.${index2}.horaFin`}
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
          {simulacion ? 'Editar Simulador' : 'Crear Simulador'} 
        </Button>
        <Button variant="contained" color="error" onClick={accionCancelar}>
          Salir
        </Button>
      </DialogActions>
    </form>
  );
};
