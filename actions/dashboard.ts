"use server";

import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import Skill from "@/models/Skill";
import Service from "@/models/Service";
import Testimonial from "@/models/Testimonial";
import ContactMessage from "@/models/ContactMessage";

export async function getDashboardStats() {
  await dbConnect();

  try {
    const [
      totalProjects,
      totalSkills,
      totalServices,
      totalTestimonials,
      totalMessages,
      unreadMessages
    ] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Service.countDocuments(),
      Testimonial.countDocuments(),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ status: "unread" })
    ]);

    return {
      success: true,
      data: {
        projects: totalProjects,
        skills: totalSkills,
        services: totalServices,
        testimonials: totalTestimonials,
        messages: {
          total: totalMessages,
          unread: unreadMessages
        }
      }
    };
  } catch (error: any) {
    console.error("Failed to fetch dashboard stats", error);
    return { success: false, error: error.message };
  }
}

export async function getRecentMessages(limit: number = 3) {
  await dbConnect();
  try {
    const messages = await ContactMessage.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return JSON.parse(JSON.stringify(messages));
  } catch (error) {
    console.error("Failed to fetch recent messages", error);
    return [];
  }
}
