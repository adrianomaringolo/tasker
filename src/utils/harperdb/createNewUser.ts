export const harperCreateNewUser = async (
  username: string,
  password: string
) => {
  const DB_PW = process.env.HARPERDB_PW;
  const DB_URL = process.env.NEXT_PUBLIC_HARPERDB_URL || "";

  if (!DB_URL || !DB_PW) {
    console.error("Error: .env variables are undefined");
    throw "Internal server error";
  }
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Basic ${DB_PW}`);

  const raw = JSON.stringify({
    operation: "add_user",
    role: "standard_user",
    username: username.toLowerCase(),
    password: password,
    active: true,
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
