import React from 'react'
import {View, Button, ScrollView} from 'react-native'
import {Text, FormInput, FormLabel} from 'react-native-elements'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

export default class MultipleChoiceQuestionWidget extends React.Component {
    static navigationOptions = {title: "Multiple Choices"}

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            points: 0,
            choices:'',
            correctChoice: 0,
            choiceField: ''
        }
    }

    componentDidMount() {
        let question = this.props.navigation.getParam("question");
        if (typeof question !== 'undefined') {
            this.setState({
                question:question,
                title: question.title,
                description: question.description,
                points: question.points,
                choices:question.choices,
                correctChoice:question.correctChoice,
            });
        }
    }

    updateForm(newState) {
        this.setState(newState);
    }

    save = () => {
        this.state.question.title = this.state.title;
        this.state.question.description = this.state.description;
        this.state.question.points = this.state.points;
        this.state.question.choices = this.state.choices;
        this.state.question.correctChoice = this.state.correctChoice;

        fetch('http://localhost:8080/api/choice/'+this.state.question.id,
            {
                method: 'put',
                body: JSON.stringify(this.state.question),
                headers: {
                    'content-type': 'application/json'}
            }).then(() => {
            this.props.navigation.state.params.updateFunction()
            this.props.navigation.goBack()
        })
    }

    cancel = () => {
        this.props.navigation.goBack();
    }

    updateChoiceField(value){

        this.choiceField = value;
    }

    onSelect(index,value){

        this.updateForm({correctChoice:index});
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

                    <FormLabel>Enter an option</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateChoiceField(text)
                    }/>
                    <Button color="green"
                            title="Add option"
                            onPress={() => this.updateForm({choices: this.state.choices  + this.choiceField + " "})}/>

                    <RadioGroup selectedIndex={this.state.correctChoice}
                                onSelect = {(index, value) => this.onSelect(index, value)}>
                        {this.state.choices.split(" ").slice(0,-1).map(
                            (choice, index) => (
                                <RadioButton key = {index} value = {choice}>
                                <Text>{choice}</Text>
                                </RadioButton>))}
                    </RadioGroup>
                    <Text>The Correct Choice is: {this.state.choices.split(" ")[this.state.correctChoice]}</Text>

                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}
                    />

                    // Preview
                    <Text h1>Preview</Text>

                    <View style={{flexDirection:"row"}}>
                        <View style={{flex:3}}>
                            <Text h4 style={{justifyContent: 'flex-start',}}>
                                {this.state.title}
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text h4 style={{justifyContent: 'flex-end',}}>
                                {"" + this.state.points + "pts"}
                            </Text>
                        </View>
                    </View>

                    <Text>{this.state.description}</Text>

                    <RadioGroup>
                        {this.state.choices.split(" ").slice(0,-1).map((choice, index) => (
                            <RadioButton key = {index} value = {choice}>
                                <Text>{choice}</Text>
                            </RadioButton>
                        ))}
                    </RadioGroup>


                    <View style={{flexDirection:"row"}}>
                        <View style={{flex:1}}>
                            <Button color="blue" title="Submit" onPress={() =>this.save()}/>
                        </View>
                        <View style={{flex:1}}>
                            <Button color="red" title="Cancel" onPress={() =>this.cancel()}/>
                        </View>
                    </View>

                </View>
            </ScrollView>
        )
    }

}
