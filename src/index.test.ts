import {map, wrap} from './index'

const waitFor =
  async (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

describe("Promise serial", () => {
  it("should map array sequentially", async () => {
    const array = [5, 3, 1];
    const result = await map(array, async (value) => {
      await waitFor(value * 100);
      return value;
    });
    expect(result).toEqual([5, 3, 1]);
  })
  it("should map array with wrapper sequentially", async () => {
    const array = [5, 3, 1];
    const wrapper = wrap(array);
    const result = await wrapper.map(async (value) => {
      await waitFor(value * 100);
      return value;
    });
    expect(result).toEqual([5, 3, 1]);
  })
});
