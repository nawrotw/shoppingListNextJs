import { unstable_cache as nextCache } from "next/cache"
import { cache as reactCache } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => Promise<any>

/*
  For logging add this code in next/dist/server/web/spec-extension/unstable-cache.js:149

                        console.log('[Cache] keyParts:', keyParts, 'Cache hit:', true);
                        console.timeEnd('[Cache:time] key: ' + JSON.stringify(keyParts));
 */
export function cache<T extends Callback>(
  cb: T,
  keyParts: string[],
  options: { revalidate?: number | false; tags?: string[] } = {}
): T {

  const wrapper = async (...args: unknown[]) => {
    const timeLabel = '[Cache:time] key: ' + JSON.stringify(keyParts);
    console.time(timeLabel);
    console.log('[Cache] keyParts:', keyParts, 'Cache hit:', false);
    const resp = await cb(args);
    console.timeEnd(timeLabel);
    return resp;
  }

  return nextCache(reactCache(wrapper), keyParts, options) as T;
}

