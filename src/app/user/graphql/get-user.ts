import { gql } from 'apollo-angular';

export default gql`
  query getUser($id: Int!) {
    user(telegram_id: $id) {
      username
      full_name
      phone_number
      weight
      height
      birth_date
      Subscriptions {
        status
        start_date
        end_date
      }
    }
  }
`;
