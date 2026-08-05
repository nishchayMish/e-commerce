export const SHIPPING_STORAGE_KEY = "aurum:shipping-details";

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

export const saveShippingDetails = (details: ShippingDetails) => {
  sessionStorage.setItem(SHIPPING_STORAGE_KEY, JSON.stringify(details));
};

export const readShippingDetails = (): ShippingDetails | null => {
  try {
    const raw = sessionStorage.getItem(SHIPPING_STORAGE_KEY);
    if (!raw) return null;
    const parsed = { ...emptyShippingDetails, ...JSON.parse(raw) } as ShippingDetails;
    return isShippingDetailsComplete(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;
