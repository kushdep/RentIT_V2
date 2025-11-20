import "../css/homepage.css";
import SearchBar from "../components/UI/SearchBar";

function Homepage() {
  
  return (
      <div className="container-fluid">
        <div className="row p-0" >
          <div className="col w-100 p-0 justify-content-end">
              <img
                src="/public/images/homepage-first-section.png"
                className="w-100"
              />
              <SearchBar/>
            </div>
        </div>
        <div className="row">

        </div>
      </div>
  );
}

export default Homepage;
