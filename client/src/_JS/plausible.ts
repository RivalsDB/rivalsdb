export type EventProps = Record<
  string,
  string | number | boolean | null | undefined
>;

declare global {
  function plausible(
    name: string,
    options?: {
      props?: EventProps;
      callback?: () => void;
    }
  );
}

export function trackEvent(eventName: string, props?: EventProps) {
  if (props) {
    plausible(eventName, { props });
  } else {
    plausible(eventName);
  }
}
