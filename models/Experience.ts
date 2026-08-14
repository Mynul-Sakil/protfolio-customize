import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  role: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate: string; // 'Present' or a specific date
  responsibilities: string[]; // Stored as array of strings
  order: number;
}

const ExperienceSchema: Schema = new Schema({
  role: { type: String, required: true },
  organization: { type: String, required: true },
  location: { type: String, required: false },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  responsibilities: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);
