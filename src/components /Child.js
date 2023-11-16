import React from "react";

function Child(props) {
  const child = "child hun mein";

  props.func(child);

  return <div>Child {props.message}</div>;
}

export default Child;
