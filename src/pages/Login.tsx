import { Grid } from "@mui/material";
import LoginNormalContainer from "../components/login/ModalLogin.component";

export const Login = () => {
  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        height={"100vh"}
        alignItems={"center"}
      >
        <Grid item>
          <LoginNormalContainer />
        </Grid>
      </Grid>
    </>
  );
};
