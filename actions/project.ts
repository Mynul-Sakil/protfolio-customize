"use server";

import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  await dbConnect();
  const projects = await Project.find({}).sort({ order: 1 });
  return JSON.parse(JSON.stringify(projects));
}

export async function createProject(data: any) {
  try {
    await dbConnect();
    const newProject = await Project.create(data);
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true, project: JSON.parse(JSON.stringify(newProject)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProject(id: string) {
  try {
    await dbConnect();
    await Project.findByIdAndDelete(id);
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
