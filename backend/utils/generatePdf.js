const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateLRPdf = (lrEntry) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 12 }); // Ultra-Tight Margins
    const filePath = path.join(__dirname, `../pdfs/LR-${lrEntry.lrNumber}.pdf`);
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // **Styling (MNC-Grade)**
    const primaryColor = '#003366'; // Dark Blue
    const lightGray = '#F2F2F2';

    const titleFontSize = 13; // Fine-Tuned Font Sizes
    const sectionTitleFontSize = 9;
    const labelFontSize = 6.5;
    const valueFontSize = 6.5;
    const tinyFontSize = 5.5;

    const sectionSpacing = 4; // Micro-Spacing
    const rowSpacing = 2;
    const tableRowSpacing = 1;

    // **Header Section**
    doc
      .font('Helvetica-Bold')
      .fontSize(titleFontSize)
      .fillColor(primaryColor)
      .text('LR Entry Details', {
        align: 'center',
        underline: false,
      });
    doc.moveDown(0.1);

    // **Helper Function (Even More Compact)**
    const drawRow = (label1, value1, label2, value2) => {
      doc
        .font('Helvetica-Bold')
        .fontSize(labelFontSize)
        .fillColor('black')
        .text(label1, 12, doc.y, { continued: true }) // Minimized X
        .font('Helvetica')
        .text(`: ${value1}`, { width: 165, fontSize: valueFontSize });

      doc
        .font('Helvetica-Bold')
        .text(label2, 190, doc.y, { continued: true }) // Optimized X
        .font('Helvetica')
        .text(`: ${value2}`, { width: 165, fontSize: valueFontSize });

      doc.moveDown(rowSpacing);
    };

    // **Details Section (Ultra-Tight)**
    doc
      .font('Helvetica-Bold')
      .fontSize(sectionTitleFontSize)
      .fillColor(primaryColor)
      .text('General Information', 12);
    doc.moveDown(0.05); // Almost No Spacing
    drawRow('LR Number', lrEntry.lrNumber, 'LR Date', lrEntry.lrDate);
    drawRow('Consignor', lrEntry.consignorName, 'Consignee', lrEntry.consigneeName);
    drawRow('From', lrEntry.from, 'To', lrEntry.to);
    doc.moveDown(sectionSpacing);

    doc
      .font('Helvetica-Bold')
      .fontSize(sectionTitleFontSize)
      .text('E-Way Bill Details', 12);
    doc.moveDown(0.05);
    drawRow('E-Way Bill No', lrEntry.ewayBillNo, 'E-Way Bill Date', lrEntry.ewayBillDate);
    doc
      .font('Helvetica-Bold')
      .text('Expiry Date', 12, doc.y, { continued: true })
      .font('Helvetica')
      .text(`: ${lrEntry.expiryDate}`, { fontSize: valueFontSize });
    doc.moveDown(sectionSpacing);

    doc
      .font('Helvetica-Bold')
      .fontSize(sectionTitleFontSize)
      .text('Invoice Details', 12);
    doc.moveDown(0.05);
    drawRow('Invoice No', lrEntry.invoiceNo, 'Invoice Date', lrEntry.invoiceDate);
    drawRow('Invoice Amount', `₹${lrEntry.invoiceAmount}`, 'To Pay', `₹${lrEntry.toPay}`);
    doc.moveDown(sectionSpacing);

    drawRow('Transport Type', lrEntry.transportType, 'Vehicle No', lrEntry.vehicleNo);
    doc.moveDown(sectionSpacing);

    // **Table Section (Maximum Density)**
    doc
      .font('Helvetica-Bold')
      .fontSize(sectionTitleFontSize)
      .text('Product Details', 12);
    doc.moveDown(0.02); // Virtually No Spacing

    const colWidths = [55, 135, 30, 45, 55]; // Adjusted Column Widths
    const colX = [12, 67, 202, 232, 277]; // Further Optimized X Positions
    const tableStartY = doc.y;
    const headerY = tableStartY;
    const rowHeight = 9; // Even Tighter Row Height

    // Table Header (Subtle Styling)
    doc.font('Helvetica-Bold');
    doc.fontSize(labelFontSize).fillColor(primaryColor);
    doc.rect(11, headerY - 1.5, 400, rowHeight - 0.5).fill(lightGray); // Reduced Rectangle Height
    doc.fillColor('black'); // Reset fill color
    doc.text('HSN Code', colX[0], headerY, { width: colWidths[0] });
    doc.text('Description', colX[1], headerY, { width: colWidths[1] });
    doc.text('Unit', colX[2], headerY, { width: colWidths[2] });
    doc.text('Quantity', colX[3], headerY, { width: colWidths[3] });
    doc.text('Taxable Amount', colX[4], headerY, { width: colWidths[4] });
    doc.moveDown(tableRowSpacing);

    // Table Rows
    doc.font('Helvetica');
    lrEntry.table.forEach((item, index) => {
      const y = tableStartY + (index + 1) * rowHeight;
      doc.fontSize(valueFontSize);
      doc.text(item.hsnCode, colX[0], y, { width: colWidths[0] });
      doc.text(item.productDescription, colX[1], y, { width: colWidths[1] });
      doc.text(item.unit, colX[2], y, { width: colWidths[2] });
      doc.text(item.quantity, colX[3], y, { width: colWidths[3] });
      doc.text(item.taxableAmount, colX[4], y, { width: colWidths[4] });
      doc.moveDown(tableRowSpacing);
    });
    doc.moveDown(sectionSpacing);

    // **Total Amount (Prominent)**
    doc
      .font('Helvetica-Bold')
      .fontSize(10)
      .fillColor(primaryColor)
      .text(`Total Amount: ₹${lrEntry.total}`, { align: 'right' });

    // **Footer (Minimalist)**
    doc
      .font('Helvetica')
      .fontSize(tinyFontSize)
      .fillColor('gray')
      .text('Generated by LR Booking System', { align: 'center', opacity: 0.7 });

    doc.end();
    writeStream.on('finish', () => resolve(filePath));
    writeStream.on('error', (err) => reject(err));
  });
};

module.exports = generateLRPdf;
