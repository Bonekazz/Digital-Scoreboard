export default function getUserMobileOS() {
  const userAgent = navigator.userAgent || navigator.vendor;
  if (/iPad|iPhone|iPod/.test(userAgent)) {
      return 'iOS';
  }
  if (/android/i.test(userAgent)) {
      return 'Android';
  }
  return 'unknown';
}
