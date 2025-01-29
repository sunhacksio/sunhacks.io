import { NextResponse } from "next/server";
import { env } from "@/env.mjs";
import { NextRequest } from "next/server";
import { z } from "zod";

export const runtime = "edge";
export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !z.string().email().safeParse(email).success) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid email address.",
      },
      { status: 400 }
    );
  }

  try {
    // Sendy mailing list
    await addToSendyMailingList(email);

    return NextResponse.json({
      success: true,
      ok: true,
      message: "Email added to Sendy mailing list!",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        ok: false,
        message: "Failed to add email to Sendy mailing list.",
      },
      { status: 500 }
    );
  }
}

async function addToSendyMailingList(email: string) {
  const response = await fetch(env.SENDY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      api_key: env.SENDY_API_KEY,
      list: env.SENDY_LIST_ID,
      email,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add email to Sendy mailing list.");
  }
}
