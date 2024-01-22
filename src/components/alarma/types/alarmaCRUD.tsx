export interface AlarmaCRUDType {
  id: string;
  nombre: string;
  envio_noti: string;
  idContactos: string[];
  idSimulador: string;
  idUbicaciones: string[];
  sonido: string;
  alumbradoAutomatico: boolean;
  seguridadBienes: boolean;
  sensoresHumo: boolean;
}

export interface AlarmaType {
  id: string;
  nombre: string;
  envio_noti: string;
  idContactos: string[];
  idSimulador: string;
  idUbicaciones: string[];
  alarmaContactos: AlarmaContactoType[];
  ubicacionAlarmas: UbicacionAlarmasType[];
  simulador: SimuladorType;
  estado: String;
  sonido: string;
  alumbradoAutomatico: boolean;
  seguridadBienes: boolean;
  sensoresHumo: boolean;
}
export interface AlarmaContactoType {
  id: string;
  contacto: ContactoType;
}
export interface ContactoType {
  id: string;
  nombre: string;
  apellido: string;
}
export interface UbicacionAlarmasType {
  id: string;
  ubicacion: UbicacionType;
}
export interface UbicacionType {
  id: string;
  nombre: string;
}
export interface SimuladorType {
  id: string;
  nombre: string;
}
