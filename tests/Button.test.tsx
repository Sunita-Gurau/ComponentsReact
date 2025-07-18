import React from "react";
import { render } from "@testing-library/react";
import { Button, PlusIcon } from "../src/components/Button";

describe("Button color prop", () => {
  it("applies blue color classes by default", () => {
    const { getByRole } = render(<Button>Default</Button>);
    const btn = getByRole("button");
    expect(btn.className).toMatch(/bg-blue-500/);
    expect(btn.className).toMatch(/text-white/);
  });

  it("applies red color classes for filled", () => {
    const { getByRole } = render(<Button color="red">Red</Button>);
    const btn = getByRole("button");
    expect(btn.className).toMatch(/bg-red-500/);
    expect(btn.className).toMatch(/text-white/);
  });

  it("applies green color classes for outlined", () => {
    const { getByRole } = render(<Button color="green" variant="outlined">Green</Button>);
    const btn = getByRole("button");
    expect(btn.className).toMatch(/border-green-500/);
    expect(btn.className).toMatch(/text-green-500/);
  });

  it("applies yellow color classes for ghost", () => {
    const { getByRole } = render(<Button color="yellow" variant="ghost">Yellow</Button>);
    const btn = getByRole("button");
    expect(btn.className).toMatch(/text-yellow-500/);
  });
}); 