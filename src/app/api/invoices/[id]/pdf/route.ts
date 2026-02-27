import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const invoice = await prisma.invoice.findFirst({
        where: { id: parseInt(id), userId: session.userId },
        include: { customer: true, items: { include: { product: true } }, user: true },
    });

    if (!invoice) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const formatCurrency = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Invoice ${invoice.invoiceNumber}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a2e; font-size: 13px; line-height: 1.5; }
  .container { max-width: 800px; margin: 0 auto; padding: 40px; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 3px solid #E8652B; padding-bottom: 20px; }
  .logo { font-size: 28px; font-weight: 700; }
  .logo span { color: #E8652B; }
  .inv-num { font-size: 24px; font-weight: 700; color: #E8652B; text-align: right; }
  .inv-meta { font-size: 12px; color: #666; margin-top: 4px; text-align: right; }
  .parties { display: flex; justify-content: space-between; margin-bottom: 30px; }
  .party { flex: 1; }
  .party-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #999; margin-bottom: 6px; }
  .party-name { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
  .party-detail { font-size: 12px; color: #666; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
  thead { background: #f8f6f3; }
  th { padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #666; border-bottom: 1px solid #e5e2dd; }
  td { padding: 10px 12px; border-bottom: 1px solid #f0ede8; font-size: 13px; }
  .text-right { text-align: right; }
  .totals { max-width: 280px; margin-left: auto; }
  .total-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; }
  .total-row.grand { border-top: 2px solid #1a1a2e; padding-top: 10px; margin-top: 4px; font-size: 18px; font-weight: 700; }
  .total-row.grand .val { color: #E8652B; }
  .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e2dd; font-size: 11px; color: #999; text-align: center; }
  .notes { margin-top: 24px; padding: 14px; background: #f8f6f3; border-radius: 6px; font-size: 12px; color: #666; }
  @media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } .container { padding: 20px; } }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <div>
      <div class="logo"><span>Bharat</span>Bills</div>
      <div style="font-size:12px; color:#666; margin-top:4px;">${invoice.user.name || 'Business'}</div>
    </div>
    <div>
      <div class="inv-num">${invoice.invoiceNumber}</div>
      <div class="inv-meta">Date: ${new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}</div>
      ${invoice.dueDate ? `<div class="inv-meta">Due: ${new Date(invoice.dueDate).toLocaleDateString('en-IN')}</div>` : ''}
      <div class="inv-meta">Status: ${invoice.status.toUpperCase()}</div>
    </div>
  </div>

  <div class="parties">
    <div class="party">
      <div class="party-label">Bill To</div>
      <div class="party-name">${invoice.customer.name}</div>
      ${invoice.customer.gstin ? `<div class="party-detail">GSTIN: ${invoice.customer.gstin}</div>` : ''}
      ${invoice.customer.address ? `<div class="party-detail">${invoice.customer.address}</div>` : ''}
      ${invoice.customer.state ? `<div class="party-detail">${invoice.customer.state}</div>` : ''}
      ${invoice.customer.email ? `<div class="party-detail">${invoice.customer.email}</div>` : ''}
      ${invoice.customer.phone ? `<div class="party-detail">${invoice.customer.phone}</div>` : ''}
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Item</th>
        <th>HSN</th>
        <th>Qty</th>
        <th>Rate</th>
        <th>GST</th>
        <th class="text-right">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${invoice.items.map((item: { product: { name: string; hsnCode: string }; quantity: number; unitPrice: number; gstRate: number; lineTotal: number }, i: number) => `
      <tr>
        <td>${i + 1}</td>
        <td><strong>${item.product.name}</strong></td>
        <td>${item.product.hsnCode}</td>
        <td>${item.quantity}</td>
        <td>${formatCurrency(item.unitPrice)}</td>
        <td>${item.gstRate}%</td>
        <td class="text-right"><strong>${formatCurrency(item.lineTotal)}</strong></td>
      </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="totals">
    <div class="total-row"><span>Subtotal</span><span>${formatCurrency(invoice.subtotal)}</span></div>
    ${invoice.igst > 0
            ? `<div class="total-row"><span>IGST</span><span>${formatCurrency(invoice.igst)}</span></div>`
            : `<div class="total-row"><span>CGST</span><span>${formatCurrency(invoice.cgst)}</span></div>
         <div class="total-row"><span>SGST</span><span>${formatCurrency(invoice.sgst)}</span></div>`
        }
    <div class="total-row"><span>Total Tax</span><span>${formatCurrency(invoice.totalTax)}</span></div>
    <div class="total-row grand"><span>Grand Total</span><span class="val">${formatCurrency(invoice.totalAmount)}</span></div>
  </div>

  ${invoice.notes ? `<div class="notes"><strong>Notes:</strong> ${invoice.notes}</div>` : ''}

  <div class="footer">
    Generated by BharatBills &mdash; GST Invoicing Software
  </div>
</div>
</body>
</html>`;

    return new NextResponse(html, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
        },
    });
}
