export type DatasetT = {
  label: string;
  data: number[];
  borderWidth?: number;
};

export type LabelsT = (string | number)[];

export type ChartProps = {
  labels: LabelsT;
  datasets: DatasetT[];
};
