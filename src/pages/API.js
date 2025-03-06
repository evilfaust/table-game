import React from 'react';
import SendData from "../utils/SendData";
import { AuthProvider } from '../utils/AuthContext';

const API = () => {

    return (
        <>
        <AuthProvider>
          <SendData />
        </AuthProvider>
        </>
    )
}
export default API;