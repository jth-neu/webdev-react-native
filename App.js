import React from 'react';
import { Button, View } from 'react-native';
import {createStackNavigator } from 'react-navigation';

class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    }
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <View>
                <Button title="Courses"/>

            </View>
        )
    }
}

const App = createStackNavigator({
    Home
});

export default App;
