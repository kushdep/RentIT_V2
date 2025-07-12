function Input({ formClass,props }) {
  let cssClass = formClass
  return (
    <>
      <input
        className={cssClass}
        {...props}
      />
    </>
  );
}

export default Input;
