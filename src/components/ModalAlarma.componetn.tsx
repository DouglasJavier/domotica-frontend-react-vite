import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface CrearEditarAlarmaCRUDType {
  nombre: String;
  sonido: boolean;
  notificacion: boolean;
  envio_noti: number;
  simulador: number;
  ubicaciones: number;
}

interface ModalAlarmaProps {
  Alarma?: CrearEditarAlarmaCRUDType | null;
  accionCancelar: () => void;
  accionCorrecta: () => void;
}
export const ModalAlarma = ({
  Alarma,
  accionCancelar,
  accionCorrecta,
}: ModalAlarmaProps) => {
  const [errorNombre, setErrorNombre] = useState<boolean>(false);
  const [contactos, setContactos] = useState<boolean>(false);
  const [sim, setSim] = useState<number>(0);
  const { handleSubmit, control } = useForm<CrearEditarAlarmaCRUDType>({
    defaultValues: {
      nombre: "Nueva alarma",
      sonido: true,
      notificacion: true,
    },
  });
  const handleChange = (event: SelectChangeEvent) => {
    setSim(parseInt(event.target.value) as number);
  };

  return (
    <>
      <DialogTitle>
        {Alarma ? "Editar alarma" : "Agregar nueva alarma"}
      </DialogTitle>
      <DialogContent dividers>
        <InputLabel htmlFor="nombre">
          <Typography variant="subtitle1" sx={{ color: "text.primary" }}>
            Nombre de la Alarma
          </Typography>
        </InputLabel>
        <TextField
          id="nombre"
          required
          sx={{
            width: "90%",
            bgcolor: "white",
          }}
          error={errorNombre}
          helperText={errorNombre ? "El nombre es requerido" : ""}
        ></TextField>
        <Grid container alignItems={"center"}>
          <InputLabel htmlFor="sonido">
            <Typography variant="subtitle1" sx={{ color: "text.primary" }}>
              Activar alerta de sonido :
            </Typography>
          </InputLabel>
          <Switch id="sonido" />
        </Grid>
        <Grid container alignItems={"center"}>
          <InputLabel htmlFor="notificacion">
            <Typography variant="subtitle1" sx={{ color: "text.primary" }}>
              Enviar notificación a usuarios :
            </Typography>
          </InputLabel>
          <Switch id="notificacion" />
        </Grid>
        <Grid container alignItems={"center"}>
          <InputLabel
            htmlFor="notificacion_contactos"
            sx={{ marginRight: "5px" }}
          >
            <Typography variant="subtitle1" sx={{ color: "text.primary" }}>
              {"Envio de notificaciones a contactos :"}
            </Typography>
          </InputLabel>
          <RadioGroup
            id="notificacion"
            defaultValue={0}
            name="notificacion_contactos"
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value={0}
              control={<Radio />}
              label="No"
              onClick={() => setContactos(false)}
            />
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Preguntar primero"
              onClick={() => setContactos(true)}
            />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label="Automático"
              onClick={() => setContactos(true)}
            />
          </RadioGroup>
        </Grid>
        {contactos && (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
            /* onChange={handleChange} */
            renderValue={(selecteds: string[]) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                <Chip label={0} />
                <Chip label={"asd"} />
                <Chip label={2} />
                <Chip label={3} />
              </Box>
            )}
          >
            <MenuItem value={0}>
              <Checkbox />
              asdasd
            </MenuItem>
            <MenuItem value={1}>
              <Checkbox />
              asdasd
            </MenuItem>
            <MenuItem value={2}>
              <Checkbox />
              asdasd
            </MenuItem>
            <MenuItem value={3}>
              <Checkbox />
              asdasd
            </MenuItem>
          </Select>
        )}
        <Grid container alignItems={"center"}>
          <InputLabel htmlFor="simulacion" sx={{ marginRight: "5px" }}>
            <Typography variant="subtitle1" sx={{ color: "text.primary" }}>
              Simulacion de presencia :
            </Typography>
          </InputLabel>
          <Select
            id="simulacion"
            value={sim.toString()}
            onChange={handleChange}
          >
            <MenuItem value={0}>Ninguno</MenuItem>
            <MenuItem value={1}>Todos presentes</MenuItem>
            <MenuItem value={2}>algunos presentes</MenuItem>
            <MenuItem value={3}>alguin prensente</MenuItem>
          </Select>
        </Grid>
        <InputLabel htmlFor="ubicaciones">
          <Typography variant="subtitle1" sx={{ color: "text.primary" }}>
            La alarma estará activa en las ubicaciones:
          </Typography>
        </InputLabel>
        <Select
          id="ubicaciones"
          fullWidth
          /* onChange={handleChange} */
          renderValue={(selecteds: string[]) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              <Chip label={0} />
              <Chip label={"asd"} />
              <Chip label={2} />
              <Chip label={3} />
            </Box>
          )}
        >
          <MenuItem value={0}>
            <Checkbox />
            asdasd
          </MenuItem>
          <MenuItem value={1}>
            <Checkbox />
            asdasd
          </MenuItem>
          <MenuItem value={2}>
            <Checkbox />
            asdasd
          </MenuItem>
          <MenuItem value={3}>
            <Checkbox />
            asdasd
          </MenuItem>
        </Select>
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
    </>
  );
};
