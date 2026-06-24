"use client";

import { forwardRef, type ReactNode } from "react";
import Checkbox, { type CheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

type AppCheckboxProps = Omit<CheckboxProps, "inputRef"> & {
  label: ReactNode;
  helperText?: ReactNode;
};

export const AppCheckbox = forwardRef<HTMLInputElement, AppCheckboxProps>(
  function AppCheckbox({ label, helperText, ...props }, ref) {
    return (
      <div>
        <FormControlLabel
          control={
            <Checkbox
              {...props}
              slotProps={{
                ...props.slotProps,
                input: { ...props.slotProps?.input, ref },
              }}
            />
          }
          label={label}
        />
        {helperText ? <FormHelperText error={props.color === "error"}>{helperText}</FormHelperText> : null}
      </div>
    );
  },
);
