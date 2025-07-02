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
  console.log(data)
  const res = await fetch("http://localhost:3000/login",{
    method:'POST',
     headers:{
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body:JSON.stringify(data)
  });
  if(!res.ok){
    throw new Error('Error....')
  }
}
