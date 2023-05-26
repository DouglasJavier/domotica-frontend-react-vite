import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import {
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { RegisterOptions } from "react-hook-form/dist/types/validator";
import ClearOutlined from "@mui/icons-material/ClearOutlined";
import React from "react";
import { Variant } from "@mui/material/styles/createTypography";

export interface optionType {
  key: string;
  value: string;
  label: string;
}

type FormInputDropdownProps<T extends FieldValues> = {
  id: string;
  name: Path<T>;
  control: Control<T, object>;
  label: string;
  size?: "small" | "medium";
  rules?: RegisterOptions;
  disabled?: boolean;
  onChange?: (event: SelectChangeEvent) => void;
  onClear?: () => void;
  bgcolor?: string;
  options: optionType[];
  labelVariant?: Variant;
};

export const FormInputDropdown = <T extends FieldValues>({
  id,
  name,
  control,
  label,
  size = "small",
  rules,
  disabled,
  onChange,
  options,
  onClear,
  bgcolor,
  labelVariant = "subtitle1",
}: FormInputDropdownProps<T>) => {
  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.key} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <Grid container alignItems={"center"}>
      <Grid item xs={12} sm={12} md={4}>
        <InputLabel htmlFor={id}>
          <Typography
            variant={labelVariant}
            sx={{
              pb: 1,
              fontWeight: "fontWeightMedium",
              color: "text.primary",
            }}
          >
            {label}
          </Typography>
        </InputLabel>
      </Grid>
      <Grid item xs={12} sm={12} md={7}>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Select
                id={id}
                name={name}
                sx={{
                  width: "100%",
                  bgcolor: bgcolor,
                  "& .MuiSelect-iconOutlined": {
                    display: field.value && onClear ? "none" : "",
                  },
                  "&.Mui-focused .MuiIconButton-root": {
                    color: "primary.main",
                  },
                }}
                size={size}
                error={!!error}
                disabled={disabled}
                onChange={(event) => {
                  if (onChange) {
                    onChange(event);
                  }
                  field.onChange(event);
                }}
                inputRef={field.ref}
                value={field.value}
                endAdornment={
                  field.value && onClear ? (
                    <IconButton
                      sx={{ display: field.value ? "" : "none" }}
                      onClick={() => {
                        if (onClear) {
                          onClear();
                        }
                      }}
                      color={"primary"}
                    >
                      <ClearOutlined />
                    </IconButton>
                  ) : undefined
                }
              >
                {generateSelectOptions()}
              </Select>
              {!!error && (
                <FormHelperText error>{error?.message}</FormHelperText>
              )}
            </>
          )}
          defaultValue={"" as PathValue<T, Path<T>>}
          rules={rules}
        />
      </Grid>
    </Grid>
  );
};
