"use server";

import dbConnect from "@/lib/mongodb";
import Profile, { IPhotoVersion } from "@/models/Profile";
import { revalidatePath } from "next/cache";

const DEFAULT_PHOTO_URL =
  "https://res.cloudinary.com/kaddfemv/image/upload/v1795201485/knrwi4zozlrps6gehb10.png";

function mergePhotoHistory(
  existingHistory: IPhotoVersion[] = [],
  previousUrl?: string,
  nextUrl?: string
): IPhotoVersion[] {
  const history: IPhotoVersion[] = existingHistory.map((item) => ({
    url: item.url,
    version: item.version,
    label: item.label,
    isDefault: Boolean(item.isDefault),
    savedAt: item.savedAt ? new Date(item.savedAt) : new Date(),
  }));

  let maxVersion = history.reduce((max, item) => Math.max(max, item.version || 0), 0);

  const ensureVersion = (url: string | undefined, isDefault = false) => {
    const cleanUrl = url?.trim();
    if (!cleanUrl) return;
    if (history.some((item) => item.url === cleanUrl)) return;
    maxVersion += 1;
    history.push({
      url: cleanUrl,
      version: maxVersion,
      label: isDefault ? "Default Photo" : `Version ${maxVersion}`,
      isDefault,
      savedAt: new Date(),
    });
  };

  // Always guarantee the default photo URL is preserved in history
  ensureVersion(DEFAULT_PHOTO_URL, true);
  // Preserve previously active photo URL if it wasn't recorded yet
  ensureVersion(previousUrl, previousUrl === DEFAULT_PHOTO_URL);
  // Append newly uploaded photo URL as the next version
  ensureVersion(nextUrl, nextUrl === DEFAULT_PHOTO_URL);

  return history;
}

export async function getProfile() {
  await dbConnect();
  const profile = await Profile.findOne({});
  if (!profile) return null;

  const serialized = JSON.parse(JSON.stringify(profile));
  if (!serialized.photoHistory || serialized.photoHistory.length === 0) {
    serialized.photoHistory = mergePhotoHistory([], serialized.photoUrl, serialized.photoUrl);
  }
  return serialized;
}

export async function updateProfile(data: Record<string, unknown>) {
  try {
    await dbConnect();
    const existing = await Profile.findOne({});
    const incomingPhotoUrl = typeof data.photoUrl === "string" ? data.photoUrl.trim() : undefined;

    const updatedHistory = mergePhotoHistory(
      existing?.photoHistory || [],
      existing?.photoUrl,
      incomingPhotoUrl
    );

    const payload = {
      ...data,
      photoUrl: incomingPhotoUrl || existing?.photoUrl || DEFAULT_PHOTO_URL,
      photoHistory: updatedHistory,
    };

    const profile = existing
      ? await Profile.findOneAndUpdate({}, payload, { new: true })
      : await Profile.create(payload);

    revalidatePath("/admin/profile");
    revalidatePath("/");

    return { success: true, profile: JSON.parse(JSON.stringify(profile)) };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update profile";
    console.error("Update profile error:", error);
    return { success: false, error: message };
  }
}

export async function switchProfilePhoto(url: string) {
  try {
    const cleanUrl = url?.trim();
    if (!cleanUrl) {
      return { success: false, error: "Invalid photo URL" };
    }

    await dbConnect();
    const existing = await Profile.findOne({});
    if (!existing) {
      return { success: false, error: "Profile not found" };
    }

    const updatedHistory = mergePhotoHistory(
      existing.photoHistory || [],
      existing.photoUrl,
      cleanUrl
    );

    const profile = await Profile.findOneAndUpdate(
      {},
      { photoUrl: cleanUrl, photoHistory: updatedHistory },
      { new: true }
    );

    revalidatePath("/admin/profile");
    revalidatePath("/");

    return { success: true, profile: JSON.parse(JSON.stringify(profile)) };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to switch photo";
    console.error("Switch profile photo error:", error);
    return { success: false, error: message };
  }
}
