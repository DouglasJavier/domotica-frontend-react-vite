import { useSnackbar, VariantType } from 'notistack'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export interface AlertType {
  mensaje: string
  variant?: VariantType
}

export const useAlerts = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const Alerta = ({ mensaje, variant = 'info' }: AlertType) => {
    enqueueSnackbar(mensaje, {
      variant,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
      action: (key) => (
        <IconButton
          color="inherit"
          onClick={() => {
            closeSnackbar(key)
          }}
        >
          <CloseIcon />
        </IconButton>
      ),
    })
  }
  return { Alerta }
}
