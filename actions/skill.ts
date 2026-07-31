"use server";

import dbConnect from "@/lib/mongodb";
import Skill from "@/models/Skill";
import { revalidatePath } from "next/cache";

export async function getSkills() {
  await dbConnect();
  const skills = await Skill.find({}).sort({ category: 1, order: 1 });
  return JSON.parse(JSON.stringify(skills));
}

export async function createSkill(data: any) {
  try {
    await dbConnect();
    const newSkill = await Skill.create(data);
    revalidatePath("/admin/skills");
    revalidatePath("/");
    return { success: true, skill: JSON.parse(JSON.stringify(newSkill)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteSkill(id: string) {
  try {
    await dbConnect();
    await Skill.findByIdAndDelete(id);
    revalidatePath("/admin/skills");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
