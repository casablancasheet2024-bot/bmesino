import { cacheLife } from "next/cache";

/** Cached so the footer stays prerendered; refreshed daily so the year rolls over without a redeploy. */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
