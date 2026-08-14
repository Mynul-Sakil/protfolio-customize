"use server";

import dbConnect from "@/lib/mongodb";
import Experience from "@/models/Experience";
import { revalidatePath } from "next/cache";

export async function getExperiences() {
  await dbConnect();
  const experiences = await Experience.find({}).sort({ order: 1 });
  return JSON.parse(JSON.stringify(experiences));
}

export async function createExperience(data: any) {
  try {
    await dbConnect();
    const newExp = await Experience.create(data);
    revalidatePath("/admin/experience");
    revalidatePath("/");
    return { success: true, experience: JSON.parse(JSON.stringify(newExp)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateExperience(id: string, data: any) {
  try {
    await dbConnect();
    const updatedExp = await Experience.findByIdAndUpdate(id, data, { new: true });
    revalidatePath("/admin/experience");
    revalidatePath("/");
    return { success: true, experience: JSON.parse(JSON.stringify(updatedExp)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteExperience(id: string) {
  try {
    await dbConnect();
    await Experience.findByIdAndDelete(id);
    revalidatePath("/admin/experience");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
