import { gql } from 'apollo-boost';

export const SEND_MAIL = gql`
  mutation createUser($input: MailInput!) {
    sendEmail(data: $input) {
      accepted
      envelope {
        from
        to
      }
      envelopeTime
      messageId
      messageSize
      messageTime
      response
    }
  }
`;
