import dayjs from 'dayjs';

export const exportToCsv = (rows: any[] | null, columns: any[], fileName: string): void => {
  if (!rows) {
    return;
  }

  const formattedRows = rows.map(row => {
    const { discountType, ...updatedRow } = row;
    return {
      ...updatedRow,
      offer:`${row.offer} %`,
       
      createdAt: dayjs(row.createdAt).format('MMM - DD - YYYY [at] hh:mm A'),
    };
  });
  const csvData = formattedRows.map(row => columns.map(col => row[col.id]).join(',')).join('\n');
  const csvContent = `${columns.map(col => col.label).join(',')}\n${csvData}`;
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.csv`;
  link.click();
};