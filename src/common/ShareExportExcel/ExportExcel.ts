import Excel from 'exceljs';
import { saveAs } from 'file-saver';


export interface ExcelTitle {
  name: string
  width: number
  field: string
  textAlign: string
  callback?: (value: any) => any
}

export interface ExportProps {
  titles: ExcelTitle[]
  data: any[]
  fileName:string
}

export const ShareExportExcel = async (props: ExportProps) => {
  const { fileName,titles, data } = props
  const workbook = new Excel.Workbook();
  try {
    const worksheet = workbook.addWorksheet('Sheet-1');
    worksheet.columns = titles.map((title: ExcelTitle) => {
      return { header: title.name, key: title.field, width: title.width }
    });

    const border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
     worksheet.getRow(1).eachCell({ includeEmpty: false }, (cell: any) => {
      cell.font = { bold: true };
      cell.border = border;
      cell.alignment = {
        vertical: 'center',
        horizontal: 'center'
      }
    })

    data.forEach((singleData: any) => {
      worksheet
        .addRow(singleData)
        .eachCell({ includeEmpty: true }, (cell: any) => {
          const title = titles.find((cm: any) => cm.field === cell._column._key)
          if (title !== undefined) {
            const afterTranfer = title?.callback?.(cell.value)
            if (afterTranfer)
              cell.value = afterTranfer
            cell.border = border;
            cell.alignment = {
              vertical: 'center',
              horizontal: title.textAlign ? title.textAlign : 'center',
            };
          }
        });
    });

    const buf = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buf]), `${fileName}.xlsx`);
  } catch (error: any) {
    console.error('Something Went Wrong', error.message);
  } finally {
    workbook.removeWorksheet('Sheet-1');
  }
};
