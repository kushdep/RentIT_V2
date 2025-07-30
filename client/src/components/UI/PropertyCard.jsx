function PropertyCard() {
  return (
    <>
      <div className="col">
        <div className="card position-relative border-0 rounded-5 p-0">
          <div className="p-2 ">
            <img
              src="/images/property-01.jpg"
              className="card-img-top rounded-4 shadow-sm "
            />
            <button
              className="btn d-flextext-decoration-underline align-items-center position-absolute"
              style={{ top: 1, right: 2 }}
            >
              <img
                src="/public/icons/heart-fill.png"
                style={{ width: 20, height: 20, objectFit: "cover" }}
                alt=""
                className="me-1 shadow"
              />
            </button>
            <div className="d-flex col justify-content-between">
              <div className="d-flex row w-75">
                <p className="mx-2 text-dark fw-semibold mb-0">
                  Flats in Gurugram
                </p>
                <p className="mx-3 text-muted form p-0">₹4,940 for 2 nights</p>
              </div>
              <div className="d-flex row justify-content-center align-items-center me-0 w-25">
                <img
                  src="/public/icons/star-fill.svg"
                  alt=""
                  className=""
                  style={{ width: 45, height: 20, objectFit: "cover" }}
                />
                <p className="mx-3 text-muted text-center form p-0" style={{fontSize:12}}>4.9 rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyCard;
