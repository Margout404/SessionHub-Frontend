export type SelectOption = {
  id: number;
  name: string;
};

export const trainers: SelectOption[] = [
  {
    id: 1,
    name: "Maria Papadopoulou",
  },
  {
    id: 2,
    name: "Nikos Georgiou",
  },
  {
    id: 3,
    name: "Eleni Nikolaou",
  },
];

export const rooms: SelectOption[] = [
  {
    id: 1,
    name: "Room A",
  },
  {
    id: 2,
    name: "Room B",
  },
  {
    id: 3,
    name: "Room C",
  },
];

export const trainingTypes: SelectOption[] = [
  {
    id: 1,
    name: "Yoga",
  },
  {
    id: 2,
    name: "CrossFit",
  },
  {
    id: 3,
    name: "Pilates",
  },
];