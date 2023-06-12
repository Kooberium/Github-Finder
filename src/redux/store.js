import {createSlice, configureStore} from '@reduxjs/toolkit';


const favoritereposSlice = createSlice({
    name: 'Favorite_Repository',
    initialState: JSON.parse(localStorage.getItem('favorite_repository')) || [],
    reducers: {
        addRepository(state, action) {
            state.push(action.payload)
            localStorage.setItem('favorite_repository', JSON.stringify(state));
        },
        removeRepository(state, action) {
            const filter = state.filter(el => el.id !== action.payload);

            localStorage.setItem('favorite_repository', JSON.stringify(filter)); 
            return filter;
        }
    }
})

const userepositorySlice = createSlice({
    name: 'User_Repository_Data',
    initialState: [],
    reducers: {
        setData(state, action) {
            state = action.payload;
            return state;
        },
    }
})

export const {addRepository, removeRepository} = favoritereposSlice.actions;
export const {setData} = userepositorySlice.actions;




const store = configureStore({
    reducer: {
        favlist: favoritereposSlice.reducer,
        reposlist: userepositorySlice.reducer,
    },
});


export default store;