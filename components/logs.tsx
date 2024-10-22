import { useCopilotContext } from "@copilotkit/react-core";
import { Message } from "@copilotkit/runtime-client-gql";
import { useEffect, useState } from "react";

export default function Logs() {
  const { messages } = useCopilotContext();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetchOptions() {
      const res = await fetch("/api/copilotkit");
      const data = await res.json();
      setLogs(data.options);
    }

    fetchOptions();
  }, [messages]);
  return (
    <div className="flex flex-col w-1/4 bg-black overflow-y-scroll overflow-x-hidden h-screen text-wrap">
      <h1 className="p-2 h-10 max-w-full text-center bg-white border-r-4 font-bold">
        Logs
      </h1>
      {logs.map((log: Message) => (
        <div
          className="py-10 border-1 mb-10 text-green-100 max-w-full text-wrap"
          key={log.id}
        >
          {Object.entries(log).map(([key, value]) => (
            <div
              key={key}
              className="mb-2 text-green-100 w-full text-wrap break-words"
            >
              <strong>{key}:</strong>{" "}
              {typeof value === "object" && value !== null
                ? JSON.stringify(value, null, 2)
                : value.toString()}
            </div>
          ))}
        </div>
      ))}
      {/* {logs.map((log: any, index) => (
        <div className="p-10 border-1 mb-10 text-green-100" key={index}>
          <div key={index} className="mb-2 text-green-100">
            {log}
          </div>
        </div>
      ))} */}
    </div>
  );
}
