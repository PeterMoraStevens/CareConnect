import { useEffect, useState } from "react";
import { db } from "../api/firebase"; // Adjust path as needed
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import PreviewCard from "../components/PreviewCard";
import logo from "../assets/logo.svg";

interface Resource {
  id: string;
  img?: string; // Image URL
  [key: string]: any;
}

interface props {
  city: string;
  state: string;
}

const Resources = ({ city, state }: props) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filterResourceType, setFilterResourceType] = useState<string>("");
  // const [filterDemographic, setFilterDemographic] = useState<string>("");
  const storage = getStorage(); // Initialize Firebase Storage

  useEffect(() => {
    async function getResources() {
      const resourcesCollection = collection(db, "resources");
      const resourcesSnapshot = await getDocs(resourcesCollection);
      let resourcesList = resourcesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Resource[];

      resourcesList = await Promise.all(
        resourcesList.map(async (resource) => {
          if (resource.img) {
            try {
              const imgUrl = await getDownloadURL(ref(storage, resource.img));
              return { ...resource, img: imgUrl };
            } catch (error) {
              console.error("Error fetching image URL:", error);
            }
          }
          return resource;
        })
      );

      setResources(resourcesList);
    }

    getResources();
  }, []);

  return (
    <>
      <div className="navbar bg-orange-100 shadow-sm">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost text-xl">
            <img src={logo} height={40} width={40} />
            CareConnect
          </a>
        </div>
      </div>
      <div className="min-h-screen justify-center flex bg-orange-200">
        <ul className="grid-cols-3 mt-8 grid gap-8 max-w-[80%]">
          {resources
            .filter(
              (resource) =>
                (resource.city.toLowerCase() === city.toLowerCase() &&
                resource.state.toLowerCase() === state.toLowerCase()) || city == "" && state == ""
            )
            .map((resource, i) => (
              <li key={resource.id}>
                <PreviewCard
                  i={i}
                  name={resource.name}
                  website={resource.url}
                  image={resource.img}
                  address={resource.address}
                  description={resource.desc}
                  hours={resource.hours}
                  phone={resource.phone}
                  email={resource.email}
                />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Resources;
