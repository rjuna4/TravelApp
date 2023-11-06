import React from 'react';
import { Modal, View, Text, Button, TouchableOpacity } from 'react-native';

const ConfirmationModal = ({ visible, message, onConfirm, onCancel }) => {
    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 10}}>
                    <Text>{message}</Text>
                    <Button title="Yes" onPress={onConfirm}/>
                    <Button title="Cancel" onPress={onCancel} />
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmationModal