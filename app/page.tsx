"use client";

import { useState } from "react";
import { fetchHistory } from "./fetchHistory";
import { css } from "@/styled-system/css";

const contests = ["abc", "arc", "agc"] as const;
type ContestKind = (typeof contests)[number];
type ContestOrOther = ContestKind | "other";

type ContestResult = {
  max: number;
  min: number;
  avg: number;
  length: number;
  sum: number;
};

export default function Home() {
  const [result, setResult] = useState<
    | ({
        [key in ContestKind]: ContestResult;
      } & { other: ContestResult })
    | null
  >(null);

  return (
    <div
      className={css({
        p: 5,
        maxW: "3xl",
        mx: "auto",
        display: "grid",
        gap: 4,
      })}
    >
      <div>
        <h1
          className={css({
            fontSize: "lg",
            fontWeight: "bold",
          })}
        >
          📈 Contest Analyzer
        </h1>
        <p>
          AtCoderのユーザ名から、コンテスト種別ごとのパフォーマンスの分析をします。
        </p>
      </div>

      <form
        action={async (formData) => {
          const result = await fetchHistory(formData);
          setResult(result);
        }}
      >
        <label
          className={css({
            fontWeight: "bold",
            fontSize: "sm",
            color: "gray.500",
          })}
        >
          AtCoderのユーザ名
        </label>
        <div
          className={css({
            display: "flex",
            rounded: "sm",
            overflow: "hidden",
          })}
        >
          <input
            placeholder="abap"
            name="username"
            className={css({
              border: "2px solid token(colors.gray.200)",
              p: 2,
              flexGrow: 1,
            })}
          />
          <button
            className={css({
              py: 1,
              px: 4,
              bg: "teal.500",
              color: "white",
              fontWeight: "bold",
            })}
          >
            送信
          </button>
        </div>
      </form>
      {result === null ? (
        <div></div>
      ) : (
        <table
          className={css({
            borderSpacing: "2",
            border: "2px solid token(colors.gray.200)",
            borderCollapse: "collapse",
            "& th, & td": {
              border: "2px solid token(colors.gray.200)",
              padding: 1,
            },
          })}
        >
          <thead
            className={css({
              "& th": {
                bg: "teal.500",
                color: "white",
              },
            })}
          >
            <tr>
              <th>コンテスト</th>
              <th>回数</th>
              <th>Rating変動の和</th>
              <th>平均パフォーマンス</th>
              <th>最大パフォーマンス</th>
              <th>最小パフォーマンス</th>
            </tr>
          </thead>
          <tbody>
            {result &&
              ([...contests, "other"] as ContestOrOther[]).map((key) => {
                return (
                  <tr key={key}>
                    <td>{key === "other" ? "その他" : key.toUpperCase()}</td>
                    <td>{result[key].length}</td>
                    <td>{result[key].sum}</td>
                    {result[key].length === 0 ? (
                      <>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                      </>
                    ) : (
                      <>
                        <td>{result[key].avg.toFixed(1)}</td>
                        <td>{result[key].max}</td>
                        <td>{result[key].min}</td>
                      </>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
}
