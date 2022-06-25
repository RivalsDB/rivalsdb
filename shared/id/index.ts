import { customAlphabet } from "nanoid/async";

const alphabet =
  "23456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 15);

export async function generateId(): Promise<string> {
  return nanoid();
}
