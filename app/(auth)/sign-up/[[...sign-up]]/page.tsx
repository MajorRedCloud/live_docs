import React from 'react'
import { SignUp as Sp } from '@clerk/nextjs'


const SignUp = () => {
  return (
    <main className='auth-page'>
        <Sp />
    </main>
  )
}

export default SignUp
