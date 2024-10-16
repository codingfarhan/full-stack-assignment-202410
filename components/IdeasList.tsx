"use client";

import { Idea } from "@/components/Idea";
import { useIdeas } from "@/lib/hooks/use-ideas";
import { IdeaStatus } from "@/lib/tasks.types";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function IdeasList() {
  const { ideas, reset, resetConversation } = useIdeas();
  // The list of Ideas component
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24 w-2/4">
      <div className="flex flex-col gap-4 min-w-full md:min-w-[500px]">
        <h1 className="text-2xl font-bold">💡 My Ideas List</h1>
        <Button
          type="button"
          variant={"destructive"}
          onClick={reset}
          disabled={!ideas?.length}
          className={"w-100"}
        >
          Reset all Ideas and Conversation
        </Button>
        <Button
          type="button"
          variant={"secondary"}
          onClick={resetConversation}
          className={"w-100"}
        >
          Reset Conversation and Keep all ideas
        </Button>
        <AnimatePresence>
          {!!ideas?.length ? (
            ideas
              .sort((a, b) => {
                if (a.status === b.status) {
                  return a.id - b.id;
                }
                return a.status === IdeaStatus.todo ? -1 : 1;
              })
              .map((task) => <Idea key={task.id} task={task} />)
          ) : (
            <div className="w-3/4 mt-4 color-gray italic">
              <p className="mt-4">
                The list is empty. Start chatting with AI to modify this list.
              </p>
              <p>
                You can ask the AI to add/remove ideas or mark an idea as
                Complete.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
