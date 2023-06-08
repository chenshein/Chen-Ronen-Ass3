import { useEffect, useRef } from "react";
import { AvatarImage } from "./AvatarImage";
import "./style/modals.css";

export const Modals = ({
  handleAddContact,
  handleDeleteContact,
  handleUserLogout,
  currentUser,
  contact,
}) => {
  const inputRef = useRef(null);
  const labelRef = useRef(null);
  const handlePassInputValue = async () => {
    const success = await handleAddContact(inputRef.current.value);
    labelRef.current.classList.remove("d-none");
    labelRef.current.classList.remove("text-success");
    labelRef.current.classList.remove("text-danger");
    if (success === -3) {
      labelRef.current.valueOf().innerText = "Please Enter a Username";
      labelRef.current.classList.add("text-danger");
    } else if (success === -2) {
      labelRef.current.valueOf().innerText = `User '${inputRef.current.value}' Already Exists in your Contacts`;
      labelRef.current.classList.add("text-danger");
    } else if (success === -1) {
      labelRef.current.valueOf().innerText = `User '${inputRef.current.value}' Not Found`;
      labelRef.current.classList.add("text-danger");
    } else if (success === -4) {
      labelRef.current.valueOf().innerText =  " You can't add yourself :( ";
      labelRef.current.classList.add("text-danger");
    }
    else {
      labelRef.current.valueOf().innerText = `User '${inputRef.current.value}' Added Successfully`;
      labelRef.current.classList.add("text-success");
    }
    inputRef.current.value = "";
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      await handlePassInputValue();
    }
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    labelRef.current.classList.add("d-none");
    labelRef.current.classList.remove("text-success");
    labelRef.current.classList.remove("text-danger");
    inputRef.current.value = "";
  };

  const handleDelete = () => {
    const backdropEls = document.querySelectorAll(".offcanvas-backdrop");
    backdropEls.forEach((backdropEl) => {
      backdropEl.remove();
    });
    handleDeleteContact(contact);
  };

  useEffect(() => {
    const modalEl = document.querySelector("#addUserModal");
    modalEl.addEventListener("hidden.bs.modal", handleCloseModal);

    const handleBackdropClick = (event) => {
      if (event.target.classList.contains("offcanvas-backdrop")) {
        const backdropEls = document.querySelectorAll(".offcanvas-backdrop");
        backdropEls.forEach((backdropEl) => {
          backdropEl.remove();
        });
      }
    };

    document.addEventListener("click", handleBackdropClick);

    return () => {
      modalEl.removeEventListener("hidden.bs.modal", handleCloseModal);
      document.removeEventListener("click", handleBackdropClick);
    };
  }, []);

  return (
    <>
      {/* Modal To Add User */}
      <div
        className="modal fade"
        id="addUserModal"
        tabIndex="-1"
        aria-labelledby="ModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog user-adding">
          <div className="modal-content user-adding d-block border-gradient boreder-gradient--blue">
            <button
              type="button"
              className="btn-close boxShadow float-end"
              data-animation="fadeOut"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseModal}
            ></button>
            <div className="modal-title user-adding">
              <div className="d-block">
                <h1>
                  <link
                    rel="prefetch"
                    href="https://gist.githubusercontent.com/RonenSiv/ab0bde7c3380691c7cf5117063970016/raw/ed0819d88e6670986d59344165cc1346de89313e/illustration.svg"
                  />
                  <img
                    src="https://gist.githubusercontent.com/RonenSiv/ab0bde7c3380691c7cf5117063970016/raw/ed0819d88e6670986d59344165cc1346de89313e/illustration.svg"
                    alt="Add user"
                    width="400px"
                    height="315px"
                    loading="lazy"
                    className="object-fit-cover img-fluid"
                  />
                </h1>
                <h1 className="fs-5 mt-1" id="ModalLabel">
                  Add new contact
                </h1>
                <p className="text-muted">
                  Enter an identifier below to add a new contact
                </p>
              </div>
            </div>
            <div className="form-floating my-3 mx-5 user-adding">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Contact's identifier"
                ref={inputRef}
                onKeyDown={handleKeyDown}
              />
              <label htmlFor="floatingInput">Contact's identifier</label>
            </div>
            <label id="modal-result-label" className="d-none" ref={labelRef} />
            <div className="modal-footer user-adding">
              <button
                type="button"
                className="btn ripple btn-add-user"
                style={{ background: "var(--blue-color)", color: "white" }}
                onClick={handlePassInputValue}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Off canvas Modal To Show User Info */}
      {contact && (
        <div
          className="offcanvas offcanvas-start"
          data-bs-scroll="true"
          tabIndex="-1"
          id="offcanvasContactChat"
          aria-labelledby="offcanvasContactChatLabel"
        >
          <div className="offcanvas-header bg-body-secondary">
            <div
              className="offcanvas-title text-white text-center w-100"
              id="offcanvasContactChatLabel"
            >
              <div className="row justify-content-end me-1">
                <button
                  type="button"
                  className="btn-close boxShadow float-end"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>

              <AvatarImage
                src={contact.image}
                alt={contact.name}
                width="250px"
                height="250px"
                style={{
                  border: `7px solid ${
                    contact.active ? "var(--green-color)" : "var(--green-red)"
                  }`,
                }}
              />

              <h3>{contact.name}</h3>
              <ul>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
                  </svg>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    // onClick={handleDelete}
                    data-bs-toggle="modal"
                    data-bs-target="#deleteUserModal"
                    data-bs-dismiss="offcanvas"
                  >
                    <path d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z" />
                  </svg>
                </li>
              </ul>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Status</div>
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p>{contact.status}</p>
              </blockquote>
            </div>
          </div>
          <div className="offcanvas-body overflow-auto">
            <div className="card bg-light">
              {contact &&
                contact.chatHistory &&
                contact.chatHistory.get(currentUser.id) && (
                  <div className="card-body">
                    <h5 className="card-title">Last massage</h5>
                    <p className="card-text">
                      {contact.chatHistory.get(currentUser.id)[
                        contact.chatHistory.get(currentUser.id).length - 1
                      ].message.length > 100
                        ? contact.chatHistory
                            .get(currentUser.id)
                            [
                              contact.chatHistory.get(currentUser.id).length - 1
                            ].message.slice(0, 100) + "..."
                        : contact.chatHistory.get(currentUser.id)[
                            contact.chatHistory.get(currentUser.id).length - 1
                          ].message}
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Delete user confirmation modal */}
      {contact && (
        <div
          className="modal fade"
          id="deleteUserModal"
          tabIndex="-1"
          aria-labelledby="deleteUserModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={{ backgroundColor: "#E9ECEF" }}
            >
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="deleteUserModalLabel">
                  Remove {contact.name} from your Contacts list?
                </h1>
                <button
                  type="button"
                  className="btn-close boxShadow float-end"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Once deleted you can re-add the contact and all you chat
                  messages will be saved
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  data-bs-dismiss="modal"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*  Log out modal*/}
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        aria-labelledby="logoutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="logoutModalLabel">
                You are about to log out
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Are you sure you want to log out?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleUserLogout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
