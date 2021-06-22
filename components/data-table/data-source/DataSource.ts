import type { Row } from "./Row";
import type { Column, ColumnGroupCellViewModel } from "./Column";

type Key = number | string;

export type DataSourceOptions = {
  // cellTemplateBuilder?: (row: Row, column: Column) => JSX.Element;
  rowHeaderColumnHeader?: any;
  pinLastRow?: boolean;
  pinLastColumn?: boolean;
}

export class DataSource {

  constructor(
    public rows: Row[],
    public columns: Column[],
    public columnGroupRows: ColumnGroupCellViewModel[][],
    readonly options: DataSourceOptions = {},
  ) {

  }

  updateCell(rowKey: number, columnKey: number, value: any) {
    this.rows[rowKey].updateCell(this.columns[columnKey], value);
  }

  // cellValue(row: Row, column: Column): () => any {
  //   return this.rows[row.]
  // }

  setValue(rowKey: Key, columnKey: Key, value: any) {
    // @ts-ignore
    this.rows[rowKey].updateCell(this.columns[columnKey], value);
  }

}


