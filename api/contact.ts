import { connectToDatabase } from '../src/lib/mongodb';
import { Contact } from '../src/models/Contact';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { name, email, subject, message } = body || {};

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: 'Name, email, and message are required fields.',
        });
      }

      await connectToDatabase();

      const newContact = await Contact.create({
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
        createdAt: new Date(),
      });

      return res.status(201).json({
        success: true,
        message: 'Your message has been saved successfully!',
        data: newContact,
      });
    } catch (error: any) {
      console.error('MongoDB Contact Submission Error:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to save message to MongoDB.',
      });
    }
  }

  if (req.method === 'GET') {
    try {
      await connectToDatabase();
      const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100);
      return res.status(200).json({
        success: true,
        data: contacts,
      });
    } catch (error: any) {
      console.error('MongoDB Contact Fetch Error:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch contact submissions.',
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
