import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    TextInputProps, Alert, Platform
} from 'react-native';
import { FieldError } from 'react-hook-form';
import { Sae, Fumi, Kohana, Makiko,Madoka, Isao, Hoshi, Jiro, Hideo,Akira } from 'react-native-textinput-effects';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

interface Props extends TextInputProps {
    name: string;
    label?: string;
    labelStyle?: TextStyle;
    error?: FieldError | undefined;
    hide: Boolean;
    searchSelected: Function;
    iconName: string;
    Title: string;
    value: string;
    defaultValue: string;
    onFocus: Function;
    onChangeTextFn: Function;
    disabled: Boolean;
    validate: Boolean;
    keyboardType: string;
    style: string;
    multipleLine: Boolean;
    submitbtn: string;
    placeholder: string;
    focus: Boolean;
    revise: Boolean;
    QuotationNumber: string;
    disableColor: Boolean
}

export default React.forwardRef<any, Props>(
    (props, ref): React.ReactElement => {
        const { focus, placeholder, multipleLine, validate, disableColor, keyboardType, disabled, onChangeTextFn, submitbtn, value, defaultValue, onFocus, label, Title, iconName, labelStyle, error, style, QuotationNumber, revise, hide, searchSelected, ...inputProps } = props;

        const inputRef = useRef(null);
        useEffect(() => {
            if (focus) {
                Platform.OS === 'ios'
                    ? inputRef && inputRef.current && inputRef.current.focus()
                    : setTimeout(() => inputRef && inputRef.current && inputRef.current.focus(), 10);
            }
        }, []);


        return (
            <React.Fragment>
                <View style={{ backgroundColor: disableColor ? "#f5f5f0" : null }}>
                    {!hide && !searchSelected ?
                        <View style={styles.container}>
                            {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

                            <Fumi 
                                label={Title}
                                ref={inputRef}
                                style={[styles.input, { borderColor: error ? '#fc6d47' : '#162f56', marginLeft: 10, height: 100, backgroundColor: null }, style]}
                                iconClass={MaterialCommunityIcons}
                                iconName={iconName}
                                iconColor={'grey'}
                                onFocus={onFocus}
                                passiveIconColor={"#9c9c9c"}
                                iconSize={20}
                                iconWidth={40}
                                inputPadding={18}
                                defaultValue={defaultValue}
                                placeholder={placeholder}
                                placeholderTextColor="#d6d6d6"
                                value={value}
                                onChangeText={onChangeTextFn}
                                editable={disabled}
                                returnKeyType={submitbtn}
                                keyboardType={keyboardType}
                                labelStyle={[{ fontSize: 12, marginLeft: 4, color: '#9c9c9c' }, (revise) && { marginLeft: 100 }, (placeholder && !value) && { marginTop: -10 }]}
                                inputStyle={[{ color: "black", textDecorationLine: 'none', fontSize: 14, marginLeft: 62 }, (revise) && { marginLeft: QuotationNumber }]}
                                multiline={multipleLine}
                       
                            />
                            {error &&
                                <Animatable.View
                                    animation='shake'
                                    duration={500}
                                >
                                    <Text style={styles.textError}>{error && error.message}</Text>
                                </Animatable.View>
                            }
                        </View> : null}
                    {searchSelected &&
                        (
                            <View style={styles.container}>
                                <Text style={[styles.label, labelStyle]}>{label}</Text>
                                <Text style={styles.input} />
                            </View>
                        )}
                </View>
            </React.Fragment>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        // backgroundColor: "#f5f5f0",
        padding: 3

    },
    input: {
        margin: -11
    },
    label: {
        paddingVertical: 5,
        fontSize: 16,
        color: '#162f56',
    },
    textError: {
        color: 'red',
        fontSize: 14,

    },
});