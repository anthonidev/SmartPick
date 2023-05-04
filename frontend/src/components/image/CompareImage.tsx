import React from "react";
import ReactCompareImage from "react-compare-image";
import Image from "next/image";
type Props = {
  image1: string;
  image2: string;
};

const CompareImage = (props: Props) => {
  return (
    <div className="  flex  " style={{ height: "500px" }}>
      <ReactCompareImage
        leftImage={props.image1}
        rightImage={props.image2}
        handleSize={50}
        sliderLineWidth={5}
        sliderLineColor="#808080"
        sliderPositionPercentage={0.1}
        leftImageAlt="Original Image"
        rightImageAlt="Remove background Image"
        aspectRatio="wider"
        leftImageCss={{ height: "500px", objectFit: "contain", width: "100%" }}
        rightImageCss={{ height: "500px", objectFit: "contain", width: "100%" }}
        // height={500}
      />
    </div>
  );
};

export default CompareImage;
