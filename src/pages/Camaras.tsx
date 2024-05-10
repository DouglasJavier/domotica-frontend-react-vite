import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { CardCamara } from "../components/camara/CardCamara.component";
import axios from "axios";
import { CamaraType } from "../components/camara/types/camaraType";
import { useEffect, useState } from "react";
import { Constantes } from "../../config";
import { useAlerts } from "../../common/hooks";
import { useSession } from "../../common/hooks/useSession";
import { InterpreteMensajes } from "../../common/utils";
import { VerificarIncidentes } from "../components/VerificarIncidentes.component";

export const Camaras = () => {
  const [camarasData, setCamarasData] = useState<CamaraType[]>([]);
  const { Alerta } = useAlerts();
  const { sesionPeticion } = useSession();

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  /**********************************************************************************/
  const peticionCamaras = async () => {
    try {
      const respuesta = await sesionPeticion({
        url: `${Constantes.baseUrl}/dispositivos/camaras`,
      });
      setCamarasData(respuesta[0]);
    } catch (e) {
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: "error" });
    } finally {
    }
  };
  /**********************************************************************************/
  useEffect(() => {
    peticionCamaras();
  }, []);
  return (
    <>
      <VerificarIncidentes />
      <Grid
        container
        marginTop={"3%"}
        justifyContent={sm || xs ? "center" : "center"}
      >
        {camarasData.map((camara) => (
          <Grid item width={"410px"}>
            <CardCamara camara={camara} resposivo={sm || xs} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
