import { Outlet } from "react-router-dom";
import PropertyCard from "../components/UI/PropertyCard";
import SearchBar from "../components/UI/SearchBar";
import LocDetails from "../components/LocDetail";

export default function RentLocs() {
  return (
    <>
      <Outlet>
        
      <header className="position-relative">
        <div className="page-heading image-fluid">
          <img src="/images/rent-locs-homepage.png" alt="" />
          <SearchBar props={{ height: 100, top: 150, right: 390 }}/>
        </div>
      </header>
        <LocDetails/>
      </Outlet>
          </>
  );
}
