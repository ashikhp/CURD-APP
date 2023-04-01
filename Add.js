
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    StyleSheet,
    Button,
    View,
    Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm } from 'react-hook-form';
import Input from './Components/input';
import { Divider, } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";



function Add(props) {
    const { route } = props;
    const { handleSubmit, register, setValue, getValues, errors } = useForm();
    const [forceRender, setForceRender] = useState(false);

    // Alert.alert("kk",JSON.stringify(route.params && route.params.index))

    useEffect(() => {
        if (route.params && route.params.editData) {
            setEditValues(route.params && route.params.editData)
        }
    }, [])

    const setEditValues = (data) => {
        const {
            firstName,
            lastName,
            age
        } = data;

        setValue("first", firstName)
        setValue("last", lastName)
        setValue("age", age)

        setForceRender(!forceRender)
    }
    const on_submit_fuction = async (first, last, age) => {
        try {
            const PersonData = await AsyncStorage.getItem("person");
            const parsed = await JSON.parse(PersonData);
            if (parsed === null) {

                AsyncStorage.setItem("person", JSON.stringify([
                    {
                        "firstName": first,
                        "lastName": last,
                        "age": age
                    },


                ]));


            } else {

                AsyncStorage.setItem("person", JSON.stringify([
                    ...parsed,

                    {
                        "firstName": first,
                        "lastName": last,
                        "age": age
                    },


                ]));

            }


        } catch (error) {
            console.log("error", error);
        } finally {
            props.navigation.navigate("Home")

        }
    };

    const on_edit_fuction = async (index, first, last, age) => {
            try {
                const PersonData = await AsyncStorage.getItem("person");
                const parsed = await JSON.parse(PersonData);
                const parsed1 = await JSON.parse(PersonData);
                if (index === 0) {

                    parsed1.splice(index, 1);
                    const updatedNotes = [{
                        "firstName": parsed[index].firstName = first,
                        "lastName": parsed[index].lastName = last,
                        "age": parsed[index].age = age
                    }, ...parsed1,
                    ];



                    AsyncStorage.setItem("person", JSON.stringify(updatedNotes));

                } else if(index === 1) {
                    
                    parsed1.splice(index, 1);
                    AsyncStorage.setItem("person", JSON.stringify([
                        
                        parsed1[0],
                        {
                            "firstName": parsed[index].firstName = first,
                            "lastName": parsed[index].lastName = last,
                            "age": parsed[index].age = age
                        },
                        parsed1[1]

                    ]));
                } else{
                        parsed1.splice(index, 1);

                    AsyncStorage.setItem("person", JSON.stringify([
                        ...parsed1,
                        {
                            "firstName": parsed[index].firstName = first,
                            "lastName": parsed[index].lastName = last,
                            "age": parsed[index].age = age
                        },

                    ]));
                }



            } catch (error) {
                console.log("error", error);
            } finally {
                props.navigation.navigate("Home")

            }

    };



    const onSubmit = (data) => {
        const {
            first,
            last,
            age
        } = data;

        if (route.params && route.params.editData) {
            on_edit_fuction(route.params && route.params.index, first, last, age)

        } else {

            on_submit_fuction(first, last, age)
        }



    }



    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            style={{ backgroundColor: '#fff' }}
        >
            <ScrollView style={{ flex: 1, padding: 10, backgroundColor: '#fff' }}>


                <Input
                    name='first'
                    Title='first name'
                    onFocus={() => { }}
                    iconName={'qrcode'}
                    onChangeTextFn={(e) => {
                        setValue('first', e);
                        setForceRender(!forceRender);
                    }}
                    value={getValues('first')}

                />
                <Divider />

                <Input
                    name='last'
                    Title='last name'
                    onFocus={() => { }}
                    iconName={'unity'}
                    onChangeTextFn={(e) => {
                        setValue('last', e);
                        setForceRender(!forceRender);
                    }}
                    value={getValues('last')}

                />
                <Divider />
                <Input
                    name='age'
                    Title='age'
                    onFocus={() => { }}
                    iconName={'library'}
                    keyboardType='numeric'
                    onChangeTextFn={(e) => {
                        setValue('age', e);
                        setForceRender(!forceRender);
                    }}
                    value={getValues('age')}

                />
                <Divider />
                <View style={{ marginTop: 10 }}>
                    <Button title={route.params && route.params.editData ? 'UPDATE' : 'ADD'} onPress={handleSubmit(onSubmit)} />
                </View>

            </ScrollView>
        </KeyboardAwareScrollView>
    );
}

export default Add;

const styles = StyleSheet.create({
    label: {
        paddingVertical: 5,
        fontSize: 16,
        color: '#162f56',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 3,
        backgroundColor: '#fff',
        paddingBottom: 10,
    },
    datePicker: {
        width: -2,
        marginLeft: -33.5,
    },
    saveButtonContainer: {
        backgroundColor: "red",
        padding: 10,
        width: "50%",
        marginTop: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        marginRight: "0.5%",
        left: "-1%"
    },
    saveButtonContainer1: {
        backgroundColor: "red",
        padding: 10,
        width: "50%",
        marginTop: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        marginRight: "0.5%",
        left: "-1%"
    },
    saveButtonContainerEdit: {
        backgroundColor: "red",
        padding: 10,
        width: "95%",
        marginTop: 20,
        borderRadius: 20,
        marginLeft: "2.5%",
    },

    saveButtonText: {
        color: "red",
    },
    textError: {
        color: 'red',
        fontSize: 14,
        left: 60
    },
});
