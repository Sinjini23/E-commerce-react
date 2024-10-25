// Assume you have a redux action to set the user ID
// redux/actions/authActions.js

export const setUserId = (userId) => ({
    type: 'SET_USER_ID',
    payload: userId,
  });
  
  // redux/reducers/authReducer.js
  
  const initialState = {
    userId: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_ID':
        return {
          ...state,
          userId: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  