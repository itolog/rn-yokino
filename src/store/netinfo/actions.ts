import { action, ActionType } from 'typesafe-actions';
import { NetInfoState } from '../../shared/interface/netStat';

export enum ActionTypes {
  GET_NET_INFO = 'GET_NET_INFO',
  GET_NET_INFO_FAILURE = 'GET_NET_INFO_FAILURE',
}

export const Actions = {
  getNetInfo: (payload: NetInfoState) =>
    action(ActionTypes.GET_NET_INFO, payload),
  getInfoFailure: (error: string) =>
    action(ActionTypes.GET_NET_INFO_FAILURE, error),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
