import React from "react";
import ReactCompareImage from "react-compare-image";
import Image from "next/image";
type Props = {
  image1: string;
  image2: string;
};

const CompareImage = (props: Props) => {
  return (
    <div className="mt-10 ">
      <ReactCompareImage leftImage={props.image1} rightImage={props.image2} />;
    </div>
  );
};

export default CompareImage;
