import { headers } from "next/headers";
export async function GET() {
  const requestHeader = headers();
  const accessToken = requestHeader.get("accessToken");

  const response = await fetch(
    "https://frontend-exam.digitalfortress.dev/projects",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await response.json();
  return Response.json(data);
}
