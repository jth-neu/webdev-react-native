import React from 'react'
import {View, Button, ScrollView} from 'react-native'
import {Text, FormInput, FormLabel} from 'react-native-elements'

export default class FillInTheBlanksQuestionWidget extends React.Component {
    static navigationOptions = {title: "Fill In The Blanks"}

    constructor(props) {
        super(props);

        let question = this.props.navigation.getParam("question");
        this.state = {
            question: question,
            title: question.title,
            description: question.description,
            points: question.points,
            variables: question.variables
        }
    }

    updateForm(newState) {
        this.setState(newState);
    }

    save = () => {
        this.state.question.title = this.state.title;
        this.state.question.description = this.state.description;
        this.state.question.points = this.state.points;
        this.state.question.variables = this.state.variables;

        fetch('https://webdev-summer2018-jthuang.herokuapp.com/api/blanks/'+this.state.question.id,
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

    formatVariable() {
        let formattedVariable = this.state.variables.replace(new RegExp(/\[([^)]+)\]/),"placeholder").split(' ');
        return (
            <View style={{flexDirection: 'row'}}>
                {formattedVariable.map((text, index) => {
                    if (text.toString() === 'placeholder') {
                        return (
                            <FormInput key={index}></FormInput>
                        )
                    }
                    else {
                        return (
                            <Text key={index}>
                                {text + " "}
                            </Text>
                        )
                    }
                })}
            </View>
        );
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

                    <FormLabel>Variables</FormLabel>
                    <FormInput
                        value={this.state.variables}
                        onChangeText={text => this.updateForm({variables: text})}/>

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
                    <View>
                        {this.formatVariable()}
                    </View>
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
