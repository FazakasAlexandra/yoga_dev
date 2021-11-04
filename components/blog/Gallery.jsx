import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useImage } from './hooks/'

export default function Gallery({ pictures, closeGallery, isOpen }) {
    const [picturesCategory, setPicturesCategory] = useState(pictures[0].category)
    const { insertImage } = useImage();

    const galleryLayout = (pictures) => {
        let result = [];
        let pictureIndex = 0;

        const photos = pictures.find(({ category }) => category === picturesCategory).photos;

        [1, 2, 3].forEach((ro, idx) => {
            [1, 2, 3].forEach((col) => {
                if (result[idx]) {
                    result[idx].push(photos[pictureIndex].urls)
                } else {
                    result[idx] = [photos[pictureIndex].urls]
                }
                pictureIndex++
            })
        })

        return result
    }

    const selectPicture = (urls) => {
        insertImage(urls.regular)
        closeGallery();
    }

    return (
        <>
            <Dialog
                open={isOpen}
                maxWidth="md"
                scroll="body"
            >
                <FontAwesomeIcon
                    className="close-gallery"
                    icon={faTimes}
                    size='1x'
                    onClick={closeGallery}
                />
                <div className="gallery">
                    <h1>My gallery</h1>
                    <div className="categories-container">
                        {pictures.map(({ category }) => category !== "exercisess" && <span
                            className={`category ${category}`}
                            onClick={() => setPicturesCategory(category)}>
                            {category}
                        </span> || null)}
                    </div>
                    <div className="row">
                        {galleryLayout(pictures).map(col => {
                            return <div className="column">
                                {col.map(urls => <>
                                    <div data-category={picturesCategory}>
                                        <img src={urls.small} onClick={() => selectPicture(urls)}/>
                                    </div>
                                </>
                                )}
                            </div>
                        })}
                    </div>
                </div>
            </Dialog>
        </>
    );
}
