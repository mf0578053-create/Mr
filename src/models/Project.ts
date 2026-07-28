import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  id: number;
  title: string;
  category: string;
  image: string;
  images?: string[];
  year: string;
  createdAt?: Date;
}

const ProjectSchema = new Schema<IProject>({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  image: { type: String, required: true },
  images: [{ type: String }],
  year: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ProjectModel: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
