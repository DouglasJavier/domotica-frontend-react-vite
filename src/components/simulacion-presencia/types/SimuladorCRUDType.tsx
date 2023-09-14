export interface SimuladorType {
  id: string;
  nombre: string;
  simuladoresActuadores: SimuladorActuadorType[];
}
export interface SimuladorActuadorType {
  idActuador: string;
  actuador: ActuadorType;
  horarios: HorarioType[];
}

export interface ActuadorType {
  tipo: string;
  descripcion: string;
  ubicacion: UbicacionType;
}
interface UbicacionType {
  nombre: string;
}
interface HorarioType {
  horaInicio: string;
  horaFin: string;
}
