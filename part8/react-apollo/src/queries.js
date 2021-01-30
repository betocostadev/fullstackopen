import { gql  } from '@apollo/client'

// Person details is a fragment - FRAGMENTS are client side ONLY
// Person details will get the data of the Person query, and it will be used below for all persons
const PERSON_DETAILS = gql`
  fragment PersonDetails on Person {
    id
    name
    phone
    address {
      street
      city
    }
  }
`

export const ALL_PERSONS = gql`
  {
    allPersons  {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`

export const PERSON_ADDED = gql`
  subscription {
    personAdded {
      ...PersonDetails
    }
  }

${PERSON_DETAILS}
`

export const FIND_PERSON = gql`
query findPersonByName($nameToSearch: String!) {
  findPerson(name: $nameToSearch) {
    name
    phone
    id
    address {
      street
      city
    }
  }
}
`

export const CREATE_PERSON = gql`
mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
  addPerson(
    name: $name,
    street: $street,
    city: $city,
    phone: $phone
  ) {
    name
    phone
    id
    address {
      street
      city
    }
  }
}
`

export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone)  {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
