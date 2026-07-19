import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parser(text: string) {
  type Word = { text: string; type: 'mention' | 'hashtag' | 'literal' }
  type Words = Word[]

  let words: Words = []

  for (let i = 0; i < text.length; i++) {

    if (text[i] === ' ') {
      continue
    }

    if (text[i] !== ' ') {
      let word: Word = { text: '', type: 'literal' }
      text[i] === '@' ? word.type = 'mention' : text[i] === '#' ? word.type = 'hashtag' : word.type = 'literal'

      while (text[i] !== ' ' && i < text.length) {
        word.text += text[i];
        i++;
      }

      words.push(word)
    }

  }

  return words

  
}