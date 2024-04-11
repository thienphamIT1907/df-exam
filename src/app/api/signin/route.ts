import { SigninResponse } from "@/app/types/common";

export async function POST(request: Request) {
  const loginPayload: { email: string; password: string } =
    await request.json();

  const externalResponse = await fetch(
    "https://frontend-exam.digitalfortress.dev/auth/login",
    {
      method: "POST",
      body: JSON.stringify(loginPayload),
    }
  );
  const data: SigninResponse = await externalResponse.json();
  return Response.json(data);
}
