import React from "react";
import { Mutation } from "react-apollo";
import { ADD_STAR_MUTATION } from "../../mutations/addStar.graphql";

export const AddStar = (props: { id: string }) => (
  <Mutation mutation={ADD_STAR_MUTATION}>
    {(addStar, { loading, error }) => {
      if (loading) return "loading...";
      if (error) return "error...";

      const add = () =>
        addStar({
          variables: {
            input: {
              starrableId: props.id,
              clientMutationId: ""
            }
          }
        })
          .then(() => {
            alert("obrigado!");
          })
          .catch(e => {
            console.log(e);
          });

      return (
        <React.Fragment>
          <button onClick={add}>starize it</button>
          {error && <pre>{JSON.stringify(error, null, 4)}</pre>}
        </React.Fragment>
      );
    }}
  </Mutation>
);
