export type Board = {
  id: number;
  title: string;
  columns: Column[];
};

export type Column = {
  id: number;
  title: string;
  color: string;
  tasks: Task[];
};

export type Task = {
  id: number;
  title: string;
  description: string;
  subtasks: SubTask[];
};

export type SubTask = {
  id: number;
  title: string;
  iscompleted: boolean;
};
