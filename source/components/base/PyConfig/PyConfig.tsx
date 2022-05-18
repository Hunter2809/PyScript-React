import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import ReactElementProps from "~types/ReactElementProps/ReactElementProps";

type PyConfigProperties = Omit<
  ReactElementProps<
    DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
  >,
  "children"
> & {
  children: string;
};

const PyConfig: FC<PyConfigProperties> = ({
  children,
  ...rest
}: PyConfigProperties): JSX.Element => {
  return <py-config {...rest}>{children}</py-config>;
};

export default PyConfig;
