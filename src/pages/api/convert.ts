import { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";
import { optimize } from "svgo";

interface RequestBody {
  imageBase64: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { imageBase64 }: RequestBody = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: "No image provided" });
    }

    // Convert base64 to Buffer
    const imageBuffer = Buffer.from(imageBase64, "base64");

    // Resize image to 25x35 pixels
    const resizedBuffer = await sharp(imageBuffer)
      .resize(35, 35)
      .png({ quality: 90 }) // Convert to PNG (in-memory)
      .toBuffer();

    // Convert PNG to SVG
    const svgBuffer = await sharp(resizedBuffer).toBuffer();
    const svgContent = `
      <svg width="25" height="35" viewBox="0 0 25 35" xmlns="http://www.w3.org/2000/svg">
        <image width="25" height="35" href="data:image/png;base64,${svgBuffer.toString(
          "base64"
        )}" />
      </svg>
    `;


    // Optimize SVG
    const optimizedSvg = optimize(svgContent, { multipass: true }).data;

    res.status(200).json({ svg: optimizedSvg });
  } catch (error) {
    console.error("Error:", error);
  }
}

