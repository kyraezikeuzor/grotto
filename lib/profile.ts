// lib/profile-reducer.ts
import { bioDefault, postsDefault, highlightsDefault } from '@/lib/defaults'

type Profile = {
    username: string | null | undefined
    name: string | null | undefined
    bio: string | null | undefined
    avatar: string | null | undefined
    followers: number | null | undefined
    posts: any[] | null | undefined
    highlights: any[] | null | undefined
    story: boolean
  }
  
  export const defaultProfile: Profile = {
    username: 'keeks',
    name: 'Kyra Ezikeuzor',
    bio: bioDefault,
    avatar: 'https://github.com/shadcn.png',
    followers: 44000,
    story: true,
    posts: postsDefault,
    highlights: highlightsDefault,
  }

  type Action =
  | { type: 'set'; field: keyof Profile; value: any }
  | { type: 'updatePost'; index: number; image: string }
  | { type: 'updateHighlight'; index: number; field: 'image' | 'name'; value: string }
  | { type: 'reset' }

export function profileReducer(state: Profile, action: Action): Profile {
  switch (action.type) {
    case 'set':
      return { ...state, [action.field]: action.value }
    case 'updatePost': {
      const posts = [...state.posts ?? []]
      posts[action.index] = { ...posts[action.index], image: action.image }
      return { ...state, posts }
    }
    case 'updateHighlight': {
      const highlights = [...state.highlights ?? []]
      highlights[action.index] = { ...highlights[action.index], [action.field]: action.value }
      return { ...state, highlights }
    }
    case 'reset':
      return defaultProfile
    default:
      return state
  }
}