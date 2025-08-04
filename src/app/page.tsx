import Image from "next/image";
import AddDateForm from "../components/AddDateForm";

const HomePage = () => {
  return (
      <main className="min-h-screen p-8 bg-blue-500">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Dating Tracker
        </h1>
        <h1 className='text-2xl font-semibold text-center mb-4 text-yellow-300'>
          HELLO WORLD
        </h1>
        <div className="bg-red-500 p-4 text-white rounded mb-4">
          This should be RED if Tailwind is working
        </div>
        <AddDateForm />
      </main>
    )
};

export default HomePage;