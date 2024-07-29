declare type HeaderProps = {
    children: React.ReactNode;
    className?: string
}


declare type RootLayoutProps = {
    children: React.ReactNode;
  }

declare type UserType = "creator" | "editor" | "viewer";

declare type CreateDocumentParams = {
  userId: string;
  email: string;
};

declare type RoomMetadata = {
  creatorId: string;
  email: string;
  title: string;
};

declare type RoomAccesses = Record<string, AccessType>;

declare type DocumentBtnProps ={
  userId: string;
  email: string;
}

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type CollaborativeRoomProps = {
  roomId: string;
  roomMetadata: RoomMetadata;
  usersData: User[];
  currentUserType: Usertype;
}

declare type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
  userType?: UserType;
};

declare type ThreadWrapperProps = { thread: ThreadData<BaseMetadata> };

type ShareModalProps = {
  roomId: string,
  collaborators: User[],
  creatorId: string,
  currentUserType: UserType
}

declare type UserTypeSelectorParams = {
  userType: string,
  setUserType: React.Dispatch<React.SetStateAction<UserType>>,
  onClickHandler?: (value: string) => void;
};

declare type CollaboratorProps = {
  roomId: string;
  email: string;
  creatorId: string;
  collaborator: User;
  user: User;
};

declare type ShareDocumentParams = {
  roomId: string;
  email: string;
  userType: UserType;
  updatedBy: User;
};