import { STORAGE_KEY } from "@/constants/storage";
import { queryKeys } from "@/features/auth";
import { cookie } from "@/lib/cookie";
import { useQueryClient } from "@tanstack/react-query";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const logout = () => {
    cookie.remove(STORAGE_KEY.ACCESS_TOKEN);
    queryClient.setQueryData(queryKeys.userInfo(), null);
  };

  return { logout };
};
