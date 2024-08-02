import supabase from "./supabase";

// Fetches all cabins from the "cabins" table.
export const getCabins = async (filter, sort) => {
  try {
    let query = supabase.from("cabins").select("*");

    // Filter
    if (filter === "no-discount") query = query.eq("discount", 0);
    if (filter === "with-discount") query = query.gt("discount", 0);

    // Sort
    query = query.order(sort.field, { ascending: sort.direction === "asc" });

    const { data: cabins, error } = await query;

    if (error) {
      throw new Error("Failed to fetch cabins: " + error.message);
    }

    return cabins;
  } catch (error) {
    console.error("Error fetching cabins:", error);
    throw error;
  }
};

// Deletes a cabin from the "cabins" table by its ID.
export const deleteCabin = async (id) => {
  try {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
      throw new Error("Failed to delete cabin: " + error.message);
    }

    return null;
  } catch (error) {
    console.error("Error deleting cabin:", error);
    throw error;
  }
};

// Inserts a new cabin or updates an existing one in the "cabins" table.
// export async function insertUpdateCabin(cabin, editId) {
//   try {
//     const isImageNew = typeof cabin.image === "object";

//     const now = new Date();
//     const imageName = `${Math.floor(Math.random() * 1000)}-${
//       cabin.image.name
//     }`.replaceAll("/", "");
//     const formattedDate = now.toISOString().replaceAll(":", "%3A");
//     const imagePath = isImageNew
//       ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}?t=${formattedDate}`
//       : cabin.image;

//     let query = supabase.from("cabins");

//     if (!editId) await query.insert([{ ...cabin, image: imagePath }]);
//     else await query.update({ ...cabin, image: imagePath }).eq("id", editId);

//     const { data } = await query.select().single();

//     if (!isImageNew) return data;

//     const { error: uploadError } = await supabase.storage
//       .from("cabin-images")
//       .upload(imageName, cabin.image);

//     if (uploadError) {
//       await query.delete().eq("id", data.id);
//       throw new Error("Error uploading cabin image:" + uploadError);
//     }

//     return true;
//   } catch (error) {
//     console.error(`Error ${editId ? "updating" : "inserting"} cabin:`, error);
//     throw error;
//   }
// }

export const upsertCabin = async (cabin, editId) => {
  try {
    const { image } = cabin;
    let imageUrl = image;

    // Handle image upload if image is new (if it's an object)
    if (typeof image === "object") {
      const { data, error: uploadError } = await supabase.storage
        .from("cabin-images")
        .upload(`${Date.now()}-${image.name}`, image);

      if (uploadError)
        throw new Error("Error uploading image: " + uploadError.message);

      // Get the image URL
      const { uploadedImageUrl, error: urlError } = supabase.storage
        .from("cabin-images")
        .getPublicUrl(data.path);

      console.log("image url after upload");
      console.log(uploadedImageUrl);

      if (urlError) {
        throw new Error("Error getting image URL" + urlError.message);
      }

      imageUrl = uploadedImageUrl;
    }

    let query = supabase.from("cabins");
    if (!editId) await query.insert([{ ...cabin, image: imageUrl }]);
    else await query.update({ ...cabin, image: imageUrl }).eq("id", editId);

    if (query.error)
      throw new Error("Error uploading cabin image:" + query.error.message);

    return query.data;
  } catch (error) {
    console.error("Error upserting cabin data:", error.message);
    throw error;
  }
};
