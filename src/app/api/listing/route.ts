import { NextResponse } from "next/server";
import { listingSchema } from "@/data/schemas";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = listingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const webhookUrl = process.env.LISTING_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        console.error("Listing webhook failed", res.status);
        return NextResponse.json(
          { error: "Upstream webhook failed" },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("Listing webhook error", err);
      return NextResponse.json({ error: "Upstream webhook error" }, { status: 502 });
    }
  } else {
    console.log(
      "[demo] LISTING_WEBHOOK_URL not set; listing payload:",
      parsed.data
    );
  }

  return NextResponse.json({ ok: true });
}
