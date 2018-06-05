export class Column {

  name: string;
  refName: string;
  type: ColumnType

  constructor(name: string, type: ColumnType, refName: string){
    this.name = name;
    this.type = type;
    this.refName = refName;
  }
}
export enum ColumnType{
  pointToggle,
  label,
  cross
}
