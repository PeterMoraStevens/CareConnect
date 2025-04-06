import React, { useState, useEffect } from "react";
import { auth, db } from "../api/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

const EditOrganization = ({ organization }: { organization: any }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [dayStatus, setDayStatus] = useState<Record<string, boolean>>({});
  const [userId, setUserId] = useState<string>("");

  const [organizationName, setOrganizationName] = useState("");
  const [hours, setHours] = useState<any>({});
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleSave = async (organization: any) => {
    if (!organization.id) {
      console.error("Organization ID is missing.");
      return;
    }

    try {
      const updatedData = {
        name: organizationName,
        address,
        phone: phoneNumber,
        email,
        url: website,
        desc,
        city,
        state,
        hours: Object.keys(hours).map((day) => ({
          [day]: [
            dayStatus[day] ?? false,
            {
              open: hours[day]?.open || "",
              close: hours[day]?.close || "",
            },
          ],
        })),
      };

      await setDoc(doc(db, "organizations", organization.id), updatedData, {
        merge: true,
      });

      console.log("Organization updated successfully");

      // Close the modal
      (document.getElementById(modal) as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error updating organization:", error);
    }
  };
  // Populate state when the organization data is passed in
  useEffect(() => {
    if (organization) {
      setOrganizationName(organization.name || "");
      setAddress(organization.address || "");
      setPhoneNumber(organization.phone || "");
      setEmail(organization.email || "");
      setWebsite(organization.url || "");
      setDesc(organization.desc || "");
      setCity(organization.city || "");
      setState(organization.state || "");

      // Set hours and day status
      if (organization.hours) {
        const newDayStatus: Record<string, boolean> = {};
        const newHours: Record<string, { open: string; close: string }> = {};

        Object.keys(organization.hours[0]).forEach((day) => {
          const [isOpen, times] = organization.hours[0][day];
          newDayStatus[day] = isOpen;
          newHours[day] = { open: times.open, close: times.close };
        });

        setDayStatus(newDayStatus);
        setHours(newHours);
      }
    }
  }, [organization]);

  useEffect(() => {
    // Get user ID from Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        console.error("User is logged out");
      }
    });

    return () => unsubscribe();
  }, []);

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

  const modal = `my_modal_${organization.name}`;

  return (
    <div>
      <button
        className="btn"
        onClick={() =>
          (document.getElementById(modal) as HTMLDialogElement)?.showModal()
        }
      >
        Edit
      </button>

      <dialog id={modal} className="modal">
        <div className="modal-box w-[690px] max-w-none">
          <h3 className="font-bold text-2xl">Edit Organization</h3>

          <form>
            <div className="mt-5">
              <h3 className="pb-4 font-bold">Name of Organization</h3>
              <input
                type="text"
                value={organizationName}
                className="input input-bordered w-full max-w"
                onChange={(e) => setOrganizationName(e.target.value)}
              />
            </div>

            <div className="mt-5">
              <h3 className="pb-4 font-bold">Description</h3>
              <textarea
                value={desc}
                className="textarea w-full max-w"
                maxLength={310}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className="mt-5">
              <h3 className="pb-4 font-bold">State of Organization</h3>
              <input
                type="text"
                value={organization.state}
                className="input input-bordered w-full max-w"
                onChange={(e) => setState(e.target.value)}
              />
            </div>

            <div className="mt-5">
              <h3 className="pb-4 font-bold">City of Organization</h3>
              <input
                type="text"
                value={organization.city}
                className="input input-bordered w-full max-w"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="mt-5">
              <h3 className="pb-4 font-bold">Hours:</h3>
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div key={day} className="mb-4">
                  <span className="font-bold">{day}:</span>
                  <label className="ml-2">
                    <input
                      type="radio"
                      name={`${day}-status`}
                      checked={dayStatus[day] ?? false}
                      onChange={() => handleDayStatusChange(day, true)}
                    />{" "}
                    Open
                  </label>
                  <label className="ml-2">
                    <input
                      type="radio"
                      name={`${day}-status`}
                      checked={!dayStatus[day] ? true : false}
                      onChange={() => handleDayStatusChange(day, false)}
                    />{" "}
                    Closed
                  </label>

                  {dayStatus[day] && (
                    <>
                      <input
                        type="text"
                        value={hours[day]?.open || ""}
                        className="input input-bordered w-16 ml-2"
                        onChange={(e) =>
                          handleHourChange(day, "open", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        value={hours[day]?.close || ""}
                        className="input input-bordered w-16 ml-2"
                        onChange={(e) =>
                          handleHourChange(day, "close", e.target.value)
                        }
                      />
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5">
              <h3 className="pb-4 font-bold">Address</h3>
              <input
                type="text"
                value={address}
                className="input input-bordered w-full max-w"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mt-5">
              <h3 className="pb-4 font-bold">Phone Number</h3>
              <input
                type="text"
                value={phoneNumber}
                className="input input-bordered w-full max-w"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="mt-5">
              <h3 className="pb-4 font-bold">Email</h3>
              <input
                type="text"
                value={email}
                className="input input-bordered w-full max-w"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-5">
              <h3 className="pb-4 font-bold">Website URL</h3>
              <input
                type="text"
                value={website}
                className="input input-bordered w-full max-w"
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </form>

          <div className="modal-action">
            <button
              className="btn"
              onClick={() =>
                (document.getElementById(modal) as HTMLDialogElement)?.close()
              }
            >
              Close
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleSave(organization)}
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EditOrganization;
