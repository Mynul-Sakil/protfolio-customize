import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceBooking extends Document {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  serviceRequired: string;
  status: string; // e.g. 'unread', 'read', 'contacted'
  createdAt: Date;
  updatedAt: Date;
}

const ServiceBookingSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  serviceRequired: { type: String, required: true },
  status: { type: String, default: 'unread' }
}, { timestamps: true });

export default mongoose.models.ServiceBooking || mongoose.model<IServiceBooking>('ServiceBooking', ServiceBookingSchema);
