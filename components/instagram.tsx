'use client'
import { ChevronLeft, BadgeCheck, UserRoundPlus, Dot, Grid3x3, Repeat, ContactRound, StickyNotes } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar"
import { followedBy, highlightsDefault, postsDefault, bioDefault } from '@/lib/defaults'
import { Button } from '@/components/button'
import { Switch } from '@/components/switch'
import { Separator } from '@/components/separator'
import { parser } from '@/lib/utils'
import { Editable } from '@/components/editable'
import { defaultProfile } from '@/lib/profile'
import { useEffect } from 'react'
import { useReducer } from 'react'
import { profileReducer } from '@/lib/profile'

export const Header = ({username, onChange}: {username: string | null | undefined, onChange: (value: string) => void}) => {
    let activeUsername = username ?? 'keeks' 
    
    return (
        <div className='w-full max-w-md p-4'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-row items-center gap-2'>
                    <ChevronLeft className='w-10 h-10  -ml-2' />
                    <div className='flex flex-row items-center gap-2'>
                        <h1 className='text-2xl font-bold tracking-tight leading-none'>
                        <Editable type='text' value={activeUsername} onChange={onChange} className='text-2xl font-bold tracking-tight leading-none'>
                            {activeUsername}
                        </Editable>
                        </h1>
                        <BadgeCheck className='w-6 h-6 fill-blue-400 text-white' />
                    </div>
                </div>
                <div className='flex flex-row items-center text-center justify-center gap-[1px] text-3xl '>
                    <Dot className='w-6 h-6' />
                    <Dot className='w-6 h-6 -ml-4' />
                    <Dot className='w-6 h-6 -ml-4' />
                </div>
            </div>
        </div>
    )
}

export const Metric = ({
    title,
    number,
    onChange,
  }: {
    title: string
    number: number
    onChange?: (value: number) => void
  }) => {
    const display = number > 1000 ? `${(number / 1000).toFixed(0)}K` : String(number)
  
    if (!onChange) {
      return (
        <div className='flex flex-col items-center gap-1'>
          <span className='text-lg font-bold tracking-tight leading-none'>{display}</span>
          <span className='text-md leading-none'>{title}</span>
        </div>
      )
    }
  
    const parseInput = (raw: string) => {
      const trimmed = raw.trim().toUpperCase()
      if (trimmed.endsWith('K')) {
        const base = parseFloat(trimmed.slice(0, -1))
        return isNaN(base) ? number : Math.round(base * 1000)
      }
      const parsed = parseInt(trimmed.replace(/[^0-9]/g, ''), 10)
      return isNaN(parsed) ? number : parsed
    }
  
    return (
      <div className='flex flex-col items-center gap-1'>
        <Editable type='text' value={display} onChange={(raw) => onChange(parseInput(raw))} className='text-lg font-bold tracking-tight leading-none'>
          {display}
        </Editable>
        <span className='text-md leading-none'>{title}</span>
      </div>
    )
  }

