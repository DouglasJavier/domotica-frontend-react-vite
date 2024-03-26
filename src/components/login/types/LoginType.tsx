export interface UsuarioType {
  id: string;
  nombres: string;
  apellidos: string;
  usuario: string;
  contrasenia: string;
  rol: string;
  idTelegram: string;
}

export interface LoginType {
  usuario: string;
  contrasena: string;
}
