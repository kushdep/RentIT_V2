function PropertyCard() {
  return (
    <>
      <div className="container" style={{ width: 300 }}>
        <div className="row">
          <div className="col">
            <div className="card  border-0 rounded-5 p-0">
              <div className="p-3">
                <img
                  src="/images/property-01.jpg"
                  className="card-img-top rounded-4"
                />
                <div className="d-flex row">
                  <p className="mx-2 text-dark fw-semibold mb-0">
                    Flats in Gurugram
                  </p>
                  <p className="mx-3 text-muted form p-0">
                    ₹4,940 for 2 nights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyCard;
