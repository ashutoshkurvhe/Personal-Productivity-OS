import React from 'react'

const CustomButton = ({name, icon, styles}) => {
  return (
    <button className={`${styles}`}>
      {icon} {name}
    </button>
  )
}

export default CustomButton
