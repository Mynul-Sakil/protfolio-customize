"use server";

import dbConnect from "@/lib/mongodb";
import ServiceBooking from "@/models/ServiceBooking";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getBookings() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return null;

    await dbConnect();
    const bookings = await ServiceBooking.find().sort({ createdAt: -1 }).lean();
    
    // Convert ObjectId to string for client component serialization
    return bookings.map((b: any) => ({
      ...b,
      _id: b._id.toString()
    }));
  } catch (error) {
    console.error("Failed to get bookings:", error);
    return [];
  }
}

export async function updateBookingStatus(id: string, status: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { success: false };

    await dbConnect();
    await ServiceBooking.findByIdAndUpdate(id, { status });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteBooking(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { success: false };

    await dbConnect();
    await ServiceBooking.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
