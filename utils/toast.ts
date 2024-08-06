import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

export const successToast = (message: string) => {
    Toast.show({
        type: 'success',
        text1: message
    });
}

export const errorToast = (message: string) => {
    Toast.show({
        type: 'error',
        text1: message
    });
}