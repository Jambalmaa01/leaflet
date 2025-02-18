import { atomWithStorage } from "jotai/utils";

export const artistDrawerExpandedArom = atomWithStorage<{
  [key: string]: boolean;
}>("artistDrawerExpandedArom", {});
