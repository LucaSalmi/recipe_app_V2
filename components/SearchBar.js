import {React, useState} from "react";
import {View, TextInput, StyleSheet, Button, TouchableOpacity} from 'react-native'
import Icon from "react-native-ico-material-design";



const SearchBar = () => {

    const [searchText, setSearchText] = useState("")

    return(
        <View style={styles.container}>
            <TextInput value={searchText} onChangeText={(input) => {setSearchText(input)}} style={styles.searchInput} placeholder="Search here..."/>
            <TouchableOpacity onPress={() => {setSearchText("")}}>
                {<Icon style={searchText == "" ? {display: "none"} : styles.icon} name="close-button"  height="20" width="20" />}
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: '90%',
        height: 50,
        backgroundColor: '#EAE9E9',
        borderRadius: 8,
        marginTop: 10,
        
        
    },
    searchInput: {
        width: '90%',
        height: '100%',
        paddingLeft: 8,
        fontSize: 16,
        display: "flex",
        justifyContent: "center"
        
    },
    icon: {
        
        
        
    }
})

export default SearchBar;