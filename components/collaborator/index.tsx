import Image from 'next/image';
import React, { useState } from 'react'
import UserTypeSelector from '../userTypeSelector';
import { Button } from '../ui/button';
import { removeCollaborator, updateDocumentAcess } from '@/lib/actions/room.actions';

const Collaborator = ({roomId, creatorId, collaborator, email, user} : CollaboratorProps) => {

    const [userType, setUserType] = useState(collaborator.userType || 'viewer');
    const [isLoading, setIsLoading] = useState(false)

    const shareDocumentHandler = async (type:string) => {
        setIsLoading(true)

        await updateDocumentAcess({
            roomId,
            email: collaborator.email,
            userType: type as UserType,
            updatedBy: user
        })

        setIsLoading(false)
    }
    const removeCollaboratorHandler = async (email:string ) => {

        setIsLoading(true)

        await removeCollaborator({
            roomId,
            email: email,
        })

        setIsLoading(false)
    }

  return (
    <li className='flex items-center justify-between gap-2 py-3'>
        <div className='flex gap-2'>
            <Image 
                src={collaborator.avatar || '/assets/icons/user.svg'}
                alt='User avatar'
                width={36}
                height={36}
                className='rounded-full'
            />
            <div>
                <p className='line-clamp-1 text-sm font-semibold leading-4
                              text-white'>
                    {collaborator.name}
                    <span className='text-10-regular pl-2 text-blue-100'>
                        {isLoading && 'updating...'}
                    </span>
                </p>
                <p className='text-sm font-light text-blue-100'>
                    {collaborator.email}
                </p>
            </div>
        </div>

        {creatorId === collaborator.id ? (
            <p className='text-sm text-blue-100'>
                Owner
            </p>
        ) : (
            <div className='flex items-center'>
                <UserTypeSelector 
                    userType={userType as UserType}
                    setUserType={setUserType}   
                    onClickHandler={shareDocumentHandler}
                />
                <Button type='button' 
                        onClick={() => {removeCollaboratorHandler(collaborator.email)}}
                        className='ml-2 bg-red-600 hover:bg-red-400'
                        >
                    Remove
                </Button>
            </div>
        )}

    </li>
  )
}

export default Collaborator
