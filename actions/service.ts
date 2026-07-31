"use server";

import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import { revalidatePath } from "next/cache";

export async function getServices() {
  await dbConnect();
  const services = await Service.find({}).sort({ order: 1 });
  return JSON.parse(JSON.stringify(services));
}

export async function createService(data: any) {
  try {
    await dbConnect();
    const newService = await Service.create(data);
    revalidatePath("/admin/services");
    revalidatePath("/");
    return { success: true, service: JSON.parse(JSON.stringify(newService)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteService(id: string) {
  try {
    await dbConnect();
    await Service.findByIdAndDelete(id);
    revalidatePath("/admin/services");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
