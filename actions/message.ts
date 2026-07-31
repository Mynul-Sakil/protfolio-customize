"use server";

import dbConnect from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";
import { revalidatePath } from "next/cache";

export async function getMessages() {
  await dbConnect();
  const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(messages));
}

export async function updateMessageStatus(id: string, status: string) {
  try {
    await dbConnect();
    await ContactMessage.findByIdAndUpdate(id, { status });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteMessage(id: string) {
  try {
    await dbConnect();
    await ContactMessage.findByIdAndDelete(id);
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
