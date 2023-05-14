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
interface CardCamaraProps {
  resposivo: boolean;
}

export const CardCamara = ({ resposivo }: CardCamaraProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const abrirModal = () => {
    setOpenModal(true);
  };
  const cerrarModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <Card sx={{ marginTop: "5px" }}>
        <CardActionArea onClick={() => abrirModal()}>
          {/* <CardHeader /> */}
          <CardMedia
            component="img"
            height={resposivo ? "190px" : "240px"}
            image={`https://as02.epimg.net/videos/imagenes/2021/11/23/actualidad/1637689280_111450_1637689557_noticia_normal.jpg`}
          />
          <CardContent>
            <Typography variant="h6">{"Patio Delantero"}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal open={openModal}>
        <Grid container justifyContent={"center"} paddingTop={"2%"}>
          <Card>
            <Grid container justifyContent={'space-between'}>
              <Grid item>
                <Typography variant="h6">Titulo de la cámara</Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    cerrarModal();
                  }}
                  variant="contained"
                  color="error"
                >
                  Cerrar
                </Button>
              </Grid>
            </Grid>

            <CardMedia
              component="img"
              height={resposivo ? "190px" : "590px"}
              image={`https://as02.epimg.net/videos/imagenes/2021/11/23/actualidad/1637689280_111450_1637689557_noticia_normal.jpg`}
            />
          </Card>
        </Grid>
      </Modal>
    </>
  );
};
