import {
  useCopilotAction,
  useCopilotReadable,
  useCopilotChat,
} from "@copilotkit/react-core";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Idea, IdeaStatus } from "../tasks.types";

type IdeasContextType = {
  ideas: Idea[] | undefined;
  addIdea: (title: string) => void;
  setIdeaStatus: (id: number, status: IdeaStatus) => void;
  deleteIdea: (id: number) => void;
  reset: () => void;
};

const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

export const IdeasProvider = ({ children }: { children: ReactNode }) => {
  const { setMessages } = useCopilotChat();
  const [ideas, setIdeas] = useState<Idea[] | undefined>(undefined);

  let nextId = (ideas?.length || 0) + 1;

  useEffect(() => {
    const storedIdeas = JSON.parse(localStorage?.getItem("ideas") as string);
    setIdeas(!!storedIdeas?.length ? storedIdeas : []);
  }, []);

  useEffect(() => {
    if (typeof ideas != "undefined")
      localStorage?.setItem("ideas", JSON.stringify(ideas));
  }, [ideas]);

  useCopilotReadable({
    description: "The state of the ideas list",
    value: JSON.stringify(ideas),
  });

  useCopilotAction({
    name: "addTask",
    description: "Adds a task to the ideas list",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "The title of the idea",
        required: true,
      },
    ],
    handler: ({ title }) => {
      addIdea(title);
    },
  });

  useCopilotAction({
    name: "deleteTask",
    description: "Deletes a task from the idea list",
    parameters: [
      {
        name: "id",
        type: "number",
        description: "The id of the task",
        required: true,
      },
    ],
    handler: ({ id }) => {
      deleteIdea(id);
    },
  });

  useCopilotAction({
    name: "setIdeaStatus",
    description: "Sets the status of a task",
    parameters: [
      {
        name: "id",
        type: "number",
        description: "The id of the task",
        required: true,
      },
      {
        name: "status",
        type: "string",
        description: "The status of the task",
        enum: Object.values(IdeaStatus),
        required: true,
      },
    ],
    handler: ({ id, status }) => {
      setIdeaStatus(id, status);
    },
  });

  const addIdea = (title: string) => {
    setIdeas(
      !!ideas?.length
        ? [...ideas, { id: nextId++, title, status: IdeaStatus.todo }]
        : [{ id: nextId++, title, status: IdeaStatus.todo }]
    );
  };

  const setIdeaStatus = (id: number, status: IdeaStatus) => {
    setIdeas(
      ideas?.map((idea) => (idea.id === id ? { ...idea, status } : idea))
    );
  };

  const deleteIdea = (id: number) => {
    setIdeas(ideas?.filter((idea) => idea.id !== id));
  };

  const reset = () => {
    setIdeas([]);
    setMessages([]);
  };

  const resetConversation = () => {
    setMessages([]);
  };

  return (
    <IdeasContext.Provider
      value={{
        ideas,
        addIdea,
        setIdeaStatus,
        deleteIdea,
        reset,
        resetConversation,
      }}
    >
      {children}
    </IdeasContext.Provider>
  );
};

export const useIdeas = () => {
  const context = useContext(IdeasContext);
  if (context === undefined) {
    throw new Error("useIdea must be used within a IdeasProvider");
  }
  return context;
};
