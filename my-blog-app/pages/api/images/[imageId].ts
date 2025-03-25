import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { imageId } = req.query;

  const response = await fetch(
    `https://fullstack.exercise.applifting.cz/images/${imageId}`,
    {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY!,
      },
    }
  );

  if (!response.ok) {
    res.status(response.status).json({ error: "Failed to fetch image" });
    return;
  }

  const buffer = await response.arrayBuffer();
  res.setHeader(
    "Content-Type",
    response.headers.get("Content-Type") || "image/png"
  );
  res.send(Buffer.from(buffer));
}
