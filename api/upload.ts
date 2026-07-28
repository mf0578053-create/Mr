import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with Vercel Environment Variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "ngwyxu9p",
  api_key: process.env.CLOUDINARY_API_KEY || "375479575969959",
  api_secret: process.env.CLOUDINARY_API_SECRET || "XBNURf3V1frUCF88WAYpArU1L5o",
  secure: true,
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { image, folder = "portfolio_uploads" } = body || {};

    if (!image) {
      return res.status(400).json({ error: "No image data provided" });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder,
      resource_type: "auto",
      transformation: [
        { quality: "auto", fetch_format: "auto" }
      ]
    });

    const optimizedUrl = result.secure_url.replace(
      "/upload/",
      "/upload/f_auto,q_auto/"
    );

    return res.status(200).json({
      success: true,
      public_id: result.public_id,
      url: result.secure_url,
      optimized_url: optimizedUrl,
      format: result.format,
      width: result.width,
      height: result.height,
    });
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to upload image to Cloudinary",
    });
  }
}
