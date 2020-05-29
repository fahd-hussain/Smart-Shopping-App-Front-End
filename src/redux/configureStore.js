import { createStore, applyMiddleware } from "redux";
import { AsyncStorage } from "react-native";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistCombineReducers } from "redux-persist";

// Local Imports
import { userReducer } from "./user/userReducer";
import { tokenReducer } from "./token/tokenReducer";
import { listReducer } from "./list/listReducer";
import { allListReducer } from "./allList/allListReducer";
import { cartReducer } from "./cart/cartReducer";
import { promoReducer } from "./promotion/promoReducer";
import { storeReducer } from "./store/storeReducer";
import { shelfReducer } from './shelf/shelfReducer'

export default ConfigureStore = () => {
    const config = {
        key: "root",
        storage: AsyncStorage,
        debug: true,
    };

    const store = createStore(
        persistCombineReducers(config, {
            user: userReducer,
            token: tokenReducer,
            list: listReducer,
            allList: allListReducer,
            cart: cartReducer,
            promo: promoReducer,
            store: storeReducer,
        }),
        applyMiddleware(
            thunk,
            // logger
        ),
    );

    const persistor = persistStore(store);
    return { persistor, store };
};
