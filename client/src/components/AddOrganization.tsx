import React, { useState } from "react";

const AddOrganization = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [dayStatus, setDayStatus] = useState<Record<string, boolean>>({
    Sunday: true,
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
  });

  // State to hold user input values:
  const [organizationName, setOrganizationName] = useState("");
  //hours
  const [address, setAddress] = useState("");
  //photos
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleDayStatusChange = (day: string, isOpen: boolean) => {
    setDayStatus((prevStatus) => ({
      ...prevStatus,
      [day]: isOpen,
    }));
  };

  const openModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  // Function to log the state
  const logState = () => {
    console.log("Organization Name:", organizationName);
    console.log("Address:", address);
    console.log("Phone Number:", phoneNumber);
    console.log("Email:", email);
    console.log("Website:", website);
    console.log("Selected Image:", selectedImage ? selectedImage.name : "None");
    console.log("Day Status:", dayStatus);
  };

  return (
    <>
      <div className=" flex items-center justify-center mt-50 text-4xl">
        <button className="btn text-5xl" onClick={openModal}>
          Create New Organization
        </button>
      </div>
      <dialog id="my_modal_1" className="modal">
        <form action="">
          <div className="modal-box w-[690px] max-w-none">
            <h3 className="font-bold text-2xl">Add new Item</h3>
            <p className="py-4">Add a service your organization offers...</p>

            <div id="name" className="mt-5">
              <h3 className="pb-4 font-bold">Name of Organization</h3>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w"
                required
                onChange={(e) => setOrganizationName(e.target.value)}
              />
            </div>

            <div id="hours" className="mt-5">
              <h3 className="pb-4 font-bold">Hours:</h3>
              <ul className="list-disc pl-5 list-none">
                {[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <li key={day} className="mb-4">
                    <div className="flex items-center gap-4">
                      <span className="font-bold">{day}:</span>
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={`${day}-status`}
                          value="open"
                          className="radio"
                          checked={dayStatus[day]}
                          onChange={() => handleDayStatusChange(day, true)}
                        />
                        <span>Open</span>
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={`${day}-status`}
                          value="closed"
                          className="radio"
                          checked={!dayStatus[day]}
                          onChange={() => handleDayStatusChange(day, false)}
                        />
                        <span>Closed</span>
                      </label>

                      {dayStatus[day] && (
                        <>
                          <input
                            type="number"
                            min="1"
                            max="12"
                            placeholder="1"
                            className="input input-bordered w-16"
                          />
                          <select
                            className="select select-bordered"
                            defaultValue="am"
                          >
                            <option value="am">AM</option>
                            <option value="pm">PM</option>
                          </select>
                          <input
                            type="number"
                            min="1"
                            max="12"
                            placeholder="1"
                            className="input input-bordered w-16"
                          />
                          <select
                            className="select select-bordered"
                            defaultValue="pm"
                          >
                            <option value="am">AM</option>
                            <option value="pm">PM</option>
                          </select>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div id="address" className="mt-5">
              <h3 className="pb-4 font-bold">Enter Address</h3>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w"
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div id="img" className="mt-5">
              <h3 className="pb-4 font-bold">Select Image</h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full max-w"
                required
              />
              {selectedImage && (
                <div className="mt-4">
                  <p className="font-bold">Selected Image:</p>
                  <p>{selectedImage.name}</p>
                </div>
              )}
            </div>

            <div id="phone" className="mt-5">
              <h3 className="pb-4 font-bold">Enter Phone Number</h3>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w"
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div id="email" className="mt-5">
              <h3 className="pb-4 font-bold">Enter Email</h3>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div id="Website" className="mt-5">
              <h3 className="pb-4 font-bold">Enter Website URL</h3>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w"
                required
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
              
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={logState} // Log state when this button is clicked
              >
                Log State
              </button>
              <button className="btn">Close</button>
            </div>

            <div className="modal-action">
              <button className="btn">Close</button>
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default AddOrganization;
