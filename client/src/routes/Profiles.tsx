import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router";
import { auth, db } from "../api/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import UserCard from "../components/UserCard";
import AddOrganization from "../components/AddOrganization";

const getOrgData = async (ref: any) => {
  try {
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      const data: any = docSnap.data();
      return { ...data, ref: ref };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching document", error);
    return null;
  }
};

const UserProfile = () => {
  const [orgs, setOrgs] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const profileData = userSnap.data();

            const orgDataPromises = profileData.resources.map((ref: any) =>
              getOrgData(ref)
            );
            const orgsData = await Promise.all(orgDataPromises);
            setOrgs(orgsData.filter((org) => org !== null));
            console.log(orgsData);
          } else {
            console.error("User document does not exist.");
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-orange-200 min-h-screen">
      <div className="navbar bg-orange-100 shadow-sm">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost text-xl">
            <img src={logo} height={40} width={40} />
            CareConnect
          </a>
        </div>
        <div className="flex-end">
          <div className="flex">
            <AddOrganization />
            <button
              className="btn mx-4 text-xl"
              onClick={() => {
                auth.signOut();
                navigate("/");
              }}
            >
              SignOut
            </button>
          </div>
        </div>
      </div>
      <div className="grid-cols-3 grid gap-16 max-w-[80%] mx-8 mt-8">
        {orgs.map((org, i) => (
          <UserCard
            id={org.ref}
            key={i}
            name={org.name}
            city={org.city}
            state={org.state}
            address={org.address}
            description={org.desc}
            website={org.url}
            hours={org.hours}
            phone={org.Phone}
            email={org.Email}
            image={org.img}
            ref={org.ref} i={0}          />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
