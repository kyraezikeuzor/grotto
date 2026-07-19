import { useState, useRef, useEffect, ReactNode } from 'react'
import { SquarePen } from 'lucide-react'

export const Editable = ({
  value,
  onChange,
  type = 'text',
  children,
  className,
}: {
  value: string
  onChange?: (value: string) => void
  type?: 'text' | 'file'
  children: ReactNode
  className?: string
}) => {
  const [editing, setEditing] = useState(false)
  const [hover, setHover] = useState(false)
  const textRef = useRef<HTMLSpanElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing && textRef.current) {
      textRef.current.focus()
      const range = document.createRange()
      range.selectNodeContents(textRef.current)
      range.collapse(false)
      const sel = window.getSelection()
      sel?.removeAllRanges()
      sel?.addRange(range)
    }
  }, [editing])

  // NOT EDITABLE — no onChange passed, render static content, no interactivity
  if (!onChange) {
    return <span className={className}>{children}</span>
  }

  // FILE MODE — click anywhere in children, swap image
  if (type === 'file') {
    return (
      <div
        className={`relative cursor-pointer group ${className}`}
        onClick={() => fileRef.current?.click()}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <input
          ref={fileRef}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              const reader = new FileReader()
              reader.onload = () => onChange(reader.result as string)
              reader.readAsDataURL(file)
            }
            e.target.value = ''
          }}
        />
        {children}
        {hover && (
          <div className='absolute inset-0 bg-black/40 flex items-center justify-center rounded-[inherit]'>
            <SquarePen className='w-6 h-6 text-white' />
          </div>
        )}
      </div>
    )
  }

  // TEXT MODE — contentEditable span, seamless inline editing
  const commit = () => {
    setEditing(false)
    const text = textRef.current?.textContent?.trim() || value
    onChange(text)
  }

  return (
    <span
      ref={textRef}
      contentEditable={editing}
      suppressContentEditableWarning
      onClick={() => !editing && setEditing(true)}
      onBlur={() => editing && commit()}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          textRef.current?.blur()
        }
        if (e.key === 'Escape') {
          if (textRef.current) textRef.current.textContent = value
          setEditing(false)
        }
      }}
      className={`cursor-pointer outline-none rounded ${editing ? 'ring-4 ring-blue-300 px-1 -mx-1' : 'hover:bg-neutral-100 px-1 -mx-1'} ${className}`}
    >
      {editing ? value : children}
    </span>
  )
}