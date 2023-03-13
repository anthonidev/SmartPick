import jwt from "jsonwebtoken";

export namespace JwtUtils {
  export const isJwtExpired = (token: string) => {
    // offset by 60 seconds, so we will check if the token is "almost expired".
    const currentTime = Math.round(Date.now() / 1000 + 60);
    const decoded = jwt.decode(token);

    if (
      decoded !== null &&
      decoded !== undefined &&
      typeof decoded === "object"
    ) {
      if (decoded["exp"]) {
        const adjustedExpiry = decoded["exp"];

        if (adjustedExpiry < currentTime) {
          console.log("Token expired");
          return true;
        }

        console.log("Token has not expired yet");
        return false;
      }
    }

    console.log('Token["exp"] does not exist');
    return true;
  };
}

export namespace UrlUtils {
  export const makeUrl = (...endpoints: string[]) => {
    let url = endpoints.reduce((prevUrl, currentPath) => {
      if (prevUrl.length === 0) {
        return prevUrl + currentPath;
      }

      return prevUrl.endsWith("/")
        ? prevUrl + currentPath + "/"
        : prevUrl + "/" + currentPath + "/";
    }, "");
    return url;
  };
}
