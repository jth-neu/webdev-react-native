import React, {Component} from 'react'
import {View} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class LessonList extends Component {
    static navigationOptions = {title: 'Lessons'}
    constructor(props) {
        super(props)
        this.state = {
            lessons: [],
            courseId: 1,
            moduleId: 1
        }
    }
    componentDidMount() {
        const courseId = this.props.navigation.getParam("CourseId")
        const moduleId = this.props.navigation.getParam("ModuleId")
        fetch("https://webdev-summer2018-jthuang.herokuapp.com/api/course/"+courseId+"/module/"+moduleId+"/lesson")
            .then(response => (response.json()))
            .then(lessons => this.setState({lessons}))
    }
    render() {
        return(
            <View style={{padding: 15}}>
                <Text h1>Lesson List</Text>
                {this.state.lessons.map(
                    (lesson, index) => (
                        <ListItem
                            key={index}
                            title={lesson.title}
                        onPress={()=>this.props.navigation.navigate("WidgetList", {LessonId: lesson.id})}/>))}
            </View>
        )
    }
}
export default LessonList