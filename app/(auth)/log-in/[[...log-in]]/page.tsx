import React from 'react'
import { SignIn } from '@clerk/nextjs'


const LogIn = () => {
  return (
    <main className='auth-page'>
        <SignIn />
    </main>
  )
}

export default LogIn
