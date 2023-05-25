import { LoginForm } from "../features/auth"

const Account = () => {
  return (
    <section className='flex justify-center items-center w-[100%] h-[100vh]'>
      <div className='border border-gray-300 rounded-lg w-96 p-10'>
        <LoginForm />
      </div>
    </section>
  )
}

export default Account