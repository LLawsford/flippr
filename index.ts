import { copyFileWithBufferLimit } from "./utils";

copyFileWithBufferLimit(process.argv.slice(2)[0]);
