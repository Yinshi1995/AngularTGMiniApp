import { gql } from 'apollo-angular';

export default gql`
  query getSubUserId($id: Int!) {
    subscriptionByUserId(user_id: $id) {
      active {
        start_date
        end_date
        status
      }
      inactive {
        start_date
        end_date
        status
      }
    }
  }
`;
