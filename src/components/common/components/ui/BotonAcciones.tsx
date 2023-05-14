import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { Icono } from './Icono'
import React, { MouseEventHandler, ReactNode, useState } from 'react'

interface TipoAccion {
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
  titulo: string
  icono: ReactNode
  accion: MouseEventHandler<any> | undefined
  desactivado?: boolean

  mostrar?: boolean
  name: string
  id: string
}

interface BotonAccionesParams {
  desactivado?: false
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

  acciones: Array<TipoAccion>
  icono?: ReactNode
  id: string
}

export const BotonAcciones = ({
  desactivado = false,
  color = 'primary',
  acciones = [],
  icono = 'more_horiz',
  id,
}: BotonAccionesParams) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const desplegarMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const cerrarMenu = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        id={id}
        size="small"
        onClick={desplegarMenu}
        color="primary"
        style={{ textTransform: 'none' }}
      >
        <Icono color={desactivado ? 'disabled' : color}>{icono}</Icono>
      </IconButton>
      <Menu
        id="menu-acciones"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorEl)}
        onClose={cerrarMenu}
        autoFocus={false}
      >
        {acciones
          .filter((value) => value.mostrar)
          .map((accion, index) => (
            <MenuItem
              sx={{ p: 2 }}
              id={accion.id}
              key={`${index}-accion`}
              onClick={(event) => {
                cerrarMenu()
                if (accion.accion) return accion.accion(event)
              }}
              disabled={accion.desactivado}
            >
              <Icono color={accion.color}>{accion.icono}</Icono>
              <Box width={'20px'} />
              <Typography variant={'body2'}>{accion.titulo}</Typography>
            </MenuItem>
          ))}
      </Menu>
    </>
  )
}
