import Icon from '@mui/material/Icon'

import { FC, PropsWithChildren } from 'react'

interface Props {
  color?:
    | 'inherit'
    | 'action'
    | 'disabled'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
  fontSize?: 'inherit' | 'large' | 'medium' | 'small'
}

export const Icono: FC<PropsWithChildren<Props>> = ({
  color = 'primary',
  fontSize = 'medium',
  children,
}) => {
  return (
    <Icon
      fontSize={fontSize}
      color={`${color}`}
      className={'material-icons-outlined'}
    >
      {children}
    </Icon>
  )
}
