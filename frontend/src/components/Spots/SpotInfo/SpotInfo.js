import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkOneSpot } from "../../../store/spots";
import { thunkAllReviews } from "../../../store/reviews";
import './SpotInfo.css';
import SpotImage from "./ImagesSpot/SpotImages";
import SpotReview from "./SpotReviews/SpotReviews";
import CreateReview from "../../Reviews/CreateReview/CreateReview";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
// import SpotInfoHeader from "./SpotInfoHeader/SpotInfoHeader";
// import SpotInfoWithReview from "./SpotInfoWithReview/SpotInfowithReview";
// import SpotInfoNoReview from "./SpotInfoNoReview/SpotInfoNoReview";

const SpotInfo = () => {
  // const dispatch = useDispatch();
  // let { spotId } = useParams();
  // spotId = Number(spotId);

  // const spot = useSelector((state) => state.spots.singleSpot);
  // const userId = useSelector((state) => state.session.user?.id);
  // const reviewObj = useSelector((state) => state.reviews.spot);

  // const reviewList = Object.values(reviewObj);

  // const [showMenu, setShowMenu] = useState(false);
  // const ulRef = useRef();

  // useEffect(() => {
  //   dispatch(thunkAllReviews(spotId));
  //   dispatch(thunkOneSpot(spotId));
  // }, [dispatch, spotId]);

  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = (e) => {
  //     if (!ulRef.current.contains(e.target)) {
  //       setShowMenu(false);
  //     }
  //   };

  //   document.addEventListener("click", closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);
  // // eslint-disable-next-line
  // const closeMenu = () => setShowMenu(false);

  // const reserve = () => {
  //   window.alert("Feature Coming Soon...");
  // };

  // if (!spot || !reviewObj || !spot.Owner) {
  //   return null;
  // }

  // const newReviewList = reviewList.filter(
  //   (review) => review.spotId === spot.id
  // );
  // const userReview = newReviewList.find((review) => review.userId === userId);

  // if (!newReviewList) {
  //   return null;
  // }

  // if (!userId) {
  //   if (newReviewList.length === 0) {
  //     return <SpotInfoNoReview spot={spot} reserve={reserve} />;
  //   } else {
  //     return (
  //       <SpotInfoWithReview
  //         spot={spot}
  //         newReviewList={newReviewList}
  //         userReview={userReview}
  //         reserve={reserve}
  //       />
  //     );
  //   }
  // }

  // if (userId !== spot.ownerId) {
  //   if (!userReview && newReviewList.length === 0) {
  //     return <SpotInfoNoReview spot={spot} reserve={reserve} />;
  //   } else {
  //     return (
  //       <SpotInfoWithReview
  //         spot={spot}
  //         newReviewList={newReviewList}
  //         userReview={userReview}
  //         reserve={reserve}
  //       />
  //     );
  //   }
  // } else if (userId === spot.ownerId) {
  //   return (
  //     <section>
  //       <div className="box">
  //         <div className="spot-box">
  //           <h1>{spot.name}</h1>
  //           <div className="info">
  //             {spot.city}, {spot.state}, {spot.country}
  //           </div>
  //           <SpotImage spot={spot} />
  //           <SpotInfoHeader spot={spot} reserve={reserve} />
  //           {newReviewList.length === 0 && <h1>★ New</h1>}
  //           {newReviewList.length === 1 && (
  //             <h1>
  //               ★ {spot.avgStarRating}.0 · {newReviewList.length} review
  //             </h1>
  //           )}
  //           {newReviewList.length > 1 && (
  //             <h1>
  //               ★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length}{" "}
  //               reviews
  //             </h1>
  //           )}
  //           {newReviewList.length > 0 && (
  //             <SpotReview
  //               spot={spot}
  //               newReviewList={newReviewList}
  //               userReview={userReview}
  //               userId={userId}
  //             />
  //           )}
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }
  const dispatch = useDispatch();
    let { spotId } = useParams();
    spotId = Number(spotId)

    const spot = useSelector(state => state.spots.singleSpot);
    const userId = useSelector(state => state.session.user?.id)
    const reviewObj = useSelector(state => state.reviews.spot);



    const reviewList = Object.values(reviewObj);

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    useEffect(() => {
        dispatch(thunkAllReviews(spotId))
        dispatch(thunkOneSpot(spotId))
    }, [dispatch, spotId]);


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const reserve = () => {
        window.alert('Feature coming soon...')
    }

    if (!spot) {
        return null
    }

    if (!reviewObj) {
        return null
    }

    if (!spot.Owner) {
        return null
    }

    const newReviewList = reviewList.filter(review => review.spotId === spot.id);

    const [userReview] = newReviewList.filter(review => review.userId === userId)

    if (!newReviewList) {
        return null
    }

    if (!userId) {
        if (newReviewList.length === 0) {
            return (
                <section>
                    <div className='box'>
                        <div className='spot-box'>
                            <h1>{spot.name}</h1>
                            <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                            <SpotImage
                                spot={spot}
                            />
                            <div className='reserve-box'>
                                <div className='reserve-wrap'>
                                    <div className='host'>
                                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                                        <div>{spot.description}</div>
                                    </div>
                                </div>
                                <div className="review">
                                    <div className='reserve'>
                                        <div className='money'>
                                            <div>$ {spot.price} night</div>
                                            <div>★ New</div>
                                        </div>
                                        <button onClick={reserve}>Reserve</button>
                                    </div>
                                </div>
                            </div>
                            <h1>★ New</h1>
                        </div>
                    </div>
                </section>
            )
        }
        else {
            return (
                <section>
                    <div className='box'>
                        <div className='spot-box'>
                            <h1>{spot.name}</h1>
                            <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                            <SpotImage
                                spot={spot}
                            />
                            <div className='reserve-box'>
                                <div className='reserve-wrap'>
                                    <div className='host'>
                                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                                        <div>{spot.description}</div>
                                    </div>
                                </div>
                                <div className="review">
                                    <div className='reserve'>
                                        <div className='money'>
                                            <div>$ {spot.price} night</div>
                                            {newReviewList.length === 1 &&
                                                <div>★ {spot.avgStarRating}.0 · {newReviewList.length} review</div>
                                            }
                                            {newReviewList.length > 1 &&
                                                <div>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</div>
                                            }
                                        </div>
                                        <button onClick={reserve}>Reserve</button>
                                    </div>
                                </div>

                            </div>
                            {newReviewList.length === 1 &&
                                <h1>★ {spot.avgStarRating}.0 · {newReviewList.length} review</h1>
                            }
                            {newReviewList.length > 1 &&
                                <h1>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</h1>
                            }
                            <SpotReview
                                spot={spot}
                                newReviewList={newReviewList}
                                userReview={userReview}
                            />
                        </div>
                    </div>
                </section>
            )
        }
    }

    if (userId !== spot.ownerId) {
        if (!userReview && userId && newReviewList.length === 0) {
            return (
                <section>
                    <div className='box'>
                        <div className='spot-box'>
                            <h1>{spot.name}</h1>
                            <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                            <SpotImage
                                spot={spot}
                            />
                            <div className='reserve-box'>
                                <div className='reserve-wrap'>
                                    <div className='host'>
                                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                                        <div>{spot.description}</div>
                                    </div>
                                </div>
                                <div className="review">
                                    <div className='reserve'>
                                        <div className='money'>
                                            <div>$ {spot.price} night</div>
                                            <div>★ New</div>
                                        </div>
                                        <button onClick={reserve}>Reserve</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='new-post'>
                            <h1>★ New</h1>
                            <div className='modal'>
                                <OpenModalMenuItem
                                    buttonText="Post Your Review"
                                    onItemClick={closeMenu}
                                    modalComponent={<CreateReview
                                        spot={spot}
                                    />}
                                />
                                <h4>Be the first to post a review!</h4>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
        if (!userReview && userId && newReviewList.length > 0) {
            return (
                <section>
                    <div className='box'>
                        <div className='spot-box'>
                            <h1>{spot.name}</h1>
                            <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                            <SpotImage
                                spot={spot}
                            />
                            <div className='reserve-box'>
                                <div className='reserve-wrap'>
                                    <div className='host'>
                                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                                        <div>{spot.description}</div>
                                    </div>
                                </div>
                                <div className="review">
                                    <div className='reserve'>
                                        <div className='money'>
                                            <div>$ {spot.price} night</div>
                                            {newReviewList.length === 1 &&
                                                <div>★ {spot.avgStarRating}.0 · {newReviewList.length} review</div>
                                            }
                                            {newReviewList.length > 1 &&
                                                <div>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</div>
                                            }
                                        </div>
                                        <button onClick={reserve}>Reserve</button>
                                    </div>

                                </div>
                            </div>
                            {newReviewList.length === 1 &&
                                <h1>★ {spot.avgStarRating}.0 · {newReviewList.length} review</h1>
                            }
                            {newReviewList.length > 1 &&
                                <h1>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</h1>
                            }
                            <div className='new-post'>
                                <div className='modal'>
                                    <OpenModalMenuItem
                                        buttonText="Post Your Review"
                                        onItemClick={closeMenu}
                                        modalComponent={<CreateReview
                                            spot={spot}
                                        />}
                                    />
                                </div>
                            </div>
                        </div>
                        <SpotReview
                            spot={spot}
                            newReviewList={newReviewList}
                            userReview={userReview}
                        />
                    </div>
                </section>
            )
        }
        if (!userReview && userId && newReviewList.length > 0) {
            return (
                <section>
                    <div className='box'>
                        <div className='spot-box'>
                            <h1>{spot.name}</h1>
                            <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                            <SpotImage
                                spot={spot}
                            />
                            <div className='reserve-box'>
                                <div className='reserve-wrap'>
                                    <div className='host'>
                                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                                        <div>{spot.description}</div>
                                    </div>
                                </div>
                                <div className="review">
                                    <div className='reserve'>
                                        <div className='money'>
                                            <div>$ {spot.price} night</div>
                                            {newReviewList.length === 1 &&
                                                <div>★ {spot.avgStarRating}.0 · {newReviewList.length} review</div>
                                            }
                                            {newReviewList.length > 1 &&
                                                <div>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</div>
                                            }
                                        </div>
                                        <button onClick={reserve}>Reserve</button>
                                    </div>
                                </div>

                                {newReviewList.length === 1 &&
                                    <h1>★ {spot.avgStarRating}.0 · {newReviewList.length} review</h1>
                                }
                                {newReviewList.length > 1 &&
                                    <h1>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</h1>
                                }

                            </div>
                            <div className='new-post'>
                                <div className='modal'>
                                    <OpenModalMenuItem
                                        buttonText="Post Your Review"
                                        onItemClick={closeMenu}
                                        modalComponent={<CreateReview
                                            spot={spot}
                                        />}
                                    />
                                </div>
                            </div>
                        </div>
                        <SpotReview
                            spot={spot}
                            newReviewList={newReviewList}
                            userReview={userReview}
                        />
                    </div>
                </section>
            )

        }
        else {
            return (
                <section>
                    <div className='box'>
                        <div className='spot-box'>
                            <h1>{spot.name}</h1>
                            <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                            <SpotImage
                                spot={spot}
                            />
                            <div className='reserve-box'>
                                <div className='reserve-wrap'>
                                    <div className='host'>
                                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                                        <div>{spot.description}</div>
                                    </div>
                                </div>
                                <div className="review">
                                    <div className='reserve'>
                                        <div className='money'>
                                            <div>$ {spot.price} night</div>
                                            {newReviewList.length === 0 &&
                                                <div>★ New</div>
                                            }
                                            {newReviewList.length === 1 &&
                                                <div>★ {spot.avgStarRating}.0 · {newReviewList.length} review</div>
                                            }
                                            {newReviewList.length > 1 &&
                                                <div>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</div>
                                            }
                                        </div>
                                        <button onClick={reserve}>Reserve</button>
                                    </div>
                                </div>
                            </div>
                                {newReviewList.length === 1 &&
                                    <h1>★ {spot.avgStarRating}.0 · {newReviewList.length} review</h1>
                                }
                                {newReviewList.length > 1 &&
                                    <h1>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</h1>
                                }
                                <SpotReview
                                    spot={spot}
                                    newReviewList={newReviewList}
                                    userReview={userReview}
                                    userId={userId}
                                />
                        </div>
                    </div>
                </section>
            )
        }
    }
    else if (userId === spot.ownerId) {
        return (
            <section>
                <div className='box'>
                    <div className='spot-box'>
                        <h1>{spot.name}</h1>
                        <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
                        <SpotImage
                            spot={spot}
                        />
                        <div className='reserve-box'>
                            <div className='reserve-wrap'>
                                <div className='host'>
                                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                                    <div>{spot.description}</div>
                                </div>
                            </div>
                            <div className="review">
                                <div className='reserve'>
                                    <div className='money'>
                                        <div>$ {spot.price} night</div>
                                        {newReviewList.length === 0 &&
                                            <div>★ New</div>
                                        }
                                        {newReviewList.length === 1 &&
                                            <div>★ {spot.avgStarRating}.0 · {newReviewList.length} review</div>
                                        }
                                        {newReviewList.length > 1 &&
                                            <div>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</div>
                                        }
                                    </div>
                                    <button onClick={reserve}>Reserve</button>
                                </div>
                            </div>
                        </div>
                        {newReviewList.length === 0 &&
                            <h1>★ New</h1>
                        }
                        {newReviewList.length === 1 &&
                            <h1>★ {spot.avgStarRating}.0 · {newReviewList.length} review</h1>
                        }
                        {newReviewList.length > 1 &&
                            <h1>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</h1>
                        }
                        {newReviewList.length > 0 &&
                        <SpotReview
                            spot={spot}
                            newReviewList={newReviewList}
                            userReview={userReview}
                            userId={userId}
                        />
                        }
                    </div>
                </div>
            </section>
        )
    }
};

export default SpotInfo;
