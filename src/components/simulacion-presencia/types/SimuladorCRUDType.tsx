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
  id: string;
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

export interface SimuladorCRUDType {
  nombre: string;
  simuladoresActuadores: SimuladorActuadoCRUDType[];
  actuadorDropdown: string;
}
export interface SimuladorActuadoCRUDType {
  idActuador: string;
  actuador: ActuadorType;
  horarios: HorarioCRUDType[];
}
export interface HorarioCRUDType {
  horaInicio: Date;
  horaFin: Date;
}
