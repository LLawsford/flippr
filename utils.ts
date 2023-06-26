import { ArrayFlipper } from "./ArrayFlipper";
import { createReadStream } from "fs";
import { ResultRow } from "./types";

export function parseNumberArray(stringArray: string): number[] {
  // in case of empty array (quotes + square brackets)
  if (stringArray.trim().length === 4) {
    return [];
  }

  return stringArray
    .substring(2, stringArray.length - 2)
    .split(",")
    .map((n) => Number(n));
}

export function splitRowProperties(row: string): {
  id: number;
  arrayString: string;
} {
  const firstCommaIndex = row.indexOf(",");

  const id = Number(row.slice(0, firstCommaIndex).trim());
  const arrayString = row.slice(firstCommaIndex + 1).trim();

  return { id, arrayString };
}

export function processRow(row: string): ResultRow {
  const { id, arrayString } = splitRowProperties(row);
  const parsedArray = parseNumberArray(arrayString);

  try {
    const flipper = new ArrayFlipper(parsedArray);
    return {
      id,
      // assuming that [] is considered proper and valid input
      json: parsedArray.length > 1 ? flipper.rotateArray() : parsedArray,
      is_valid: true,
    };
  } catch (_) {
    return { id, json: [], is_valid: false };
  }
}

export function logResult(array: ResultRow[]): void {
  array.forEach((element) => {
    console.log(
      `${element.id}, "[${element.json.toString()}]", ${element.is_valid}`
    );
  });
}

export function copyFileWithBufferLimit(
  sourcePath: string,
  bufferLimit: number = 16 * 1024
): Promise<void> {
  return new Promise((_, reject) => {
    const readStream = createReadStream(sourcePath, {
      highWaterMark: bufferLimit,
    });
    console.log("id, json, is_valid");

    let remainingData = "";
    let isFirstLine = true;

    readStream.on("data", (chunk: Buffer) => {
      const combinedData = remainingData + chunk.toString();
      const rows = combinedData.split("\n");

      // Process complete rows skipping headear row
      const chunkProcessed = rows
        .slice(isFirstLine ? 1 : 0, -1)
        .map(processRow);

      logResult(chunkProcessed);

      if (isFirstLine) {
        isFirstLine = false;
      }

      // Store remaining bytes for the next chunk
      remainingData = rows[rows.length - 1];
    });

    readStream.on("end", () => {
      process.exit();
    });

    readStream.on("error", (error) => {
      reject(error);
    });
  });
}
