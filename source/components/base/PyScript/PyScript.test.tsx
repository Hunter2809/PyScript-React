import { cleanup, render, RenderResult } from "@testing-library/react";
import { FC } from "react";
import { expectType } from "tsd";
import PyScript, {
  PyScriptProperties,
} from "~components/base/PyScript/PyScript";
import PyScriptProvider from "~components/base/PyScriptProvider/PyScriptProvider";

afterEach(cleanup);

const PyScriptHelloWorldComponent: FC = (): JSX.Element => {
  return (
    <PyScriptProvider>
      <PyScript data-testid="py-script">print("Hello world!")</PyScript>
    </PyScriptProvider>
  );
};
const PyScriptFoliumMapComponent: FC = (): JSX.Element => {
  return (
    <PyScriptProvider>
      <PyScript output="folium" generateOutputTag pyEnvContent={["folium"]}>
        {`
from folium import Map
variable = Map(location=[45.5236, -122.6750])
variable
`}
      </PyScript>
    </PyScriptProvider>
  );
};

describe("PyScript", (): void => {
  it("Renders component properly", async (): Promise<void> => {
    const { container }: RenderResult = render(<PyScriptHelloWorldComponent />);
    expect(container).toMatchSnapshot();
  });
  it("Compile component with Python properly", (): void => {
    const { getByTestId, debug }: RenderResult = render(
      <PyScriptHelloWorldComponent />,
    );
    const pyScript: HTMLElement = getByTestId("py-script");
    setTimeout((): void => {
      debug();
      expect(pyScript).toContainEqual("Hello world!");
    }, 5_000);
  });
  it("Renders component properly with all props", async (): Promise<void> => {
    const { container }: RenderResult = render(<PyScriptFoliumMapComponent />);
    expect(container).toMatchSnapshot();
  });
  it("Has correct type", (): void => {
    expectType<FC<PyScriptProperties>>(PyScript);
  });
});
