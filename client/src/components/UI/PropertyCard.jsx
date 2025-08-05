function PropertyCard({coverImg,price,ratings}) {
  return (
    <>
      <div className="col mt-4">
        <div className="card position-relative border-0 rounded-5 p-0 shadow">
          <div className="p-2">
            <img
              src={coverImg}
              className="card-img-top rounded-5 shadow"
            />
            <button
              className="btn d-flextext-decoration-underline align-items-center position-absolute"
              style={{ top: 8, right: 9 }}
            >
              <img
                src="/public/icons/heart.png"
                style={{ width: 20, height: 20, objectFit: "cover" }}
                alt=""
                className="me-1 shadow"
              />
            </button>
            <div className="d-flex col justify-content-between mt-3">
              <div className="d-flex row w-75">
                <p className="mx-2 text-dark fw-semibold mb-0">
                  Flats in Gurugram
                </p>
                <p className="mx-3 text-muted form p-0">{`${price}`} for 2 nights</p>
              </div>
              <div className="d-flex row justify-content-center align-items-center me-0 w-25">
                <img
                  src="/public/icons/star-fill.svg"
                  alt=""
                  className=""
                  style={{ width: 45, height: 20, objectFit: "cover" }}
                />
                <p className="mx-3 text-muted text-center form p-0" style={{fontSize:12}}>{ratings?`${ratings} rating`:'No ratings'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyCard;
