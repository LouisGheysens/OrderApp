import { View, Button, Text, Modal, SafeAreaView } from 'react-native';
import InlineTextButton from '../components/InlineTextButton';
import AppStyles from '../styles/AppStyles'
import { auth } from '../firebase';
import { signOut, sendEmailVerification } from 'firebase/auth';
import React from 'react';
import AddItemModal from '../components/AddItemModal';

export default function Item({ navigation, route }) {

    let [modalVisible, setModalVisible] = React.useState(false);

    let logOut = () => {
        signOut(auth).then(() => {
            navigation.popToTop();
        });
    }

    let showContent = () => {
        return (
            <View style={AppStyles.container}>
            <Button 
            title='Add Item' 
            onPress={() => setModalVisible(true)}
             color="#fb4d3d"/>
            </View>
        )
    };

    let showSendVerificationEmail = () => {
        return (
            <View>
            <Text>Please verify your email to use this app.</Text>
            <Button title='Send Verification Email' onPress={() => sendEmailVerification(auth.currentUser)} />
            </View>
        )
    }

    return (
        <SafeAreaView style={AppStyles.container}>
        <View style={[AppStyles.rowContainer, AppStyles.rightAlined, AppStyles.rightMargin]}>
        <InlineTextButton text="Manage Account" color="#258ea6" />
        </View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        >
        <AddItemModal
            onClose={() => setModalVisible(false)}
            addItem={(item) => console.log(item)}
        />
        </Modal>
        <Text style={AppStyles.header}>Item</Text>
        {auth.currentUser.emailVerified ? showContent() : showSendVerificationEmail()}
        </SafeAreaView>
    )
}