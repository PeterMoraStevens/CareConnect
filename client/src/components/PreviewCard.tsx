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
}

function PreviewCard({
  name,
  address,
  description,
  image,
  website,
  hours,
  phone,
  email,
  i
}: props) {
  const googleMapsURL = `https://www.google.com/maps/dir/?api=1&destination=${address}`;

  const modalString = `my_modal_${i}`

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
          <div className="mx-auto w-64 text-left">
            Wednesday:{" "}
            {hours[0].Wednesday[0]
              ? hours[0].Wednesday[1].open + " - " + hours[0].Wednesday[1].close
              : "Closed"}
          </div>
          <div className="mx-auto w-64 text-left">
            Thursday:{" "}
            {hours[0].Thursday[0]
              ? hours[0].Thursday[1].open + " - " + hours[0].Thursday[1].close
              : "Closed"}
          </div>
          <div className="mx-auto w-64 text-left">
            Friday:{" "}
            {hours[0].Friday[0]
              ? hours[0].Friday[1].open + " - " + hours[0].Friday[1].close
              : "Closed"}
          </div>
          <div className="mx-auto w-64 text-left">
            Saturday:{" "}
            {hours[0].Saturday[0]
              ? hours[0].Saturday[1].open + " - " + hours[0].Saturday[1].close
              : "Closed"}
          </div>
          <div className="mx-auto w-64 text-left">
            Sunday:{" "}
            {hours[0].Sunday[0]
              ? hours[0].Sunday[1].open + " - " + hours[0].Sunday[1].close
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
      <div
        className="card bg-lime-50 w-96 shadow-xl cursor-pointer"
        onClick={() => document.getElementById(modalString).showModal()}
      >
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
              onClick={() => window.open(website, "_blank")}
              className="btn bg-orange-300 text-black hover:bg-orange-400"
            >
              Visit Website
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PreviewCard;
