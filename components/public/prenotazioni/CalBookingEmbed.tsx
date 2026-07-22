"use client";

import { useEffect, useMemo, useRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const CAL_EMBED_SCRIPT_URL = "https://app.cal.com/embed/embed.js";
const CAL_ORIGIN = "https://cal.com";

type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, CalApi>;
  q?: unknown[][];
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

type CalBookingEmbedProps = {
  eventUrl: string;
};

function getCalLink(eventUrl: string) {
  if (!eventUrl) {
    return "";
  }

  try {
    const url = new URL(eventUrl);
    return url.pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  } catch {
    return eventUrl.replace(/^https?:\/\/(?:www\.)?cal\.com\//, "").replace(/^\/+|\/+$/g, "");
  }
}

function ensureCalApi() {
  if (typeof window === "undefined") {
    return undefined;
  }

  if (window.Cal) {
    return window.Cal;
  }

  const push = (api: CalApi, args: IArguments | unknown[]) => {
    api.q?.push(Array.from(args));
  };

  window.Cal = ((...args: unknown[]) => {
    const cal = window.Cal;

    if (!cal) {
      return;
    }

    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      document.head.appendChild(document.createElement("script")).src = CAL_EMBED_SCRIPT_URL;
      cal.loaded = true;
    }

    if (args[0] === "init") {
      const namespace = args[1];
      const api = ((...apiArgs: unknown[]) => push(api, apiArgs)) as CalApi;

      api.q = api.q || [];

      if (typeof namespace === "string") {
        cal.ns = cal.ns || {};
        cal.ns[namespace] = cal.ns[namespace] || api;
        push(cal.ns[namespace], args);
        push(cal, ["initNamespace", namespace]);
      } else {
        push(cal, args);
      }

      return;
    }

    push(cal, args);
  }) as CalApi;

  return window.Cal;
}

export function CalBookingEmbed({ eventUrl }: CalBookingEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const calLink = useMemo(() => getCalLink(eventUrl), [eventUrl]);

  useEffect(() => {
    if (!calLink || !containerRef.current) {
      return;
    }

    const Cal = ensureCalApi();
    const container = containerRef.current;

    container.innerHTML = "";
    Cal?.("init", { origin: CAL_ORIGIN });
    Cal?.("inline", {
      elementOrSelector: container,
      calLink,
      config: { layout: "month_view", theme: "light" },
    });
    Cal?.("ui", {
      theme: "light",
      styles: { branding: { brandColor: "#127b79" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });

    return () => {
      container.querySelector(".cal-embed")?.remove();
    };
  }, [calLink]);

  if (!calLink) {
    return (
      <Stack
        spacing={1}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          minHeight: 360,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography component="h2" variant="h4">
          Calendario non configurato
        </Typography>
        <Typography color="text.secondary">
          Aggiungi NEXT_PUBLIC_CALCOM_EVENT_URL al file .env per mostrare le disponibilita.
        </Typography>
      </Stack>
    );
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: { xs: 760, md: 720 },
        width: "100%",
        overflow: "auto",
      }}
    />
  );
}
