import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ImagesService } from "@/generated-api";
import toast from "react-hot-toast";

export const useDeleteImage = (): UseMutationResult<
  void,
  Error,
  string,
  unknown
> => {
  return useMutation({
    mutationFn: (imageId: string) => {
      return ImagesService.deleteImages(imageId);
    },
    onSuccess: () => {
      toast.success("Image deleted successfully!");
    },
    onError: (error: Error) => {
      console.error("Image deletion failed:", error);
    },
  });
};
