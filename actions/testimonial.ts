"use server";

import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { revalidatePath } from "next/cache";

export async function getTestimonials() {
  await dbConnect();
  const items = await Testimonial.find({}).sort({ order: 1 });
  return JSON.parse(JSON.stringify(items));
}

export async function createTestimonial(data: any) {
  try {
    await dbConnect();
    const newItem = await Testimonial.create(data);
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true, testimonial: JSON.parse(JSON.stringify(newItem)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await dbConnect();
    await Testimonial.findByIdAndDelete(id);
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
