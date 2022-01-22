import { customAlphabet } from "nanoid/async";

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 15);

export async function generateId(): Promise<string> {
  return nanoid();
}
