export function isPWAInstalled() {
  const isIosInstalled = (window.navigator as any).standalone === true;
  const isOtherInstalled = window.matchMedia('(display-mode: standalone)').matches;
  return isIosInstalled || isOtherInstalled;
}
