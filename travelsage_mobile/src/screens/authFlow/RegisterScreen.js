import { TouchableOpacity, View } from 'react-native'
import { Text } from '@rneui/base'
import { TextInput } from 'react-native-paper'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../contexts/Auth';
import { ScrollView } from 'react-native'

export const Register = () => {

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const navigation = useNavigation()

    const auth = useAuth();

    const emailRegex = /\S+@\S+\.\S+/;

    const handleSubmit = (user) => {
        if (email === '' || password === '' || firstName === '' || middleName === '' || lastName === '') {
            return setError("All fields are required")
        }

        if (emailRegex.test(email)) {
            // auth.signIn(user)
            auth.signUp(user)
            // console.log(auth.authError)
        } else {
            setError("Please Enter Valid Email")
        }
    }

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            backgroundColor: '#F2EFE7', // Soft, natural background
            paddingHorizontal: 20,
        }}>
           
                 <Text style={{
                    marginTop:120,
                fontSize: 60,
                paddingVertical: 30,
                fontFamily: 'Poppins-Bold',
                color: '#226B6F', // Deep teal for brand name
            }}>
                TravelSage
            </Text>
            <Text style={{
                fontSize: 35,
                paddingVertical: 10,
                fontFamily: 'Poppins-Bold',
                color: '#3D9CA8', // Soft blue-green
            }}>
                Register
            </Text>
            
            <ScrollView style={{ flex: 1, width: '90%' }}>
                <TextInput
                    mode='outlined'
                    label="First Name"
                    autoCapitalize='none'
                    keyboardType='email-address'
                    value={firstName}
                    onChangeText={firstName => {
                        setFirstName(firstName)
                        setError('')
                    }}
                    theme={{ colors: { primary: '#3D9CA8', text: '#226B6F', placeholder: '#3D9CA8' } }}
                    style={{ backgroundColor: 'transparent' , marginTop:10}}
                    placeholderTextColor="#3D9CA8"
                />
                <TextInput
                    mode='outlined'
                    label="Middle Name"
                    autoCapitalize='none'
                    keyboardType='email-address'
                    value={middleName}
                    onChangeText={middleName => {
                        setMiddleName(middleName)
                        setError('')
                    }}
                    theme={{ colors: { primary: '#3D9CA8', text: '#226B6F', placeholder: '#3D9CA8' } }}
                    style={{ backgroundColor: 'transparent' , marginTop:10}}
                    placeholderTextColor="#3D9CA8"
                    />
                <TextInput
                    mode='outlined'
                    label="Last Name"
                    autoCapitalize='none'
                    keyboardType='email-address'
                    value={lastName}
                    onChangeText={lastName => {
                        setLastName(lastName)
                        setError('')
                    }}
                    theme={{ colors: { primary: '#3D9CA8', text: '#226B6F', placeholder: '#3D9CA8' } }}
                    style={{ backgroundColor: 'transparent' , marginTop:10}}
                    placeholderTextColor="#3D9CA8"           
                         />
                <TextInput
                   
                    mode='outlined'
                    label="Email"
                    autoCapitalize='none'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={email => {
                        setEmail(email)
                        setError('')
                    }}
                    theme={{ colors: { primary: '#3D9CA8', text: '#226B6F', placeholder: '#3D9CA8' } }}
                    style={{ backgroundColor: 'transparent' , marginTop:10}}
                    placeholderTextColor="#3D9CA8"
                                    />
                <TextInput
                   
                    mode='outlined'
                    label="Password"
                    secureTextEntry={secureTextEntry}
                    value={password}
                    onChangeText={password => {
                        setPassword(password)
                        auth.setAuthError(null)
                        setError('')
                    }}
                    theme={{ colors: { primary: '#3D9CA8', text: '#226B6F', placeholder: '#3D9CA8' } }}
                    style={{ backgroundColor: 'transparent' , marginTop:10}}
                    placeholderTextColor="#3D9CA8"
                        right={
                        <TextInput.Icon
                            icon={secureTextEntry ? 'eye' : 'eye-off'}
                            onPress={() => {
                                setSecureTextEntry(!secureTextEntry);
                                return false;
                            }}
                        />
                    }
                />
                {auth.authError !== null ? <View style={{ alignSelf: 'center', paddingVertical: 10 }}><Text style={{
                    color: 'red',
                    justifyContent: 'center',
                    fontSize: 18,
                    fontFamily: 'Sansita-Regular'
                }}>{auth?.authError?.message}</Text></View> : null}
                {error !== '' ? <View style={{ alignSelf: 'center', paddingVertical: 10 }}><Text style={{
                    color: 'red',
                    justifyContent: 'center',
                    fontSize: 18,
                    fontFamily: 'Sansita-Regular'
                }}>{error}</Text></View> : null}
                <View style={{
                    paddingVertical: 10
                }}>
                    <TouchableOpacity
                        style={{
                            borderRadius: 15,
                            borderWidth: 2,
                            borderColor: '#3D9CA8',
                            paddingVertical: 12,
                            backgroundColor: '#76B4BD',
                            marginTop: 20,
                            width: '100%',
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.2,
                            shadowRadius: 5,
                            elevation: 3,
                        }}
                        onPress={() => handleSubmit(user = { email, password, firstName, middleName, lastName })}
                    >
                        <Text style={{ fontFamily: 'Sansita-Bold', fontSize: 25, color: 'white', textAlign: 'center' }}>Register</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ fontFamily: 'Sansita-Regular', fontSize: 15, color: 'white', textAlign: 'center' }}>Already have Account</Text>
                </TouchableOpacity>
            </ScrollView>
            {/* <View style={{paddingBottom: 30, alignSelf: 'center'}}>
                <Text style={{color: '#d9534f', fontSize: 30, fontWeight: 'bold'}}>AttendEase <Text style={{fontSize: 18, fontWeight: 'bold'}}>v0.2.0</Text></Text>
                <Text style={{color: 'black', textAlign: 'center'}}>By Developers Cell Somaiya</Text>
            </View> */}
        </View>
    )
}