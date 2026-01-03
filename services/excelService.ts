
import ExcelJS from 'exceljs';

/**
 * Converts image pixel data to a styled Excel (.xlsx) file
 */
export const generateExcel = async (
  imageData: ImageData, 
  width: number, 
  height: number
): Promise<void> => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Pixel Art');

  const { data } = imageData;

  // Set default column width to make them square-ish
  // Standard Excel row height is 15. Standard char width is ~8px.
  // To get squares, we need narrow columns.
  for (let i = 1; i <= width; i++) {
    const col = worksheet.getColumn(i);
    col.width = 2.5; // Narrow width for "pixel" look
  }

  // Iterate over pixel data
  for (let y = 0; y < height; y++) {
    const row = worksheet.getRow(y + 1);
    row.height = 15; // Standard height

    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      // Convert RGB to Hex
      const hex = rgbToHex(r, g, b);
      
      const cell = row.getCell(x + 1);
      
      // Apply background fill
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: `FF${hex}` } // Excel uses ARGB
      };
    }
    
    // Periodically yield to UI thread to prevent blocking
    if (y % 10 === 0) {
      await new Promise(r => setTimeout(r, 0));
    }
  }

  // Generate blob and download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `pixel_art_${Date.now()}.xlsx`;
  anchor.click();
  
  window.URL.revokeObjectURL(url);
};

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) => c.toString(16).padStart(2, '0');
  return `${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};
