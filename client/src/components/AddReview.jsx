import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarRoundedIcon from "@mui/icons-material/Star";
import { useActionState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AddReview({locId,bkngId}) {
  const [formStt, formFn, isPending] = useActionState(submitReview, {
    stars: null,
    review: "",
    errors: [],
  });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function submitReview(prevStt, formData) {
    const stars = Number(formData.get("stars"))
    const review = formData.get("Review");

    let err = [];
    console.log(stars)
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
    let body = {
      locId,
      stars,
      review,
      bkngId
    };
    console.log(body)
    try {
      const response = await axios.post(
        "http://localhost:3000/profile/add-review",
        body,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Review Added Successfully");
        navigate(`/rent-locs/${locId}`);
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        err.push("Something Went Wrong")
        return {
          ...prevStt,
          stars,
          review,
          errors: err,
        };
      }
    }
  }

  return (
    <>
      {formStt?.errors.length > 0 &&
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
            precision={0.5}
            onChange={(event, newValue) => {
              const hiddenInput = document.querySelector("input[name='stars']");
              if (hiddenInput) hiddenInput.value = newValue;
            }}
            icon={
              <StarRoundedIcon
                sx={{ height: 40, width: 40, color: "gold" }}
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
        <button
          type="submit"
          className="btn btn-light mt-2"
          defaultValue={0}
          disabled={isPending}
        >
          {isPending ? "Submitting...." : "Submit"}
        </button>
      </form>
    </>
  );
}

export default AddReview;
