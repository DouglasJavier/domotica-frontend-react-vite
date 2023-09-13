import dayjs from 'dayjs'

import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

export const stringToDate = (fecha: string, formatoInicial: string): Date => {
  return dayjs(fecha, formatoInicial, true).toDate()
}

export const validarFechaFormato = (date: string, format: string) => {
  return dayjs(dayjs(date).format(format), format, true).isValid()
}

export const formatoFecha = (fecha: string, formatoNuevo: string): string => {
  return dayjs(fecha).format(formatoNuevo)
}
