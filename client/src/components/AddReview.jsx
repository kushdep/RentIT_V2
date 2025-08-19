import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarRoundedIcon from "@mui/icons-material/Star";
import { useActionState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

function AddReview() {
  const [formStt, formFn, isPending] = useActionState(submitReview, {
    stars: null,
    review: "",
    errors: [],
  });
  const { token } = useSelector((state) => state.authData);

  async function submitReview(prevStt, formData) {
    const stars = formData.get("stars");
    const review = formData.get("Review");

    let err = [];
    if (stars < 0.5) {
      err.push("Please Select Star Rating");
    }

    if (review.length === 0) {
      err.push("Please write Review");
    }

    if (err.length > 0) {
      return {
        ...prevStt,
        stars,
        review,
        errors: err,
      };
    }
    const { locId } = useParams();
    let body = {
      locId,
      stars,
      review,
    };
    const response = await axios.post("http://localhost:3000/rent-locs/review", body, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
  }

  return (
    <>
      {formStt.errors.length > 0 &&
        formStt.errors.map((f) => {
          return <p className="fs-6 text-danger">{f}</p>;
        })}
      <form action={formFn}>
        <Box
          sx={{
            width: 300,
            height: 50,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Rating
            name="hover-feedback"
            value={formStt.stars}
            precision={0.5}
            onChange={(event, newValue) => {
              const hiddenInput = document.querySelector("input[name='stars']");
              if (hiddenInput) hiddenInput.value = newValue;
            }}
            icon={
              <StarRoundedIcon
                sx={{ height: 40, width: 40, color: "black" }}
                fontSize="inherit"
              />
            }
            emptyIcon={
              <StarRoundedIcon
                sx={{ height: 40, width: 40, color: "lightgray" }}
                fontSize="inherit"
              />
            }
          />
        </Box>
        <input type="hidden" name="stars" />
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a Review here"
            name="Review"
            id="floatingTextarea2"
            style={{ height: 100 }}
          ></textarea>
          <label htmlFor="floatingTextarea2">Add a Review</label>
        </div>
        <button type="submit" className="btn btn-dark mt-2">
          {isPending ? "Submitting" : "Submit"}
        </button>
      </form>
    </>
  );
}

export default AddReview;
