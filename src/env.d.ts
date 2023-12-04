/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };

type Tag = {
  id: number,
  user_id: number,
  name: string,
  sign: string,
  kind: expenses | income
}