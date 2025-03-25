import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ImagesService, ImageInfo } from "@/generated-api";

type ImageUploadInput = {
  image: Blob[];
};

export const useUploadImage = (): UseMutationResult<
  ImageInfo[],
  Error,
  File,
  unknown
> => {
  return useMutation({
    mutationFn: (file: File) => {
      const uploadData: ImageUploadInput = {
        image: [file],
      };
      return ImagesService.postImages(uploadData);
    },
    onError: (error: Error) => {
      console.error("Image upload failed:", error);
    },
  });
};
