import {gql} from '@apollo/client';

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      emoji
    }
  }
`;

export const GET_COUNTRY_DETAIL = gql`
  query GetCountryDetail($code: ID!) {
    country(code: $code) {
      code
      name
      emoji
      capital
      currency
      languages {
        name
        native
      }
      continent {
        name
      }
      states {
        name
      }
      phone
      native
    }
  }
`;
