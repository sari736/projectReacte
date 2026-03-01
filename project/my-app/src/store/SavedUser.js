import { createSlice } from '@reduxjs/toolkit';
const SavedUserbegin = {
  //שמירת משתמש 
  savedUser: { 
    username: 'sari', 
    email: '@sy012345' 
  },authError: null ,// הודעת השגיאה
  currentUser: null
};
export const SavedUser=(state=SavedUserbegin,action)=>{
    switch (action.type) {
        case "Login":{
            const{username,email}=action.payload;
             if(username===state.savedUser.username && email === state.savedUser.email)
                return {
                    // תיקח את כל מה שיש באובייקט ה-State הנוכחי ותעתיק אותו כפי שהוא לתוך האובייקט החדש".
                    ...state,  
                    authError: null,      
                    currentUser: username 
                };
              else{
                return {
                    // תיקח את כל מה שיש באובייקט ה-State הנוכחי ותעתיק אותו כפי שהוא לתוך האובייקט החדש".
                    ...state,  
                    authError: "שם משתמש או סיסמה אינם נכונים",      
                };
              }
        }
        default:
            return state;
    }
}
export default SavedUser;

