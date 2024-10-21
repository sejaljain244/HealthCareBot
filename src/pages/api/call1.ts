import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const backendUrl =
      "https://emqmfifdy9.execute-api.us-east-1.amazonaws.com/stage1";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user_content } = req.body;

  try {
    const response = await axios.post(backendUrl, {
      user_content: user_content,
    });
    console.log(response);
    const data = response.data;

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Error" });
  }
}
