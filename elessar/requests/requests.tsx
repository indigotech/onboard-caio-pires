import {AsyncStorage} from 'react-native';
import gql from 'graphql-tag';
import {HttpLink} from 'apollo-link-http';
import {ApolloLink, concat} from 'apollo-link';
import {retrieveData} from '../pages/Login/store';
import {ApolloClient, InMemoryCache} from 'apollo-boost';

const httpLink = new HttpLink({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
});

async function updateApolloContext() {
  const token = await retrieveData('token');
  const authLink = new ApolloLink((operation, forward) => {
    console.log(token);
    operation.setContext({
      headers: {
        authorization: token ? `${token}` : '',
      },
    });
    // Call the next link in the middleware chain.
    return forward(operation);
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink), // Chain it with the HttpLink
    cache: new InMemoryCache(),
  });

  return client;
}

export async function getToken(email: string, password: string) {
  let result;
  const client = await updateApolloContext();
  result = await client.mutate({
    variables: {data: {email: email, password: password}},
    mutation: gql`
      mutation Login($data: LoginInputType!) {
        login(data: $data) {
          user {
            id
          }
          token
        }
      }
    `,
  });

  return result;
}

export async function addUser(userInfo: any) {
  let result;
  const client = await updateApolloContext();
  result = await client.mutate({
    variables: {
      data: {
        name: userInfo.name,
        phone: userInfo.phone,
        role: userInfo.role,
        email: userInfo.email,
        birthDate: userInfo.date,
        password: userInfo.password,
      },
    },
    mutation: gql`
      mutation createUser($data: UserInputType!) {
        createUser(data: $data) {
          name
        }
      }
    `,
  });

  return result;
}

export async function getUsers(offset: number, limit: number) {
  let result;
  const client = await updateApolloContext();
  result = (await client).query({
    variables: {pageInfo: {offset: offset, limit: limit}},
    query: gql`
      query Users($pageInfo: PageInputType!) {
        users(pageInfo: $pageInfo) {
          nodes {
            id
            name
            phone
            email
          }
          count
          pageInfo {
            hasPreviousPage
            hasNextPage
          }
        }
      }
    `,
  });
  return result;
}

export async function getUser(id: number) {
  let result;
  const client = await updateApolloContext();
  result = (await client).query({
    variables: {id: id},
    query: gql`
      query User($id: ID!) {
        user(id: $id) {
          name
          email
          role
          birthDate
          phone
        }
      }
    `,
  });

  return result;
}
