export const harperFetch = async (data: { [key: string]: any }) => {
  const DB_URL = process.env.NEXT_PUBLIC_HARPERDB_URL;
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    throw { error: "You need to log in" };
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + accessToken);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: "follow",
  };

  const response = await fetch(DB_URL, requestOptions);
  const result = await response.json();
  return { response, result };
};
