import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { CamaraType } from "./types/camaraType";
interface CardCamaraProps {
  camara: CamaraType;
  resposivo: boolean;
}
import { Constantes } from "../../../config";
import { leerCookie } from "../../../common/utils";

export const CardCamara = ({ camara, resposivo }: CardCamaraProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [imagenDeRespaldoCargada, setImagenDeRespaldoCargada] = useState(false);
  const theme = useTheme();

  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));

  const abrirModal = () => {
    setOpenModal(true);
  };
  const cerrarModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Card sx={{ marginTop: "5px", width: xs || sm ? "100%" : "24vw" }}>
        <CardActionArea onClick={() => abrirModal()}>
          {/* <CardHeader /> */}
          {!openModal && (
            <CardMedia
              component="img"
              image={`${Constantes.baseUrl}/dispositivos/${
                camara.id
              }/stream?token=${leerCookie("token")}`}
            />
          )}

          <CardContent>
            <Typography variant="h6">
              {camara.nombre + " " + camara.ubicacion.nombre}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal open={openModal}>
        <Grid container justifyContent={"center"}>
          <Card
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              width: xs || sm ? "100%" : "80%",
            }}
          >
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
              image={`${Constantes.baseUrl}/dispositivos/${
                camara.id
              }/stream?token=${leerCookie("token")}`}
            />
          </Card>
        </Grid>
      </Modal>
    </>
  );
};