export const Summary = ({
    story,
    name,
    followers,
    avatar,
    onChangeName,
    onChangeAvatar,
    onChangeFollowers,
  }: {
    story: boolean
    name: string | null | undefined
    followers: number | null | undefined
    avatar: string | null | undefined
    onChangeName: (value: string) => void
    onChangeAvatar: (value: string) => void
    onChangeFollowers: (value: number) => void
  }) => {
    
    let activeAvatar = avatar ?? 'https://github.com/shadcn.png'
    let activeName = name ?? 'Kyra Ezikeuzor'
    let activeFollowers = followers ?? 46000

    return (
        <div className='w-full max-w-md pl-4  pr-6 py-4 '>
            <div className='flex flex-row items-center gap-2 '>
                
                <div className={`${ story ? 'bg-orange-600' : 'bg-neutral-200'} w-38 h-auto p-[3px] rounded-full flex flex-col items-center justify-center`}>  
                    <Editable type='file' value={activeAvatar} onChange={onChangeAvatar} className='rounded-full overflow-hidden'>
                        <Avatar className='w-28 h-28 p-1 bg-white flex items-center justify-center'>
                            <AvatarImage src={activeAvatar} className=' bg-white flex items-center justify-center' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </Editable>
                </div>

                <div className='w-full flex flex-col items-start gap-4 '>   
                    <h2 className='text-md font-medium tracking- leading-none'>
                        <Editable type='text' value={activeName} onChange={onChangeName} className='text-md font-medium tracking- leading-none'>
                            {activeName}
                        </Editable>
                    </h2>
                    <div className='w-full flex flex-row items-center justify-between gap-2'>
                        <Metric title='Posts' number={33} />
                        <Metric title='Followers' number={activeFollowers} onChange={onChangeFollowers} />
                        <Metric title='Following' number={11} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const Bio = ({ onChange }: { bio: string | null | undefined; onChange: (value: string) => void }) => {
    const activeBio = bioDefault
    return (
        <div className='w-full max-w-md px-4 '>
            <Editable type='text' value={activeBio} onChange={onChange} className='text-md tracking-wide leading-none'>
                <span className='text-md tracking-wide leading-none'>
                    {parser(activeBio)?.map((word: any) => (
                        <span key={word.text}>
                            {word.type === 'mention' ? <span className='text-blue-500'>{word.text}</span>
                            : word.type === 'hashtag' ? <span className='text-blue-500'>{word.text}</span>
                            : <span>{word.text}</span>}{" "}
                        </span>
                    ))}
                </span>
            </Editable>
        </div>
    )
}

export const FollowedBy = () => {
    return (
        <div className='w-full max-w-md p-4 flex flex-row gap-6 items-center justify-center'>
            <div className='flex flex-row items-center '>
                {followedBy.map((follower: any) => (
                    <Avatar className='w-10 h-10 rounded-full -mr-2' key={follower.username}>
                        <AvatarImage src={follower.image} className='w-10 h-10  border-2 border-white'/>
                        <AvatarFallback>{follower.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                ))}
            </div>

            <p className='text-md tracking-wide leading-5'>
                Followed by {""}
                <b > {followedBy.map((follower: any) => follower.username).join(', ')}</b>{" "}
                and <b>90 others</b>
            </p> 
        </div>
    )
}

export const Suggestions = () => {
    return (
        <div className='w-full max-w-md p-4 flex flex-row gap-1 items-center justify-center'>
            <Button  className='w-4/9 py-4 text-md font-bold bg-blue-600 text-white hover:bg-blue-700'>
                Follow
            </Button>
            <Button className='w-4/9 py-4 text-md font-bold bg-neutral-200 text-black hover:bg-neutral-300' >
                Message
            </Button>
            <Button size="icon" className='w-1/9 py-4 bg-neutral-200 text-black hover:bg-neutral-300'>
                <UserRoundPlus className='w-4 h-4' />
            </Button>
        </div>
    )
}

export const Highlights = ({
    highlights,
    onChange,
  }: {
    highlights: any[] | null | undefined
    onChange?: (index: number, field: 'image' | 'name', value: string) => void
  }) => {
    const activeHighlights = (!highlights || highlights.length === 0 ? highlightsDefault : highlights).filter(Boolean)

  
    return (
      <div className='w-full max-w-md p-4 flex flex-row gap-2 items-center justify-between'>
        {activeHighlights.map((highlight: any, i: number) => (
          <div className='flex flex-col gap-2 items-center justify-center' key={i}>
            <Editable
              type='file'
              value={highlight.image}
              onChange={onChange ? (url) => onChange(i, 'image', url) : undefined}
              className='rounded-full overflow-hidden'
            >
              <img
                src={highlight.image}
                alt='highlight'
                className='w-20 object-cover rounded-full p-1 border-3 border-gray-300'
              />
            </Editable>
            <Editable
              type='text'
              value={highlight.name}
              onChange={onChange ? (name) => onChange(i, 'name', name) : undefined}
              className='text-sm font-medium tracking-wide leading-none'
            >
              {highlight.name}
            </Editable>
          </div>
        ))}
      </div>
    )
  }

export const Toggles = () => {
    return (
        <div className='w-full max-w-md p-4 pb-1 flex flex-row items-center justify-center'>
           <div className='w-[90%] flex flex-row items-center justify-between'>
                <div className='w-28 px-4 gap-1 flex flex-col items-center justify-center'>
                    <Grid3x3 className='w-10 h-10 fill-black text-white' />
                    <Separator className=' p-[1.5px] bg-black' />
                </div>
                <div className='w-28 flex flex-col items-center justify-center'>
                    <Repeat className='w-8 h-8 text-neutral-500' />
                </div>
                <div className='w-28 flex flex-col items-center justify-center'>
                    <ContactRound className='w-8 h-8 text-neutral-500' />
                </div>
           </div>
        </div>
    )
}

export const Posts = ({
    posts,
    onChange,
  }: {
    posts: any[] | null | undefined
    onChange?: (index: number, image: string) => void
  }) => {
    const activePosts = !posts || posts.length === 0 ? postsDefault : posts
  
    return (
      <div className='w-full max-w-md grid grid-cols-3 gap-[2px]'>
        {activePosts.map((post: any, i: number) => (
          <Editable
            key={i}
            type='file'
            value={post.image}
            onChange={onChange ? (url) => onChange(i, url) : undefined}
            className='w-full h-48 relative block'
          >
            <img src={post.image} alt='post' className='w-full h-full object-cover' />
            {post.carousel && (
              <StickyNotes className='w-4 h-4 fill-white text-white absolute top-2 right-2' />
            )}
          </Editable>
        ))}
      </div>
    )
}


export const Settings = ({
    story,
    onChangeStory,
    onReset,
  }: {
    story: boolean
    onChangeStory: (value: boolean) => void
    onReset: () => void
  }) => {
    return (
      <div className='w-full max-w-md p-4 flex items-center justify-between border-t border-neutral-200 mt-2'>
        <div className='flex items-center gap-2'>
          <Switch checked={story} onCheckedChange={onChangeStory} />
          <span className='text-sm text-neutral-600'>Story ring</span>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' onClick={onReset}>Reset</Button>
        </div>
      </div>
    )
}


const STORAGE_KEY = 'grotto-profile'

function loadProfile() {
  if (typeof window === 'undefined') return defaultProfile // SSR guard
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : defaultProfile
  } catch {
    return defaultProfile
  }
}

export default function Instagram() {
    const [profile, dispatch] = useReducer(profileReducer, undefined, loadProfile)

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
      }, [profile])
  
    const set = (field: keyof typeof profile) => (value: any) =>
      dispatch({ type: 'set', field, value })
  
    return (
    <div className='w-full max-w-md px-2'>
        <div className='w-full max-w-md border-[2px] border-neutral-200 rounded-4xl'>
            <Header username={profile.username} onChange={set('username')} />
            <Summary
                story={profile.story}
                name={profile.name}
                followers={profile.followers}
                avatar={profile.avatar}
                onChangeName={set('name')}
                onChangeAvatar={set('avatar')}
                onChangeFollowers={set('followers')}
            />
            <Bio bio={profile.bio} onChange={set('bio')} />
            <FollowedBy />
            <Suggestions />
            <Highlights
                highlights={profile.highlights}
                onChange={(i, field, value) => dispatch({ type: 'updateHighlight', index: i, field, value })}
            />
            <Toggles />
            <Posts
                posts={profile.posts}
                onChange={(i, url) => dispatch({ type: 'updatePost', index: i, image: url })}
            />
        </div>
        <Settings
            story={profile.story}
            onChangeStory={set('story')}
            onReset={() => dispatch({ type: 'reset' })}
        />
    </div>
      
    )
  }