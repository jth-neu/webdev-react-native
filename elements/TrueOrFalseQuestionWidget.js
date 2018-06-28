import React from 'react'
import {View, Button,ScrollView} from 'react-native'
import {Text,FormLabel,FormInput, CheckBox} from 'react-native-elements'

export default class TrueOrFalseQuestionWidget extends React.Component {
    static navigationOptions = {title: "True Or False"}

    constructor(props) {
        super(props);

        let question = this.props.navigation.getParam("question");
        this.state = {
            question: question,
            title: question.title,
            description: question.description,
            points: question.points,
            isTrue: question.isTrue,
        }
    }


    updateForm(newState) {
        this.setState(newState);
    }

    save = () => {
        this.state.question.title = this.state.title;
        this.state.question.description = this.state.description;
        this.state.question.points = this.state.points;
        this.state.question.isTrue = this.state.isTrue;

        fetch('https://webdev-summer2018-jthuang.herokuapp.com/api/truefalse/'+this.state.question.id,
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

                    <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                              checked={this.state.isTrue} title='Check if the answer is true'/>


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
                    <CheckBox title='Check if the answer is true'/>

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
