import React from 'react';
import { Button, View } from 'react-native';
import {createStackNavigator } from 'react-navigation';
import CourseList from './components/CourseList';
import ModuleList from './components/ModuleList';
import LessonList from './components/LessonList';
import WidgetList from './components/WidgetList';
import AssignmentWidget from './elements/AssignmentWidget'
import ExamWidget from './elements/ExamWidget'
import EssayQuestionWidget from './elements/EssayQuestionWidget'
import FillInTheBlanksQuestionWidget from './elements/FillInTheBlanksQuestionWidget'
import MultipleChoiceQuestionWidget from './elements/MultipleChoiceQuestionWidget'
import TrueOrFalseQuestionWidget from './elements/TrueOrFalseQuestionWidget'

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
    LessonList,
    WidgetList,
    AssignmentWidget,
    ExamWidget,
    EssayQuestionWidget,
    TrueOrFalseQuestionWidget,
    MultipleChoiceQuestionWidget,
    FillInTheBlanksQuestionWidget
});

export default App;
