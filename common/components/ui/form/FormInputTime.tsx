import React, { useState } from "react";
import { Button, SelectChangeEvent, TextField } from "@mui/material";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InputProps as StandardInputProps } from '@mui/material/Input/Input'
import esMX from "dayjs/locale/es-mx";

import {
  useForm,
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  PathValue,
} from "react-hook-form";
type FormInputTimeProps<T extends FieldValues> = {
  id: string;
  name: Path<T>;
  control: Control<T, object>;
  value: Date
  label: string;
  onChange?: (...event: any[]) => void;

  rules?: RegisterOptions;
  
};

export const FormInputTime = <T extends FieldValues>({
  id,
  name,
  control,
  value,
  label,
  onChange,
  rules,
}: FormInputTimeProps<T>) => {
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const { handleSubmit } = useForm();

  const onSubmit = (data: T) => {
    // Aquí puedes realizar la lógica para guardar los datos
  };

  const handleTimeChange = (time: Date | null) => {
    setSelectedTime(time);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileTimePicker
            label={label}
            onChange={(event) => {
              if (onChange) {
                onChange(event)
              }
              field.onChange(event)
            }}
            value={value}
            ref={field.ref}
            //onChange={handleTimeChange}
            ampm={true}
            renderInput={(props: JSX.IntrinsicAttributes) => (
              <TextField sx={{ width: "100%" }} size={"small"} {...props} />
            )}
            mask="__:__"
          />
        </LocalizationProvider>
      )}
      rules={rules}
      defaultValue={"" as PathValue<T, Path<T>>}
    />
  );
};
