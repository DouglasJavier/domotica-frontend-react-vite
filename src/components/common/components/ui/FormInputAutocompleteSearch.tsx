import { Fragment, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { Box, FormHelperText, Grid, Typography } from '@mui/material'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { InputProps as StandardInputProps } from '@mui/material/Input/Input'
import { Variant } from '@mui/material/styles/createTypography'
import { Controller } from 'react-hook-form'
import { optionType } from './form'
import { InfoTooltip } from './InfoTooltip'
import { Icono } from './Icono'

export interface FormInputAutocompleteSearchProps {
  id: string
  name: string
  control: any
  label: string
  textoAyuda?: string
  placeholder?: string
  size?: 'small' | 'medium'
  variant?: 'standard' | 'outlined' | 'filled'
  type?: 'password' | 'number' | 'search' | string | undefined
  rules?: RegisterOptions
  disabled?: boolean
  defaultValue: optionType
  onSelect: (value: optionType) => void
  onEnter?: () => VoidFunction
  onClear?: () => void
  onChange?: StandardInputProps['onChange']
  bgcolor?: string
  noIcon?: boolean
  loading: boolean
  options: optionType[]
  labelVariant?: Variant
}

export const FormInputAutocompleteSearch = ({
  id,
  name,
  control,
  label,
  placeholder,
  size = 'small',
  variant = 'outlined',
  rules,
  textoAyuda = '',
  disabled,
  onSelect,
  defaultValue,
  onClear,
  onChange,
  loading = false,
  noIcon = false,
  options,
  bgcolor,
  labelVariant = 'subtitle1',
}: FormInputAutocompleteSearchProps) => {
  useEffect(() => {
    if (options.length === 0 && defaultValue.key !== '') {
      options.push(defaultValue)
    } else if (!options.some((option) => option.key === defaultValue.key)) {
      options.push(defaultValue)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  return (
    <div>
      {textoAyuda.length > 0 ? (
        <Grid container direction={'row'} spacing={1} alignItems={'stretch'}>
          <Grid item>
            <Typography
              variant={labelVariant}
              sx={{ fontWeight: 'fontWeightMedium' }}
            >
              {label}
            </Typography>
          </Grid>
          <Grid item>
            <InfoTooltip texto={textoAyuda}></InfoTooltip>
          </Grid>
        </Grid>
      ) : (
        <Typography
          variant={labelVariant}
          sx={{ fontWeight: 'fontWeightMedium' }}
        >
          {label}
        </Typography>
      )}
      <Controller
        name={name}
        defaultValue={[]}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            id={id}
            sx={{
              width: '100%',
              bgcolor: bgcolor,
            }}
            disabled={disabled}
            size={size}
            noOptionsText={'Sin opciones encontradas'}
            loadingText={'Cargando'}
            options={options}
            value={defaultValue}
            loading={loading}
            getOptionLabel={(option) => option.label?.toString()}
            isOptionEqualToValue={(option, value) => {
              if (value.key === '') return true
              return option.key === value.key
            }}
            renderInput={(params) => (
              <>
                <TextField
                  {...params}
                  error={!!error}
                  placeholder={placeholder}
                  variant={variant}
                  onChange={(event) => {
                    if (event.target.value === '') {
                      if (onClear) onClear()
                    } else {
                      if (onChange) onChange(event)
                      // field.onChange(event.target.value)
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </Fragment>
                    ),
                    startAdornment: (
                      <Box sx={{ pt: 1, pl: 1 }}>
                        {!noIcon && (
                          <Icono color="secondary" fontSize="small">
                            search
                          </Icono>
                        )}
                      </Box>
                    ),
                  }}
                />
                {!!error && (
                  <FormHelperText error>{error?.message}</FormHelperText>
                )}
              </>
            )}
            onChange={(event, newValue) => {
              if (newValue) {
                field.onChange(newValue.value)
                onSelect(newValue)
              } else {
                if (onClear) onClear()
                field.onChange(undefined)
              }
            }}
          />
        )}
        rules={rules}
      />
    </div>
  )
}
