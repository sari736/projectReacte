import { useDispatch ,useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import '../App.css';

const Login = () =>{
    const dispatch = useDispatch();
        // register: מחבר את האינפוטים לטופס
    // handleSubmit: מטפל בשליחה רק אם הכל תקין
    const { currentUser, authError } = useSelector(state => state.auth || {});
    const { register, handleSubmit } = useForm();
        //  פונקציית שליחת הטופס
    const onSubmit = (data) => {
        // data מכיל אובייקט עם השדות: data.userName ו-data.password
        dispatch({ type: "Login",payload:{username: data.username, email: data.email}  });
        // מעבר לדף הפרויקטים (הבדיקה האמיתית קורית ב-Slice)
        
    };
    if (currentUser) {
        // navigate('/AllProject');
       return <Navigate to="/AllProject" />
    }
    return(
        <>
        {/* Login */}
        <h1>להרשמה ולהתחברות</h1>
        {/* הצגת שגיאה במידה והנתונים לא נכונים */}
        {authError && <p style={{ color: 'red', fontWeight: 'bold' }}>{authError}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* <Link to={'/login'}></Link> */}
        {/* <div>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        {...register("userName", { required: "שדה חובה" })} 
                    />
                    {errors.userName && <span className="error">{errors.userName.message}</span>}
                </div> */}
       <div> <input type="text"placeholder="name"{...register("username")}></input></div>
       <div> <input type="text"placeholder="email"{...register("email")}></input></div>

       <button type="submit">כניסה</button>
       </form>
       {/* </form> */}
        {/* <input type="text"placeholder="name"value={userName} onChange={(e)=>setUserName(e.target.value)}></input>
        <input type="text"placeholder="email" value={email}  onChange={(e) => setEmail(e.target.value)} /> */}
        {/* // <Link to="/AllProject">כניסה</Link>
        // <button>שמור</button> */}
        </>
    )

}
export default Login;