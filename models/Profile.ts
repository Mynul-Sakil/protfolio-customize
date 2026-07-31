import mongoose, { Schema, Document } from 'mongoose';

export interface IProfile extends Document {
  name: string;
  title: string;
  shortIntroduction: string;
  professionalSummary: string;
  careerJourney: string;
  missionVision: string;
  personalValues: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  whatsapp: string;
  photoUrl?: string;
  resumeUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  shortIntroduction: { type: String },
  professionalSummary: { type: String },
  careerJourney: { type: String },
  missionVision: { type: String },
  personalValues: { type: String },
  email: { type: String },
  phone: { type: String },
  location: { type: String },
  linkedin: { type: String },
  whatsapp: { type: String },
  photoUrl: { type: String },
  resumeUrl: { type: String }
}, { timestamps: true });

export default mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);
