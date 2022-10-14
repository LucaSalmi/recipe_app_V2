import { StyleSheet, Text, View, TextInput, Button, ScrollView, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import AppManager from '../utils/AppManager.js';
import { profilePage } from '../styles/styles.js';
import { dbAddItem } from '../src/db.js';

var SingletonInstance = {
    firstName: "",
    secondName: "",
    email: "",
    phone: "",
};

const Profile = (props) => {

    const [pageLoaded, setPageLoaded] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const login = () => {

        console.log("AppManager user = " + AppManager.username);

        console.log("username length = " + username.length);
        console.log("password length = " + password.length);

        if (username.length == 0 || password.length == 0) {
            console.log("Missing input for either username/password");
            return;
        }

        if (username != AppManager.username || password != AppManager.password) {
            console.log("Wrong username/password");
            return;
        };

        setIsLoggedIn(true);
        AppManager.isLoggedIn = true;

        setPassword("");
    };

    const createAccount = () => {

        if (username.length == 0 || password.length == 0) {
            console.log("Enter valid username/password");
            return;
        };

        AppManager.username = username;
        AppManager.password = password;

        SingletonInstance.firstName = "";
        SingletonInstance.secondName = "",
        SingletonInstance.email = "";
        SingletonInstance.phone = "";

        setFirstName("");
        setSecondName("");
        setEmail("");
        setPhone("");

        console.log("Account created!");
        login();
    };

    const save = () => {
        SingletonInstance.firstName = firstName;
        SingletonInstance.secondName = secondName;
        SingletonInstance.email = email;
        SingletonInstance.phone = phone;
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUsername("");
        AppManager.isLoggedIn = false;
    };

    useEffect(() => {
        setTimeout(() => {
            if (AppManager.isLoggedIn && !pageLoaded) {
                setIsLoggedIn(true);
                setUsername(AppManager.username);
                setFirstName(SingletonInstance.firstName);
                setSecondName(SingletonInstance.secondName);
                setEmail(SingletonInstance.email);
                setPhone(SingletonInstance.phone);
                setPageLoaded(true);
            }
        } , 100);
    });

	return (
        <View style={profilePage.profileContainer}>

            <Text style={{padding: 50, fontSize: 20, fontWeight: "bold"}}>PROFILE PAGE</Text>
            <Button title={"Add Item to DB"} onPress={()=>{
                dbAddItem("Danne");
            }}></Button>
            <View style={{height: 50}}></View>

            <View style={isLoggedIn ? profilePage.hidden : profilePage.inputContainer}>
                <Text>Username</Text>
                <TextInput style={profilePage.inputField} value={username} onChangeText={(text)=>{ setUsername(text); }}></TextInput>
                <Text>Password</Text>
                <TextInput style={[profilePage.inputField, profilePage.defaultMarginBottom]} value={password} onChangeText={(text)=>{ setPassword(text); }}></TextInput>
                <Button  title="LOGIN" onPress={()=>{login()}}></Button>
                <Text style={profilePage.defaultMarginTop}>Don't have an account?</Text>
                <Button title="SIGN UP" onPress={()=>{createAccount()}}></Button>
            </View>
            
            <View style={isLoggedIn ? profilePage.inputContainer : profilePage.hidden}>
                <Text>Welcome, {username}!</Text>
                <Text>{/* "SPACER" */}</Text>
                <Text>First name</Text>
                <TextInput style={profilePage.inputField} value={firstName} onChangeText={(text)=>{ setFirstName(text); }}></TextInput>
                <Text>Second name</Text>
                <TextInput style={profilePage.inputField} value={secondName} onChangeText={(text)=>{ setSecondName(text); }}></TextInput>
                <Text>Email</Text>
                <TextInput style={profilePage.inputField} value={email} onChangeText={(text)=>{ setEmail(text); }}></TextInput>
                <Text>Phone</Text>
                <TextInput style={profilePage.inputField} value={phone} onChangeText={(text)=>{ setPhone(text); }}></TextInput>
                <Text>{/* "SPACER" */}</Text>
                <Button title="SAVE" onPress={()=>{save()}}></Button>
                <Text>{/* "SPACER" */}</Text>
                <Button title="LOGOUT" onPress={()=>{logout()}}></Button>
            </View>
        </View>
        
	);
}

export default Profile;