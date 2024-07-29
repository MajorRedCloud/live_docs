import { useIsThreadActive } from '@liveblocks/react-lexical'
import { Composer, Thread } from '@liveblocks/react-ui'
import { useThreads as UseThreads} from '@liveblocks/react/suspense'
import React from 'react'
import { cn } from '@/lib/utils'

const ThreadWrapper = ({thread}: ThreadWrapperProps) => {

    const isActive = useIsThreadActive(thread.id);

    return(
        <Thread 
        thread={thread}
        data-state={isActive ? 'active' : null}   
        className={cn('comment-thread border',
            isActive && '!border-blue-500 shadow-md',
            thread.resolved && 'opacity-40'
        )}
        />
    )
}

const index = () => {
    const {threads} = UseThreads()

  return (
    <div className='mb-10 space-y-4 lg:w-fit flex w-full flex-col items-center justify-center'>
      <Composer className='w-full max-w-[800px] border border-dark-300 bg-dark-200 shadow-sm lg:w-[350px]'/>
      
      {threads.map((thread) => (<ThreadWrapper key={thread.id} thread={thread} />))}
          
    </div>
  )
}

export default index
