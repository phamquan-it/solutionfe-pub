import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './api/userApi'
import { categoryApi } from './api/categoryApi'
import { cashflowApi } from './api/cashflowApi'
import { projectApi } from './api/projectApi'
import { settingApi } from './api/settingApi'
import { logApi } from './api/logApi'
import { refundApi } from './api/refundApi'
import { serviceApi } from './api/serviceApi'
import { bankApi } from './api/bankApi'
import { authApi } from './api/authApi'
import authReducer from './slices/authSlice'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { technologyApi } from './api/technologyApi'
import { languageApi } from './api/languageApi'
import { contactApi } from './api/contactApi'
import { paymentApi } from './api/paymentApi'
import { it_categoryApi } from './api/it_categoryApi'
import { faqApi } from './api/faqApi'
import userSlice from './slices/userSlice'
import { postApi } from './api/postApi'




export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        auth: authReducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [languageApi.reducerPath]: languageApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [cashflowApi.reducerPath]: cashflowApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [settingApi.reducerPath]: settingApi.reducer,
        [logApi.reducerPath]: logApi.reducer,
        [refundApi.reducerPath]: refundApi.reducer,
        [serviceApi.reducerPath]: serviceApi.reducer,
        [bankApi.reducerPath]: bankApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [technologyApi.reducerPath]: technologyApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer,
        [it_categoryApi.reducerPath]: it_categoryApi.reducer,
        [faqApi.reducerPath]:faqApi.reducer,
        [postApi.reducerPath]:postApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({

        }).concat([
            userApi.middleware,
            categoryApi.middleware,
            cashflowApi.middleware,
            projectApi.middleware,
            settingApi.middleware,
            logApi.middleware,
            refundApi.middleware,
            serviceApi.middleware,
            bankApi.middleware,
            authApi.middleware,
            technologyApi.middleware,
            languageApi.middleware,
            contactApi.middleware,
            paymentApi.middleware,
            it_categoryApi.middleware,
            postApi.middleware,
            faqApi.middleware
        ]),

})

export const makeStore = () => {
    return store
}

export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']
