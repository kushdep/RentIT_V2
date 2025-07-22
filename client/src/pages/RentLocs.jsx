import SearchBar from "../components/UI/SearchBar";

export default function RentLocs() {
  return (
    <>
      <header className="position-relative">
        <div className="page-heading image-fluid">
          <img src="/images/rent-locs-homepage.png" alt="" />
          <SearchBar />
        </div>
      </header>
    </>
  );
}
