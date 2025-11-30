type IdleSessionTimeoutConfig = {
  timeout: number;
  onSessionTimeout: () => void;
};

type TimeoutId = ReturnType<typeof setTimeout>;

export function initializeIdleTimeout({
  timeout,
  onSessionTimeout,
}: IdleSessionTimeoutConfig) {
  let timeoutId: TimeoutId;

  const resetTimer = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(onSessionTimeout, timeout);
  };

  const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

  const start = () => {
    resetTimer();
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });
  };

  const stop = () => {
    clearTimeout(timeoutId);
    events.forEach((event) => {
      window.removeEventListener(event, resetTimer);
    });
  };

  return { start, stop };
}
