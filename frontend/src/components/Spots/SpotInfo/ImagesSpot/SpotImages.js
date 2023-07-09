import React from "react"

const SpotImage = ({ spot }) => {
    const {SpotImages} = spot
    return (
        <div className='images'>
            <div className='img1'>
            <img src={SpotImages[0].url} alt='house'/>
            </div>
            <div className='img2'>
            {SpotImages.slice(1, 5).map((image, index) => (
          <img key={index} src={image.url} alt="house" />
        ))}
            </div>
        </div>
    )
}


export default SpotImage
