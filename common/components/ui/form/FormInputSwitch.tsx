import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormControlLabel, Grid, InputLabel, Switch } from "@mui/material";
import Typography from "@mui/material/Typography";
import { RegisterOptions } from "react-hook-form/dist/types/validator";
import React from "react";
import { Variant } from "@mui/material/styles/createTypography";

type FormInputSwitchProps<T extends FieldValues> = {
  id: string;
  name: Path<T>;
  control: Control<T, object>;
  label: string;
  size?: "small" | "medium";
  //options: any[]
  rules?: RegisterOptions;
  disabled?: boolean;
  labelVariant?: Variant;
};

export const FormInputSwitch = <T extends FieldValues>({
  id,
  name,
  control,
  label,
  //options,
  rules,
  disabled,
  labelVariant = "subtitle1",
}: FormInputSwitchProps<T>) => (
  <div>
    <Grid container alignItems={"center"}>
      <Grid item>
        <InputLabel htmlFor={id}>
          <Typography
            variant={labelVariant}
            sx={{ fontWeight: "fontWeightMedium", color: "text.primary" }}
          >
            {label}
          </Typography>
        </InputLabel>
      </Grid>
      <Grid item>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <Switch
                value={field.value}
                checked={field.value}
                id={id}
                name={name}
                disabled={disabled}
                onChange={field.onChange}
              />
            </>
          )}
          rules={rules}
        />
      </Grid>
    </Grid>
  </div>
);
