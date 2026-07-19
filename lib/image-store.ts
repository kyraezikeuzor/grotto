// lib/image-store.ts
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