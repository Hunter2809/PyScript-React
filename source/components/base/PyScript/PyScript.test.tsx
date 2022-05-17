import PyScriptProvider from "~components/base/PyScriptProvider/PyScriptProvider";
import PyScript from "~components/base/PyScript/PyScript";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

describe("PyScript", () => {
  it("Renders component properly", async (): Promise<void> => {
    const { container } = render(
      <PyScriptProvider>
        <PyScript>print("Hello world!")</PyScript>
      </PyScriptProvider>,
    );
    expect(container).toMatchSnapshot();
  });
  it("Renders component properly with PyEnv", async (): Promise<void> => {
    const { container } = render(
      <PyScriptProvider>
        <PyScript pyEnvContent={["numba"]}>
          {`
from numba import jit
@jit(nopython=True) 
def example():
  print("Hello world!") 
          `}
        </PyScript>
      </PyScriptProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
