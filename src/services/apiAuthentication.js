import supabase, { supabaseUrl } from "./supabase";

export const login = async ({ email, password }) => {
  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error("Failed to login user: " + error.message);
    }

    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    let { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error("Failed to logout user: " + error.message);
    }
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const createUser = async ({ fullName: full_name, email, password }) => {
  try {
    let { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          avatar: "",
        },
      },
    });

    if (error) {
      throw new Error("Failed to add the new user: " + error.message);
    }

    return data;
  } catch (error) {
    console.error("Error adding new user:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    let { data: session } = await supabase.auth.getSession();

    if (!session.session) {
      throw new Error("No active session");
    }

    let { data } = await supabase.auth.getUser();

    return data?.user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

export const updateCurrentUser = async ({
  password,
  fullName: full_name,
  avatar,
}) => {
  try {
    let updateData;

    if (password) updateData = { password };
    if (full_name) updateData = { data: { full_name } };

    const { data, error } = await supabase.auth.updateUser(updateData);

    if (error) {
      throw new Error("Failed to update user data: " + error.message);
    }
    if (!avatar) return data;

    //  the url to the image in the storage
    const now = new Date();
    const imageName = `${data.user.id}-avatar-${Math.random() * 1000}`;
    const formattedDate = now.toISOString().replaceAll(":", "%3A");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}?t=${formattedDate}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(imageName, avatar);

    if (uploadError) throw new Error("Failed to upload avatar: " + uploadError);

    const { data: updatedUser } = await supabase.auth.updateUser({
      data: { avatar: imagePath },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

export const updateUserPassword = async () => {};
