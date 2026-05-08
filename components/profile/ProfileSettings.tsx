"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { userAPI } from "@/lib/api";

type ProfileSettingsProps = {
  name: string;
  location: string;
  phone: string;
};

export default function ProfileSettings({
  name,
  location,
  phone,
}: ProfileSettingsProps) {
  const [formName, setFormName] = useState(name);
  const [formLocation, setFormLocation] = useState(location);
  const [formPhone, setFormPhone] = useState(phone);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  async function handleSave() {
    setIsSaving(true);
    setSuccessMessage("");
    setServerError("");

    try {
      // Real API call to update profile
      await userAPI.updateProfile({
        name: formName,
        location: formLocation,
        phone: formPhone,
      });
      setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-lg">

      {/* Success message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Server error */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
          {serverError}
        </div>
      )}

      {/* Personal Info */}
      <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
        <h3 className="font-semibold text-foreground border-b border-border pb-3">
          Personal Information
        </h3>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Full Name
          </label>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            City / Location
          </label>
          <input
            type="text"
            value={formLocation}
            onChange={(e) => setFormLocation(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Phone Number
          </label>
          <input
            type="tel"
            value={formPhone}
            onChange={(e) => setFormPhone(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:border-primary transition-colors"
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="w-fit"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Danger Zone */}
      <div className="bg-card border border-red-200 rounded-2xl p-6 flex flex-col gap-4">
        <h3 className="font-semibold text-red-600 border-b border-red-100 pb-3">
          Danger Zone
        </h3>
        <p className="text-sm text-muted-foreground">
          Once you delete your account all your listings and data will be
          permanently removed. This cannot be undone.
        </p>
        <Button
          variant="outline"
          className="w-fit text-red-500 border-red-300 hover:bg-red-50"
        >
          Delete Account
        </Button>
      </div>

    </div>
  );
}