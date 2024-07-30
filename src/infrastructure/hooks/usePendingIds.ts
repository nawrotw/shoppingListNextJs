'use client';

import { useRef, useCallback, useState } from "react";

export const usePendingIds = <T>() => {
  const [pendingIds, setPendingIds] = useState<Set<T>>(new Set());
  const timeoutRefs = useRef(new Map<T, number | undefined>());

  const addId = useCallback((id: T) => {
    // don't setPending for fast requests
    const timeout = setTimeout(() => {
      setPendingIds(ids => new Set(ids).add(id));
      timeoutRefs.current.set(id, undefined);
    }, 100) as unknown as number; // next.js see Node.js type here instated of browser :-(
    timeoutRefs.current.set(id, timeout);
  }, []);

  const removeId = useCallback((id: T) => {
    const timeout = timeoutRefs.current.get(id);
    timeoutRefs.current.set(id, undefined);
    timeout && clearTimeout(timeout);

    // start anti-blink timer, display pending for at lest 100 ms to prevent blinking
    setTimeout(() => {
      setPendingIds(ids => {
        const newIds = new Set(ids);
        newIds.delete(id);
        return newIds;
      });
    }, 100);
  }, []);

  const isPending = useCallback((id: T) => pendingIds.has(id), [pendingIds]);

  return {
    isPending,
    addId,
    removeId
  }
}
