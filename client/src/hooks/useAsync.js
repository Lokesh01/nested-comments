import { useCallback, useEffect, useState } from "react";

// * will run automatically
export function useAsync(func, dependencies = []) {
  const { execute, ...state } = useAsyncInternal(func, dependencies, true); // initialLoading will be true bcoz it gets executed immediately

  useEffect(() => {
    execute();
  }, [execute]); // * everytine out data changes execute func will also change and useEffect will run automatically

  return state;
}

// * will return a new function to be called whenever we want
export function useAsyncFn(func, dependencies = []) {
  return useAsyncInternal(func, dependencies, false);
}

function useAsyncInternal(func, dependencies, initialLoading = false) {
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState();
  const [value, setValue] = useState();

  const execute = useCallback((...params) => {
    setLoading(true); // posts are loading
    return func(...params)
      .then((data) => {
        setValue(data);
        setError(undefined); // since we successfully got the data
        return data;
      })
      .catch((err) => {
        setValue(undefined);
        setError(err);
        return Promise.reject(err);
      })
      .finally(() => setLoading(false)); // loading is complete
  }, dependencies);

  return { loading, error, value, execute };
}
