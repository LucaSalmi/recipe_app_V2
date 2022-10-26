
import { StyleSheet, Text, View, TextInput, Button, ScrollView, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import AppManager from '../utils/AppManager.js';
import { profilePage } from '../styles/styles.js';
import { dbAddItem, Crud } from '../src/db.js';
import CrudLocal from '../src/dbLocal.js';

const Profile = (props) => {

    const [pageLoaded, setPageLoaded] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const login = async (uid = "") => {

        let userData;

        if (uid.length == 0) {
            userData = await Crud.getUser(username, password);

            console.log("USERDATA = " + userData.id);

            if (userData.id.length == 0) {
                console.log("Wrong username/password!");
                return;
            }

            uid = userData.id;
        }

        setIsLoggedIn(true);

        AppManager.isLoggedIn = true;
        AppManager.uid = uid;
        AppManager.username = username;
        AppManager.password = password;

        AppManager.firstName = userData.firstName;
        AppManager.secondName = userData.secondName;
        AppManager.email = userData.email;
        AppManager.phone = userData.phone;

        setFirstName(userData.firstName);
        setSecondName(userData.secondName);
        setEmail(userData.email);
        setPhone(userData.phone);

        if (AppManager.pantryContent.length < 1) {
            Crud.getPantry(null);
        }
        if (AppManager.shoplistContent.length < 1) {
            Crud.getShoplist();
        }

        //Store username+password in AsyncStorage for auto-login
        CrudLocal.setAutoLogin(uid, username, password);

    };

    const createAccount = async () => {

        if (username.length == 0 || password.length == 0) {
            console.log("Enter valid username/password");
            return;
        };

        let uid = await Crud.addUser(username, password);

        if (!uid) {
            console.log("Username not available");
            return;
        }

        console.log("Account created!");
        login(uid);

    };

    const save = () => {

        let uid = AppManager.uid;

        let userData = {
            username: AppManager.username,
            password: AppManager.password,
            firstName: firstName,
            secondName: secondName,
            email: email,
            phone: phone,
        };

        Crud.updateUser(uid, userData);

        AppManager.firstName = firstName;
        AppManager.secondName = secondName;
        AppManager.email = email;
        AppManager.phone = phone;

    };

    const logout = () => {

        setIsLoggedIn(false);
        setUsername("");
        setPassword("");

        AppManager.isLoggedIn = false;
        AppManager.uid = "";
        AppManager.username = "";
        AppManager.password = "";
        AppManager.firstName = "";
        AppManager.secondName = "";
        AppManager.email = "";
        AppManager.phone = "";

        AppManager.pantryContent = [];
        AppManager.shoplistContent = [];

        CrudLocal.disableAutoLogin();

    };

    useEffect(() => {

        if (AppManager.isLoggedIn && !pageLoaded) {
            setUsername(AppManager.username);
            setFirstName(AppManager.firstName);
            setSecondName(AppManager.secondName);
            setEmail(AppManager.email);
            setPhone(AppManager.phone);
            setIsLoggedIn(true);
            setPageLoaded(true);
        }

    });

    return (
        <View style={profilePage.profileContainer}>

            <Text style={{ padding: 50, fontSize: 20, fontWeight: "bold" }}>PROFILE PAGE</Text>

            <View style={isLoggedIn ? profilePage.hidden : profilePage.inputContainer}>
                <Text>Username</Text>
                <TextInput style={profilePage.inputField} value={username} onChangeText={(text) => { setUsername(text.trim()); }}></TextInput>
                <Text>Password</Text>
                <TextInput style={[profilePage.inputField, profilePage.defaultMarginBottom]} value={password} onChangeText={(text) => { setPassword(text); }}></TextInput>
                <Button title="LOGIN" onPress={() => { login() }}></Button>
                <Text style={profilePage.defaultMarginTop}>Don't have an account?</Text>
                <Button title="SIGN UP" onPress={() => { createAccount() }}></Button>
            </View>

            <View style={isLoggedIn ? profilePage.inputContainer : profilePage.hidden}>
                <Text>Welcome, {username}!</Text>
                <Text>{/* "SPACER" */}</Text>
                <Text>First name</Text>
                <TextInput style={profilePage.inputField} value={firstName} onChangeText={(text) => { setFirstName(text); }}></TextInput>
                <Text>Second name</Text>
                <TextInput style={profilePage.inputField} value={secondName} onChangeText={(text) => { setSecondName(text); }}></TextInput>
                <Text>Email</Text>
                <TextInput style={profilePage.inputField} value={email} onChangeText={(text) => { setEmail(text); }}></TextInput>
                <Text>Phone</Text>
                <TextInput style={profilePage.inputField} value={phone} onChangeText={(text) => { setPhone(text); }}></TextInput>
                <Text>{/* "SPACER" */}</Text>
                <Button title="SAVE" onPress={() => { save() }}></Button>
                <Text>{/* "SPACER" */}</Text>
                <Button title="LOGOUT" onPress={() => { logout() }}></Button>
            </View>
        </View>

        <Text>{/* "SPACER" */}</Text>
        <Text>First name</Text>
        <TextInput
          style={profilePage.inputField}
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
          }}
        ></TextInput>
        <Text>Second name</Text>
        <TextInput
          style={profilePage.inputField}
          value={secondName}
          onChangeText={(text) => {
            setSecondName(text);
          }}
        ></TextInput>
        <Text>Email</Text>
        <TextInput
          style={profilePage.inputField}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        ></TextInput>
        <Text>Phone</Text>
        <TextInput
          style={profilePage.inputField}
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
          }}
        ></TextInput>
        <Text>{/* "SPACER" */}</Text>

        <View style={{ width: 130 }}>
          <Button
            title="SAVE"
            onPress={() => {
              save();
            }}
          ></Button>
          <Text>{/* "SPACER" */}</Text>
          <Button
            title="LOGOUT"
            onPress={() => {
              logout();
            }}
          ></Button>
        </View>
      </View>
    </View>
  );
};

export default Profile;
