import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSpot, thunkAllSpots} from "../../../store/spot";
import { thunkGetReviews } from "../../../store/review";
import { useParams, useHistory } from "react-router-dom";
import './SpotInfo.css';

const SpotInfo = () => {
    const dispatch = useDispatch();
}


export default SpotInfo
