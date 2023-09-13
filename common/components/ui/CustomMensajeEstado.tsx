import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";

import { alpha } from "@mui/material/styles";

export interface MensajeEstadoProps {
  titulo?: string;
  descripcion?: string;
  fontSize?: number;
  letterSpacing?: number;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";

  opacidadFondo?: number;
  customColor?: string;
}
const CustomMensajeEstado = ({
  color = "error",
  titulo = "",
  descripcion = "",
  fontSize = 12,
  letterSpacing = 0,
  opacidadFondo = 0.5,
}: MensajeEstadoProps) => {
  const coloresFondoClaro = {
    primary: "#cce1df",
    secondary: "#dbe0df",
    info: "#EBF5FF",
    warning: "#fbe2cc",
    error: "#FCF1F2",
    success: "#F1FCF2",
    inherit: "#f1d1d1",
  };
  const coloresFondoOscuro = {
    primary: "#001513",
    secondary: "#0f1413",
    info: "#1B2A43",
    warning: "#2f1600",
    error: "#392127",
    success: "#283b39",
    inherit: "#f1d1d1",
  };

  const coloresTextoClaro = {
    primary: "#cce1df",
    secondary: "#555F71",
    info: "#0288d1",
    warning: "#ed6c02",
    error: "#BA1B1B",
    success: "#2e7d32",
    inherit: "#555F71",
  };
  const coloresTextoOscuro = {
    primary: "#001513",
    secondary: "#555F71",
    info: "#8DC7FF",
    warning: "#ed6c02",
    error: "#FF7F8D",
    success: "#a1f7cf",
    inherit: "#555F71",
  };
  // const CAMBIO_TONO_COLOR: number = 590085

  return (
    <Tooltip title={descripcion}>
      <Box
        sx={{
          bgcolor: alpha(coloresFondoClaro[color], opacidadFondo),
          textAlign: "center",
          borderRadius: 1,
          pt: 0.1,
          pr: 1,
          pl: 1,
          pb: 0.1,
          border: 1,
          borderColor: coloresTextoClaro[color],
          // opacity: 0.8,
          // p: 0.3,
          // m: 1,
        }}
      >
        <Box
          component={"span"}
          sx={{
            color: coloresTextoClaro[color],

            // display: 'inline',
            // textTransform: 'lowercase',
            overflow: "hidden",
            // fontWeight: 'bold',
            fontSize: fontSize,

            opacity: 1,
            letterSpacing: letterSpacing,
          }}
        >
          {titulo}
        </Box>
      </Box>
    </Tooltip>
  );
};

export default CustomMensajeEstado;
