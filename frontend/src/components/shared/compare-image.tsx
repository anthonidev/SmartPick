import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
type Props = {
  image1: string;
  image2: string;
};

const CompareImage = (props: Props) => {
  return (
    <>
      <ReactCompareSlider
        style={{
          height: "600px",
          width: "100%",
        }}
        itemOne={
          <ReactCompareSliderImage
            src={props.image1}
            srcSet={props.image1}
            alt="Image one"
            style={{ objectFit: "contain" }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={props.image2}
            srcSet={props.image2}
            alt="Image two"
            style={{ objectFit: "contain" }}
          />
        }
      />
    </>
  );
};

export default CompareImage;
