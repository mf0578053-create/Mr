import { connectToDatabase } from '../src/lib/mongodb.js';
import { ProjectModel } from '../src/models/Project.js';
import { defaultProjects } from '../src/data/defaultProjects.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      let projects = await ProjectModel.find().sort({ createdAt: -1 });

      // If database is empty, attempt seeding or fallback to default projects
      if (!projects || projects.length === 0) {
        try {
          await ProjectModel.insertMany(defaultProjects);
          projects = await ProjectModel.find().sort({ createdAt: -1 });
        } catch (seedErr) {
          return res.status(200).json({
            success: true,
            data: defaultProjects,
          });
        }
      }

      if (!projects || projects.length === 0) {
        projects = defaultProjects as any;
      }

      return res.status(200).json({
        success: true,
        data: projects,
      });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { title, category, image, images, year } = body || {};

      if (!title || !image) {
        return res.status(400).json({
          success: false,
          error: 'Title and image are required.',
        });
      }

      const newId = body.id || Date.now();
      const imgUrl = image;
      const projectImages = Array.isArray(images) && images.length > 0 ? images : [imgUrl];

      const newProject = await ProjectModel.create({
        id: newId,
        title,
        category: category || 'Website Design & Layout',
        image: imgUrl,
        images: projectImages,
        year: year || new Date().getFullYear().toString(),
        createdAt: new Date(),
      });

      const updatedProjects = await ProjectModel.find().sort({ createdAt: -1 });

      return res.status(201).json({
        success: true,
        data: updatedProjects,
        newProject,
      });
    }

    if (req.method === 'DELETE') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const idToDelete = req.query.id || body.id;

      if (!idToDelete) {
        return res.status(400).json({
          success: false,
          error: 'Project ID is required to delete.',
        });
      }

      await ProjectModel.deleteOne({ id: Number(idToDelete) });
      const updatedProjects = await ProjectModel.find().sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        data: updatedProjects,
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.warn('MongoDB Projects API Warning:', error.message);
    return res.status(200).json({
      success: false,
      error: error.message || 'Failed to process project request.',
      fallbackData: defaultProjects,
    });
  }
}
