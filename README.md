# Promise Serial

## Examples

```
const waitFor =
  async (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

const array = [5, 3, 1];
const result = await map(array, async (value, i) => {
  await waitFor(value * 100);
  return {v: value, i};
}); // => {v: 5, i: 0}, {v: 3, i: 1}, {v: 1, i: 2}

or 

const array = [5, 3, 1];
const wrapper = wrap(array);
const result = await wrapper.map(async (value, i) => {
  await waitFor(value * 100);
  return {v: value, i};
}); // => {v: 5, i: 0}, {v: 3, i: 1}, {v: 1, i: 2}
```



## Functions
```
async function map<T, R>(array: T[], f: (value: T, index?: number) => Promise<R>): Promise<R[]>
```

```
function wrap<T>(array: T[]): Wrapper
```

```
type Wrapper<T> = {
  map: <R>(f: (value: T, index?: number) => Promise<R>) => Promise<R[]>
}
```
