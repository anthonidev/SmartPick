import React from "react";
import SkeletonMain from "./skeleton";

type Props = {};

const SkeletonMainGrid = (props: Props) => {
  return (
    <div className="grid  grid-cols-1  sm:grid-cols-2 md:grid-cols-4 w-full gap-5">
      <SkeletonMain />
      <SkeletonMain />
      <SkeletonMain />
      <SkeletonMain />
      <SkeletonMain />
      <SkeletonMain />
      <SkeletonMain />
      <SkeletonMain />
    </div>
  );
};

export default SkeletonMainGrid;
