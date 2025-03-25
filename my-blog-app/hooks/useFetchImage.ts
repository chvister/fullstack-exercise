import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ImagesService } from "@/generated-api";

export const useFetchImage = (
  imageId?: string
): UseQueryResult<string | null, Error> => {
  return useQuery<string | null, Error>({
    queryKey: ["image", imageId],
    queryFn: async () => {
      if (!imageId) {
        return null;
      }
      const response = await ImagesService.getImages(imageId);
      const blob = new Blob([response]);
      return URL.createObjectURL(blob);
    },
    enabled: !!imageId,
  });
};
