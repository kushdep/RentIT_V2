import PropertyCard from "../components/UI/PropertyCard";
import "../css/rentlocs.css";
import { curfmt } from "../utils/formatter";
import { useEffect, useRef, useState } from "react";
import SortAndFilterModal from "../components/Modals/SortAndFilterModal";
import toast from "react-hot-toast";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLoc,
  getFilteredLoc,
  rentLocActions,
} from "../store/rentloc-slice";
import { locType } from "../config";
import { getSavedLoc } from "../store/profile-slice";
import SimilarLocs from "../components/SimilarLocs";

export default function RentLocs() {
  const {
    rentLocData: locData,
    totalPages,
    currPage,
    chckPts,
    rentLocType:locTypeStt,
    filter,sortBy,
    searchData
  } = useSelector((state) => state.rentLocs);

    const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
    const [dates, setDates] = useState({ start: null, end: null });
  const [pages, setPagesVal] = useState(null);
  const {savedLocData} =useSelector(state=>state.profileData)
  const sortModalRef = useRef();
  const filterModalRef = useRef();
  const {isAuthenticated } = useSelector(state=>state.authData)

  let savedLoc = []
  if(isAuthenticated){
    savedLoc = savedLocData.locData.map((e)=>{
      return e.locId
    })
  }

  useEffect(() => {
    if (chckPts < 1) {
      const lastPages = totalPages - Math.floor(totalPages / 4) * 4;
      setPagesVal(lastPages);
    } else {
      setPagesVal(4);
    }
  }, [chckPts]);

  useEffect(() => {
    dispatch(getAllLoc(1));
    dispatch(rentLocActions.chngCurrPage(1));
    const token = localStorage.getItem('token')
    dispatch(getSavedLoc(token));
    
  }, [dispatch]);

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    let guests = fd.get("guests");
    guests > 0 ? guests : (guests = null);
    let priceRng = fd.get("exampleRadios");

    if (!guests && !priceRng && !(dates.start && dates.end )) {
      console.log("inside");
      toast.error("Apply atleast one filter!");
      return;
    }

    if(dates.start!==null && dates.end!==null)dispatch(rentLocActions.updateFilterStt({dateFltr:dates}))
    if(priceRng!==null)dispatch(rentLocActions.updateFilterStt({prcRngIn:priceRng}))
    if(guests!==null)dispatch(rentLocActions.updateFilterStt({guests:guests}))
    dispatch(getFilteredLoc(1));
    filterModalRef.current.close();
  }


  function fecthLoc(navDtl){
    return new Promise((res,rej)=>{
      if(!navigator.geolocation){
      toast.error('Not able to get curr Location')  
      toast.error('Cannot sort by Distance')  
      return 
    }
    navigator.geolocation.getCurrentPosition((pos)=>{
      navDtl['long']=pos.coords.latitude
      navDtl['lat']=pos.coords.latitude
      console.log(navDtl)
      res(navDtl)
    },(err)=>{
      console.log("Not able to get Location "+JSON.stringify(err))
      toast.error('Not able to get curr Location')  
      toast.error('Cannot sort by Distance')
      rej(err)
      })
    })
  }

 async function handleSortSubmit(event){
  event.preventDefault();
  const form = event.target;
  const dstChk = form.Distance.checked;
  const rngChk = form.Ratings.checked; 

  if (!dstChk && !rngChk) {
    toast.error('Select at least one to sort on!!')
    return;
  }

  if(dstChk){
      let navDtl = {}
    await fecthLoc(navDtl)
    dispatch(rentLocActions.updateSortingStt({ srtBy: "Distance", isChk: dstChk, currLocDtl:navDtl }))
  }
    dispatch(rentLocActions.updateSortingStt({ srtBy: "Ratings", isChk: rngChk }))
  dispatch(getFilteredLoc(1));
  sortModalRef.current.close();
  }

  let fltrSrtBy = [];

