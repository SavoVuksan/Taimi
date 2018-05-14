export interface Program {
  name: string;
  path: string;
  running: boolean;
  runTime: number;
  day: Date;
  blocked: boolean;
  tracking: boolean;
}
