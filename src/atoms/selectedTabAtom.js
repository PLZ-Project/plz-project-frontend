import { atomWithStorage } from 'jotai/utils';

export const selectedTabAtom = atomWithStorage('selectedTab', 'article');
