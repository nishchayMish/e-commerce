import http from "@/lib/http";
import { endpoints } from "@/lib/endpoints";

export type PaymentMethod = "CARD" | "UPI" | "COD";

export interface ShippingDetails {
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
}

export const emptyShippingDetails: ShippingDetails = {
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  state: "",
  pincode: "",
};

export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const isShippingDetailsComplete = (details: ShippingDetails) =>
  Boolean(
    details.fullName.trim() &&
      details.phone.trim().length >= 10 &&
      details.addressLine.trim() &&
      details.city.trim() &&
      details.state.trim() &&
      details.pincode.trim().length === 6
  );

/** Map API / DB address (snake or camel) → ShippingDetails */
export const normalizeShippingAddress = (raw: unknown): ShippingDetails | null => {
  if (!raw || typeof raw !== "object") return null;

  const row = raw as Record<string, unknown>;
  const details: ShippingDetails = {
    fullName: String(row.fullName ?? row.full_name ?? ""),
    phone: String(row.phone ?? ""),
    addressLine: String(row.addressLine ?? row.address_line ?? ""),
    city: String(row.city ?? ""),
    state: String(row.state ?? ""),
    pincode: String(row.pincode ?? ""),
  };

  return isShippingDetailsComplete(details) ? details : null;
};

export const fetchUserAddress = async (): Promise<ShippingDetails | null> => {
  const res = await http.get(endpoints.orders.address);
  return normalizeShippingAddress(res.data?.address);
};

export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;
