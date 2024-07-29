'use client';

import React from 'react'
import {ClientSideSuspense, LiveblocksProvider} from '@liveblocks/react';
import Loader from '@/components/loader'
import getClerkUser, { getDocumentUsers } from '@/lib/actions/user.action';
import { useUser } from '@clerk/nextjs';


export function Provider({ children }: { children: React.ReactNode }) {

    const {user:clerkUser} = useUser()
    return (
      <LiveblocksProvider 
        authEndpoint={'/api/liveblocks-auth'}
        resolveUsers={ async({userIds}) => {
            const users = await getClerkUser({userIds})
            return users
        }}
        resolveMentionSuggestions={async ({text, roomId}) => {
          const roomUsers = await getDocumentUsers({
            roomId, 
            currentUser: clerkUser?.emailAddresses[0].emailAddress!,
            text
          })

          return roomUsers
        }}
        >
          <ClientSideSuspense fallback={<Loader />}>
            {children}
          </ClientSideSuspense>
      </LiveblocksProvider>
    );
  }
  

export default Provider
