import mongoose, { Schema, Document } from "mongoose";

export interface IImpact extends Document {
  value: string;
  label: string;
  order: number;
}

const ImpactSchema = new Schema<IImpact>({
  value: { type: String, required: true },
  label: { type: String, required: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.models.Impact || mongoose.model<IImpact>("Impact", ImpactSchema);
