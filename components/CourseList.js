import React, {Component} from 'react'
import {View} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class CourseList extends Component {
    static navigationOptions = {title: 'Courses'}
    constructor(props) {
        super(props);

        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/course')
            .then(response => (response.json()))
            .then(courses => {
                this.setState({courses: courses})
            });
    }

    render() {
        return(
            <View style={{padding: 15}}>
                <Text h1>Course List</Text>
                {this.state.courses.map((course, index) => (
                    <ListItem title={course.title} key={index}
                    onPress={()=>this.props.navigation.navigate('ModuleList',{CourseId:course.id})}/>
                ))}
            </View>
        )
    }
}
export default CourseList;