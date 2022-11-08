import qs from "query-string";

type AllowedSearchParams = {
  [x: string]: string | string[] | null;
};

export default function useSearchParams(): AllowedSearchParams {
  const parsed = qs.parse(window.location.search);
  const allowedParams = ["target", "house"];

  const filteredParams = Object.entries(parsed).reduce<AllowedSearchParams>(
    (acc, [key, value]) => {
      if (allowedParams.includes(key)) {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );

  return filteredParams;
}
