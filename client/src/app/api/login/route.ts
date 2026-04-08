import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token } = body;

    const response = await axios.post(
      "http://localhost:4001/applicant/login",
      { token },
      {
        withCredentials: true,
      }
    );

    const res = NextResponse.json(response.data, { status: 200 });

    const cookies = response.headers["set-cookie"];

    if (cookies) {
      cookies.forEach((cookie) => {
        res.headers.append("set-cookie", cookie);
      });
    }

    return res;
  } catch (error: any) {
    const status = error?.response?.status || 500;
    const message =
      error?.response?.data || error?.message || "Internal Server Error";

    return NextResponse.json(message, { status });
  }
}