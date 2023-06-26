import assert from "assert";
import { parseNumberArray, processRow, splitRowProperties } from "./utils";

const inputs = [
  { input: [1, 2, 3, 4], expected: [2, 4, 1, 3], valid: true },
  { input: [-5], expected: [-5], valid: true },
  {
    input: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    expected: [2, 3, 6, 1, 5, 9, 4, 7, 8],
    valid: true,
  },
  { input: [], expected: [], valid: true },
  { input: [1, 2, 3], expected: [], valid: false },
  {
    input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    expected: [2, 3, 4, 8, 1, 7, 11, 12, 5, 6, 10, 16, 9, 13, 14, 15],
    valid: true,
  },
  {
    input: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25,
    ],
    expected: [
      2, 3, 4, 5, 10, 1, 8, 9, 14, 15, 6, 7, 13, 19, 20, 11, 12, 17, 18, 25, 16,
      21, 22, 23, 24,
    ],
    valid: true,
  },

  { input: [1, 2, 3, 4, 5, 6, 7], expected: [], valid: false },
  {
    input: [1, 2, 3, -4, -5, -6, 7, -8, 9],
    expected: [2, 3, -6, 1, -5, 9, -4, 7, -8],
    valid: true,
  },
];

const SPLIT_ROW_SUCCESS_MESSAGE =
  "\u2714 can split row properties properly" as const;
const PARSE_ARRAY_SUCCESS_MESSAGE =
  "\u2714 can parse array from string properly" as const;
const PROCESS_ROW_SUCCESS_MESSAGE = "\u2714 can process row properly" as const;

for (const [index, { input }] of inputs.entries()) {
  assert.deepStrictEqual(splitRowProperties(`${index + 1}, "[${input}]"`), {
    id: index + 1,
    arrayString: `"[${input}]"`,
  });
}
console.log(SPLIT_ROW_SUCCESS_MESSAGE);

for (const { input } of inputs) {
  assert.deepStrictEqual(parseNumberArray(`"[${input}]"`), input);
}
console.log(PARSE_ARRAY_SUCCESS_MESSAGE);

for (const [index, { input, expected, valid }] of inputs.entries()) {
  assert.deepStrictEqual(processRow(`${index + 1}, "[${input}]"`), {
    id: index + 1,
    json: expected,
    is_valid: valid,
  });
}
console.log(PROCESS_ROW_SUCCESS_MESSAGE);
