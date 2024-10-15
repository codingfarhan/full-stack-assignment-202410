import { Idea, IdeaStatus } from "./tasks.types";

export const defaultIdeas: Idea[] = [
  {
    id: 1,
    title: "Complete project proposal",
    status: IdeaStatus.done,
  },
  {
    id: 2,
    title: "Review design mockups",
    status: IdeaStatus.done,
  },
  {
    id: 3,
    title: "Prepare presentation slides",
    status: IdeaStatus.todo,
  },
  {
    id: 4,
    title: "Send meeting notes email",
    status: IdeaStatus.todo,
  },
  {
    id: 5,
    title: "Review Uli's pull request",
    status: IdeaStatus.todo,
  },
];
