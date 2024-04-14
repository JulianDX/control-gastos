export type ExpenseType = {
  id: string;
  name: string;
  quantity: number;
  category: number;
  date: string;
};

export type ExpenseTypeWithoutID = Omit<ExpenseType, "id"> 
  