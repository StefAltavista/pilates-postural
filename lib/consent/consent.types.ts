export type ConsentState = {
  necessary: true;
  googleMaps: boolean;
  acceptedAt: string;
  version: string;
};

export type ConsentSelection = Pick<ConsentState, "googleMaps">;
