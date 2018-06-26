import React from 'react';
import { Button, View } from 'react-native';
import {createStackNavigator } from 'react-navigation';
import CourseList from './components/CourseList';

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
                <Button title="Courses"
                        onPress={()=>this.props.navigation.navigate('CourseList')}/>
            </View>
        )
    }
}

const App = createStackNavigator({
    Home,
    CourseList
});

export default App;
