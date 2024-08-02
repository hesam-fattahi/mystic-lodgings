import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export const getBookings = async (filter, sort, page) => {
  try {
    let query = supabase
      .from("bookings")
      .select("*, guests (full_name), cabins (name)", { count: "exact" });

    // Filter
    if (filter) query = query.eq(filter.field, filter.value);

    // Sort
    query = query.order(sort.field, { ascending: sort.direction === "asc" });

    // Pagination
    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      throw new Error("Error fetching bookings: " + error.message);
    }

    return { data, count };
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error; // Re-throw the error for further handling
  }
};

export const getBooking = async (id) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select(
        "*, cabins(name), guests(full_name, email, nationality, country_flag)"
      )
      .eq("id", id)
      .single();

    if (error) {
      if (error.message.includes("not found")) {
        throw new Error(
          "Booking not found. Please check the ID and try again."
        );
      } else {
        throw new Error("Error fetching booking: " + error.message);
      }
    }

    return data;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
};

// Returns all BOOKINGS that were created after the given date. Useful to get bookings created in the last 30 days, for example.
export const getBookingsAfterDate = async (date) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("created_at, total_price, extras_price")
      .gte("created_at", date)
      .lte("created_at", getToday({ end: true }));

    if (error)
      throw new Error("Error fetching bookings after date:" + error.message);

    return data;
  } catch (error) {
    console.error("Error fetching bookings after date:", error);
    throw error;
  }
};

// Returns all STAYS that were created after the given date
export const getStaysAfterDate = async (date) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, cabins(name), guests(full_name)")
      .gte("start_date", date)
      .lte("start_date", getToday());

    if (error)
      throw new Error("Error fetching stays after date:" + error.message);

    return data;
  } catch (error) {
    console.error("Error fetching stays after date:", error);
    throw error; // Re-throw the error for further handling
  }
};

// Activity means that there is a check in or a check out today
export const getStaysTodayActivity = async () => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, guests(full_name), cabins(name)")
      .or(
        `and(start_date.eq.${getToday()},status.eq.unconfirmed),and(status.eq.check-in,end_date.eq.${getToday()})`
      )
      .order("created_at");

    if (error)
      throw new Error("Error fetching today's stay activity:" + error.message);

    return data;
  } catch (error) {
    console.error("Error fetching today's stay activity:", error);
    throw error;
  }
};

export const updateBooking = async (id, obj) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .update(obj)
      .eq("id", id)
      .select();

    if (error) throw new Error("Error updating booking:" + error.message);

    return data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

export const deleteBooking = async (id) => {
  try {
    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) throw new Error("Error deleting booking:" + error.message);

    return true;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};
