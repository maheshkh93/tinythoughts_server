import crypto from "crypto";

export function encryptString(string) {
  var hash = crypto.createHash("md5").update(string).digest("hex");
  return hash;
}
