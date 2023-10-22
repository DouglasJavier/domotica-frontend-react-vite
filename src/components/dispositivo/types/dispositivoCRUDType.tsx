export interface DispositivoType {
  id: string;
  nombre: string;
  tipo: string;
  direccionLan: string;
  direccionWan: string;
  ubicacion: UbicacionType;
  sensoresActuadores: SensorActuadorType[];
}
interface UbicacionType {
  id: string;
  nombre: string;
}
interface SensorActuadorType {
  id: string;
  pin: string;
  tipo: string;
  descripcion: string;
  ubicacion: UbicacionType;
}

export interface DispositivoCRUDType {
  id: string;
  nombre: string;
  tipo: string;
  direccionLan: string;
  direccionWan: string;
  idUbicacion: string;
  sensoresActuadores: SensoresActuadoresCRUDType[];
}
interface SensoresActuadoresCRUDType {
  pin: string;
  tipo: string;
  descripcion: string;
  idUbicacion: string;
}
