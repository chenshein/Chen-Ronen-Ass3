import "./activecontact.css";
import { AvatarImage } from "../../AvatarImage";

export const ActiveContact = ({ contact }) => {
  return (
    <>
      <div className="row active_contactProfile">
        <div
          className="col-1 position-relative active_contactProfile__image"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasContactChat"
          aria-controls="offcanvasContactChat"
        >
          <AvatarImage
            src={contact.image}
            style={
              contact.active
                ? { border: "2px solid var(--green-color)" }
                : { border: "2px solid var(--orange-color)" }
            }
          />
          {contact.active ? (
            <div className="contactProfile__active"></div>
          ) : null}
        </div>
        <div
          className="col-8 active_contactProfile__info px-5 px-md-4 px-lg-3
                d-flex justify-content-start align-items-end"
        >
          <div className="row contactProfile__info__name">
            <h3>{contact.name}</h3>
            <p>{contact.status}</p>
          </div>
        </div>
      </div>
    </>
  );
};
