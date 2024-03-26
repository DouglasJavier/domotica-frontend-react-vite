export interface UsuarioType {
  id: string;
  nombres: string;
  apellidos: string;
  usuario: string;
  contrasenia: string;
  idTelegram: string;
  rol: string;
  estado?: string;
}
export interface CambioUsuarioType {
  id: string;
  nombres: string;
  apellidos: string;
  usuario: string;
  contrasenia: string;
  idTelegram: string;
  rol: string;
  contrasenia1: string;
  contrasenia2: string;
}
