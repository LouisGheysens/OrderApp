import { View, Button, Text, Modal, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import InlineTextButton from '../components/InlineTextButton';
import AppStyles from '../styles/AppStyles'
import { auth, db } from '../firebase';
import { signOut, sendEmailVerification } from 'firebase/auth';
import React from 'react';
import AddItemModal from '../components/AddItemModal';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import PopupDialog, { DialogTitle } from "react-native-popup-dialog";

export default function Item({ navigation }) {

    let [modalVisible, setModalVisible] = React.useState(false);
    let [isLoading, setIsLoading] = React.useState(true);
    let [isRefreshing, setIsRefreshing] = React.useState(false);
    let [items, setItems] = React.useState([]);

    let loadItemsList = async () => {
        const q = query(collection(db, "items"), where("userId", "==", auth.currentUser.uid));
    
        const querySnapshot = await getDocs(q);
        let items = [];
        querySnapshot.forEach((doc) => {
          let item = doc.data();
          item.id = doc.id;
          items.push(item);
        });
    
        setItems(items);
        setIsLoading(false);
        setIsRefreshing(false);
      };

      if(isLoading){
        loadItemsList();
      }

    let logOut = () => {
        signOut(auth).then(() => {
            navigation.popToTop();
        });
    }

    let checkItem = (item, isChecked) => {
        const itemRef = doc(db, 'items', item.id);
        setDoc(itemRef, { completed: isChecked }, { merge: true });
      };
    
      let deleteItem = async (itemId) => {
        await deleteDoc(doc(db, "items", itemId));
        let updatedItems = [...items].filter((item) => item.id != itemId);
        setItems(updatedItems);
      };

    let renderItem = ({item}) => {
        return (
          <View style={[AppStyles.rowContainer, AppStyles.rightMargin, AppStyles.leftMargin]}>
            <View style={AppStyles.fillSpace}>
              <BouncyCheckbox
                isChecked={item.complated}
                size={25}
                fillColor="#258ea6"
                unfillColor="#FFFFFF"
                text={item.text}
                iconStyle={{ borderColor: "#258ea6" }}
                onPress={(isChecked) => { checkItem(item, isChecked)}}
              />
            </View>
            <InlineTextButton text="Delete" color="#258ea6" onPress={() => deleteItem(item.id)} />
          </View>
        );
      }

    let showItemList = () => {
        return (
            <FlatList
              data={items}
              refreshing={isRefreshing}
              onRefresh={() => {
                loadItemsList();
                setIsRefreshing(true);
              }}
              renderItem={renderItem}
              keyExtractor={item => item.id} />
          )
    };

    let showContent = () => {
        return (
            <View>
            {isLoading ? <ActivityIndicator size="large" /> : showItemList() }
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
        );
    };

    let addItem = async (item) => {
        let itemToSave = {
            text: item,
            completed: false,
            userId: auth.currentUser.uid
          };

        try{
            
        const docRef = await addDoc(collection(db, "items"), itemToSave);

        itemToSave.id = docRef.id;

        let updatedItems = [...items];
        updatedItems.push(itemToSave);
    
        setItems(updatedItems);
          }catch(error) {
            console.log(error);
          }
    };

    return (
        <SafeAreaView>
        <View style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.rightMargin, AppStyles.topMargin]}>
        <InlineTextButton text="Manage Account" color="#258ea6" onPress={() => navigation.navigate("ManageAccount")}/>
        </View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        >
        <AddItemModal
            onClose={() => setModalVisible(false)}
            addItem={addItem}
        />
        </Modal>
        <Text style={AppStyles.header}>Item</Text>
        {auth.currentUser.emailVerified ? showContent() : showSendVerificationEmail()}
        </SafeAreaView>
    )
}