function Button({title,btnType,btnBg,btnW}) {
    let cssClass = "btn w-"+btnW+" fw-semibold "+btnBg
    console.log(cssClass)
  return (
    <>
      <button type={btnType} className={cssClass}>
        {title}
      </button>
    </>
  );
}

export default Button;