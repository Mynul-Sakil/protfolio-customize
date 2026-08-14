"use server";

import dbConnect from "@/lib/mongodb";
import Impact from "@/models/Impact";
import { revalidatePath } from "next/cache";

export async function getImpactStats() {
  await dbConnect();
  try {
    const stats = await Impact.find({}).sort({ order: 1, createdAt: 1 }).lean();
    return JSON.parse(JSON.stringify(stats));
  } catch (error) {
    console.error("Failed to get impact stats:", error);
    return null;
  }
}

export async function createImpactStat(formData: FormData) {
  await dbConnect();
  try {
    const value = formData.get("value");
    const label = formData.get("label");
    const order = Number(formData.get("order")) || 0;

    const newStat = new Impact({
      value,
      label,
      order
    });

    await newStat.save();
    revalidatePath("/admin/impact");
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create impact stat:", error);
    return { success: false, error: error.message };
  }
}

export async function updateImpactStat(id: string, formData: FormData) {
  await dbConnect();
  try {
    const value = formData.get("value");
    const label = formData.get("label");
    const order = Number(formData.get("order")) || 0;

    await Impact.findByIdAndUpdate(id, {
      value,
      label,
      order
    });

    revalidatePath("/admin/impact");
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update impact stat:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteImpactStat(id: string) {
  await dbConnect();
  try {
    await Impact.findByIdAndDelete(id);
    revalidatePath("/admin/impact");
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete impact stat:", error);
    return { success: false, error: error.message };
  }
}
