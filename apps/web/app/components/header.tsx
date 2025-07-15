import useGetUser from '@/hooks/use-getuser';
import { VideoIcon } from 'lucide-react'

export default function Header() {

  const { data: user } = useGetUser();

  const getInitials = (name: string) => {
    if (!name) return '';
    const initials = name.split(' ')
    const initialsString = `${initials[0].charAt(0)}${initials[1].charAt(0) || ''}`
    return initialsString.toUpperCase();
  }

  return (
    <header
      className='px-8 py-4 border-b w-full flex justify-between items-center'
    >
      <div className='flex items-center gap-2'>

        <VideoIcon
          className='size-6 text-purple-700'
        />
        <h1 className='text-xl font-bold font-mono'>
          Vixy
        </h1>
      </div>

      {user && user.image ? (
        <img src={user.image} alt="User Avatar" className="w-8 h-8 rounded-full" />
      ) : (
        <div className="w-8 h-8 rounded-full bg-purple-700 flex justify-center items-center text-sm font-bold">
          {getInitials(user?.name)}
        </div>
      )}
      
    </header>
  )
}
