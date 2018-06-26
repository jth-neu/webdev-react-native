import React, {Component} from 'react'
import {View} from 'react-native'
import {ListItem} from 'react-native-elements'

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}
    constructor(props) {
        super(props)
        this.state = {
            assignments: [],
            courseId: 1,
            moduleId: 1,
            lessonId: 1,
        }
    }
    componentDidMount() {
        const lessonId = this.props.navigation.getParam("LessonId");
        this.setState({lessonId});

        this.findAllAssignments(lessonId);
    }

    findAllAssignments(lessonId) {
        return fetch(
            "http://localhost:8080/api/lesson/"+lessonId+"/assignment")
            .then(response => (response.json()))
            .then(assignments => {
                this.setState({assignments})
            });
    }


    render() {
        return(
            <View style={{padding: 15}}>

                {this.state.assignments.map(
                    (assignment, index) => (
                        <ListItem
                            key={index}
                            title={assignment.title}/>
                    )
                )}
            </View>
        )
    }
}
export default WidgetList