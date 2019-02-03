import React from "react";
import gql from "graphql-tag";
import { User, Repository, RepositoryEdge } from "../../types/api";
import { Query } from "react-apollo";
import { USER_QUERY } from "../../queries/user.graphql";

type MenuType = {
  onClick: (repo: string) => void;
  repositories: RepositoryEdge[];
};

const Menu = (props: MenuType) => (
  <ul className="menu">
    {props.repositories.map(repo => {
      return (
        <li key={repo.node!.id} onClick={() => props.onClick(repo.node!.name)}>
          {repo.node!.name}
        </li>
      );
    })}
  </ul>
);

export default (props: { onClick: (repo: string) => void }) => (
  <Query query={USER_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return "loading...";
      if (error) return "error...";

      return <Menu {...props} repositories={data.user.repositories.edges} />;
    }}
  </Query>
);
