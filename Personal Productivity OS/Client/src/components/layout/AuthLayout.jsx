import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className="flex justify-center items-center relative">
      <div className="flex flex-col justify-center items-center w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 z-10">
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        {children}
      </div>
      <div className="absolute hidden md:block w-[100vw] h-screen bg-transparent bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8">
        <div className="w-48 h-48 rounded-[40px] bg-black absolute -top-7 -left-5" />

        <div className="w-48 h-56 rounded-[40px] border-[20px] border-black absolute top-[40%] -right-10" />

        <div className="w-48 h-48 rounded-[40px] bg-black absolute -bottom-7 -left-5" />
      </div>
    </div>
  );
}

export default AuthLayout
