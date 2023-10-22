export interface CamaraType {
  id: string;
  nombre: string;
  direccionLan: string;
  direccionWan: string;
  ubicacion: UbicacionType
}
interface UbicacionType {
    id: string;
    nombre: string;
}
