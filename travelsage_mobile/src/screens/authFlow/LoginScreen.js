import { TouchableOpacity, View } from 'react-native'
import { Text } from '@rneui/base'
import { TextInput } from 'react-native-paper'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../contexts/Auth';
import { ScrollView } from 'react-native'

export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const navigation = useNavigation()

    //signup
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
  

    const auth = useAuth();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[a-zA-Z]+$/;
    const [isLogin, setIsLogin] = useState(true)


    const handleSubmit = (user) => {
        if (email === '' || password === '') {
            return setError("All fields are required")
        }

        if (emailRegex.test(email)) {
            // auth.signIn(user)
            auth.signIn(user)
            // console.log(auth.authError)
        } else {
            setError("Please Enter Valid Email")
        }
    }


    //signup submit button
    const signuphandleSubmit = (user) => {
        if (
            email === '' ||
            password === '' ||
            firstName === '' ||
            middleName === '' ||
            lastName === ''
        ) {
            return setError("All fields are required");
        }
    
        if (!nameRegex.test(firstName) || !nameRegex.test(middleName) || !nameRegex.test(lastName)) {
            return setError("Names should only contain letters (no numbers or symbols)");
        }
    
        if (!emailRegex.test(email)) {
            return setError("Please enter a valid email");
        }
    
        auth.signUp(user);
    };
    
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#FFFBF0',
            padding: 20,
            justifyContent: 'flex-start', // Align content from top
            paddingTop: 150, // Adjust the space at the top to move the content up
        }}>
            <Text style={{
                fontSize: 28,
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#333333',
            }}>
                Welcome to humSafar
            </Text>
    
            <Text style={{
                fontSize: 16,
                color: '#666666',
                textAlign: 'center',
                marginBottom: 20,
            }}>
                {isLogin ? 'Login or Sign up to access your account' : 'Create an account to get started'}
            </Text>
    
            {/* Toggle Tabs */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 10,
            }}>
                <TouchableOpacity onPress={() => setIsLogin(true)}>
                    <Text style={{
                        fontSize: 16,
                        color: isLogin ? '#333333' : '#999999',
                        marginHorizontal: 20,
                        paddingBottom: 6,
                        borderBottomWidth: 2,
                        borderBottomColor: isLogin ? '#FF6F61' : 'transparent',
                    }}>
                        Login
                    </Text>
                </TouchableOpacity>
    
                <TouchableOpacity onPress={() => setIsLogin(false)}>
                    <Text style={{
                        fontSize: 16,
                        color: !isLogin ? '#333333' : '#999999',
                        marginHorizontal: 20,
                        paddingBottom: 6,
                        borderBottomWidth: 2,
                        borderBottomColor: !isLogin ? '#FF6F61' : 'transparent',
                    }}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
    
            {isLogin ? (
                <>
                    {/* Login Form */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#FFF0EC',
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        marginVertical: 6,
                        borderWidth: 1,
                        borderColor: '#E2DCD7',
                    }}>
                        <TextInput
                            placeholder="Email Address"
                            placeholderTextColor="#999999"
                            style={{
                                flex: 1,
                                height: 45,
                                marginLeft: 8,
                                fontSize: 16,
                                color: '#333333',
                            }}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
    
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#FFF0EC',
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        marginVertical: 6,
                        borderWidth: 1,
                        borderColor: '#E2DCD7',
                    }}>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#999999"
                            style={{
                                flex: 1,
                                height: 45,
                                marginLeft: 8,
                                fontSize: 16,
                                color: '#333333',
                            }}
                            value={password}
                            secureTextEntry={secureTextEntry}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                            <Text style={{ fontSize: 16, color: '#999999' }}>
                                {secureTextEntry ? '👁' : '🙈'}
                            </Text>
                        </TouchableOpacity>
                    </View>
    
                    <TouchableOpacity>
                        <Text style={{
                            textAlign: 'right',
                            marginTop: 6,
                            marginBottom: 16,
                            color: '#E94E77',
                            fontSize: 14,
                        }}>
                            Forgot password?
                        </Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={{
                        backgroundColor: '#FF6F61',
                        padding: 14,
                        borderRadius: 10,
                        alignItems: 'center',
                    }} onPress={() => handleSubmit({ email, password })}>
                        <Text style={{
                            color: '#FFFFFF',
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}>
                            Login
                        </Text>
                    </TouchableOpacity>
    
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 12,
                        marginTop: 20,
                        color: '#888888',
                    }}>
                        By signing in, you agree to humSafar’s{' '}
                        <Text style={{ color: '#E94E77' }}>Terms of Service</Text> and{' '}
                        <Text style={{ color: '#E94E77' }}>Privacy Policy</Text>.
                    </Text>
                </>
            ) : (
                <ScrollView style={{ width: '100%' }} contentContainerStyle={{ paddingBottom: 30 }}>
                    {[{ label: "First Name", value: firstName, setter: setFirstName },
                      { label: "Middle Name", value: middleName, setter: setMiddleName },
                      { label: "Last Name", value: lastName, setter: setLastName },
                      { label: "Email", value: email, setter: setEmail }]
                      .map((field, index) => (
                        <View key={index} style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#FFF0EC',
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            marginVertical: 6,
                            borderWidth: 1,
                            borderColor: '#E2DCD7',
                        }}>
                            <TextInput
                                placeholder={field.label}
                                placeholderTextColor="#999999"
                                style={{
                                    flex: 1,
                                    height: 45,
                                    marginLeft: 8,
                                    fontSize: 16,
                                    color: '#333333',
                                }}
                                value={field.value}
                                onChangeText={text => {
                                    field.setter(text);
                                    setError('');
                                }}
                            />
                        </View>
                    ))}
    
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#FFF0EC',
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        marginVertical: 6,
                        borderWidth: 1,
                        borderColor: '#E2DCD7',
                    }}>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#999999"
                            style={{
                                flex: 1,
                                height: 45,
                                marginLeft: 8,
                                fontSize: 16,
                                color: '#333333',
                            }}
                            value={password}
                            secureTextEntry={secureTextEntry}
                            onChangeText={text => {
                                setPassword(text);
                                auth.setAuthError(null);
                                setError('');
                            }}
                        />
                        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                            <Text style={{ fontSize: 16, color: '#999999' }}>
                                {secureTextEntry ? '👁' : '🙈'}
                            </Text>
                        </TouchableOpacity>
                    </View>
    
                    {auth.authError !== null &&
                        <Text style={{ color: 'red', fontSize: 14, fontWeight: '600', textAlign: 'center' }}>
                            {auth?.authError?.message}
                        </Text>}
    
                    {error !== '' &&
                        <Text style={{ color: 'red', fontSize: 14, textAlign: 'center', marginVertical: 10 }}>
                            {error}
                        </Text>}
    
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#FF6F61',
                            padding: 14,
                            borderRadius: 10,
                            alignItems: 'center',
                        }}
                        onPress={() => signuphandleSubmit({ email, password, firstName, middleName, lastName })}
                    >
                        <Text style={{
                            fontSize: 18,
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                            Register
                        </Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity onPress={() => setIsLogin(true)}>
                        <Text style={{
                            fontSize: 16,
                            color: '#2D2D2D',
                            textAlign: 'center',
                            marginTop: 16,
                        }}>
                            Already have an Account?
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            )}
        </View>
    );
    
    
}    