"use server";

import dbConnect from "@/lib/mongodb";
import ServiceBooking from "@/models/ServiceBooking";

export async function createBooking(formData: FormData) {
  try {
    await dbConnect();

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const serviceRequired = formData.get("serviceRequired") as string;

    if (!fullName || !email || !serviceRequired) {
      return { success: false, error: "Please fill in all required fields." };
    }

    const booking = new ServiceBooking({
      fullName,
      email,
      phone,
      company,
      serviceRequired
    });

    await booking.save();

    return { success: true };
  } catch (error: any) {
    console.error("Booking submission error:", error);
    return { success: false, error: "Failed to submit booking. Please try again later." };
  }
}
