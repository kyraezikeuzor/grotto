import { get, set, del } from 'idb-keyval'

export async function saveImage(id: string, dataUrl: string) {
  await set(id, dataUrl)
}

export async function loadImage(id: string): Promise<string | undefined> {
  return get(id)
}

export async function deleteImage(id: string) {
  await del(id)
}

// True if a string looks like a stored-image ID rather than a raw URL/base64 —
// lets components handle both old (pre-refactor) and new profiles gracefully.
export function isImageId(value: string | undefined | null): boolean {
  if (!value) return false
  return !value.startsWith('http') && !value.startsWith('data:') && !value.startsWith('blob:')
}