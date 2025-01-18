import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function SignUp() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  async function convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  return (
    <div>
      <div className="grid gap-2">
        <Label htmlFor="image">Profile Image (optional)</Label>
        <div className="flex items-end gap-4">
          {imagePreview && (
            <div className="relative w-16 h-16 rounded-sm overflow-hidden">
              <Image
                src={imagePreview}
                alt="Profile preview"
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          <div className="flex items-center gap-2 w-full">
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {imagePreview && (
              <X
                className="cursor-pointer"
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
