import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserTypeSelector = ({
  userType,
  setUserType,
  onClickHandler,
}: UserTypeSelectorParams) => {

    const accessValueChange = (type: UserType) => {
        setUserType(type)
        // onClickHandler(type)
    }

  return (
    <Select value={userType} onValueChange={(type: UserType) => accessValueChange(type)}>
      <SelectTrigger className="w-fit border-none bg-transparent text-blue-100 !important">
        <SelectValue/>
      </SelectTrigger>
      <SelectContent className="border-none bg-dark-200">
        <SelectItem value="viewer" className="shad-select-item">can view</SelectItem>
        <SelectItem value="editor" className="shad-select-item">can edit</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserTypeSelector;
