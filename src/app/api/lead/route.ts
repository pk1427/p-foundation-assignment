import { NextResponse } from "next/server";
import { leadSchema } from "@/data/schemas";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        console.error("Lead webhook failed", res.status);
        return NextResponse.json(
          { error: "Upstream webhook failed" },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("Lead webhook error", err);
      return NextResponse.json({ error: "Upstream webhook error" }, { status: 502 });
    }
  } else {
    console.log("[demo] LEAD_WEBHOOK_URL not set; lead payload:", parsed.data);
  }

  return NextResponse.json({ ok: true });
}
