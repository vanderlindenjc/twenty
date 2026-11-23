import { createAtomFamilyState } from '@/ui/utilities/state/jotai/utils/createAtomFamilyState';
import { type IframeMediaPermission } from 'twenty-shared/types';

// Keyed by media access owner id so the approval survives remounts (record
// navigation, tab switches) and reloads for the browser session.
export const activatedIframeMediaPermissionFamilyState = createAtomFamilyState<
  IframeMediaPermission | null,
  string
>({
  key: 'activatedIframeMediaPermissionFamilyState',
  defaultValue: null,
  useSessionStorage: true,
});
