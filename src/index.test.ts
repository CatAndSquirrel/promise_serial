import {map, wrap} from './index'

const waitFor =
  async (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

describe("Promise serial", () => {
  it("should map array sequentially", async () => {
    const array = [5, 3, 1];
    const result = await map(array, async (value, i) => {
      await waitFor(value * 100);
      return {v: value, i};
    });
    expect(result).toEqual([
      {v: 5, i: 0}, {v: 3, i: 1}, {v: 1, i: 2}
    ]);
  })
  it("should map array with wrapper sequentially", async () => {
    const array = [5, 3, 1];
    const wrapper = wrap(array);
    const result = await wrapper.map(async (value, i) => {
      await waitFor(value * 100);
      return {v: value, i};
    });
    expect(result).toEqual([
      {v: 5, i: 0}, {v: 3, i: 1}, {v: 1, i: 2}
    ]);
  })
  it("should map array sequentially (without index)", async () => {
    const array = [5, 3, 1];
    const result = await map(array, async (value) => {
      await waitFor(value * 100);
      return {v: value};
    });
    expect(result).toEqual([
      {v: 5}, {v: 3}, {v: 1}
    ]);
  })
  it("should map array with wrapper sequentially (without index)", async () => {
    const array = [5, 3, 1];
    const wrapper = wrap(array);
    const result = await wrapper.map(async (value) => {
      await waitFor(value * 100);
      return {v: value};
    });
    expect(result).toEqual([
      {v: 5}, {v: 3}, {v: 1}
    ]);
  })
});
