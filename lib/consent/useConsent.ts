"use client";

import { useSyncExternalStore } from "react";
import {
  acceptAllConsent,
  clearConsent,
  getConsent,
  hasGoogleMapsConsent,
  rejectOptionalConsent,
  setConsent,
  subscribeToConsent,
} from "@/lib/consent/consentStorage";

const getServerConsent = () => null;

export function useConsent() {
  const consent = useSyncExternalStore(subscribeToConsent, getConsent, getServerConsent);

  return {
    consent,
    hasDecision: consent !== null,
    hasGoogleMapsConsent: consent?.googleMaps === true,
    setConsent,
    acceptAllConsent,
    rejectOptionalConsent,
    clearConsent,
  };
}

export { getConsent, hasGoogleMapsConsent };
