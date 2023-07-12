export function useMusicTime(ms) {
  const seconds = Math.floor((ms / 1000) % 60).toString();
  const minutes = Math.floor((ms / (1000 * 60)) % 60).toString();

  return { minutes, seconds };
}
