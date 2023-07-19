import ReactLoading from "react-loading";
type Props = {
  type:
    | "spin"
    | "bars"
    | "bubbles"
    | "cubes"
    | "cylon"
    | "spin"
    | "spinningBubbles"
    | "spokes";
  color: string;
};

const ArrowLoading = ({ type, color }: Props) => {
  return (
    <div className="flex flex-col space-y-5 justify-center items-center">
      <ReactLoading
        type={type}
        color={color}
        height={"100px"}
        width={"100px"}
      />
      <span className="text-blue-700 font-bold">Procesando...</span>
    </div>
  );
};

export default ArrowLoading;
