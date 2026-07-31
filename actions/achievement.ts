"use server";

import dbConnect from "@/lib/mongodb";
import Achievement from "@/models/Achievement";
import { revalidatePath } from "next/cache";

export async function getAchievements() {
  await dbConnect();
  const achieves = await Achievement.find({}).sort({ order: 1 });
  return JSON.parse(JSON.stringify(achieves));
}

export async function createAchievement(data: any) {
  try {
    await dbConnect();
    const newAchieve = await Achievement.create(data);
    revalidatePath("/admin/achievements");
    revalidatePath("/");
    return { success: true, achievement: JSON.parse(JSON.stringify(newAchieve)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteAchievement(id: string) {
  try {
    await dbConnect();
    await Achievement.findByIdAndDelete(id);
    revalidatePath("/admin/achievements");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
