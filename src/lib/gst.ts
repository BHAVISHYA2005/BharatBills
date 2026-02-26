/**
 * GST Calculation Logic
 * Handles all GST-related calculations for invoices
 */

export interface GSTConfig {
  sellerState: string;
  buyerState: string;
  itemGSTRate: number; // 5, 12, 18, or 28
}

export interface GSTCalculation {
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
  total: number;
  isInterstate: boolean;
}

/**
 * Calculate GST for an invoice item
 * @param amount - Amount before tax
 * @param config - GST configuration with states and rate
 * @returns GST calculation breakdown
 */
export function calculateGST(
  amount: number,
  config: GSTConfig
): GSTCalculation {
  const isInterstate = config.sellerState !== config.buyerState;
  const gstRate = config.itemGSTRate / 100;

  let cgst = 0;
  let sgst = 0;
  let igst = 0;
  let totalTax = 0;

  if (isInterstate) {
    // Interstate: Apply IGST only
    igst = amount * gstRate;
    totalTax = igst;
  } else {
    // Intrastate: Apply CGST and SGST equally
    const halfRate = gstRate / 2;
    cgst = amount * halfRate;
    sgst = amount * halfRate;
    totalTax = cgst + sgst;
  }

  return {
    subtotal: amount,
    cgst: parseFloat(cgst.toFixed(2)),
    sgst: parseFloat(sgst.toFixed(2)),
    igst: parseFloat(igst.toFixed(2)),
    totalTax: parseFloat(totalTax.toFixed(2)),
    total: parseFloat((amount + totalTax).toFixed(2)),
    isInterstate,
  };
}

/**
 * Get valid GST rates for Indian GST system
 */
export const VALID_GST_RATES = [5, 12, 18, 28];

/**
 * Validate GSTIN format (Goods and Services Tax Identification Number)
 * Format: 2 state code + 10 PAN + 1 entity code + 1 check digit
 * @param gstin - GSTIN string to validate
 * @returns true if valid format, false otherwise
 */
export function validateGSTIN(gstin: string): boolean {
  const gstinRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z0-9]{1}\d{1}$/;
  return gstinRegex.test(gstin.toUpperCase());
}

/**
 * Get state code from GSTIN
 * First 2 characters represent the state
 * @param gstin - GSTIN string
 * @returns state code or null if invalid
 */
export function getStateFromGSTIN(gstin: string): string | null {
  if (!validateGSTIN(gstin)) return null;
  return gstin.substring(0, 2);
}

/**
 * Indian states GST codes
 */
export const INDIAN_STATES: Record<string, string> = {
  "01": "Andaman and Nicobar Islands",
  "02": "Andhra Pradesh",
  "03": "Arunachal Pradesh",
  "04": "Assam",
  "05": "Bihar",
  "06": "Chhattisgarh",
  "07": "Chandigarh",
  "08": "Dadra and Nagar Haveli",
  "09": "Daman and Diu",
  "10": "Delhi",
  "11": "Puducherry",
  "12": "Goa",
  "13": "Gujarat",
  "14": "Haryana",
  "15": "Himachal Pradesh",
  "16": "Jharkhand",
  "17": "Jammu and Kashmir",
  "18": "Karnataka",
  "19": "Kerala",
  "20": "Ladakh",
  "21": "Lakshadweep",
  "22": "Madhya Pradesh",
  "23": "Maharashtra",
  "24": "Manipur",
  "25": "Meghalaya",
  "26": "Mizoram",
  "27": "Nagaland",
  "28": "Odisha",
  "29": "Punjab",
  "30": "Rajasthan",
  "31": "Sikkim",
  "32": "Tamil Nadu",
  "33": "Telangana",
  "34": "Tripura",
  "35": "Uttar Pradesh",
  "36": "Uttarakhand",
  "37": "West Bengal",
};

/**
 * Example usage:
 * const result = calculateGST(1000, {
 *   sellerState: 'Maharashtra',
 *   buyerState: 'Karnataka',
 *   itemGSTRate: 18
 * });
 * console.log(result); // { igst: 180, cgst: 0, sgst: 0, total: 1180 }
 */
