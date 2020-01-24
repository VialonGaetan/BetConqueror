import React from 'react';
import {
    View,
    Text,
    StatusBar,
    TextInput,
    Button,
    TouchableOpacity,
    ImageBackground
} from 'react-native';


export class GameView extends React.Component {

    static navigationOptions = {
        headerShown: false,
    };




    render() {

        return (
            <View>
                <Text>Game has started</Text>
            </View>

        );

    }

};
