import { useDispatch, useSelector } from "react-redux";
import PropertyCard from "../components/UI/PropertyCard";
import { getFilteredLoc, rentLocActions } from "../store/rentloc-slice";

function SimilarLocs({ locations, locCoord, upSrchStt }) {
  const { isAuthenticated } = useSelector((state) => state.authData);
  const { savedLocData } = useSelector((state) => state.profileData);
  const dispatch = useDispatch();

  let savedLoc = [];
  if (isAuthenticated) {
    savedLoc = savedLocData.locData.map((e) => {
      return e.locId;
    });
  }

  function getMoreLocations() {
    dispatch(
      rentLocActions.updateSortingStt({
        srtBy: "Distance",
        isChk: true,
        currLocDtl: { long: locCoord.long, lat: locCoord.lat },
      })
    );
    dispatch(getFilteredLoc(1));
    upSrchStt((prev) => {
      return {
        ...prev,
        coordinates: {
          val: false,
          locId: null,
          locs: [],
          long: null,
          lat: null,
        },
      };
    });
  }

  console.log(locCoord);
  console.log(locations);
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <img className="w-50 h-50" src="/public/images/Loc404.png" />
      </div>
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
        <button
          className="btn btn-primary fw-semibold fs-5 w-100 my-4"
          onClick={getMoreLocations}
        >
          See More Neary Locations
        </button>
      </div>
    </div>
  );
}

export default SimilarLocs;
