import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { CardCamara } from "../components/camara/CardCamara.component";
import axios from "axios";
import { CamaraType } from "../components/camara/types/camaraType";
import { useEffect, useState } from "react";
import { Constantes } from '../../config'

export const Camaras = () => {
  const [camarasData, setCamarasData] = useState<CamaraType[]>([]);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  /**********************************************************************************/
  const peticionCamaras = async () => {
    console.log("Obteniendo datos");
    const data = await axios.get(`${Constantes.baseUrl}/dispositivos/camaras`);
    setCamarasData(data.data[0]);
  };
  /**********************************************************************************/
  useEffect(() => {
    peticionCamaras();
  }, []);
  return (
    <>
      <Grid
        container
        marginTop={"3%"}
        justifyContent={sm || xs ? "center" : "space-around"}
      >
        {camarasData.map((camara) => (
          <Grid item xs={11} sm={11} md={5}>
            <CardCamara camara={camara} resposivo={sm || xs} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
