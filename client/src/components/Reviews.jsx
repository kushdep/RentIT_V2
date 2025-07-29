function Reviews() {
  return (
    <div className="col mt-4">
      <div className="container">
        <div className="row">
          <div className="col d-flex  ">
            <img
              src="/public/images/hall.jpg"
              alt="Logo"
              className="img-fluid"
              style={{ height: 50, width: 50, borderRadius: 50 }}
            />
            <div className="ms-3">
              <h6 className="fw-medium mb-0">Hosted by Swati</h6>
              <p className="p-0 text-muted form " style={{ fontSize: 12 }}>
                Customer since
              </p>
            </div>
          </div>
        </div>
        <div className="row">
            <div className="col-2 p-0">
                <img src="/public/icons/star-fill.svg" alt="" />
                <img src="/public/icons/star-fill.svg" alt="" />
                <img src="/public/icons/star-fill.svg" alt="" />
                <img src="/public/icons/star-fill.svg" alt="" />
                <img src="/public/icons/star-fill.svg" alt="" />
            </div>
            <div className="col p-0">
                <span className="align-middle" style={{fontSize:12}}>1 week Ago</span>
            </div>
        </div>
        <div className="row row-cols-1">
            <div className="col ">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe itaque quod eius excepturi cumque earum quam assumenda temporibus modi, dignissimos quisquam accusamus suscipit numquam quos, illum fugit atque nesciunt placeat labore. Similique, facere perspiciatis. . . .</p>
            </div>
            <div className="col">
                <button className="btn text-decoration-underline p-0">
                    Show more
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
