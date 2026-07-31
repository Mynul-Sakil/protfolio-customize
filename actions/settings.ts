"use server";

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function changePassword(current: string, newPass: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return { success: false, error: "Unauthorized" };

    await dbConnect();
    const user = await User.findById((session.user as any).id);
    if (!user) return { success: false, error: "User not found" };

    const isMatch = await bcrypt.compare(current, user.password);
    if (!isMatch) return { success: false, error: "Incorrect current password" };

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPass, salt);
    await user.save();

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
