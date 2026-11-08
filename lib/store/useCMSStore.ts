"use client";

import { useSyncExternalStore } from "react";
import { cmsStore, CMSState } from "./cmsStore";

export function useCMSStore(): CMSState {
  return useSyncExternalStore(
    cmsStore.subscribe,
    cmsStore.getSnapshot,
    cmsStore.getServerSnapshot
  );
}

export { cmsStore };
export type { CMSState };
