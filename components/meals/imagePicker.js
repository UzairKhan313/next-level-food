'use client'

import { useRef, useState } from 'react'

import classes from './imagePicker.module.css'
import Image from 'next/image'

export default function ImagePicker({ label, name }) {
  const imageInput = useRef()
  const [pickedImage, setPickedImage] = useState()

  function handlePickClick() {
    imageInput.current.click()
  }

  function handleImageChange(e) {
    const file = e.target.files[0]

    if (!file) {
      setPickedImage(null)
      return
    }
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPickedImage(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage ? (
            <p>No image picked yet.</p>
          ) : (
            <Image src={pickedImage} alt="Image picked by the user" fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  )
}
