import { Link } from 'react-router-dom'

export default function abortButton() {
  return (
    <>
    <Link to="/"> 
        <button className="py-4 px-6 my-10 mx-10 bg-gray-50 text-gray-600 rounded-full shadow hover:bg-gray-100 hover:shadow-md gap-4">
          <span>
            Avbryt
          </span>
        </button>
    </Link>
    </>
  )
}
