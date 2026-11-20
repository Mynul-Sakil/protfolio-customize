import mongoose, { Schema, Document } from 'mongoose';

export interface IPhotoVersion {
  url: string;
  version: number;
  label?: string;
  isDefault?: boolean;
  savedAt: Date;
}

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
  photoHistory?: IPhotoVersion[];
  resumeUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PhotoVersionSchema = new Schema<IPhotoVersion>(
  {
    url: { type: String, required: true },
    version: { type: Number, required: true },
    label: { type: String },
    isDefault: { type: Boolean, default: false },
    savedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ProfileSchema: Schema = new Schema(
  {
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
    photoHistory: { type: [PhotoVersionSchema], default: [] },
    resumeUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);
