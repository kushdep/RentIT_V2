import { useSelector } from "react-redux";
import PropertyCard from "../components/UI/PropertyCard";

function SimilarLocs(locations) {
  const { isAuthenticated } = useSelector((state) => state.authData);
  const { savedLocData } = useSelector((state) => state.profileData);

  let savedLoc = [];
  if (isAuthenticated) {
    savedLoc = savedLocData.locData.map((e) => {
      return e.locId;
    });
  }
  return (
    <div className="container">
      <div className="row row-cols-4">
        {locations.map((e) => {
          const saved = savedLoc.includes(e._id);
          return (
            <PropertyCard
              name={e.locDtl.title}
              locId={e._id}
              coverImg={e.locDtl.imgTtlData[0].images[0].url}
              price={e.locDtl.price}
              ratings={e.stars}
              isSaved={saved}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SimilarLocs;
