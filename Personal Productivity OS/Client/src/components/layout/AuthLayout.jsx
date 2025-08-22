import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className="flex justify-center items-center relative bg-black">
      <div className="flex flex-col justify-center items-center w-screen h-screen md:w-[60vw] px-8 pt-8 pb-12 z-10">
        <h2 className="text-center lg:text-left text-4xl mb-1 lg:mb-5 font-medium text-white">Personal Productivity OS</h2>
        {children}
      </div>
      
    </div>
  );
}

export default AuthLayout
