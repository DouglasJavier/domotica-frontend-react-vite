console.log(import.meta);
export const Constantes = {
  baseUrl: import.meta.env.VITE_BASE_URL,
  siteName: import.meta.env.VITE_SITE_NAME,
  appEnv: import.meta.env.VITE_APP_ENV,
};

export const tipoSensorConst = ["PIR", "MQ-2", 'MQ-7'];
export const tipoActuadorConst = ["FOCO", "SIRENA"];
export const tipoDispositivoConst = ["ESP-32 CAM"];
