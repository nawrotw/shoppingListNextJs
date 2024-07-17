import { unstable_cache as nextCache } from "next/cache"
import { cache as reactCache } from "react"

// TODO wkn implement/polish cache for Next 15
export type KeyParts = 'shoppingLists';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => Promise<any>

export function cache<T extends Callback>(
  cb: T,
  keyParts: KeyParts[] | string[],
  options: { revalidate?: number | false; tags?: string[] } = {}
) {
  return nextCache(reactCache(cb), keyParts, options);
}

