export type Idea = {
  id: number;
  title: string;
  status: IdeaStatus;
};

export enum IdeaStatus {
  todo = "todo",
  done = "done",
}
