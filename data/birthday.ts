import { lgamma } from "https://esm.sh/mathjs@11.0.0";

export function qbirthday(
  prob: number,
  classes: number,
  coincident: number
): number {
  if (prob <= 0) {
    return 1;
  } else if (prob >= 1) {
    return classes * (coincident - 1) + 1;
  }

  const k = coincident;
  const c = classes;
  const p = prob;

  let N = Math.ceil(
    Math.exp(
      ((k - 1) * Math.log(c) + lgamma(k + 1) + Math.log(-Math.log1p(-p))) / k
    )
  );

  const pn = pbirthday(N, c, k);
  if (pn < prob) {
    while (pbirthday(N, c, k) < prob) {
      N++;
    }
  } else if (pn >= prob) {
    while (pbirthday(N, c, k) >= prob) {
      N--;
    }
  }
  return N;
}

export function pbirthday(
  n: number,
  classes: number,
  conincident: number
): number {
  const k = conincident;
  const c = classes;
  if (k < 2) {
    return 1;
  } else if (k > n) {
    return 0;
  } else if (n > c * (k - 1)) {
    return 1;
  }
  const lhs =
    ((n * Math.exp(-n / (c * k))) / (1 - n / (c * (k + 1)))) ^ (1 / k);
  console.log(lhs);
  const lxx = k * Math.log(lhs) - (k - 1) * Math.log(c) - lgamma(k + 1);
  return -Math.expm1(-Math.exp(lxx));
}
