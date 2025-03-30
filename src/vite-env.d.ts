/// <reference types="vite/client" />
/// <reference types="node" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_KEY: string;
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_OPENAI_MODEL: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_ENABLE_ADVANCED_FEATURES: string;
  readonly VITE_ANALYTICS_ID: string;
  readonly VITE_LLM_API_URL: string;
  readonly VITE_RCSB_API_URL: string;
  readonly VITE_UNIPROT_API_URL: string;
  readonly VITE_NCBI_API_URL: string;
  readonly VITE_NCBI_API_KEY: string;
  readonly VITE_PUBCHEM_API_URL: string;
  readonly DEV: boolean;
  readonly MODE: string;
  readonly SSR: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Augment module declarations for types that are not properly declared
declare module "molstar/lib/mol-plugin-ui/react18" {
  export * from "molstar/lib/mol-plugin-ui/react";
}

declare module "react-markdown" {
  import React from "react";
  
  interface ReactMarkdownProps {
    children: string;
    className?: string;
    components?: Record<string, React.ComponentType<any>>;
    remarkPlugins?: any[];
    rehypePlugins?: any[];
  }
  
  const ReactMarkdown: React.FC<ReactMarkdownProps>;
  export default ReactMarkdown;
}

declare module "axios" {
  export interface AxiosRequestConfig {
    baseURL?: string;
    timeout?: number;
    headers?: Record<string, string>;
    params?: Record<string, any>;
  }
  
  export interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: AxiosRequestConfig;
  }
  
  export interface AxiosError<T = any> extends Error {
    config: AxiosRequestConfig;
    code?: string;
    request?: any;
    response?: AxiosResponse<T>;
  }
  
  export interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<AxiosResponse>;
    (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  }
  
  export function create(config?: AxiosRequestConfig): AxiosInstance;
  
  const axios: AxiosInstance & {
    create: typeof create;
    isAxiosError(payload: any): payload is AxiosError;
  };
  
  export default axios;
}

declare module "vite" {
  export function defineConfig(config: any): any;
}

declare module "@vitejs/plugin-react-swc" {
  const plugin: () => any;
  export default plugin;
}

declare module "lovable-tagger" {
  export function componentTagger(): any;
}

declare module "vite-plugin-pwa" {
  export const VitePWA: any;
}

declare module "*.svg" {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

// Zustand store types
declare module "zustand" {
  import { StateCreator } from "zustand/vanilla";
  
  export interface StoreApi<T> {
    getState: () => T;
    setState: (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
    subscribe: (listener: (state: T, prevState: T) => void) => () => void;
    destroy: () => void;
  }
  
  export type UseBoundStore<T> = {
    (): T;
    <U>(selector: (state: T) => U, equalityFn?: (a: U, b: U) => boolean): U;
  } & StoreApi<T>;
  
  export function create<T>(initializer: StateCreator<T>): UseBoundStore<T>;
}

declare module "zustand/middleware" {
  import { StateCreator, StoreApi } from "zustand";
  
  export type Middleware<T> = (
    f: StateCreator<T>
  ) => StateCreator<T>;
  
  export function persist<T>(
    config: {
      name: string;
      getStorage?: () => Storage;
      partialize?: (state: T) => Partial<T>;
      merge?: (persistedState: any, currentState: T) => T;
    }
  ): Middleware<T>;
  
  export function devtools<T>(
    config?: {
      name?: string;
      enabled?: boolean;
    }
  ): Middleware<T>;
}
