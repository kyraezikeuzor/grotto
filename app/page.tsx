import Image from "next/image";
import Instagram from '@/components/instagram'

import { 
  highlightsDefault, 
  postsDefault, 
  bioDefault
} from '@/lib/defaults'

export default function Home() {

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black ">
      <h1 className="text-xl font-bold py-3">Grotto</h1>
      <Instagram/>

    </div>
  );
}
