import React from "react";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { ApolloProvider, Query } from "react-apollo";
import Menu from "../menu";
import { ApolloLink, Operation, NextLink, from } from "apollo-link";

import { REPOSITORY_QUERY } from "../../queries/repository.graphql";

type globalSettings = any;

type StateType = {
  repo: string;
};
export class App extends React.Component<{}, StateType> {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(props: {}) {
    super(props);

    this.state = {
      repo: ""
    };

    const cache = new InMemoryCache();
    const httpLink = new HttpLink({
      uri: "https://api.github.com/graphql",
      fetchOptions: { method: "POST" }
    });

    const midd = new ApolloLink((operation: Operation, forward: NextLink) => {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${(window as any).globalSettings.APITOKEN}`
        }
      });

      return forward(operation);
    });

    this.client = new ApolloClient({
      link: from([midd, httpLink]),
      cache: cache
    });
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        <table className="table">
          <thead>
            <tr>
              <th colSpan={2}>
                <h1>GitHub - gabsprates</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Menu onClick={(repo: string) => this.setState({ repo })} />
              </td>
              <td className="description">
                {this.state.repo && (
                  <Query
                    query={REPOSITORY_QUERY}
                    variables={{ name: this.state.repo }}
                  >
                    {({ data, loading, error }) => {
                      if (loading) return "loading...";
                      if (error) return "error...";

                      return <pre>{JSON.stringify(data, null, 4)}</pre>;
                    }}
                  </Query>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </ApolloProvider>
    );
  }
}
