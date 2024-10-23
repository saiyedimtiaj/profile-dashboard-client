import auth from "../firebase/firebase.config";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

type TContext = {
    user: User | null; // Use the correct type from Firebase
    setUser: Dispatch<SetStateAction<User | null>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
    signin: (email: string, password: string) => Promise<UserCredential>; // Correctly type the signin function
    logout: () => Promise<void>; // Add logout function type
}

export const UserContext = createContext<TContext | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    // Signin function
    const signin = (email: string, password: string) => {
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Logout function
    const logout = () => {
        setIsLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false); // Stop loading after getting user state
            console.log(currentUser);
        });
        return () => {
            unsubscribe(); // Properly cleanup the subscription
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading, signin, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for consuming the context
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within the UserProvider context");
    }
    return context;
};

export default UserProvider;
