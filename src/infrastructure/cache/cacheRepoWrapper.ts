import { cache } from "@/infrastructure/cache/cache";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RepoFn = (...args: any[]) => Promise<any>;

export const cacheRepoWrapper = <T extends Record<string, RepoFn>>(cacheKeys: Record<string, string>, repo: T) => {
  return Object
    .entries(repo)
    .reduce((obj, [key, fn]) => {
      obj[key] = cache(fn, [cacheKeys[key]]);
      return obj;
    }, {} as Record<string, RepoFn>) as T
}
