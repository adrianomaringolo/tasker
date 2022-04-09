export const harperFetchJWTTokens = async (
  username: string,
  password: string
) => {
  const DB_URL = process.env.NEXT_PUBLIC_HARPERDB_URL;

  if (!DB_URL) {
    console.error("Error: DB_URL undefined");
    throw "Internal server error";
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    operation: "create_authentication_tokens",
    username: username,
    password: password,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(DB_URL, requestOptions);
  const result = await response.json();
  return { response, result };
};
