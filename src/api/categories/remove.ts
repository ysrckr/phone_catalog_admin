import { axiosAdminClient } from "@/utils/axiosClient";

export async function remove(id: string) { 
  return axiosAdminClient.delete(`/categories/${id}`).then((res) => res.data);
}