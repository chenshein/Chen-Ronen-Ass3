import { AvatarImage } from "../../AvatarImage";
import { UserInfo } from "./UserInfo";
import { AddContact } from "../AddContact";
import "./UserDetails.css";
import { UserExit } from "./UserExit";

export const UserDetails = ({ currentUser, handleUserLogout }) => {
  return (
    <>
      <div className="row userProfile">
        <div
          className="col-1
                userProfile__avatar"
        >
          <AvatarImage
            src={currentUser.image}
            width="50px"
            height="50px"
            alt="avatar"
          />
        </div>
        <div className="col-6 col-lg-8 userProfile__info px-5">
          <UserInfo>{currentUser.name}</UserInfo>
        </div>
        <div className="col-1 offset-3 offset-md-0 userProfile__icons">
          <AddContact />
        </div>
        <div className="col-1 offset-0 userProfile__icons justify-content-start">
          <UserExit handleUserLogout={handleUserLogout} />
        </div>
      </div>
    </>
  );
};
