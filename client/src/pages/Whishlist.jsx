import { useDispatch, useSelector } from "react-redux";
import PropertyCard from "../components/UI/PropertyCard";
import { curfmt } from "../utils/formatter";

export default function Whishlist() {
  const { savedLocData } = useSelector((state) => state.profileData);
  const dispatch = useDispatch();
  console.log(savedLocData);

  return (
    <div className="container-fluid min-vh-100" style={{ minHeight: "100vh" }}>
      {savedLocData?.count > 0 ? (
        <div className="row row-cols-4">
          {savedLocData?.locData.map((e, i) => {
            console.log(JSON.stringify(e));
            const formattedPrice = curfmt.format(e.price);
            return (
              <PropertyCard
                name={e.name}
                coverImg={e?.coverImg?.[0]}
                price={formattedPrice}
                locId={e.locId}
                ratings={e.ratings}
                isSaved={true}
              />
            );
          })}
        </div>
      ) : (
        <div className="row text-center">
          <div className="col-12">
            <img className="p-0" src="/public/icons/empty-folder.png" />
          </div>
        </div>
      )}
    </div>
  );
}
