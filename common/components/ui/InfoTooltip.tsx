import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import { FC, PropsWithChildren } from 'react'
import { Icono } from './Icono'

interface Props {
  texto: string
}

export const InfoTooltip: FC<PropsWithChildren<Props>> = ({ texto = '' }) => {
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))

  return (
    <HtmlTooltip title={texto} placement="right-start">
      <span>
        <Icono color={'info'} fontSize="small">
          help_outline
        </Icono>
      </span>
    </HtmlTooltip>
  )
}
