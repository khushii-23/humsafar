import React, { createContext, useState, useContext, useEffect } from 'react';
import RNSecureStorage from 'rn-secure-storage';
// import authData from
const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
        loadStorageData();
    }, []);

    async function loadStorageData() {
        try {
            const res = await RNSecureStorage.getItem("@AuthData");
            if (res) {
                const authData = JSON.parse(res);
                setAuthData(authData);
            }
        } catch (error) {
            console.log('Failed to load auth data from storage:', error);
        } finally {
            setLoading(false);
        }
    }



    const signIn = async (data) => {
        try {
            const response = await fetch(`http://10.0.41.39:8000/api/user-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.success) {
                console.log('SIGN IN: ', typeof result, result)
                setAuthData(result.user);
                await RNSecureStorage.setItem("@AuthData", JSON.stringify(result.user));
            } else {
                setAuthError(result);
            }
            return result;
        } catch (error) {
            console.error('Login error:', error);
            setAuthError({ error: 'Network error' });
        }
    };

    const signUp = async (data, navigation) => {
        try {
            const response = await fetch('http://10.0.41.39:8000/api/user-registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
                console.log('SIGN UP: ', typeof result, result)
                setAuthData(result.user);
                await RNSecureStorage.setItem("@AuthData", JSON.stringify(result.user));
            } else {
                setAuthError(result);
            }
            return result;
        } catch (error) {
            console.error('Registration error:', error);
            setAuthError({ error: 'Network error' });
        }
    };

    const updateInterests = async (data) => {
        try {
            const response = await fetch(`http://10.0.41.39:8000/api/update-interests/${data.userId}/interests`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.status) {
                setAuthData(result);
                await RNSecureStorage.setItem("@AuthData", JSON.stringify(result));
            } else {
                setAuthError(result);
            }
            return result;
        } catch (error) {
            console.error('Update interests error:', error);
            setAuthError({ error: 'Network error' });
        }
    };

    const getActivePortalForStudents = async ({ course, semester, subjectType, subject, batch }) => {
        const url = `https://attendease-sksc.somaiya.edu/api_v1/get-active-portal-students?course=${course}&subjectType=${subjectType}&semester=${semester}&subject=${subject}&batch=${batch}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                }
            });
            const data = await response.json();
            console.log("Active Portal Data:", data);
            return data;
        } catch (error) {
            console.error("Error fetching active portal data:", error);
        }
    };

    const signOut = async () => {
        setAuthData(null);
        try {
            await RNSecureStorage.removeItem("@AuthData");
        } catch (error) {
            console.error('Error removing auth data from storage:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ authData, loading, signIn, signUp, signOut, authError, setAuthError, updateInterests, getActivePortalForStudents }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export { AuthContext, AuthProvider, useAuth };