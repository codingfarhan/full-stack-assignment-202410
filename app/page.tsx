"use client";

import { IdeasList } from "@/components/IdeasList";
import Logs from "@/components/logs";
import { IdeasProvider } from "@/lib/hooks/use-ideas";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function Home() {
  // const COPILOT_CLOUD_PUBLIC_API_KEY =
  //   process.env.NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY;

  return (
    <>
      <CopilotKit runtimeUrl={"/api/copilotkit"} showDevConsole={true}>
        <div className="flex flex-row gap-4 min-w-full md:min-w-[500px]">
          {/* Logs on the left.. */}
          <Logs />
          {/* Ideas list in the middle... */}
          <IdeasProvider>
            <IdeasList />
          </IdeasProvider>
          {/* The chat component on the right */}
          <CopilotChat
            className="w-1/4 max-h-screen border-2 mt-2"
            labels={{
              title: "Your Assistant",
              initial:
                "Hi! 👋 I can help you manage your Ideas in one place. You can brainstorm your ideas with me or you can aske me to add/remove the idea from the list!",
            }}
            showResponseButton={true}
          />
        </div>
      </CopilotKit>
    </>
  );
}
