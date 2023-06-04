import icons from "../../../../../assets/Icons";

export const NoContactsChatScreen = () => {
  return (
    <>
      <div className="row justify-content-center align-items-center position-relative active_contactProfile__none ">
        <img
          src={icons.noContact}
          alt="no contact"
          className="img-fluid"
          width="200px"
          height="200px"
          loading="lazy"
          id="no-contact-img"
        />
        <div className="col-12 text-center ">
          <h1 className="text-muted bg-primary rounded p-3">
            Select a contact to start chatting!
          </h1>
        </div>
      </div>
    </>
  );
};
