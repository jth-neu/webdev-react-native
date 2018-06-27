import React, {Component} from 'react'
import {ScrollView, View, TextInput, Button, Alert} from 'react-native'
import {Text, FormLabel, FormInput} from 'react-native-elements'



class ExamWidget extends Component {
    static navigationOptions = {title: 'Exam Editor'}

    constructor(props) {
        super(props);
        this.state = {
            exam: props.navigation.getParam("exam"),
            lessonId: props.navigation.getParam("lessonId"),
            title:  props.navigation.getParam("exam").title,
            description:  props.navigation.getParam("exam").description,
            points:  props.navigation.getParam("exam").points,
        }

        this.updateForm = this.updateForm.bind(this);
        this.saveExam = this.saveExam.bind(this);
    }

    updateForm = (newState) => {
        this.setState(newState);
    }

    saveExam = () => {
        this.state.exam.title = this.state.title;
        this.state.exam.description = this.state.description;
        this.state.exam.points = this.state.points;

        fetch('http://localhost:8080/api/exam/' + this.state.exam.id,
            {
                method: 'put',
                body: JSON.stringify(this.state.exam),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(() => {
            Alert.alert("Save Succeed.")
            this.props.navigation.state.params.updateFunction()
            this.props.navigation.goBack()
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={{padding: 15}}>

                    // Edit
                    <Text h1>Edit</Text>
                    <FormLabel>Title</FormLabel>
                    <FormInput
                        value={this.state.title}
                        onChangeText={text => this.updateForm({title: text})
                        }/>

                    <FormLabel>Points</FormLabel>
                    <FormInput
                        value={"" + this.state.points}
                        onChangeText={text => this.updateForm({points: text})
                        }/>

                    <FormLabel>Description</FormLabel>
                    <FormInput
                        value={this.state.description}
                        onChangeText={text => this.updateForm({description: text})
                        }/>
                    <Button color="green" title="Save Exam"
                            onPress={()=>this.saveExam()}/>




                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}
                    />
                    // Questions
                    <Text h1>Questions</Text>


                </View>
            </ScrollView>
        )
    }
}

placeholderFunction = () => {}

export default ExamWidget