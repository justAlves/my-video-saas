import CreateCollectionModal from '@/components/create-collection-modal';
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
    <>
      <CreateCollectionModal/>
      <div className='max-h-screen h-screen w-full bg-background overflow-y-auto'>
        <Header/>
        <Outlet/>
      </div>
    </>
  )
}
