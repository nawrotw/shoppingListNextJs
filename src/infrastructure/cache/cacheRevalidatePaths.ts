import { revalidatePath } from "next/cache";

export type PathType = string | ((id: number) => string);

const isPathFunction = (path: PathType): path is ((id: number) => string) => {
  return typeof path === 'function';
}

export const cacheRevalidatePaths = (paths: PathType[], id?: number) => {
  const revalidatedPaths: Array<string> = [];
  paths.forEach(pathWithId => {

    if (!id && isPathFunction(pathWithId)) {
      // we have path function for given id, but no id is present
      // nothing to revalidate - just return
      return;
    }

    const path = isPathFunction(pathWithId) ? (id ? pathWithId(id) : '') : pathWithId;

    revalidatedPaths.push(path);
    revalidatePath(path);
    // revalidateTag(path);
  });

  console.log('revalidatedPaths: ', revalidatedPaths);
}
