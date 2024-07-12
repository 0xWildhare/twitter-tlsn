import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to MyRustModule.web.ts
// and on native platforms to MyRustModule.ts
import MyRustModule from "./src/MyRustModule";
import MyRustModuleView from "./src/MyRustModuleView";
import {
  ChangeEventPayload,
  MyRustModuleViewProps,
} from "./src/MyRustModule.types";

// Get the native constant value.
export const PI = MyRustModule.PI;

export interface HTTPTranscript {
  method: string;
  path: string;
  http_version: string;
  headers: [string, string][];
  body: string;
}

export interface VerifiedProofInterface {
  request: HTTPTranscript;
  response: HTTPTranscript;
  server_name: string;
  time: string;
}

export interface NotarizationRequestInterface {
  host: string;
  path: string;
  headers: [string, string][];
  body: string;
  redact_strings: string[];
  max_sent: number;
  max_recv: number;
}

export async function rust_start(
  request: NotarizationRequestInterface,
): Promise<string> {
  console.log("Starting Rust module with request", request);
  const stringRequest = JSON.stringify(request);
  const resp = await MyRustModule.rust_start(stringRequest);
  const proof = JSON.parse(resp as string);

  return JSON.stringify(proof);
}

export function hello(): string {
  return MyRustModule.hello();
}

export async function rustAdd(a: number, b: number): Promise<number> {
  return await MyRustModule.rustAdd(a, b);
}

export async function setValueAsync(value: string) {
  return await MyRustModule.setValueAsync(value);
}

const emitter = new EventEmitter(
  MyRustModule ?? NativeModulesProxy.MyRustModule,
);

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void,
): Subscription {
  return emitter.addListener<ChangeEventPayload>("onChange", listener);
}

export { MyRustModuleView, MyRustModuleViewProps, ChangeEventPayload };
