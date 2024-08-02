import supabase from "./supabase";

export const getSettings = async () => {
  try {
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .single();

    if (error) throw new Error("Settings could not be loaded");

    return data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
};

export const updateSetting = async (newSetting) => {
  try {
    const { data, error } = await supabase
      .from("settings")
      .update(newSetting)
      .eq("id", 1)
      .single();

    if (error) throw new Error("Settings could not be updated");

    return data;
  } catch (error) {
    console.error("Error updating settings:", error);
    throw error;
  }
};
