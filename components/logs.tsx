import { useCopilotContext } from "@copilotkit/react-core";
import { Message } from "@copilotkit/runtime-client-gql";
export default function Logs() {
  const { messages } = useCopilotContext();
  return (
    <div className="flex flex-col w-1/4 bg-black overflow-y-scroll h-screen">
      <h1 className="p-2 h-10 w-full text-center bg-white border-r-4 font-bold">
        Logs
      </h1>
      {messages.map((log: Message) => (
        <div className="p-10 border-1 mb-10 text-green-100" key={log.id}>
          {Object.entries(log).map(([key, value]) => (
            <div key={key} className="mb-2 text-green-100">
              <strong>{key}:</strong>{" "}
              {typeof value === "object" && value !== null
                ? JSON.stringify(value, null, 2)
                : value.toString()}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
