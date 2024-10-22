import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "farhans-assignment";
import OpenAI from "/Users/farhan/Desktop/opensource/copilotkit-new/CopilotKit/CopilotKit/node_modules/.pnpm/openai@4.53.0/node_modules/openai/index";
import { NextRequest } from "next/server";

let latestOptions: any[] = [];

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const serviceAdapter = new OpenAIAdapter({ openai } as any);
const runtime = new CopilotRuntime({
  middleware: {
    onBeforeRequest: (options: any) => {
      latestOptions.push(options);
    },
    onAfterRequest: (options: any) => {
      latestOptions.push(options?.requestData);
    },
  },
});

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};

export const GET = async () => {
  return new Response(JSON.stringify({ options: latestOptions }), {
    headers: { "Content-Type": "application/json" },
  });
};
