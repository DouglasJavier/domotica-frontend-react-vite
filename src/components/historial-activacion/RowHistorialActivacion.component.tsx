import { TableRow, TableCell, Button, FormControlLabel } from "@mui/material";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface HistorialType {
  id: string;
  fecha: Date;
  ubicacion: string;
  detalles: string;
  fotos: string[];
}
interface RowIncidentesProps {
  Fotos?: HistorialType | undefined;
  abrirFotoModal: (fotos: HistorialType | undefined) => void;
}
export const RowHistorialActivacion = ({
  Fotos,
  abrirFotoModal,
}: RowIncidentesProps) => {
  return (
    <TableRow>
      <TableCell>123</TableCell>
      <TableCell>17/marzo/2023</TableCell>
      <TableCell>10:53:10</TableCell>
      <TableCell>Patio</TableCell>
      <TableCell>Sensor PIR detectó algo</TableCell>
      <TableCell>
        <Button color="secondary" onClick={()=>abrirFotoModal(Fotos)}>
          <BurstModeIcon />
        </Button>
      </TableCell>
      <TableCell>
        <Button color="error">
          <DeleteOutlineIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};
