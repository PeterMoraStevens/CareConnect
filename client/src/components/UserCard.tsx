import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../api/firebase";

import { BsFillPinMapFill } from "react-icons/bs";
interface props {
  name: string;
  address: string;
  description: string;
  website: string;
  image?: string;
  hours: any;
  phone: string;
  email: string;
  ref: any;
  i: number;
}

function UserCard({
  name,
  address,
  description,
  image,
  website,
  hours,
  phone,
  email,
  ref,
  i,
}: props) {
  const googleMapsURL = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
  const modalString = `my_modal_${i}`;
  const editModalString = `edit_modal_${i}`;
  const deleteModalString = `delete_modal_${i}`;

  return (
    <>
      <dialog id={modalString} className="modal">
        <div className="modal-box bg-lime-50 p-10">
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="py-2">{description}</p>
          <div
            className="inline-flex items-center gap-1 text-m py-b-2 cursor-pointer underline"
            onClick={() => window.open(googleMapsURL, "_blank")}
          >
            <BsFillPinMapFill className="text-lg text-orange-300" />
            {address}
          </div>
          <p>Hours:</p>

          <div className="mx-auto w-64 text-left">
            Monday:{" "}
            {hours[0].Monday[0]
              ? hours[0].Monday[1].open + " - " + hours[0].Monday[1].close
              : "Closed"}
          </div>
          <div className="mx-auto w-64 text-left">
            Tuesday:{" "}
            {hours[0].Tuesday[0]
              ? hours[0].Tuesday[1].open + " - " + hours[0].Tuesday[1].close
              : "Closed"}
          </div>
          <p className="py-2">
            {" "}
            Contact Info: {phone} | {email}{" "}
          </p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog id={editModalString} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Fields</h3>
          <p className="py-4">form content</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn mr-2 btn-error">Cancel</button>
              <button className="btn btn-success">Save</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id={deleteModalString} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Resource</h3>
          <p className="py-4">you sure?</p>
          <div className="modal-action ">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn mr-2 btn-error">Cancel</button>
              <button
                className="btn btn-success"
                onClick={async () => {
                  try {
                    await deleteDoc(ref);
                    console.log("Document deleted successfully");
                  } catch (error) {
                    console.error("Error deleting document:", error);
                  }
                }}
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="card bg-lime-50 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={image} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>

          <p>{description}</p>
          <div className="inline-flex items-center gap-1 text-m ">
            <BsFillPinMapFill className="text-lg text-orange-300" />
            {address}
          </div>
          <div className="card-actions">
            <button
              onClick={() =>
                document.getElementById(editModalString).showModal()
              }
              className="btn bg-orange-200 text-black hover:bg-orange-400 cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() =>
                document.getElementById(deleteModalString).showModal()
              }
              className="btn btn-error text-black hover:bg-orange-400 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCard;
