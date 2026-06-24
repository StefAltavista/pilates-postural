"use client";

import { forwardRef } from "react";
import type { TextFieldProps } from "@mui/material/TextField";
import { AppTextField } from "@/components/common/AppTextField";

export const AppTextArea = forwardRef<HTMLInputElement, TextFieldProps>(
  function AppTextArea({ minRows = 4, ...props }, ref) {
    return <AppTextField multiline minRows={minRows} ref={ref} {...props} />;
  },
);
