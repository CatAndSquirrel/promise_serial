async function map<T, R>(array: T[], f: (value: T, index?: number) => Promise<R>): Promise<R[]> {
  const result: R[] = [];
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    result.push(await f(value, i));
  }
  return result;
}

async function flatMap<T, R>(
    array: T[],
    f: (value: T, index?: number) => Promise<R[]>): Promise<R[]> {
  const result: R[] = [];
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    const subResult = await f(value, i);
    result.push(...subResult);
  }
  return result;
}

type Wrapper<T> = {
  map: <R>(f: (value: T, index?: number) => Promise<R>) => Promise<R[]>
  flatMap: <R>(f: (value: T, index?: number) => Promise<R[]>) => Promise<R[]>
}


function wrap<T>(array: T[]) {
  return {
    map: <R>(f: (value: T, index?: number) => Promise<R>) => map(array, f),
    flatMap: <R>(f: (value: T, index?: number) => Promise<R[]>) => flatMap(array, f)
  } as Wrapper<T>;
}
export { map, flatMap, wrap };
