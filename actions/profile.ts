"use server";

import dbConnect from "@/lib/mongodb";
import Profile from "@/models/Profile";
import { revalidatePath } from "next/cache";

export async function getProfile() {
  await dbConnect();
  const profile = await Profile.findOne({});
  return profile ? JSON.parse(JSON.stringify(profile)) : null;
}

export async function updateProfile(data: any) {
  try {
    await dbConnect();
    let profile = await Profile.findOne({});
    
    if (profile) {
      profile = await Profile.findOneAndUpdate({}, data, { new: true });
    } else {
      profile = await Profile.create(data);
    }
    
    revalidatePath("/admin/profile");
    revalidatePath("/");
    
    return { success: true, profile: JSON.parse(JSON.stringify(profile)) };
  } catch (error: any) {
    console.error("Update profile error:", error);
    return { success: false, error: error.message };
  }
}
