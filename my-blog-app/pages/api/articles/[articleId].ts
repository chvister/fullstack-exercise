import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { articleId } = req.query;
  try {
    const authToken = req.headers?.["authorization"] || "";
    const externalUrl = `https://fullstack.exercise.applifting.cz/articles/${articleId}`;

    const response = await fetch(externalUrl, {
      method: "PATCH",
      headers: buildHeaders(authToken),
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        `External API Error: ${response.status} - ${response.statusText} - ${
          errorData?.message || ""
        }`
      );
    }

    const responseData = await response.json();
    res.status(200).json({ data: responseData });
  } catch (error) {
    handleError(res, error);
  }
}

const buildHeaders = (authToken: string): HeadersInit => ({
  "Content-Type": "application/json",
  "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY!,
  ...(authToken && { Authorization: authToken }),
});

const handleError = (res: NextApiResponse, error: unknown) => {
  const errorMessage =
    error instanceof Error ? error.message : "Unknown error occurred";

  console.error(`API Error: ${errorMessage}`);
  res.status(500).json({ error: errorMessage });
};
