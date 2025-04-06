
import { BsFillPinMapFill } from "react-icons/bs";
interface props {
    name: String;
    address: String;
    description: String
}
function PreviewCard({name, address, description}: props) {
    return (
            <div className="card bg-lime-50 w-96 shadow-xl">
    <figure className="px-10 pt-10">
        <img
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Shoes"
        className="rounded-xl" />
    </figure>
    <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="inline-flex items-center gap-1 text-m ">
            <BsFillPinMapFill className="text-lg text-orange-300" />
            {address}
        </div>
        <div className="card-actions">
        <button className="btn bg-orange-300 text-black hover:bg-orange-400">Visit Website</button>
        </div>
    </div>
    </div>

    )
}

export default PreviewCard