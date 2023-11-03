import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

const Main = () => {
  return (
    <div className="wrapper min-w-[1024px]">
      <main>
        <h2 className="tracking-wider">Techit</h2>
        <h1 className="mt-2 mb-8 tracking-widest">BLOCKCHAIN SCHOOL 4th</h1>
        <Link to="/members">
          <button className="text-xl flex items-center hover:text-black">
            구경하기 <AiOutlineArrowRight className="ml-2 text-2xl" />
          </button>
        </Link>
      </main>
      <div>
        <span className="dot"></span>
      </div>
      <div>
        <span className="dot"></span>
      </div>
      <div>
        <span className="dot"></span>
      </div>
      <div>
        <span className="dot"></span>
      </div>
      <div>
        <span className="dot"></span>
      </div>
      <div>
        <span className="dot"></span>
      </div>
      <div>
        <span className="dot"></span>
      </div>
      <div>
        <span className="dot"></span>
      </div>
      <div>
        <span className="dot"></span>
      </div>
      <div>
        <span className="dot"></span>
      </div>
      <div>
        <span className="dot"></span>
      </div>
      <div>
        <span className="dot"></span>
      </div>
      <div>
        <span className="dot"></span>
      </div>
      <div>
        <span className="dot"></span>
      </div>
      <div>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default Main;
