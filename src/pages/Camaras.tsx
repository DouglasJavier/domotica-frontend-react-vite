import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { CardCamara } from "../components/CardCamara.component";

export const Camaras = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  return (
    <>
      <Grid container marginTop={"3%"} justifyContent={sm || xs ? "center" : "space-around"}>
        <Grid item >
          <CardCamara resposivo={sm || xs}/>
        </Grid>
        <Grid item >
          <CardCamara resposivo={sm || xs}/>
        </Grid>
        <Grid item >
          <CardCamara resposivo={sm || xs}/>
        </Grid>
        <Grid item >
          <CardCamara resposivo={sm || xs}/>
        </Grid>
      </Grid>
    </>
  );
};
