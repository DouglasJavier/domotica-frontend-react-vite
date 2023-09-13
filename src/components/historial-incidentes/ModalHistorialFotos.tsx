import {
  Button,
  DialogContent,
  DialogActions,
  DialogTitle,
  Paper,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { FotoType } from "./types/historialType";

interface HistorialType {
  id: string;
  fecha: Date;
  ubicacion: string;
  detalles: string;
  fotos: string[];
}

interface ModalAlarmaProps {
  Fotos?: FotoType[] | null;
  accionCancelar: () => void;
}
var items = [
  {
    name: "Random Name #1",
    description: "Probably the most random thing you have ever seen!",
  },
  {
    name: "Random Name #2",
    description: "Hello World!",
  },
];

export const ModalHistorialFotos = ({
  Fotos,
  accionCancelar,
}: ModalAlarmaProps) => {
  return (
    <>
      <DialogTitle>{"Registro de Fotos del incidente"}</DialogTitle>
      <DialogContent dividers>
        <Carousel>
          {items.map((item, i) => (
            <Item key={i} noticia={item} />
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
  noticia: {
    name: string;
    description: string;
  };
}
function Item({ noticia }: ItemProps) {
  return (
    <Paper>
      <h2>{noticia.name}</h2>
      <p>{noticia.description}</p>

      <Button className="CheckButton">Check it out!</Button>
      {/* <Card >
        <CardMedia
            component="img"
            height="350"
            image={noticia.imagen}
          /> 
        
      </Card> */}
      {/* <img src={noticia.imagen} alt={noticia.titulo} /> */}
      {/* <h2>{noticia.titulo}</h2>

        <Button variant="contained" color="info" className="CheckButton">
          Check it out!
        </Button> */}
    </Paper>
  );
}
