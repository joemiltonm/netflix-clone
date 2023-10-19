import { NextPageContext } from 'next'
import {getSession, signOut} from 'next-auth/react'
import useCurrentUser from '@/hooks/useCurrentUser';
import Navbar from "../components/Navbar"
import BillBoard from '@/components/Billboard';

export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);
  if (!session){
    return {
      redirect:{
        destination: '/Auth',
        permanent: false
      }
    }
  }

  return {
    props : {}
  }

}


export default function Home() {
  const { data: user } = useCurrentUser();


  return (
    <div>
      <Navbar/>
      <BillBoard/>
    </div>
  )
}


