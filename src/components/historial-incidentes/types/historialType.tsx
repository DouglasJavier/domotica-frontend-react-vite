export interface HistorialType {
  id: string;
  fecha: Date;
  estado: string;
  idAlarma: string;
  idSensor: string;
  fotos: FotoType[];
  alarma: AlarmaType1;
  sensor: SensorType;
}
interface AlarmaType1 {
  id: string;
  estado: string;
  nombre: string;
}
interface SensorType {
  id: string;
  pin: string;
  tipo: string;
  descripcion: string;
  ubicacion: UbicacionType1;
}
interface UbicacionType1 {
  id: string;
  nombre: string;
  estado: string;
}
export interface FotoType {
  id: string;
  foto: string;
}
export interface AtenderIncidenteType {
  activarSonido: boolean
  notificacionContactos: boolean
}
