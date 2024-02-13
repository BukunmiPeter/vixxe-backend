import jwt from "jsonwebtoken";
import config from "config";
const secretKey =config.get<string>("secretKey");
const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, secretKey, {
    ...(options && options),
    // algorithm: "RS256", 
  });
}

export function verifyJwt(token: string) {
  if (!token) {
    console.error('Token is undefined or null');
    return {
      valid: false,
      expired: false,
      decoded: null,
    };
  }
  try {

    const decoded = jwt.verify(token, secretKey
      );
    
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
