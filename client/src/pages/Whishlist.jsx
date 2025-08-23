import { useSelector } from "react-redux";

export default function Whishlist() {
  const { savedLocData: locData } = useSelector((state) => state.profileData);
  return (
    <div
      className="container-fluid min-vh-100"
      style={{ minHeight: "100vh" }}
    >
      {locData?.length > 0 ? (
        <div className="row row-cols-4">
          {locData.map((e, i) => {
            const name = e.locDtl?.title;
            return (
              <PropertyCard
                name={name}
                coverImg={e.locDtl?.imgTtlData?.[0]?.images?.[0]?.url}
                price={formattedPrice}
                locId={e._id}
                ratings={e.stars}
              />
            );
          })}
        </div>
      ) : (
        <div className="row text-center">
          <div className="col-12">
            <img className="p-0" src="/public/icons/empty-folder.png"/>
          </div>
        </div>
      )}
    </div>
  );
}
