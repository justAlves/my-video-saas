import Header from '@/components/header';
import  { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

export default function AppLayout() {

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token ) {
      navigate("/login", { replace: true });
    }

  }, [])

  return (
    <div className='max-h-screen h-screen w-full bg-background'>
      <Header/>
      <div className='md:px-64 px-8 py-32'>
        <Outlet/>
      </div>
    </div>
  )
}
