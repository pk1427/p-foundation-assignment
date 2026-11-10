import { NextResponse } from "next/server";
import { correctionSchema } from "@/data/schemas";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = correctionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const webhookUrl = process.env.CORRECTION_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        console.error("Correction webhook failed", res.status);
        return NextResponse.json(
          { error: "Upstream webhook failed" },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("Correction webhook error", err);
      return NextResponse.json({ error: "Upstream webhook error" }, { status: 502 });
    }
  } else {
    console.log(
      "[demo] CORRECTION_WEBHOOK_URL not set; correction payload:",
      parsed.data
    );
  }

  return NextResponse.json({ ok: true });
}
