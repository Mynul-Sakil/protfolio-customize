import mongoose, { Schema, Document } from 'mongoose';

export interface IAchievement extends Document {
  title: string;
  imageUrl?: string;
  order: number;
}

const AchievementSchema: Schema = new Schema({
  title: { type: String, required: true },
  imageUrl: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Achievement || mongoose.model<IAchievement>('Achievement', AchievementSchema);
