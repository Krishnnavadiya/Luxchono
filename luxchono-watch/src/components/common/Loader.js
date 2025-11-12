import React from "react";
import { ColorRing } from "react-loader-spinner";

export default function Loader({ height, width }) {
  return (
    <ColorRing
      visible={true}
      height={height || "60"}
      width={width || "60"}
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#964315", "#964315", "#964315", "#964315", "#964315"]}
    />
  );
}
