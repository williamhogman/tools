import { HandlerContext } from "$fresh/server.ts";
import QRCode from "https://esm.sh/qrcode";

export const handler = async (
  req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  const url = new URL(req.url);
  const data = url.searchParams.get("d");
  if (data == null) {
    return new Response("Missing parameter `d`", {
      status: 400,
    });
  }
  const qr = await QRCode.toString(data, { type: "svg" });
  return new Response(qr, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
};
