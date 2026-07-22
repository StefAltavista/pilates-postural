"use client";

import { forwardRef } from "react";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

export const AppTextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function AppTextField({ fullWidth = true, slotProps, sx, ...props }, ref) {
    const inputLabelSlotProps =
      typeof slotProps?.inputLabel === "function" ? undefined : slotProps?.inputLabel;
    const composedSx = sx
      ? [
          {
            "& .MuiInputLabel-root": {
              bgcolor: "surface.main",
              px: 0.5,
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]
      : {
          "& .MuiInputLabel-root": {
            bgcolor: "surface.main",
            px: 0.5,
          },
        };

    return (
      <TextField
        fullWidth={fullWidth}
        inputRef={ref}
        slotProps={{
          ...slotProps,
          inputLabel: {
            ...(inputLabelSlotProps ?? {}),
            shrink: true,
          },
        }}
        sx={composedSx}
        {...props}
      />
    );
  },
);
