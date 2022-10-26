import AsyncStorage from '@react-native-async-storage/async-storage';

const CrudLocal = {

    performAutoLogin: async () => {

        let result = null;

        try {
            const uid = await AsyncStorage.getItem('@uid')
            const username = await AsyncStorage.getItem('@username')
            const password = await AsyncStorage.getItem('@password')
            if(uid !== null && username !== null && password !== null) {
                if(uid !== "" && username !== "" && password !== "") {
                    console.log("AsyncStorage found: " + uid + ": " + username + " / " + password);
                    result = {uid: uid, username: username, password: password};
                }
            }
            else {
                console.log("No username or password found in AsyncStorage.");
            }
        } catch(e) {
            console.log("Error: Could not read from AsyncStorage.");
        }

        return result;

      },

      setAutoLogin: async (uid, username, password) => {

        try {
            await AsyncStorage.setItem('@uid', uid);
            await AsyncStorage.setItem('@username', username);
            await AsyncStorage.setItem('@password', password);
            console.log("Auto-Login stored in AsyncStorage");
          } catch (e) {
            console.log("Error: Could not save auto-login to AsyncStorage");
          }

      },

      disableAutoLogin: async () => {

        try {
            await AsyncStorage.setItem('@uid', "");
            await AsyncStorage.setItem('@username', "");
            await AsyncStorage.setItem('@password', "");
            console.log("Auto-Login disabled (AsyncStorage)");
          } catch (e) {
            console.log("Error: Could not disable auto-login (AsyncStorage)");
          }

      },

};

export default CrudLocal;