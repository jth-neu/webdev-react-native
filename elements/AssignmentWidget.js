import React, {Component} from 'react'
import {ScrollView, View, TextInput, Button, Alert} from 'react-native'
import {Text, FormLabel, FormInput} from 'react-native-elements'



class AssignmentWidget extends Component {
    static navigationOptions = {title: 'Assignment Editor'}

    constructor(props) {
        super(props);
        this.state = {
            assignment: props.navigation.getParam("assignment"),
            lessonId: props.navigation.getParam("lessonId"),
            title:  props.navigation.getParam("assignment").title,
            description:  props.navigation.getParam("assignment").description,
            points:  props.navigation.getParam("assignment").points,
        }

        this.updateForm = this.updateForm.bind(this);
        this.saveAssignment = this.saveAssignment.bind(this);
    }

    updateForm = (newState) => {
        this.setState(newState);
    }

    saveAssignment = () => {
        this.state.assignment.title = this.state.title;
        this.state.assignment.description = this.state.description;
        this.state.assignment.points = this.state.points;
        console.log(this.state.assignment)
        fetch('https://webdev-summer2018-jthuang.herokuapp.com/api/assignment/'+this.state.assignment.id,
            {
                method: 'put',
                body: JSON.stringify(this.state.assignment),
                headers: {
                    'content-type': 'application/json'}
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
                    <Button color="green" title="Save Assignment"
                    onPress={()=>this.saveAssignment()}/>




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
                    <FormLabel>Essay Answer</FormLabel>
                    <FormInput />

                    <FormLabel>Upload a file</FormLabel>
                    <Button title="Choose File" onPress={() =>this.placeholderFunction()}/>

                    <FormLabel>Submit a link</FormLabel>
                    <FormInput/>

                    <View style={{flexDirection:"row"}}>
                        <View style={{flex:1}}>
                            <Button color="blue" title="Submit" onPress={() =>this.placeholderFunction()}/>
                        </View>
                        <View style={{flex:1}}>
                            <Button color="red" title="Cancel" onPress={() =>this.placeholderFunction()}/>
                        </View>
                    </View>

                </View>
            </ScrollView>
        )
    }
}

placeholderFunction = () => {}

export default AssignmentWidget