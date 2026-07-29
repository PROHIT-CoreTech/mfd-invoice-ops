import ExcelJS from 'exceljs';

export async function parseCommissionExcel(filePath: string): Promise<any[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet(1);
  if (!worksheet) return [];

  const rows: any[] = [];
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // Header
    rows.push({
      rowNumber,
      distributorName: row.getCell(1).text,
      grossAmount: parseFloat(row.getCell(2).text || '0'),
      netAmount: parseFloat(row.getCell(3).text || '0'),
    });
  });

  return rows;
}
