import { View, Text, Button, Alert, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { Card, Divider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



export default function Home(props) {

    const [data, setdata] = useState([])
    const [nodata, setnodata] = useState()
    const [test, settest] = useState()
    const [condition, setcondition] = useState(true)

    const addfunction = async () => {

        AsyncStorage.getItem('person', (err, result) => {
            const data = JSON.parse(result);
            if (data === null) {
                setnodata(true)
            }
            else if (data !== null) {
                setnodata(false)

                setdata(data)
            }
        })

    }

    // Alert.alert("l",JSON.stringify(test))

    // useEffect(() => {
    //     AsyncStorage.removeItem("person")
    // }, [])


    useFocusEffect(
        React.useCallback(() => {
            addfunction()

        }, [data]),

    );
    useFocusEffect(
        React.useCallback(() => {
            if (data.length === 3) {
                setcondition(false)
            }
            if(data.length !== 3){
                setcondition(true)
            }
            if(data.length===0){
                setnodata(true)
            }
        }, [data]),

    );
    const deleteItem = async (index) => {
        const PersonData = await AsyncStorage.getItem("person");
        const parsed = await JSON.parse(PersonData);
        const parsed1 = await JSON.parse(PersonData);
        parsed1.splice(index, 1)
        AsyncStorage.setItem("person", JSON.stringify(parsed1));
        
        AsyncStorage.getItem('person', (err, result) => {
            const data = JSON.parse(result);
            if (data === null) {
                setnodata(true)
            }
            else if (data !== null) {
                setnodata(false)

                setdata(data)
            }
        })
        // Alert.alert("kk",JSON.stringify(parsed1.length))

    }
    if (nodata === true) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>NO DATA</Text>
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        width: 55,
                        height: 55,
                        alignItems: "center",
                        justifyContent: "center",
                        right: 20,
                        bottom: 20,
                        backgroundColor: "#fff",
                        borderWidth: 3,
                        borderColor: "#343769",
                        borderRadius: 50,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 9.51,

                        elevation: 15,
                    }}
                    onPress={() => { props.navigation.navigate('Add Page') }}
                >
                    <MaterialCommunityIcons name="plus" size={20} color="#eb2459" />
                </TouchableOpacity>
            </View>
        )
    }
    else {



        return (
            <View style={{ flex: 1 }}>

                {
                    data.map((item, index) => {
                        return (

                            <View>
                                {item.firstName &&

                                    <Card style={{ width: 250, padding: 10, marginTop: 10, marginLeft: 10 }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ fontSize: 20 }}>First Name : </Text>
                                            <Text style={{ fontSize: 20 }}>{item.firstName}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ fontSize: 20 }}>Last Name : </Text>
                                            <Text style={{ fontSize: 20 }}>{item.lastName}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ fontSize: 20 }}>Age : </Text>
                                            <Text style={{ fontSize: 20 }}>{item.age}</Text>
                                        </View>

                                        <View style={{ padding: 10 }}>
                                            <Divider />
                                            <Divider />
                                            <Divider />
                                        </View>

                                        <View style={{ backgroundColor: "#fff", height: 35, flexDirection: "row" }}>

                                            <TouchableOpacity
                                                onPress={() => { props.navigation.navigate('Add Page', { editData: item, index }) }}
                                                style={{ backgroundColor: "#bababa", height: 30, width: "50%", borderWidth: 1, justifyContent: "center", alignItems: "center" }}>

                                                <Text>EDIT</Text>

                                            </TouchableOpacity>

                                            <TouchableOpacity style={{ backgroundColor: "#bababa", height: 30, width: "50%", borderWidth: 1, justifyContent: "center", alignItems: "center" }}
                                                onPress={() => {
                                                    deleteItem(index)
                                                }}
                                            >
                                                <Text>DELETE</Text>
                                            </TouchableOpacity>

                                        </View>


                                    </Card>
                                }
                            </View>
                        )
                    })
                }
                {condition === true &&
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        width: 55,
                        height: 55,
                        alignItems: "center",
                        justifyContent: "center",
                        right: 20,
                        bottom: 20,
                        backgroundColor: "#fff",
                        borderWidth: 3,
                        borderColor: "#343769",
                        borderRadius: 50,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 9.51,

                        elevation: 15,
                    }}
                    onPress={() => { props.navigation.navigate('Add Page') }}
                >
                    <MaterialCommunityIcons name="plus" size={20} color="#eb2459" />
                </TouchableOpacity>
    }
            </View>
        )
    }
}