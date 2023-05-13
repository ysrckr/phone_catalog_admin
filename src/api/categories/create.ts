import { axiosAdminClient } from "@/utils/axiosClient";

export const createCategory = async (formData: FormData) => { 
  try {
    const res = await axiosAdminClient.post("/categories", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};