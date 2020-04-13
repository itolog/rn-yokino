import { NetInfoStateType } from '@react-native-community/netinfo';

export interface NetInfoState {
  type?: NetInfoStateType | null | undefined;
  isConnected?: boolean | null | undefined;
  isInternetReachable?: boolean | null | undefined;
  details?: {
    subnet?: string | null | undefined;
    isConnectionExpensive?: boolean | null | undefined;
    ssid?: string | null | undefined;
    strength?: number | null | undefined;
    ipAddress?: string | null | undefined;
  };
}