if (filter.guestCap !== null) fltrSrtBy.push({title:'guests',val:`${filter.guestCap} guests`});
if (filter.priceRange.ind !== null) fltrSrtBy.push({title:'priceRng',val:filter.priceRange.range});
if (filter.dates.start !== null && filter.dates.end !== null) fltrSrtBy.push({title:'date',val:`${new Date(filter.dates.start).toUTCString().slice(0,16)} - ${new Date(filter.dates.end).toUTCString().slice(0,16)}`});
if (sortBy.distance.inc) fltrSrtBy.push({title:'dst',val:'🏝️ Distance'});
if (sortBy.ratings) fltrSrtBy.push({title:'rtng',val:'⭐ Ratings'});

  return (
    <div>
      <div className="container-fluid ">
        {
          searchData.name.isName && !searchData.name.locId?
          <div className="d-flex justify-content-center">
            <img className="w-50 h-50" src="/public/images/Loc404.png"/>
          </div>
          :((searchData.coordinates.isCord && !searchData.coordinates.locId && searchData.coordinates.locs.length>0)?<SimilarLocs locations={searchData.coordinates.locs} locCoord={searchData.coordinates} upSrchStt={searchData}/>:       
        <div className="container-fluid">
        <div className="row">
<div className="col">
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-1 sortBtns">
            <div className="sortBtns mt-5">
              <button
                className="btn btn-dark fs-5 rounded-pill d-flex align-items-center shadow"
                onClick={() => {
                  filterModalRef.current.showModal();
                }}
              >
                <img
                  src={`/public/icons/filter.png`}
                  alt=""
                  className="me-3"
                  style={{ width: 30, height: 30, objectFit: "cover" }}
                />
                <p className="mb-0 fw-semibold">filter</p>
              </button>
            </div>

            <div className="sortBtns mt-3">
              <button
                className="btn btn-dark fs-5 rounded-pill d-flex align-items-center shadow"
                onClick={() => sortModalRef.current.showModal()}
              >
                <img
                  src={`/public/icons/sortBy.png`}
                  alt=""
                  className="me-3"
                  style={{ width: 30, height: 30, objectFit: "cover" }}
                />
                <p className="mb-0 fs-6 fw-semibold">Sort-By</p>
              </button>
            </div>
            <SortAndFilterModal title="Sort By" reference={sortModalRef}>
              <form onSubmit={handleSortSubmit}>
              <div className="row">
                <div className="col">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="Ratings"
                      value="Ratings"
                      id="Ratings"
                    />
                    <label className="form-check-label" htmlFor="Ratings">
                      Ratings
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="Distance"
                      name="Distance"
                      id="Distance"
                    />
                    <label className="form-check-label" htmlFor="Distance">
                      Distance
                    </label>
                  </div>
                  <button
                  type="submit"
                  className="btn w-100 mt-3 fw-semibold btn-primary rounded-pill shadow"
                >
                  Sort-IT
                </button>
                </div>
              </div>
              </form>
            </SortAndFilterModal>
            <SortAndFilterModal title="Filter" reference={filterModalRef}>
              <form onSubmit={handleSubmit}>
                <div className="row-cols-1 mb-4">
                <div className="col my-2">
                  <RangePicker
                    getPopupContainer={(triggerNode) =>
                          triggerNode.closest("dialog")
                    }                    
                    value={
                      dates.start !== null && dates.end !== null
                        ? [dayjs(dates.start), dayjs(dates.end)]
                        : null
                    }
                    onChange={(dates, dateString) => {
                      if (dates && dates[0] && dates[1]) {
                        if (dates[0].isSame(dates[1], "day")) {
                          toast.error("Start and end date cannot be the same");
                          setDates((val) => {
                            return {
                              ...val,
                              start: null,
                              end: null,
                            };
                          });
                          return
                        }
                        setDates((val) => {
                          return {
                            ...val,
                            start: dateString[0],
                            end: dateString[1],
                          };
                        });
                      }
                    }}
                    disabledDate={(current) => {
                      if (!current) return false;
        
                      const today = dayjs().startOf("day");
                      const maxDate = today.add(1, "month");
                      return current.isBefore(today) || current.isAfter(maxDate);
                    }}
                  />
                  </div>
                  <div className="col">
                    <div className="dropdown-center mb-4">
                      <select
                        className="form-select btn fw-medium dropdown-toggle w-100 border-bottom"
                        name="guests"
                      >
                        <option value="0">Guests</option>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <option value={i + 1} >{i + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="fs-5 fw-medium">Price</div>
                    <div className="col">
                      {Array.from({ length: 3 }).map((_, i) => {
                        let priceDiff = 2000;
                        let from = curfmt.format(priceDiff * (i + 1));
                        let to = curfmt.format(priceDiff * (i + 2));
                        return (
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id={`exampleRadios${i + 1}`}
                              value={i}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`exampleRadios${i + 1}`}
                            >
                              {from}-{to}
                            </label>
                          </div>
                        );
                      })}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="exampleRadios"
                          value={3}
                          id={`exampleRadios4`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleRadios4"
                        >
                          more than ₹8,000
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn w-100 mt-3 fw-semibold btn-primary rounded-pill shadow"
                >
                  Filter-IT
                </button>
              </form>
            </SortAndFilterModal>
          </div>
          <div className="col">
            <div className="container-fluid">
              <div className="row mb-3">
                <div className="col-10">
                  <div className="container">
              <div className="row row-cols-auto g-2">
                {fltrSrtBy.length > 0 &&
                  fltrSrtBy.map((e) => (
                    <div
                      className="col"
                      key={e.title}
                    >
                      <div className="filter-pill shadow-sm">
                        <span className="filter-text">{e.val}</span>
                        <button
                          type="button"
                          className="filter-close"
                          aria-label="Close"
                          onClick={() => {
                            if (e.title === "guests" || e.title === "priceRng" || e.title === "date") {
                              dispatch(rentLocActions.resetFltrStt(e.title));
                            }
                            if (e.title === "dst" || e.title === "rtng") {
                              dispatch(rentLocActions.resetSrtStt(e.title));
                            }
                            dispatch(getFilteredLoc(1));
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>

                  </div>
                </div>
                <div className="col-2 p-0">
                  <div class="btn-group w-100">
                  <button
                    type="button"
                    class="btn bg-dark text-light dropdown-toggle ms-3 fw-semibold rounded-pill shadow"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {locTypeStt
                      ? locType.find(({ id }) => id === locTypeStt).title
                      : "All"}
                  </button>
                  <ul class="dropdown-menu w-100">
                    {locType.map((a) => (
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={()=>{
                              dispatch(rentLocActions.updateFilterStt({locFltr:a.id}))
                              dispatch(getFilteredLoc(1))
                              }
                            }
                          >
                            {a.title}
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
                </div>
              </div>
              <div className="row row-cols-4">
                {locData.length > 0 ? (
                  locData.map((e, i) => {
                    const totalChkPts = Math.floor(totalPages / 4);
                    const currChkPt = totalChkPts - chckPts;
                    let fr = (currPage - (4 * currChkPt))
                    let tcr=(currPage - (4 * currChkPt))
                    const from = (fr * 8) - 8;
                    const to = (tcr * 8) - 1;

                    if (i >= from && i <= to) {
                      const formattedPrice = curfmt.format(e.locDtl.price );
                      console.log(e.locDtl?.title)
                      const name = e.locDtl?.title
                      const val = savedLoc.includes(e._id)
                      console.log(val)
                      return (
                        <PropertyCard
                          name={name}
                          coverImg={e.locDtl?.imgTtlData?.[0]?.images?.[0]?.url}
                          price={formattedPrice}
                          locId={e._id}
                          ratings={e.stars}
                          isSaved={val}
                        />
                      );
                    } else {
                    }
                  })
                ) : (
                  <h1 className="text-muted">No Locations to show</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

</div>
        </div>
        <div className="row mt-4">
<div className="col">
      <div className="container"> 
        <div className="row">
          <div className="col">
            <nav aria-label="Page navigation example">
              {totalPages > 1 && (
                <ul className="pagination justify-content-center">
                  <li
                    className={
                      currPage === 1 ? "page-item disabled" : "page-item"
                    }
                  >
                    <button
                      className="page-link"
                      onClick={() => {
                        if (currPage % 4 === 1) {
                          let reqNum = Math.floor(currPage / 4);
                          dispatch(getAllLoc(reqNum));
                          dispatch(rentLocActions.incChkPt());
                        }
                        dispatch(rentLocActions.decCurrPage());
                      }}
                    >
                      &laquo;
                    </button>
                  </li>
                  {Array.from({ length: pages }).map((_, i) => {
                    let totalChkPts = Math.floor(totalPages / 4);
                    let pageNo = (totalChkPts - chckPts) * 4 + i + 1;

                    return (
                      <li className="page-item">
                        <button
                          className={
                            currPage === pageNo
                              ? "page-link active"
                              : "page-link"
                          }
                          onClick={() => {
                            dispatch(rentLocActions.chngCurrPage(pageNo));
                          }}
                        >
                          {pageNo}
                        </button>
                      </li>
                    );
                  })}
                  {chckPts > 0 && (
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => {
                          dispatch(rentLocActions.decChkPts());
                          let totalChkPts = Math.floor(totalPages / 4);
                          let reqNum = totalChkPts + 1 - chckPts;
                          let chngPage = 4 * reqNum + 1;
                          if(sortBy.distance.inc || sortBy.ratings || filter.guestCap || filter.priceRange.ind){
                            console.log(reqNum+1)  
                            dispatch(getFilteredLoc(reqNum+1));
                          }else{
                            dispatch(getAllLoc(reqNum + 1));
                          }
                          dispatch(rentLocActions.chngCurrPage(chngPage));
                        }}
                      >
                        ....
                      </button>
                    </li>
                  )}
                  <li
                    className={
                      currPage === totalPages
                        ? "page-item disabled"
                        : "page-item"
                    }
                  >
                    <button className="page-link" disabled={currPage === totalPages?true:false} onClick={() => {
                      if (currPage % 4 === 0) {
                        let reqNum = currPage / 4;
                        const page = 4 * reqNum + 1;
                        if(sortBy.distance.inc || sortBy.ratings || filter.guestCap || filter.priceRange.ind){
                          console.log(reqNum+1)  
                          dispatch(getFilteredLoc(reqNum+1));
                        }else{
                          dispatch(getAllLoc(reqNum + 1));
                        }
                        dispatch(rentLocActions.chngCurrPage(page));
                        dispatch(rentLocActions.decChkPts());
                      } else {
                        dispatch(rentLocActions.chngCurrPage(currPage + 1));
                      }
                    }}>
                      &raquo;
                    </button>
                  </li>
                </ul>
              )}
            </nav>
          </div>
        </div>
      </div>

</div>
        </div>
        </div>)}
      </div>
    </div>
  );
}