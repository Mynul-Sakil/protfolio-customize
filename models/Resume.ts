import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
  fileName: string;
  contentType: string;
  data: Buffer;
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema: Schema = new Schema(
  {
    fileName: { type: String, required: true },
    contentType: { type: String, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema);
