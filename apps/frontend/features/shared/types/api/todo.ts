export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  category: {
    id: number;
    title: string;
  };
}
