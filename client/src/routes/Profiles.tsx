import React, { useEffect, useState } from "react";
import { auth, db } from "../api/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import UserCard from "../components/UserCard";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage"; // 👈 Add this

const storage = getStorage(); // 👈 Initialize Firebase Storage

const getOrgData = async (ref: any) => {
  try {
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      const data = docSnap.data();

      // 👇 Fetch image URL if image field exists
      if (data.img) {
        try {
          const url = await getDownloadURL(storageRef(storage, data.img));
          data.img = url;
        } catch (err) {
          console.error("Error fetching image URL:", err);
        }
      }

      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching document", error);
    return null;
  }
};

const UserProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [orgs, setOrgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const profileData = userSnap.data();
            setProfile(profileData);

            const orgDataPromises = profileData.resources.map((ref: any) => getOrgData(ref));
            const orgsData = await Promise.all(orgDataPromises);
            setOrgs(orgsData.filter((org) => org !== null));
          } else {
            console.error("User document does not exist.");
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>No profile found</p>;

  return (
    <div className="min-h-screen bg-orange-200">
       
        <div className="grid-cols-3 grid gap-16 max-w-[80%] ">
          {orgs.map((org, index) => (
            <UserCard
              key={index}
              name={org.name}
              address={org.address}
              description={org.desc}
              website={org.url}
              hours={org.hours}
              phone={org.Phone}
              email={org.Email}
              image={org.img} // 👈 Pass the image down
            />
          ))}
        </div>
    </div>
  );
};

export default UserProfile;
