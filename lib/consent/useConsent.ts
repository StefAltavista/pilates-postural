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

const getServerConsent = () => undefined;

export function useConsent() {
  const consent = useSyncExternalStore(subscribeToConsent, getConsent, getServerConsent);

  return {
    consent,
    isReady: consent !== undefined,
    hasDecision: consent !== null && consent !== undefined,
    hasGoogleMapsConsent: consent?.googleMaps === true,
    setConsent,
    acceptAllConsent,
    rejectOptionalConsent,
    clearConsent,
  };
}

export { getConsent, hasGoogleMapsConsent };
