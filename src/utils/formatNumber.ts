import millify from "millify";

export const formatNumber = (value: number | string | null | undefined) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "0";
  }

  return millify(numericValue);
};
