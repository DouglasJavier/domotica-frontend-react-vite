export interface ContactoType {
  id: string;
  nombre: string;
  apellido: string;
  numeroTel1: string;
  numeroTel2: string;
  alarmaContactos: AlarmaContactosType[];
}
export interface AlarmaContactosType {
  id: string;
  alarma: AlarmaType;
}
export interface AlarmaType {
  id: string;
  nombre: string;
}
export interface ContactoCRUDType {
  id: string;
  nombre: string;
  apellido: string;
  numeroTel1: string;
  numeroTel2: string;
}
