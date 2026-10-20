import { parse } from 'smol-toml';

export function parseToml<T>(content: string): T {
  // Normalize null-prototype TOML tables for React Server Component props.
  return JSON.parse(JSON.stringify(parse(content, { unsafeKeyBehaviour: 'throw' }))) as T;
}
