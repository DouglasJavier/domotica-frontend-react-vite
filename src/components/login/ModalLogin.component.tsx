import { Box, Button, Card, CardMedia, Divider } from "@mui/material";
import { FormInputText } from "../../../common/components/ui/form";
import Typography from "@mui/material/Typography";
import { Constantes } from "../../../config";
/* import { useAuth } from '../../../context/auth' */
import { useForm } from "react-hook-form";
import { useAuth } from "../../../common/context/auth";
/* import { LoginType } from '../types/loginTypes' */

const LoginNormalContainer = () => {
  const { ingresar, progresoLogin } = useAuth();

  const { handleSubmit, control } = useForm<any>({
    defaultValues: {
      usuario: "",
      contrasena: "",
    },
  });

  const iniciarSesion = async ({ usuario, contrasena }: any) => {
    await ingresar({ usuario, contrasena });
  };

  return (
    <Card sx={{ borderRadius: 4, p: 4 }}>
      <form onSubmit={handleSubmit(iniciarSesion)}>
        <Box
          display={"grid"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ borderRadius: 12 }}
        >
          <CardMedia
              component="img"
              image={`iconoSeguridad.png`}
            />
          <Typography
            align={"center"}
            color={"primary"}
            sx={{ flexGrow: 1, fontWeight: "medium" }}
          >
            Sistema domótico de seguridad
          </Typography>
          <Box sx={{ mt: 1, mb: 1 }}></Box>
          <FormInputText
            id={"usuario"}
            control={control}
            name="usuario"
            label="Usuario"
            size={"medium"}
            labelVariant={"subtitle1"}
            /* disabled={progresoLogin} */
            rules={{ required: "Este campo es requerido" }}
          />
          <Box sx={{ mt: 1, mb: 1 }}></Box>
          <FormInputText
            id={"contrasena"}
            control={control}
            name="contrasena"
            label="Contraseña"
            size={"medium"}
            labelVariant={"subtitle1"}
            type={"password"}
            /*             disabled={progresoLogin} */
            rules={{
              required: "Este campo es requerido",
              minLength: {
                value: 3,
                message: "Mínimo 3 caracteres",
              },
            }}
          />
          {/*   <Box sx={{ mt: 1, mb: 1 }}>
            <ProgresoLineal mostrar={progresoLogin} />
          </Box> */}
          <Box sx={{ height: 15 }}></Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            /*             disabled={progresoLogin} */
          >
            <Typography sx={{ fontWeight: "medium" }}>
              Iniciar sesión
            </Typography>
          </Button>
        </Box>
      </form>
    </Card>
  );
};

export default LoginNormalContainer;
