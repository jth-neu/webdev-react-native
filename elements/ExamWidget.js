import React, {Component} from 'react'
import {ScrollView, View, Picker, Button, Alert} from 'react-native'
import {Text, FormLabel, FormInput, ListItem} from 'react-native-elements'
import * as constants from '../constant'



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
            questionType: 'MC',
            questions: props.navigation.getParam('exam').questions
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

    addQuestion() {

        let questionType = this.state.questionType
        let question;

        switch (questionType) {
            case "essay":
                question = constants.Essay;
                break;
            case "truefalse":
                question = constants.TrueFalse;
                break;
            case "choice":
                question = constants.MultipleChoice;
                break;
            case "blanks":
                question = constants.FillInBlanks;
                break;
            default:
                return;
        }

        console.log(question)

        return fetch('http://localhost:8080/api/exam/'+this.state.exam.id+'/'+questionType,
            {
                headers: {'content-type': 'application/json'},
                method: "POST",
                body: JSON.stringify(question)
            }).then((response) => response.json())
            .then((question) => {
                this.setState({questions: [...this.state.questions, question]})
            })
    }

    render() {
        return (
            <ScrollView>
                <View style={{padding: 15}}>

                    // Edit
                    <Text h3>Edit</Text>
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
                    <Text h3>Questions</Text>
                    {this.state.questions.map( (question, index) => (
                        <ListItem
                            key={index}
                            title={question.title}/>
                    ))}


                    <Text h3>Add Question To Exam</Text>
                    <Text>{this.state.questionType}</Text>
                    <Picker
                        selectedValue={this.state.questionType}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({questionType: itemValue})}>
                        <Picker.Item value="choice" label="Multiple choice" />
                        <Picker.Item value="essay" label="Essay" />
                        <Picker.Item value="truefalse" label="True or false" />
                        <Picker.Item value="blanks" label="Fill in the blanks" />
                    </Picker>
                    <Button title="Add new question"
                            color="green"
                            onPress={() => this.addQuestion()}/>
                </View>
            </ScrollView>
        )
    }
}

export default ExamWidget