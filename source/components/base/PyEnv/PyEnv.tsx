import propTypes from "prop-types";
import { DetailedHTMLProps, FC, HTMLAttributes, useMemo } from "react";
import ReactElementProps from "~types/ReactElementProps/ReactElementProps";

export type PyEnvProperties = Omit<
  ReactElementProps<
    DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
  >,
  "children"
> & {
  children: string | string[];
};

const PyEnv: FC<PyEnvProperties> = ({
  children,
  ...rest
}: PyEnvProperties): JSX.Element => {
  const fixedChildren: string = useMemo((): string => {
    return Array.isArray(children)
      ? children
          .map((element: string): string => {
            return `- ${element}`;
          })
          .join("\n")
      : children;
  }, [children]);
  return <py-env {...rest}>{fixedChildren}</py-env>;
};

PyEnv.propTypes = {
  children: propTypes.oneOfType([propTypes.string, propTypes.array]).isRequired,
};

export default PyEnv;
