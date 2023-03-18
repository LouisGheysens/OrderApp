import { View, Text, TextInput, Button } from "react-native";
import React from "react";
import AppStyles from "../styles/AppStyles";

export default function AddItemModal(props) {

    let [item, setItem] = React.useState("");

    return (
        <View style={AppStyles.container}>
        <Text style={AppStyles.header}>Add Item</Text>
        <TextInput 
        style={[AppStyles.textInput, AppStyles.darkTextInput]}
        placeholder='Item' 
        value={item}
        onChangeText={setItem} />
        <View style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.rightMargin]}>
        <Button title="Cancel" onPress={props.onClose} />
        <Button title="OK" onPress={() => {
            props.addItem(item)
            setItem("");
            props.onClose();
        }} />
        </View>
        </View>
    )

}