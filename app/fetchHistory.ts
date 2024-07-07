"use server";

export const fetchHistory = async (formData: FormData) => {
  const history: {
    IsRated: boolean;
    Place: number;
    OldRating: number;
    NewRating: number;
    Performance: number;
    InnerPerformance: number;
    ContestScreenName: string;
    ContestName: string;
    ContestNameEn: string;
    EndTime: string;
  }[] = await fetch(
    `https://atcoder.jp/users/${formData.get("username")}/history/json`
  ).then((res) => res.json());

  // data の "ContestScreenName" に "abc"　が含まれるものを抽出
  const abc = history.filter((d) => d.ContestScreenName.includes("abc"));
  // "arc" が入っているものを抽出
  const arc = history.filter((d) => d.ContestScreenName.includes("arc"));
  // "agc" が入っているものを抽出
  const agc = history.filter((d) => d.ContestScreenName.includes("agc"));
  // それ以外
  const other = history.filter(
    (d) =>
      !d.ContestScreenName.includes("abc") &&
      !d.ContestScreenName.includes("arc") &&
      !d.ContestScreenName.includes("agc")
  );

  // それぞれの newRating - oldRating の合計を計算
  const abcSum = abc.reduce(
    (acc, cur) => acc + (cur.NewRating - cur.OldRating),
    0
  );
  const arcSum = arc.reduce(
    (acc, cur) => acc + (cur.NewRating - cur.OldRating),
    0
  );
  const agcSum = agc.reduce(
    (acc, cur) => acc + (cur.NewRating - cur.OldRating),
    0
  );
  const otherSum = other.reduce(
    (acc, cur) => acc + (cur.NewRating - cur.OldRating),
    0
  );

  // それぞれの Performance の平均を計算
  const abcPerf =
    abc.reduce((acc, cur) => acc + cur.Performance, 0) / abc.length;
  const arcPerf =
    arc.reduce((acc, cur) => acc + cur.Performance, 0) / arc.length;
  const agcPerf =
    agc.reduce((acc, cur) => acc + cur.Performance, 0) / agc.length;
  const otherPerf =
    other.reduce((acc, cur) => acc + cur.Performance, 0) / other.length;

  // それぞれの最大値と最小値を計算
  const abcMax = Math.max(...abc.map((d) => d.Performance));
  const abcMin = Math.min(...abc.map((d) => d.Performance));
  const arcMax = Math.max(...arc.map((d) => d.Performance));
  const arcMin = Math.min(...arc.map((d) => d.Performance));
  const agcMax = Math.max(...agc.map((d) => d.Performance));
  const agcMin = Math.min(...agc.map((d) => d.Performance));
  const otherMax = Math.max(...other.map((d) => d.Performance));
  const otherMin = Math.min(...other.map((d) => d.Performance));

  return {
    abc: {
      length: abc.length,
      sum: abcSum,
      avg: abcPerf,
      max: abcMax,
      min: abcMin,
    },
    arc: {
      length: arc.length,
      sum: arcSum,
      avg: arcPerf,
      max: arcMax,
      min: arcMin,
    },
    agc: {
      length: agc.length,
      sum: agcSum,
      avg: agcPerf,
      max: agcMax,
      min: agcMin,
    },
    other: {
      length: other.length,
      sum: otherSum,
      avg: otherPerf,
      max: otherMax,
      min: otherMin,
    },
  };
};
