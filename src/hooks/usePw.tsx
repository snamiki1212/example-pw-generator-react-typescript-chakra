import React from "react";

// REF: https://en.wikipedia.org/wiki/List_of_Unicode_characters
const CHAR_CODE_OF_UPPER_A = 65;
const CHAR_CODE_OF_LOWER_A = 97;
const LENGTH_OF_ALPHABET = 26;
const generateAllAlphabets = ({ isUpper = false }) => {
  const CHAR_CODE_OF_A = isUpper ? CHAR_CODE_OF_UPPER_A : CHAR_CODE_OF_LOWER_A;
  return Array.from({ length: LENGTH_OF_ALPHABET }, (_v, idx) =>
    String.fromCharCode(CHAR_CODE_OF_A + idx)
  );
};

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_v, idx) => from + idx);

const SYMBOL_RANGE_LIST = [
  // REF: https://en.wikipedia.org/wiki/List_of_Unicode_characters
  [33, 47],
  [58, 64],
  [91, 96],
  [123, 126],
];
function generateSymbols() {
  return SYMBOL_RANGE_LIST.reduce(
    (prev, [from, to]) => [...prev, ...range(from, to)],
    []
  ).map((decimal) => String.fromCharCode(decimal));
}
const generateNumStrings = () =>
  Array.from({ length: 10 }, (_v, idx) => String(idx));

const LIST_OF_LOWER_CHAR = generateAllAlphabets({ isUpper: false });
const LIST_OF_UPPER_CHAR = generateAllAlphabets({ isUpper: true });
const LIST_OF_NUMBER = generateNumStrings();
const LIST_OF_SYMBOL = generateSymbols();

const getRandom = (list: unknown[]) => {
  return list[Math.floor(Math.random() * list.length)];
};

const generatePw = ({
  length = 32,
  shouldIncludeUpper,
  shouldIncludeNumber,
  shouldIncludeSymbol,
}: Option) => {
  const list = [...LIST_OF_LOWER_CHAR];
  if (shouldIncludeUpper) list.push(...LIST_OF_UPPER_CHAR);
  if (shouldIncludeNumber) list.push(...LIST_OF_NUMBER);
  if (shouldIncludeSymbol) list.push(...LIST_OF_SYMBOL);
  const pw = Array.from({ length }, () => getRandom(list)).join("");
  return pw;
};

const initialPw = generatePw({
  length: 32,
  shouldIncludeNumber: true,
  shouldIncludeSymbol: true,
  shouldIncludeUpper: true,
});

type Option = {
  length: number;
  shouldIncludeNumber: boolean;
  shouldIncludeSymbol: boolean;
  shouldIncludeUpper: boolean;
};

export const usePw = (option: Option) => {
  const [pw, setPw] = React.useState<string>(initialPw);
  const generate = React.useCallback(() => {
    const newPw = generatePw(option);
    setPw(newPw);
  }, [option]);

  return [pw, generate] as const;
};
