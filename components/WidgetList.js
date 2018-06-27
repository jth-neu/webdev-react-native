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
            updated: false,
            exams:[]
        }
    }
    componentDidMount() {
        const lessonId = this.props.navigation.getParam("LessonId");
        this.setState({lessonId});
        this.findAllAssignments(lessonId).then(() => this.findAllExams(lessonId));
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

    isUpdated() {
        const update = this.state.updated
        this.setState({updated:!update})
    }

    findAllExams(lessonId) {
        return fetch(
            "http://localhost:8080/api/lesson/"+lessonId+"/exam")
            .then(response => (response.json()))
            .catch(response => console.log(response))
            .then(exams => {
                this.setState({exams})
            });
    }

    addExam(lessonId) {
        return fetch("http://localhost:8080/api/lesson/"+lessonId+"/exam",
            {
                headers: {"content-type": "application/json"},
                method: "POST",
                body: JSON.stringify({
                    "title": "new exam",
                    "points": 0,
                    "description": "Description for new exam",
                    "questions": []
                })
            })
            .then((response) => response.json())
            .then((exam) => this.setState({
                exams: [...this.state.exams, exam]
            }));
    }


    render() {
        return(
            <View style={{padding: 15}}>

                <View h3>Assignments</View>
                {this.state.assignments.map(
                    (assignment, index) => (
                        <ListItem
                            key={index}
                            title={assignment.title}
                            onPress={() => this.props.navigation.navigate("AssignmentWidget",
                                    {lessonId: this.state.lessonId, assignment: assignment, updateFunction:()=> this.isUpdated()})}/>
                    )
                )}

                <Button title="Add a new assignment"
                        color="green"
                        onPress={() => this.addAssignment(this.state.lessonId)}/>

                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                    }}
                />

                <View h3>Exams</View>
                {this.state.exams.map(
                    (exam, index) => (
                        <ListItem
                            key={index}
                            title={exam.title}/>
                    )
                )
                }

                <Button title="Add a new exam"
                        color="green"
                        onPress={() => this.addExam(this.state.lessonId)}/>
            </View>
        )
    }
}
export default WidgetList