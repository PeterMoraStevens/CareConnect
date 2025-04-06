import { useEffect, useState } from "react";
import { db } from "../api/firebase"; // Adjust path as needed
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import PreviewCard from "../components/PreviewCard";

interface Resource {
  id: string;
  img?: string; // Image URL
  [key: string]: any;
}

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
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
    <div className = "min-h-screen justify-center flex">
        <ul className = "grid-cols-3 grid gap-16 max-w-[80%]">
          
          {resources.map((resource ) => {
              return (
                <li key={resource.id}>
                  <PreviewCard name={resource.name} website={resource.url} image={resource.img} address={resource.address} description={resource.desc} hours={resource.hours} phone = {resource.Phone} email ={resource.Email}/>
                </li>
              )
          })}
                
                
          
        </ul>
    </div>
  );
};

export default Resources;
