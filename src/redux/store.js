import { configureStore } from "@reduxjs/toolkit";

// import { filterReducer } from "./slices/filter";

import { authReducer } from "./slices/auth";
import { userReducer } from "./slices/user";

const store = configureStore({
    reducer: {
        // filter: filterReducer,
        
        auth: authReducer,
        user: userReducer
    },
});

export default store;