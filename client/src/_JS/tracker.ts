import Plausible from "plausible-tracker";

const DOMAIN = "rivalsdb.app";

export class Tracker {
  private plausible;
  constructor() {
    this.plausible = Plausible({ domain: DOMAIN });
    this.plausible.enableAutoPageviews();
    this.plausible.enableAutoOutboundTracking();
  }

  public trackEvent(eventName: string, props?: { [propName: string]: string }) {
    this.plausible.trackEvent(eventName, props ? { props } : undefined);
  }
}
