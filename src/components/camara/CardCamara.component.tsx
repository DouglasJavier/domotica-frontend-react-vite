import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CamaraType } from "./types/camaraType";
interface CardCamaraProps {
  camara: CamaraType;
  resposivo: boolean;
}
import { Constantes } from '../../../config'

export const CardCamara = ({ camara, resposivo }: CardCamaraProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [imagenDeRespaldoCargada, setImagenDeRespaldoCargada] = useState(false);
  const abrirModal = () => {
    setOpenModal(true);
  };
  const cerrarModal = () => {
    setOpenModal(false);
  };
  const handleOnError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log("##################################################")
    console.log("Entró a handle error")
    console.log("##################################################")
    if (!imagenDeRespaldoCargada) {
      const target = e.target as HTMLImageElement;
      target.src = camara.direccionWan && camara.direccionWan;
      setImagenDeRespaldoCargada(true);
    }
  };
  return (
    <>
      <Card sx={{ marginTop: "5px" }}>
        <CardActionArea onClick={() => abrirModal()}>
          {/* <CardHeader /> */}
          <CardMedia
            component="img"
            image={camara.direccionLan && ("http://" + camara.direccionLan + "/mjpeg")}
          />
          <CardContent>
            <Typography variant="h6">
              {camara.nombre + " " + camara.ubicacion.nombre}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal open={openModal}>
        <Grid container justifyContent={"center"} paddingTop={"2%"}>
          <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <Typography variant="h6">
                  {camara.nombre + " " + camara.ubicacion.nombre}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    cerrarModal();
                  }}
                  variant="outlined"
                  color="error"
                >
                  X
                </Button>
              </Grid>
            </Grid>

            <CardMedia
              component="img"
              height={resposivo ? "190px" : "590px"}
              image={"http://" + camara.direccionLan + "/mjpeg"}
            />
          </Card>
        </Grid>
      </Modal>
    </>
  );
};
