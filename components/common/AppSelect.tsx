"use client";

import { forwardRef } from "react";
import MenuItem from "@mui/material/MenuItem";
import type { TextFieldProps } from "@mui/material/TextField";
import { AppTextField } from "@/components/common/AppTextField";

type SelectOption = {
  label: string;
  value: string;
};

type AppSelectProps = Omit<TextFieldProps, "children" | "select"> & {
  options: readonly SelectOption[];
};

export const AppSelect = forwardRef<HTMLInputElement, AppSelectProps>(
  function AppSelect({ options, ...props }, ref) {
    return (
      <AppTextField select ref={ref} {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </AppTextField>
    );
  },
);
