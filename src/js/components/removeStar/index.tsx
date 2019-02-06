import React from "react";
import { Mutation } from "react-apollo";
import { REMOVE_STAR_MUTATION } from "../../mutations/removeStar.graphql";

export const RemoveStar = (props: { id: string }) => (
  <Mutation
    mutation={REMOVE_STAR_MUTATION}
    variables={{
      input: {
        starrableId: props.id,
        clientMutationId: ""
      }
    }}
  >
    {(removeStar, { loading, error }) => {
      if (loading) return "loading...";
      if (error) return "error...";

      const remove = () =>
        removeStar()
          .then(data => {
            alert("okay...");
          })
          .catch(e => {
            console.log(e);
          });

      return (
        <React.Fragment>
          <button onClick={remove}>unstarize it</button>
          {error && <pre>{JSON.stringify(error, null, 4)}</pre>}
        </React.Fragment>
      );
    }}
  </Mutation>
);
