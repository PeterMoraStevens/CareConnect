import React, { useState } from "react";
import { auth, db } from "../api/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

const closeModal = () => {
  const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
  if (modal) {
    modal.close();
  }
};

const uploadImage = async (image: File) => {
  if (!image) return null;

  const storage = getStorage();

  // Generate a unique filename using timestamp
  const storageRef = ref(storage, `uploads/${Date.now()}-${image.name}`);

  try {
    const snapshot = await uploadBytes(storageRef, image);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error("Error uploading image: ", error);
    return null;
  }
};

async function addResource(resourceData: any) {
  // Replace 'any' with your resource data type
  try {
    const resourcesCollection = collection(db, "resources");
    const docRef = await addDoc(resourcesCollection, resourceData);
    console.log("Resource added with ID: ", docRef.id);
    return docRef.id; // Optionally return the generated ID
  } catch (error) {
    console.error("Error adding resource: ", error);
    throw error; // Re-throw the error for handling in the calling function
  }
}

const AddOrganization = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [dayStatus, setDayStatus] = useState<Record<string, boolean>>({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: true,
  });
  const [userId, setUserId] = useState<string>("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setUserId(uid);
    } else {
      console.error("user is logged out");
    }
  });

  // State to hold user input values:
  const [organizationName, setOrganizationName] = useState("");
  const [hours, setHours] = useState<any>({
    Monday: { open: "", close: "" },
    Tuesday: { open: "", close: "" },
    Wednesday: { open: "", close: "" },
    Thursday: { open: "", close: "" },
    Friday: { open: "", close: "" },
    Saturday: { open: "", close: "" },
    Sunday: { open: "", close: "" },
  });
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

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

  const handleHourChange = (
    day: string,
    type: "open" | "close",
    value: string
  ) => {
    setHours((prevHours: any) => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        [type]: value,
      },
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
    console.log("Hours:", hours);
  };

  return (
    <>
      <div className="flex items-center justify-center text-2xl">
        <button className="btn text-xl" onClick={openModal}>
          Create New Organization
        </button>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-[690px] max-w-none">
          <h3 className="font-bold text-2xl">Add new Item</h3>
          <p className="py-4">Add a service your organization offers...</p>

          <form action="">
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

            <div id="desc" className="mt-5">
              <h3 className="pb-4 font-bold">Describe your organization</h3>
              <textarea
                placeholder="Type here"
                className="textarea w-full max-w"
                required
                maxLength={310}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div id="name" className="mt-5">
              <h3 className="pb-4 font-bold">State of Organization</h3>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w"
                required
                onChange={(e) => setState(e.target.value)}
              />
            </div>

            <div id="name" className="mt-5">
              <h3 className="pb-4 font-bold">City of Organization</h3>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w"
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div id="hours" className="mt-5">
              <h3 className="pb-4 font-bold">Hours:</h3>
              <ul className="list-disc pl-5 list-none">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
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
                            value={hours[day].open}
                            onChange={(e) =>
                              handleHourChange(day, "open", e.target.value)
                            }
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
                            value={hours[day].close}
                            onChange={(e) =>
                              handleHourChange(day, "close", e.target.value)
                            }
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
          </form>
          <div className="modal-action">
            <button className="btn" onClick={() => closeModal()}>
              Close
            </button>
            <button
              className="btn btn-success"
              onClick={async () => {
                if (!userId) {
                  console.error("User ID not available");
                  return;
                }

                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                  console.error("User document not found");
                  return;
                }

                const data = docSnap.data();
                const resourcesArray = Array.isArray(data?.resources)
                  ? data.resources
                  : [];

                try {
                  let imageUrl = null;
                  if (selectedImage) {
                    imageUrl = await uploadImage(selectedImage);
                  }

                  const newResourceData = {
                    name: organizationName,
                    url: website,
                    address: address,
                    email: email,
                    phone: phoneNumber,
                    city: city,
                    state: state,
                    desc: desc,
                    img: imageUrl,
                    hours: [
                      {
                        Monday: [
                          dayStatus["Monday"],
                          {
                            open: hours["Monday"].open,
                            close: hours["Monday"].close,
                          },
                        ],
                        Tuesday: [
                          dayStatus["Tuesday"],
                          {
                            open: hours["Tuesday"].open,
                            close: hours["Tuesday"].close,
                          },
                        ],
                        Wednesday: [
                          dayStatus["Wednesday"],
                          {
                            open: hours["Wednesday"].open,
                            close: hours["Wednesday"].close,
                          },
                        ],
                        Thursday: [
                          dayStatus["Thursday"],
                          {
                            open: hours["Thursday"].open,
                            close: hours["Thursday"].close,
                          },
                        ],
                        Friday: [
                          dayStatus["Friday"],
                          {
                            open: hours["Friday"].open,
                            close: hours["Friday"].close,
                          },
                        ],
                        Saturday: [
                          dayStatus["Saturday"],
                          {
                            open: hours["Saturday"].open,
                            close: hours["Saturday"].close,
                          },
                        ],
                        Sunday: [
                          dayStatus["Sunday"],
                          {
                            open: hours["Sunday"].open,
                            close: hours["Sunday"].close,
                          },
                        ],
                      },
                    ],
                  };

                  console.log("newResourceData:", newResourceData);

                  const resourceId = await addResource(newResourceData);
                  const dataRef = doc(db, `/resources/${resourceId}`);

                  await setDoc(
                    docRef,
                    {
                      ...data,
                      resources: [...resourcesArray, dataRef],
                    },
                    { merge: true }
                  );

                  closeModal();
                  console.log("Successfully added resource with reference:");
                } catch (error) {
                  closeModal();
                  console.error("Failed to add resource:", error);
                }
              }}
            >
              Add
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddOrganization;
