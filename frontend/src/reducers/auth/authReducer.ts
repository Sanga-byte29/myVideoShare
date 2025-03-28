import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import backendApi from "../../api/backendApi";
import { toast } from "sonner";
import { NavigateFunction } from "react-router-dom";

interface User {
    _id: string;
    email: string;
    name?: string;
    token: string;
    uploadCount: number;
    downloadCount: number;
}

export interface AuthState {
    loggedInUser: User | null;
    loading: boolean;
}

interface SignUpPayload {
    email: string;
    password: string;

}
interface SignInPayload {
    email: string;
    password: string;
    navigate: NavigateFunction;

}
interface AuthResponse{
    success: boolean;
    message: string;
    user?: User;
}

const initialState: AuthState = {
    loggedInUser: null,
    loading: false,
};



//sign up request to the backend
export const signUpUser = createAsyncThunk<void, SignUpPayload, {rejectValue: string}>("auth/sign-up-user", async(payload, thunkApi)=> {
    try {
        const {data} = await backendApi.post<AuthResponse>("/api/v1/auth/sign-up", payload);
        if(data.success){
            toast.success(data.message);
        }
        else {
            toast.warning(data.message);
        }
    } catch (error) {
        console.error(error);
    }
});

export const signInUser = createAsyncThunk<string | null,SignInPayload,{rejectValue: string}>("auth/sing-in-user", async(payload, thunkApi) => {
    try {
        const {email, password, navigate} = payload;
        const {data} = await backendApi.post<AuthResponse>("/api/v1/auth/sign-in", payload);
        if (data.success && data.user?.token) {
            if (data.user){
                toast.success(data.message);
                localStorage.setItem("token", data.user.token);
                navigate("/user/profile");
            }
            return data.user.token || null;
        } else{
            toast.warning(data.message);
            return thunkApi.rejectWithValue(data.message);
        }

}
catch (error: any) {
    const errorMessage = error.response?.message || "Something went wrong!";
    toast.error(errorMessage);
    return thunkApi.rejectWithValue(errorMessage);
}
});

export const fetchUserDetails = createAsyncThunk<
  User | null,
  void,
  { rejectValue: string }
>("auth/fetchUserDetails", async (_, thunkApi) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkApi.rejectWithValue("No token found");
    }

    const { data } = await backendApi.get<AuthResponse>(
      "/api/v1/user/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the header
        },
      }
    );

    if (data.success && data.user) {
      return data.user; // Return the user details
    } else {
      return thunkApi.rejectWithValue(data.message);
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch user details";
    return thunkApi.rejectWithValue(errorMessage);
  }
});


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOutUser: (state,action) => {
            const navigate = action.payload;
            localStorage.removeItem("token");
            state.loggedInUser = null;
            toast.info("We will miss you!");
            navigate("/sign-in");
        }
    },

    extraReducers:(builder) => {
        builder.addCase(signInUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(signInUser.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(signInUser.rejected, (state) => {
            state.loading = false;
        })
        .addCase(fetchUserDetails.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchUserDetails.fulfilled, (state, action) => {
            state.loggedInUser = action.payload;
            state.loading = false;
          })
          .addCase(fetchUserDetails.rejected, (state) => {
            state.loading = false;
          });
    }
});

export const authReducer = authSlice.reducer;
export const { logOutUser} = authSlice.actions;
export const selectLoggedInUser = (state: RootState) => state.auth.loggedInUser;
export const selectLoading = (state: RootState) => state.auth.loading;