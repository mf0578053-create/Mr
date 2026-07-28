import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { connectToDatabase } from "./src/lib/mongodb.js";
import { Contact } from "./src/models/Contact.js";
import { ProjectModel } from "./src/models/Project.js";
import { defaultProjects } from "./src/data/defaultProjects.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Configure Cloudinary with user credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "ngwyxu9p",
  api_key: process.env.CLOUDINARY_API_KEY || "375479575969959",
  api_secret: process.env.CLOUDINARY_API_SECRET || "XBNURf3V1frUCF88WAYpArU1L5o",
  secure: true,
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares for parsing JSON and URL-encoded data (allows base64 image upload)
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));

  // API Route: Cloudinary Upload Endpoint
  app.post("/api/upload", async (req, res) => {
    try {
      const { image, folder = "portfolio_uploads" } = req.body;
      if (!image) {
        return res.status(400).json({ error: "No image data provided" });
      }

      // Upload to Cloudinary with automatic quality & format optimization
      const result = await cloudinary.uploader.upload(image, {
        folder,
        resource_type: "auto",
        transformation: [
          { quality: "auto", fetch_format: "auto" }
        ]
      });

      // Construct optimized URL with f_auto,q_auto
      const optimizedUrl = result.secure_url.replace(
        "/upload/",
        "/upload/f_auto,q_auto/"
      );

      return res.json({
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
  });

  // API Route: Cloudinary Config check
  app.get("/api/cloudinary/config", (req, res) => {
    res.json({
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || "ngwyxu9p",
      apiKeyConfigured: true,
      status: "connected",
    });
  });

  // API Route: Contact Form Mongo Submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body || {};
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: "Name, email, and message are required fields.",
        });
      }

      await connectToDatabase();

      const newContact = await Contact.create({
        name,
        email,
        subject: subject || "General Inquiry",
        message,
        createdAt: new Date(),
      });

      return res.status(201).json({
        success: true,
        message: "Your message has been saved successfully!",
        data: newContact,
      });
    } catch (error: any) {
      console.warn("MongoDB Contact Warning:", error.message);
      return res.status(500).json({
        success: false,
        error: error.message || "Failed to save message to MongoDB.",
      });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      await connectToDatabase();
      const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100);
      return res.json({ success: true, data: contacts });
    } catch (error: any) {
      console.warn("MongoDB Fetch Contact Warning:", error.message);
      return res.status(500).json({
        success: false,
        error: error.message || "Failed to fetch contact submissions.",
      });
    }
  });

  // API Route: Projects MongoDB CRUD
  app.get("/api/projects", async (req, res) => {
    try {
      await connectToDatabase();
      let projects = await ProjectModel.find().sort({ createdAt: -1 });
      if (!projects || projects.length === 0) {
        try {
          await ProjectModel.insertMany(defaultProjects);
          projects = await ProjectModel.find().sort({ createdAt: -1 });
        } catch (seedErr) {
          return res.json({ success: true, data: defaultProjects });
        }
      }
      if (!projects || projects.length === 0) {
        projects = defaultProjects as any;
      }
      return res.json({ success: true, data: projects });
    } catch (error: any) {
      console.warn("MongoDB Fetch Projects Warning:", error.message);
      return res.json({
        success: false,
        error: error.message || "Failed to fetch projects.",
        fallbackData: defaultProjects
      });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const { title, category, image, images, year, id } = req.body || {};
      if (!title || !image) {
        return res.status(400).json({ success: false, error: "Title and image are required." });
      }

      await connectToDatabase();
      const newId = id || Date.now();
      const projectImages = Array.isArray(images) && images.length > 0 ? images : [image];

      const newProject = await ProjectModel.create({
        id: newId,
        title,
        category: category || "Website Design & Layout",
        image,
        images: projectImages,
        year: year || new Date().getFullYear().toString(),
        createdAt: new Date(),
      });

      const updatedProjects = await ProjectModel.find().sort({ createdAt: -1 });
      return res.status(201).json({ success: true, data: updatedProjects, newProject });
    } catch (error: any) {
      console.warn("MongoDB Add Project Warning:", error.message);
      return res.status(500).json({ success: false, error: error.message || "Failed to save project." });
    }
  });

  app.delete("/api/projects", async (req, res) => {
    try {
      const idToDelete = req.query.id || req.body?.id;
      if (!idToDelete) {
        return res.status(400).json({ success: false, error: "Project ID is required to delete." });
      }

      await connectToDatabase();
      await ProjectModel.deleteOne({ id: Number(idToDelete) });
      const updatedProjects = await ProjectModel.find().sort({ createdAt: -1 });
      return res.json({ success: true, data: updatedProjects });
    } catch (error: any) {
      console.warn("MongoDB Delete Project Warning:", error.message);
      return res.status(500).json({ success: false, error: error.message || "Failed to delete project." });
    }
  });


  let vite: any;
  if (process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
  }

  // SPA Fallback for both dev and prod
  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      if (process.env.NODE_ENV !== "production") {
        // In development, serve index.html through Vite
        let template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } else {
        // In production, serve the built index.html
        res.sendFile(path.join(__dirname, "dist", "index.html"));
      }
    } catch (e) {
      if (vite) vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

