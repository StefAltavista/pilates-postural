import type { ConsentSelection, ConsentState } from "@/lib/consent/consent.types";

const STORAGE_KEY = "mycms-consent";
export const CONSENT_VERSION = "1.0";
const CONSENT_CHANGE_EVENT = "mycms:consent-change";

let cachedRawValue: string | null | undefined;
let cachedConsent: ConsentState | null = null;
let fallbackRawValue: string | null | undefined;

function readStoredValue() {
  if (typeof window === "undefined") return null;

  if (fallbackRawValue !== undefined) return fallbackRawValue;

  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function parseConsent(rawValue: string | null): ConsentState | null {
  if (!rawValue) return null;

  try {
    const value = JSON.parse(rawValue) as Partial<ConsentState>;

    if (
      typeof value.googleMaps !== "boolean" ||
      typeof value.acceptedAt !== "string" ||
      value.version !== CONSENT_VERSION
    ) {
      return null;
    }

    return {
      necessary: true,
      googleMaps: value.googleMaps,
      acceptedAt: value.acceptedAt,
      version: CONSENT_VERSION,
    };
  } catch {
    return null;
  }
}

function notifyConsentChange() {
  cachedRawValue = undefined;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  }
}

export function getConsent(): ConsentState | null {
  const rawValue = readStoredValue();

  if (rawValue === cachedRawValue) return cachedConsent;

  cachedRawValue = rawValue;
  cachedConsent = parseConsent(rawValue);
  return cachedConsent;
}

export function setConsent(selection: ConsentSelection): ConsentState {
  const consent: ConsentState = {
    necessary: true,
    googleMaps: selection.googleMaps,
    acceptedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  };

  const rawValue = JSON.stringify(consent);

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, rawValue);
      fallbackRawValue = undefined;
    } catch {
      fallbackRawValue = rawValue;
    }
  }

  notifyConsentChange();
  return consent;
}

export function hasGoogleMapsConsent() {
  return getConsent()?.googleMaps === true;
}

export function acceptAllConsent() {
  return setConsent({ googleMaps: true });
}

export function rejectOptionalConsent() {
  return setConsent({ googleMaps: false });
}

export function clearConsent() {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      fallbackRawValue = undefined;
    } catch {
      fallbackRawValue = null;
    }
  }

  notifyConsentChange();
}

export function subscribeToConsent(onChange: () => void) {
  if (typeof window === "undefined") return () => undefined;

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cachedRawValue = undefined;
      fallbackRawValue = undefined;
      onChange();
    }
  };

  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", handleStorage);
  };
}
