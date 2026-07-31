import mongoose, { Schema, Document } from 'mongoose';

export interface ICertification extends Document {
  title: string;
  issuer: string;
  date: string;
  imageUrl?: string;
  credentialUrl?: string;
  order: number;
}

const CertificationSchema: Schema = new Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  imageUrl: { type: String },
  credentialUrl: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Certification || mongoose.model<ICertification>('Certification', CertificationSchema);
