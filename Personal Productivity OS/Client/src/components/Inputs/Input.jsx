const Input = ({ value, onChange, placeholder, label, type }) => {

  return (
      <div>
          <label className="text-[13px] text-slate-800">{label}</label>

          <div className="input-box relative">
              <input type="password" placeholder={placeholder} className="w-full bg-transparent outline-none" value={value} onChange={(e)=> onChange(e)}/>
          </div>
    </div>
  )
}

export default Input
