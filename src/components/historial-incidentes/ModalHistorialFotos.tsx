import {
  Button,
  DialogContent,
  DialogActions,
  DialogTitle,
  Paper,
  Card,
  CardMedia,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { FotoType } from "./types/historialType";
import { Constantes } from '../../../config'
interface ModalAlarmaProps {
  Fotos?: FotoType[] | null;
  accionCancelar: () => void;
}
export const ModalHistorialFotos = ({
  Fotos,
  accionCancelar,
}: ModalAlarmaProps) => {
  return (
    <>
      <DialogTitle>{"Registro de Fotos del incidente"}</DialogTitle>
      <DialogContent dividers>
        <Carousel>
          {Fotos?.map((item, i) => (
            <Item key={i} foto={item} />
          ))}
        </Carousel>
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
        <Button variant="contained" color="error" onClick={accionCancelar}>
          Salir
        </Button>
      </DialogActions>
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
          image={`${Constantes.baseUrl}/historialIncidentes/fotos/${foto.foto}`}
        />
      </Card>
      
      
    </Paper>
  );
}
