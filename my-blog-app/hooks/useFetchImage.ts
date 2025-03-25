import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ImagesService } from "@/generated-api";

export const useFetchImage = (): UseMutationResult<
  string,
  Error,
  string,
  unknown
> => {
  return useMutation({
    mutationFn: (imageId: string) => ImagesService.getImages(imageId),
    onError: (error: Error) => {
      console.error("Failed to fetch image:", error);
    },
  });
};
