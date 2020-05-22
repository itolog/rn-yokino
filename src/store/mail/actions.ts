import { action, ActionType } from 'typesafe-actions';

export enum ActionTypes {
  SEND_MAIL = 'SET_USER',
  SEND_MAIL_SUCCESS = 'SEN_MAIL_SUCCESS',
  SEND_MAIL_FAILURE = 'SEN_MAIL_FAILURE',

  SEND_MAIL_RESET = 'SEND_MAIL_RESET',
}

export const Actions = {
  sendMail: () => action(ActionTypes.SEND_MAIL),
  sendMailSuccess: (payload: string) =>
    action(ActionTypes.SEND_MAIL_SUCCESS, payload),
  sendMailFailure: (error: any) => action(ActionTypes.SEND_MAIL_FAILURE, error),

  sendReset: () => action(ActionTypes.SEND_MAIL_RESET),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
