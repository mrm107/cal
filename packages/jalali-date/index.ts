export const gregorianToJalali = (gy: number, gm: number, gd: number): [number, number, number] => {
  const g_d_m: number[] = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let jy: number = gy <= 1600 ? 0 : 979;
  gy -= gy <= 1600 ? 621 : 1600;
  const gy2: number = gm > 2 ? gy + 1 : gy;
  let days: number =
    365 * gy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400);

  for (let i = 0; i < gm; i++) {
    days += g_d_m[i];
  }
  days += gd - 1;

  let jy2: number = jy <= 979 ? days - 79 : days - 1029983;
  const j_np: number = Math.floor(jy2 / 12053);
  jy2 = jy2 % 12053;
  jy += 33 * j_np + 4 * Math.floor(jy2 / 1461);
  jy2 %= 1461;

  if (jy2 >= 366) {
    jy += Math.floor((jy2 - 1) / 365);
    jy2 = (jy2 - 1) % 365;
  }

  const jm: number = jy2 < 186 ? 1 + Math.floor(jy2 / 31) : 7 + Math.floor((jy2 - 186) / 30);
  const jd: number = 1 + (jy2 < 186 ? jy2 % 31 : (jy2 - 186) % 30);

  return [jy, jm, jd];
};
