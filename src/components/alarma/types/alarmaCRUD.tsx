export interface AlarmaCRUDType {
    id: string;
    nombre: string;
    sonido: boolean;
    notificacion: boolean;
    envio_noti: string;
    idContactos: string[];
    idSimulador: string;
    idUbicaciones: string[];
    seguridadPersonas: boolean;
    seguridadBienes: boolean;
  }

export interface AlarmaType {
    id: string;
    nombre: string;
    sonido: boolean;
    notificacion: boolean;
    envio_noti: string;
    idContactos: string[];
    idSimulador: string;
    idUbicaciones: string[];
    seguridadPersonas: boolean;
    seguridadBienes: boolean;
    alarmaContactos: AlarmaContactoType[];
    ubicacionAlarmas: UbicacionAlarmasType[];
    simulador: SimuladorType;
    estado: String

}
export interface AlarmaContactoType {
    id: string;
    contacto: ContactoType
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
export interface UbicacionType{
    id: string;
    nombre: string;
}
export interface SimuladorType {
    id: string;
    nombre: string;
}