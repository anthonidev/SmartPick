import cn from "classnames";
import { IconType } from "react-icons";

interface Props {
  typeButton: "action" | "reset" | "submit" | "button";
  children: React.ReactNode;
  [rest: string]: any;
  Icon: IconType;
}

export default function Button({ typeButton, Icon, children, ...rest }: Props) {
  const className = cn("  text-white py-2 px-4 rounded", {
    "bg-green-700 hover:bg-green-800 ": typeButton === "action",
    "bg-blue-700 hover:bg-blue-800": typeButton === "reset",
  });

  return (
    <button className={className} {...rest}>
      <span className="flex justify-start items-center">
        <Icon className="mr-2 text-white" />
        {children}
      </span>
    </button>
  );
}
