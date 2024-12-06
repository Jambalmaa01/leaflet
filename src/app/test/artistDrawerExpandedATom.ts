import { atomWithStorage } from 'jotai/utils';
import { boolean } from 'zod';

export const artistDrawerExpandedArom = atomWithStorage<{
  [key: string]: boolean;
}>('artistDrawerExpandedArom', {});
