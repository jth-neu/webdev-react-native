import React, {Component} from 'react'
import {View} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class ModuleList extends Component {
    static navigationOptions = {title: 'Modules'}
    constructor(props) {
        super(props);
        this.state = {
            modules: [],
            courseId: 1
        }
    }
    componentDidMount() {
        const courseId = this.props.navigation.getParam("CourseId", 1);
        this.setState({
            courseId: courseId
        });
        fetch('https://webdev-summer2018-jthuang.herokuapp.com/api/course/' + courseId + '/module')
            .then(response => {
                return response.json()
            })
            .then(modules => this.setState({modules: modules}));
    }
    render() {
        return(
            <View style={{padding: 15}}>
                <Text h1>Module List</Text>
                {this.state.modules.map((module, index) => (
                    <ListItem
                        key={index}
                        title={module.title}
                        onPress={() => this.props.navigation.navigate("LessonList",
                            {CourseId: this.state.courseId, ModuleId: module.id})}/>
                ))}
            </View>
        )
    }
}
export default ModuleList