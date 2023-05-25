import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
type Props = {
  image1: string;
  image2: string;
};

const CompareImage = ({ image1, image2 }: Props) => {
  return (
    <>
      <ReactCompareSlider
        style={{
          height: "600px",
          width: "100%",
        }}
        itemOne={
          <ReactCompareSliderImage
            src={image1}
            srcSet={image1}
            alt="Image one"
            style={{ objectFit: "contain" }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={image2}
            srcSet={image2}
            alt="Image two"
            style={{ objectFit: "contain" }}
          />
        }
      />
    </>
  );
};

export default CompareImage;
