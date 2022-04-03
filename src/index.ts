async function map<T, R>(array: T[], f: (value: T) => Promise<R>): Promise<R[]> {
  const result: R[] = [];
  for (const value of array) {
    result.push(await f(value));
  }
  return result;
}

type Wrapper<T> = {
  map: <R>(f: (value: T) => Promise<R>) => Promise<R[]>
}


function wrap<T>(array: T[]) {
  return {
    map: <R>(f: (value: T) => Promise<R>) => map(array, f)
  } as Wrapper<T>;
}
export { map, wrap };
