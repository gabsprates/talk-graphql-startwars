import React from "react";
import { Repository } from "../../types/api";
import { AddStar } from "../addStar";
import { RemoveStar } from "../removeStar";

type RepoInfoType = {
  data: Repository;
};

export const RepoInfo = (props: RepoInfoType) => (
  <div>
    <pre>{JSON.stringify(props.data, null, 4)}</pre>

    <AddStar id={props.data.id} />
    <RemoveStar id={props.data.id} />
  </div>
);
