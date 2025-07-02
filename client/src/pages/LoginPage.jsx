import { Form } from "react-router-dom";

export default function LoginPage() {
  return (
    <>
      <Form method="POST">
        <label htmlFor="username">username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <button type="submit">submit</button>
      </Form>
    </>
  );
}

export async function action({ request, params }) {
  console.log(request);
  const data = await request.formData()
  const username = data.get('username');
  const email = data.get('email');

  const userData = {
    username,
    email
  }

  console.log(userData)
  
  const res = await fetch("http://localhost:3000/login",{
    method:'POST',
     headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(userData)
  });
  if(!res.ok){
    throw new Error('Error....')
  }
}
