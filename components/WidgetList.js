import React, {Component} from 'react'
import {View, Button} from 'react-native'
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

    addAssignment(lessonId) {
        return fetch("http://localhost:8080/api/lesson/"+lessonId+"/assignment",
            {
                headers: {"content-type": "application/json"},
                method: "POST",
                body: JSON.stringify({
                    title: "new assignment",
                    points: 0,
                    description: "Description for new assignment"
                })
            })
            .then((response) => response.json())
            .then((assignment) => this.setState({
                assignments: [...this.state.assignments, assignment]
            }));
    }


    render() {
        return(
            <View style={{padding: 15}}>

                {this.state.assignments.map(
                    (assignment, index) => (
                        <ListItem
                            key={index}
                            title={assignment.title}
                            onPress={() => this.props.navigation.navigate("AssignmentWidget",
                                    {lessonId: this.state.lessonId, assignment: assignment})}/>
                    )
                )}

                <Button title="Add a new assignment"
                        color="green"
                        onPress={() => this.addAssignment(this.state.lessonId)}/>
            </View>
        )
    }
}
export default WidgetList