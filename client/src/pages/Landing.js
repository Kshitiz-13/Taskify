import main from "../assets/images/landing.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}

        <div className="info">
          <h1>
            Tasks <span>tracking</span> app
          </h1>
          <p>
            Taskiify A web App made using MERN to make our life easier while
            applying for Jobs and while doing our daily tasks. With very user
            friendly interface one can track various jobs they applied to and
            can easily manage a Tasks List within the App!! Working on more
            features that will be available soon!
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
