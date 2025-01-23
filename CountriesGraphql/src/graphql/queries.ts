import {gql} from '@apollo/client';

export const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      code
      name
    }
  }
`;

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      emoji
    }
  }
`;

export const GET_COUNTRIES_BY_CONTINENT = gql`
  query GetCountriesByContinent($code: ID!) {
    continent(code: $code) {
      code
      name
      countries {
        code
        name
        emoji
      }
    }
  }
`;
