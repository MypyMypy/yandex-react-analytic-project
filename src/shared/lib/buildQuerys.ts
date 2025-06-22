export function buildQuery<
  Q extends Record<string, string | number | boolean | undefined | null>,
>(params: Q): string {
  const searchParams = new URLSearchParams();

  for (const [key, val] of Object.entries(params) as [keyof Q, Q[keyof Q]][]) {
    if (val != null) {
      searchParams.set(key as string, String(val));
    }
  }

  return searchParams.toString();
}
