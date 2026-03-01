import { Link } from "react-router-dom";

const Home = () => {
    return(
        <>
       Home-דף הבית
    <div>
      <h1>מערכת לניהול פרויקטים</h1>
    </div>
    {/* <Link to='/AllProject'>פרויקטים שלי</Link><br /> */}
    <Link to='/Login'>Login-להרשמה ולהתחברות</Link>
        </>
    )
}

export default Home