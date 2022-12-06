import axios from "axios";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { USERS_URL } from "../../constants/Urls";
import { RootState } from "../store";
import { StatusList } from "./dishCards";
import {
  EditProfileCredentials,
  RegisterCredentials,
  UpdateAddressCredentials,
} from "../../Hooks/useAuthentication";

export const fetchCheckUser = createAsyncThunk<User, string>(
  "auth/fetchCheckUser",
  async (credentials) => {
    const { data }: { data: User } = await axios.get(
      `${USERS_URL}?email=${credentials}`
    );
    return data;
  }
);
export const fetchLogedInUser = createAsyncThunk<User, string>(
  "auth/fetchLogedInUser",
  async (uid) => {
    const { data }: { data: User[] } = await axios.get(
      `${USERS_URL}?id=${uid}`
    );
    return data[0];
  }
);
export const fetchRegisterUser = createAsyncThunk<User, RegisterCredentials>(
  "auth/fetchRegisterUser",
  async (credentials) => {
    const { data }: { data: User } = await axios.post(USERS_URL, credentials);

    return data;
  }
);
export const fetchUpdateAddress = createAsyncThunk<User, UpdateAddress>(
  "auth/fetchUpdateAddress",
  async (credentials) => {
    const { id, address } = credentials;
    const updatedAddress = { address: { ...address } };

    const { data }: { data: User } = await axios.put(
      `${USERS_URL}/${id}`,
      updatedAddress
    );

    return data;
  }
);
export const fetchEditProfile = createAsyncThunk<User, EditProfile>(
  "auth/fetchEditProfile",
  async (credentials) => {
    const { id, profile } = credentials;

    const { data }: { data: User } = await axios.put(
      `${USERS_URL}/${id}`,
      profile
    );

    return data;
  }
);
export const fetchChangePassword = createAsyncThunk<User, ChangePassword>(
  "auth/fetchChangePassword",
  async (credentials) => {
    const { id, password } = credentials;

    const { data }: { data: User } = await axios.put(
      `${USERS_URL}/${id}`,
      password
    );

    return data;
  }
);

type ChangePassword = {
  id: string;
  password: {
    password: string;
  };
};

type EditProfile = {
  id: string;
  profile: EditProfileCredentials;
};

type UpdateAddress = {
  id: string;
  address: UpdateAddressCredentials;
};

type Address = {
  city: string;
  street: string;
  "house-number": string;
};

type User = {
  id: string | null;
  uid: string | null;
  email: string | null;
  password: string | null;
  firstname: string | null;
  lastname: string | null;
  phone: string | null;

  address?: Address | null;
};

type AuthState = {
  user: User;

  isAuth: boolean;
  status: StatusList;
  error: string;
};

const initialState: AuthState = {
  user: {
    id: null,
    uid: null,
    email: null,
    password: null,
    firstname: null,
    lastname: null,
    phone: null,

    address: null,
  },
  isAuth: false,

  status: StatusList.IDLE,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
      localStorage.setItem("userId", `${action.payload.id}`);
    },
    setLogOut: (state) => {
      localStorage.clear();
      state.user = {
        id: null,
        uid: null,
        email: null,
        password: null,
        firstname: null,
        lastname: null,
        phone: null,

        address: null,
      };
      state.isAuth = false;
      state.status = StatusList.IDLE;
      state.error = "";
    },
    setAuthStatus: (state) => {
      state.status = StatusList.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckUser.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";
      })
      .addCase(fetchCheckUser.fulfilled, (state) => {
        state.status = StatusList.SUCCESS;
      })
      .addCase(fetchCheckUser.rejected, (state, action) => {
        state.error = action.error.message || "Error";
        state.status = StatusList.ERROR;
      })
      .addCase(fetchRegisterUser.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";
      })
      .addCase(fetchRegisterUser.fulfilled, (state) => {
        state.status = StatusList.SUCCESS;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.user = {};
        state.isAuth = false;
        state.status = StatusList.ERROR;
        state.error = action.error.message || "Error";
      })
      .addCase(fetchUpdateAddress.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";
      })
      .addCase(fetchUpdateAddress.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = StatusList.SUCCESS;
      })
      .addCase(fetchUpdateAddress.rejected, (state, action) => {
        state.status = StatusList.ERROR;
        state.error = action.error.message || "Error";
      })
      .addCase(fetchEditProfile.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";
      })
      .addCase(fetchEditProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = StatusList.SUCCESS;
      })
      .addCase(fetchEditProfile.rejected, (state, action) => {
        state.status = StatusList.ERROR;
        state.error = action.error.message || "Error";
      })
      .addCase(fetchChangePassword.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";
      })
      .addCase(fetchChangePassword.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = StatusList.SUCCESS;
      })
      .addCase(fetchChangePassword.rejected, (state, action) => {
        state.status = StatusList.ERROR;
        state.error = action.error.message || "Error";
      })
      .addCase(fetchLogedInUser.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";
      })
      .addCase(fetchLogedInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.status = StatusList.SUCCESS;
      })
      .addCase(fetchLogedInUser.rejected, (state, action) => {
        state.status = StatusList.ERROR;
        state.error = action.error.message || "Error";
      });
  },
});

export const getAuthState = (state: RootState) => state.authSlice;

export const { setUser, setAuthStatus, setLogOut } = authSlice.actions;

export default authSlice.reducer;

{
  /*
 [fetchCheckUser.pending]: (state) => {
      state.status = "pending";
      state.error = "";
    },
    [fetchCheckUser.fulfilled]: (state) => {
      state.status = "success";
    },
    [fetchCheckUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "error";
    },
 [fetchRegisterUser.pending]: (state) => {
      state.status = "pending";
      state.error = "";
    },
    [fetchRegisterUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.error = "";
    },
    [fetchRegisterUser.rejected]: (state, action) => {
      state.user = {};
      state.isAuth = false;
      state.status = "error";
      state.error = action.error.message;
    },
     [fetchUpdateAddress.pending]: (state) => {
      state.status = "pending";
      state.error = "";
    },
    [fetchUpdateAddress.fulfilled]: (state, action) => {
      state.user = action.payload;

      state.status = "success";
      state.error = "";
    },
    [fetchUpdateAddress.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [fetchEditProfile.pending]: (state) => {
      state.status = "pending";
      state.error = "";
    },
    [fetchEditProfile.fulfilled]: (state, action) => {
      state.user = action.payload;

      state.status = "success";
      state.error = "";
    },
    [fetchEditProfile.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [fetchChangePassword.pending]: (state) => {
      state.status = "pending";
      state.error = "";
    },
    [fetchChangePassword.fulfilled]: (state, action) => {
      state.user = action.payload;

      state.status = "success";
      state.error = "";
    },
    [fetchChangePassword.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    extraReducers: {    
    
    [fetchLogedInUser.pending]: (state) => {
      state.status = "pending";
      state.error = "";
    },
    [fetchLogedInUser.fulfilled]: (state, action) => {
      state.user = action.payload[0];
      state.isAuth = true;

      state.status = "";
      state.error = "";
    },
    [fetchLogedInUser.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  }
  */
}
