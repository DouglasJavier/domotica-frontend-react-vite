import { useEffect, useState } from 'react'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { useRouter } from 'next/router'
import { useFullScreenLoading, useSidebar } from '../../../context/ui'
import Toolbar from '@mui/material/Toolbar'
import { useAuth } from '../../../context/auth'
import { imprimir } from '../../utils/imprimir'
import { Icono } from './Icono'
import { ModuloType, RoleType } from '../../../modules/login/types/loginTypes'
import { versionNumber } from '../../utils'

const drawerWidth = 240

export const Sidebar = () => {
  const { sideMenuOpen, closeSideMenu, openSideMenu } = useSidebar()

  const { usuario, rolUsuario, estaAutenticado, progresoLogin } = useAuth()

  const [modulos, setModulos] = useState<ModuloType[]>([])

  const theme = useTheme()
  const router = useRouter()

  const sm = useMediaQuery(theme.breakpoints.only('sm'))
  const md = useMediaQuery(theme.breakpoints.only('md'))
  const xs = useMediaQuery(theme.breakpoints.only('xs'))

  const { estadoFullScreen } = useFullScreenLoading()

  const interpretarModulos = () => {
    imprimir(`Cambio en módulos`)
    let roles: RoleType[]
    let rolSeleccionado: RoleType | undefined
    roles = usuario?.roles ?? []
    if (roles && roles.length > 0) {
      rolSeleccionado = roles.find(
        (itemRol) => itemRol.idRol == rolUsuario?.idRol
      )
      if (rolSeleccionado) {
        setModulos(rolSeleccionado.modulos)
        imprimir(`rolSeleccionado`, rolSeleccionado)
      }
    }
  }

  const rutaActiva = (routeName: string, currentRoute: string) => {
    return routeName === currentRoute
  }

  const navigateTo = async (url: string) => {
    if (sm || xs || md) {
      closeSideMenu()
    }
    await router.push(url)
  }

  useEffect(() => {
    if (sm || xs || md) {
      closeSideMenu()
    } else {
      openSideMenu()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sm, xs, md])

  useEffect(() => {
    imprimir(`reinterpretando módulos`)
    interpretarModulos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario])

  return (
    <Drawer
      variant={sm || xs || md ? 'temporary' : 'persistent'}
      open={
        sideMenuOpen &&
        estaAutenticado &&
        modulos.length > 0 &&
        !progresoLogin &&
        !estadoFullScreen &&
        modulos.some((moduloGrupo) =>
          moduloGrupo.subModulo.some((modulo) => modulo.url == router.pathname)
        )
      }
      onClose={closeSideMenu}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        width: sideMenuOpen ? drawerWidth : `0`,
        border: 'none',
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          borderWidth: 0.0,
          boxSizing: 'border-box',
        },
        transition: 'all 0.1s ease-out',
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List key={`lista`}>
          {modulos.map((modulo, index) => (
            <div key={`div-${index}`}>
              <ListItem key={`modulo-${index}`}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    m: 0,
                    borderRadius: 1,
                    alignItems: 'center',
                  }}
                >
                  <Box width={'10px'} />
                  <Typography
                    variant={'body2'}
                    color={'text.secondary'}
                  >{`${modulo.label}`}</Typography>
                </Box>
              </ListItem>
              <List key={`submodulos-${index}`}>
                {modulo.subModulo.map((subModuloItem, indexSubModulo) => (
                  <ListItemButton
                    id={`submodulo-${index}-${indexSubModulo}`}
                    key={`submodulo-${index}-${indexSubModulo}`}
                    selected={rutaActiva(subModuloItem.url, router.pathname)}
                    onClick={() => navigateTo(subModuloItem.url)}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        p: '1 2 3 4',
                        m: 0,
                        borderRadius: 1,
                        alignItems: 'center',
                      }}
                    >
                      <Box width={'20px'} />
                      <Icono>{subModuloItem.propiedades.icono}</Icono>

                      <Box width={'20px'} />
                      <Typography
                        variant={'body2'}
                      >{`${subModuloItem.label}`}</Typography>
                    </Box>
                  </ListItemButton>
                ))}
              </List>
            </div>
          ))}
        </List>
      </Box>
      <Box sx={{ pb: 2 }} display="flex" flex="1" justifyContent="space-around">
        <Box sx={{ alignSelf: 'flex-end' }}>
          <Typography
            color="text.secondary"
            variant={'body2'}
          >{`v${versionNumber()}`}</Typography>
        </Box>
      </Box>
    </Drawer>
  )
}
