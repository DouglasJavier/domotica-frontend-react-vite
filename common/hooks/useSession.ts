import { delay, eliminarCookie, guardarCookie, leerCookie } from "../utils";
import {
  estadosSinPermiso,
  peticionFormatoMetodo,
  Servicios,
} from "../services";
import { verificarToken } from "../utils/token";
import { Constantes } from "../../config";
import { Token } from "@mui/icons-material";
/* import { useRouter } from 'next/router' */

export const useSession = () => {
  /* const router = useRouter() */

  const sesionPeticion = async ({
    url,
    tipo = "get",
    body,
    headers,
    params,
    responseType,
    withCredentials,
  }: peticionFormatoMetodo) => {
    try {
      console.log("token:   ");
      if (!verificarToken(leerCookie("token") ?? "")) {
        console.log("entro a cerrar");
        await cerrarSesion();
        //await actualizarSesion();
      }
      console.log("no entro a cerrar");
      const cabeceras = {
        accept: "application/json",
        Authorization: `Bearer ${leerCookie("token") ?? ""}`,
        ...headers,
      };
      console.log("cabecera", cabeceras);
      const response = await Servicios.peticionHTTP({
        url,
        tipo,
        headers: cabeceras,
        body,
        params,
        responseType,
        withCredentials,
      });
      return response.data;
    } catch (e: import("axios").AxiosError | any) {
      if (e.code === "ECONNABORTED") {
        throw new Error("La petición está tardando demasiado");
      }

      if (Servicios.isNetworkError(e)) {
        throw new Error("Error en la conexión 🌎");
      }

      if (estadosSinPermiso.includes(e.response?.status)) {
        await cerrarSesion();
        return;
      }

      throw e.response?.data || "Ocurrio un error desconocido";
    }
  };

  const borrarCookiesSesion = () => {
    eliminarCookie("token"); // Eliminando access_token
    //eliminarCookie("jid"); // Eliminando refresh token
  };

  const cerrarSesion = async () => {
    await delay(1000);
    //const token = leerCookie("token");
    borrarCookiesSesion();

    /* const respuesta = await Servicios.get({
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `${Constantes.baseUrl}/logout`,
      }); */

    window.location.href = "/";
  };

  const actualizarSesion = async () => {
    try {
      const respuesta = await Servicios.post({
        url: `${Constantes.baseUrl}/token`,
        body: {
          token: leerCookie("token"),
        },
      });

      guardarCookie("token", respuesta.datos?.access_token);

      await delay(500);
    } catch (e) {
      await cerrarSesion();
    }
  };

  return { sesionPeticion, cerrarSesion, borrarCookiesSesion };
};
