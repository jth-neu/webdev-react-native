import React from 'react'
import {View} from 'react-native'
import {Text} from 'react-native-elements'

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
        }
    }

    render() {
        return (
            <View>
                <Text> True or false Question </Text>
            </View>
        )
    }

}
