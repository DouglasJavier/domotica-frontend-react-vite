import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  delay,
  encodeBase64,
  guardarCookie,
  InterpreteMensajes,
  leerCookie,
} from "../../utils";
import { Servicios } from "../../services/index";
import { Constantes } from "../../../config";
/* import { useRouter } from 'next/router' */
import { useSession } from "../../hooks/useSession";
import {
  LoginType,
  UsuarioType,
} from "../../../src/components/login/types/LoginType";
import { useAlerts } from "../../hooks";

interface ContextProps {
  cargarUsuarioManual: () => Promise<void>;
  estaAutenticado: boolean;
  usuario: UsuarioType | null;
  ingresar: ({ usuario, contrasena }: LoginType) => Promise<void>;
  progresoLogin: boolean;
}

const AuthContext = createContext<ContextProps>({} as ContextProps);

interface AuthContextType {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthContextType) => {
  const [user, setUser] = useState<UsuarioType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Hook para mostrar alertas
  const { Alerta } = useAlerts();

  /* const router = useRouter(); */

  const { sesionPeticion, borrarCookiesSesion } = useSession();

  const inicializarUsuario = async () => {
    const token = leerCookie("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      await delay(1000);
    } catch (error: Error | any) {
      borrarSesionUsuario();
      /* await router.replace({
        pathname: "/login",
      }); */
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const borrarSesionUsuario = () => {
    setUser(null);
    borrarCookiesSesion();
  };

  const cargarUsuarioManual = async () => {
    try {

      await delay(1000);

      /* await router.replace({
        pathname: "/admin/home",
      }); */
    } catch (error: Error | any) {
      borrarSesionUsuario();

      /* await router.replace({
        pathname: "/login",
      }); */
      throw error;
    } finally {
    }
  };

  useEffect(
    () => {
      /* if (!router.isReady) return; */

      inicializarUsuario()
        .catch(/* imprimir */)
        .finally(() => {
          /* imprimir("Verificación de login finalizada 👨‍💻"); */
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [
      /* router.isReady */
    ]
  );

  const login = async ({ usuario, contrasena }: LoginType) => {
    try {
      setLoading(true);

      await delay(1000);
      const respuesta = await Servicios.post({
        url: `${Constantes.baseUrl}/auth`,
        body: { usuario, contrasena: encodeBase64(encodeURI(contrasena)) },
        headers: {},
      });

      guardarCookie("token", respuesta.datos?.access_token);

      setUser(respuesta.datos);


      await delay(1000);
      /* await router.replace({
        pathname: "/admin/home",
      }); */
    } catch (e) {
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: "error" });
      borrarSesionUsuario();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        cargarUsuarioManual,
        estaAutenticado: !!user && !loading,
        usuario: user,
        ingresar: login,
        progresoLogin: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
