import { useEffect, useState } from 'react';
import { Button, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, View } from 'react-native'
import uuid from 'react-native-uuid';
import { getData, saveData } from './components/asyncStorage/localStorage';



export default function Home({ colors }) {

    const [data, setData] = useState([]);
    const [notes, setNotes] = useState('')
    const [idSaver, setIdSaver] = useState(undefined)


    useEffect(() => {
        const fetchData = async () => {
            const value = await getData('myKey');
            if (value) {
                setData(value);
            }
        };
        fetchData();
    }, []);

    const handleAdd = async () => {
        if (notes !== '') {
            if (idSaver) {
                const updatedData = data.map(item => item.id === idSaver ? { ...item, label: notes } : item);
                setData(updatedData);
                await saveData('myKey', updatedData);
                setIdSaver(undefined);
                setNotes('');
            } else {
                setData([...data, { id: uuid.v4(), label: notes }])
                await saveData('myKey', [...data, { id: uuid.v4(), label: notes }]);
                setNotes('')
            }
        }
    }

    const handleRemove = async (id) => {
        const removed = data.filter((rem) => rem.id !== id)
        setData(removed)
        await saveData('myKey', removed);
    }

    const handleEdit = (text) => {
        setNotes(text)
    }

    const handleCancel = () => {
        setIdSaver(undefined);
        setNotes('');
    }


    return (
        <>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <View>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={[styles.text, { color: colors.text }]}
                        value={notes}
                        placeholder="Type a note.."
                        onChangeText={(text) => setNotes(text)}
                    />
                    <View style={styles.actionContainer}>
                        <Button title={idSaver ? "Save" : "Add"} onPress={() => handleAdd()} />
                        <Button title="Cancel" onPress={() => handleCancel()} />
                    </View>
                </View>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    initialNumToRender={data.length}
                    style={styles.listing}
                    renderItem={(item) => (
                        <View style={styles.listingContainer}>
                            <TouchableOpacity
                                style={styles.messageList}
                                onPress={() => [
                                    setIdSaver(item.item.id),
                                    handleEdit(item.item.label),
                                ]}>
                                <View>
                                    <Text multiline numberOfLines={2} style={[styles.message, { color: colors.text }]}>
                                        {item.item.label}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View>
                                <Button style={styles.button} title="X" onPress={() => handleRemove(item.item.id)} />
                            </View>
                        </View>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.seperator} />}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    screenContainer: { padding: 10, rowGap: 20, flex: 1 },
    messageContainer: { marginTop: 30 },
    messageList: { paddingVertical: 10, flexShrink: 1, width: '100%', minHeight: 50, },
    messageListContainer: {},
    input: { maxHeight: 100, backgroundColor: 'lightgrey', marginBottom: 20, lineHeight: 20, borderRadius: 10, padding: 10 },
    listingContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 5
    },
    message: { color: 'black' },
    seperator: { backgroundColor: 'lightgrey', height: 1 },
    actionContainer: { rowGap: 5 },
    listing: { marginTop: 20 },
    container: { paddingHorizontal: 10 }
});




