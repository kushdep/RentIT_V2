function Label({labelType,fontW,forI,title}) {
    let cssClass=labelType+' '+fontW
  return (
    <>
      <label className={cssClass} htmlFor={forI}>
        {title}
      </label>
    </>
  );
}

export default Label;
