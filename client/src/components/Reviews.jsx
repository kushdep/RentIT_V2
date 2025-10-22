function Reviews({ review }) {
  const today = new Date().getTime();
  const reviewDate = new Date(review?.createdAt).getTime();
  console.log(today);
  console.log(reviewDate);
  const diff = Math.floor((today - reviewDate) / (24 * 3600 * 1000));

  let reviewDays;
  if (diff < 2) {
    reviewDays = "1 day ago";
  } else if (diff > 1 && diff < 7) {
    reviewDays = `${diff} days ago`;
  } else if (diff >= 7 && diff <= 28) {
    reviewDays =
      Math.floor(diff / 7) > 1 ? `${week} weeks  ago` : `1 week  ago`;
  } else if (diff === 30) {
    reviewDays = `1 month ago`;
  } else {
    reviewDays = new Date(review?.createdAt).toLocaleDateString();
  }

  return (
    <div className="col mt-4">
      <div className="container">
        <div className="row">
          <div className="col d-flex">
            <img
              src="/public/images/hall.jpg"
              alt="Logo"
              className="img-fluid"
              style={{ height: 50, width: 50, borderRadius: 50 }}
            />
            <div className="d-flex flex-column ms-3">
              <div className="">
                <h6 className="fw-medium mb-0">{review?.author.username}</h6>
              </div>
              <div className="">
                <div className="col-2 p-0 d-flex flex-row">
                  {Array.from({ length: review?.ratings }).map(() => (
                    <img src="/public/icons/star-fill.svg" alt="" />
                  ))}
                </div>
                <div className="col p-0">
                  <span className="align-middle" style={{ fontSize: 12 }}>
                    {reviewDays}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-1">
          <div className="col ">
            <p>
              {review?.review
                ? review.review.length > 50
                  ? review.review.slice(0, 50) + " ...."
                  : review.review
                : ""}
            </p>
          </div>
          {review?.review.length > 50 && (
            <div className="col">
              <button className="btn text-decoration-underline p-0">
                Show more
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
