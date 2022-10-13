import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import AppManager from '../utils/AppManager.js';
import { profilePage } from '../styles/styles.js';

const Profile = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    const login = () => {

        var currentUsername = username.trim();

        if (currentUsername.length == 0) {
            console.log("Enter valid username");
            return;
        };

        setUsername(currentUsername);

        setIsLoggedIn(true);
        AppManager.isLoggedIn = true;
        AppManager.username = currentUsername;
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUsername("");
        AppManager.isLoggedIn = false;
        AppManager.username = "";
    };

    useEffect(() => {
        setTimeout(() => {
            if (AppManager.isLoggedIn) {
                setIsLoggedIn(true);
                setUsername(AppManager.username);
            }
        } , 100);
    });

	return (
        <View style={profilePage.profileContainer}>
            <Text>LOGIN PAGE</Text>
            <View style={{display: isLoggedIn ? "none" : "flex"}}>
                <TextInput style={profilePage.inputField} value={username} onChangeText={(text)=>{ setUsername(text); }}></TextInput>
                <Button title="LOGIN" onPress={()=>{login()}}></Button>
            </View>
            
            <View style={{display: isLoggedIn ? "flex" : "none"}}>
                <Text>Welcome, {username}!</Text>
                <Button title="LOGOUT" onPress={()=>{logout()}}></Button>
            </View>
        </View>
        
	);
}

export default Profile;