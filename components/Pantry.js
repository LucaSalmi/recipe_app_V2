import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { useState } from 'react';

const Pantry = (props) => {

    

    const showPerson = () => {
        console.log(props.props1.styles.text);
    }   

	return (
        <View>
            <Text>Hello {props.props1.name}!</Text>
            <Text style={props.props1.styles.text}>Click Me</Text>
            <Button title='Log something' onPress={showPerson}></Button>
        </View>
        
	);
}

export default Pantry;