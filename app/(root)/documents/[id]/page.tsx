import CollaborativeRoom from '@/components/collaborativeRoom'
import { getDocument } from '@/lib/actions/room.actions'
import getClerkUser from '@/lib/actions/user.action'
import { useClerk } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const Document = async ({params: { id }}: SearchParamProps) => {

  // Get the current user
  const clerkUser = await currentUser()
  if (!clerkUser) redirect('/log-in')

  // Get the room
  const room = await getDocument({
      roomId:id, 
      userId:clerkUser.emailAddresses[0].emailAddress
    })

  if(!room) redirect('/')


    const userIds = Object.keys(room.usersAccesses)
    const users = await getClerkUser({userIds})


    const usersData = users.map((user : User ) => ({
      ...user,
      userType : room.usersAccesses[user.email]?.includes('room:write')
      ? 'editor'
      : 'viewer'
    }))
    
    const currentUserType = room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write')
    ? 'editor' : 'viewer'



  return (
    <main>
      <CollaborativeRoom 
        roomId = {id}
        roomMetadata = {room.metadata}
        usersData = {usersData}
        currentUserType = {currentUserType}
      />
    </main>
  )
}

export default Document
