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

/** 10-digit Indian mobile (no country code). Accepts +91 / 91 / 0 prefixes. */
export const extractIndianMobile = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  if (digits.length > 10 && digits.startsWith("91")) return digits.slice(-10);
  return digits.slice(0, 10);
};

export const isValidIndianMobile = (phone: string): boolean =>
  /^[6-9]\d{9}$/.test(extractIndianMobile(phone));

/** Razorpay / E.164 style: +91XXXXXXXXXX */
export const toE164Indian = (phone: string): string =>
  `+91${extractIndianMobile(phone)}`;

export const isShippingDetailsComplete = (details: ShippingDetails) =>
  Boolean(
    details.fullName.trim() &&
      isValidIndianMobile(details.phone) &&
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
    phone: extractIndianMobile(String(row.phone ?? "")),
    addressLine: String(row.addressLine ?? row.address_line ?? ""),
    city: String(row.city ?? ""),
    state: String(row.state ?? ""),
    pincode: String(row.pincode ?? ""),
  };

  return isShippingDetailsComplete(details) ? details : null;
};

export const fetchUserAddress = async (): Promise<ShippingDetails | null> => {
  const res = await http.get(endpoints.orders.fetchAddress);
  return normalizeShippingAddress(res.data?.address);
};

export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;
