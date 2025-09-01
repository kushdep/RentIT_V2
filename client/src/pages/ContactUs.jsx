import ContactUsForm from "../components/ContactUsForm";

function ContactUs() {
  return (
    <>
      <div className="page-heading image-fluid">
        <img src="/images/contactUs.png" className="shadow" alt="" />
      </div>
      <ContactUsForm emailId='info@Rent-IT.com'/>
    </>
  );
}

export default ContactUs;
