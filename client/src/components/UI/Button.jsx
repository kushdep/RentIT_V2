function Button({title,btnType,btnBg,btnW,props}) {
    let cssClass = "btn w-"+btnW+" fw-semibold "+btnBg
    console.log(cssClass)
  return (
    <>
      <button type={btnType} className={cssClass} {...props}>
        {title}
      </button> 
    </>
  );
}

export default Button;