import DateInputBox from "./UI/DateInputBox";

function RentItForm({guestsCap}) {
  return (
    <form>
      <div className="d-flex p-0 text-center row ">
        <DateInputBox />
        <div className="col rounded-5  p-0 my-2 mx-1">
          <div className="dropdown-center my-2">
            <button
              className=" btn fw-semibold dropdown-toggle w-75 border-bottom"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Guests
            </button>
            <ul class="dropdown-menu w-75">
              {Array.from({ length: guestsCap }).map((_, i) => (
                <li>
                  <a class="dropdown-item" href="#">
                    {i + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button className="btn btn-primary w-75 fw-bold rounded-pill my-3 border-bottom">
              Rent-IT
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default RentItForm;
