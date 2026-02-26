/**
 * Type definitions for the application
 */

export type UserRole = "admin" | "user";

export interface User {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
}

export interface Customer {
  id: number;
  userId: number;
  name: string;
  email: string | null;
  phone: string | null;
  gstin: string | null;
  address: string | null;
  state: string | null;
  createdAt: Date;
}

export interface Product {
  id: number;
  userId: number;
  name: string;
  hsnCode: string;
  gstRate: number;
  price: number;
  description: string | null;
  createdAt: Date;
}

export interface InvoiceItem {
  id: number;
  invoiceId: number;
  productId: number;
  product?: Product;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  gstRate: number;
  createdAt: Date;
}

export interface Invoice {
  id: number;
  userId: number;
  invoiceNumber: string;
  customerId: number;
  customer?: Customer;
  invoiceDate: Date;
  dueDate: Date | null;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
  totalAmount: number;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  items?: InvoiceItem[];
}

/**
 * API Response types
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  statusCode: number;
}
