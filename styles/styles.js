import { StyleSheet, Dimensions } from 'react-native';

export const pageStyles = StyleSheet.create({
	text: {
		fontSize: 20,
		color: "blue",
	},
});

export const bigCardStyles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		height: '70%',
		width: '85%',
		borderRadius: 25,
		borderWidth: 1
	},
	elevation: {
		elevation: 10,
		shadowColor: '#52006A',
	},
	superView: {
		flex: 1,
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export const smallCardStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		height: '90%',
		width: '85%',
		borderRadius: 25,
		borderWidth: 1
    },
    superView: {
		flex: 1,
		height: Dimensions.get('window').height*0.2,
		width: Dimensions.get('window').width,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export const shoplistPage = StyleSheet.create({
    shoplistContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "#0005",
    },
    headerContainer: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    headerText: {
    },
    filterButton: {
    },
    shoppingItemsContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        padding: 20,
    },
    sheetContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 20,
        backgroundColor: "red",
    },
});

export const favoritePage = StyleSheet.create({
    favoriteContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "#0005",
    },
});

export const profilePage = StyleSheet.create({
    profileContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "#0005",
    },
    inputField: {
        backgroundColor: "white",
        height: 30,
        width: 100,
    },
});