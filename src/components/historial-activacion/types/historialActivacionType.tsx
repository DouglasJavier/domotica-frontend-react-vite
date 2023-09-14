export interface HistorialActivarDesactivarType {
  id: string;
  fecha: string;
  accion: string;
  estado: string;
  idAlarma: string;
  idUsuario: string;
  usuario: UsuarioType;
  alarma: AlarmaType;
}
interface UsuarioType {
  id: string;
  nombres: string;
  apellidos: BigIntToLocaleStringOptions;
}
interface AlarmaType {
  id: string;
  nombre: string;
}
