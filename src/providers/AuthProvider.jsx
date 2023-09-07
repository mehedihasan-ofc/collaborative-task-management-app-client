import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase.config';


export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(false);

    // create user => email and password
    const createUser = (email, password) => {
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // sign in user => email and password
    const signIn = (email, password) => {
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // user log out
    const logOut = () => {
        setIsLoading(true);
        return signOut(auth)
    }

    // observe auth state change
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('currentUser', currentUser);
            setUser(currentUser);
            setIsLoading(false);
        });

        return () => {
            return unsubscribe();
        }

    }, [reload]);

    const updateUserData = (user, name, photoUrl) => {

        setIsLoading(true);
        return updateProfile(user, {
            displayName: name, photoURL: photoUrl
        })
    };

    const authInfo = {
        user,
        isLoading,
        createUser,
        signIn,
        setReload,
        updateUserData,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;