import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIdeas } from "@/lib/hooks/use-ideas";
import { motion } from "framer-motion";
import { IdeaStatus, type Idea } from "@/lib/tasks.types";

export function Idea({ task: { id, title, status } }: { task: Idea }) {
  const { setIdeaStatus, deleteIdea } = useIdeas();

  // Component for each Idea item in the list
  return (
    <motion.div
      key={`${id}_${status}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-4 p-2 rounded-md bg-muted"
    >
      <Checkbox
        id={`task_${id}`}
        onClick={() =>
          setIdeaStatus(
            id,
            status === IdeaStatus.done ? IdeaStatus.todo : IdeaStatus.done
          )
        }
        checked={status === IdeaStatus.done}
      />
      <div className="text-sm text-neutral-500 font-medium">TASK-{id}</div>
      <Label
        htmlFor={`task_${id}`}
        className={cn(
          "flex-1 text-sm text-muted-foreground",
          status === IdeaStatus.done && "line-through"
        )}
      >
        {title}
      </Label>
      <Button variant="ghost" size="sm" onClick={() => deleteIdea(id)}>
        <TrashIcon className="w-4 h-4" />
        <span className="sr-only">Delete</span>
      </Button>
    </motion.div>
  );
}
