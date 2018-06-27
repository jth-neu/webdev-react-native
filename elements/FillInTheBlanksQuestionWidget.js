import React from 'react'
import {View} from 'react-native'
import {Text} from 'react-native-elements'

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
        }
    }

    render() {
        return (
            <View>
                <Text> Fill In The Blanks Question </Text>
            </View>
        )
    }

}
