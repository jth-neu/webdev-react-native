import React from 'react';
import { Button, View } from 'react-native';
import {createStackNavigator } from 'react-navigation';
import CourseList from './components/CourseList';
import ModuleList from './components/ModuleList';
import LessonList from './components/LessonList';

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
    CourseList,
    ModuleList,
    LessonList
});

export default App;
