import { revalidatePath } from "next/cache";

export const cacheRevalidatePaths = (paths: string[], id?: number) => {
  const revalidatedPaths: Array<string> = [];
  paths.forEach(pathWithId => {
    if (!id && pathWithId.match(':id')) {
      return;
    }
    const path = id ? pathWithId.replace(':id', String(id)) : pathWithId;

    revalidatedPaths.push(path);
    revalidatePath(path);
    // revalidateTag(path);
  });

  console.log('revalidatedPaths: ', revalidatedPaths);
}
