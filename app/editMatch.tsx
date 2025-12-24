import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TextInput, Pressable, ScrollView } from "react-native";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from 'yup'
import { errorToast, successToast } from "@/utils/toast";
import { useUpdateStat } from "@/hooks/useStats";
import { useLocalSearchParams, useRouter } from 'expo-router';

const validationSchema = Yup.object().shape({
    manziGoals: Yup.number().required('Manzi goals are required').min(0, 'Must be 0 or greater'),
    manziFreekicks:Yup.number().required('Manzi freekicks are required').min(0, 'Must be 0 or greater'),
    johnsonGoals:Yup.number().required('Johnson goals are required').min(0, 'Must be 0 or greater'),
    johnsonFreekicks:Yup.number().required('Johnson freekicks are required').min(0, 'Must be 0 or greater'),
})

interface formData {
    manziGoals:string|number,
    manziFreekicks:string|number,
    johnsonGoals:string|number,
    johnsonFreekicks:string|number
}

const EditMatch = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const updateStatMutation = useUpdateStat();

    const matchDate = params.createdAt ? new Date(params.createdAt as string).toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }) : '';

    const updateMatch = async (formData: formData, {resetForm}:FormikHelpers<formData>) => {
        const convertedFormData = {
            manziGoals: parseInt(formData.manziGoals as string, 10),
            manziFreekicks: parseInt(formData.manziFreekicks as string, 10),
            johnsonGoals: parseInt(formData.johnsonGoals as string, 10),
            johnsonFreekicks: parseInt(formData.johnsonFreekicks as string, 10),
        };

        try {
            await updateStatMutation.mutateAsync({ 
                id: params.id as string, 
                data: convertedFormData 
            });
            successToast('Match updated successfully!');
            router.back();
        } catch (error) {
            errorToast(error instanceof Error ? error.message : 'An error occurred');
        }
    }

    const formik = useFormik({
        initialValues:{
            manziGoals: params.manziGoals || '',
            manziFreekicks: params.manziFreekicks || '',
            johnsonGoals: params.johnsonGoals || '',
            johnsonFreekicks: params.johnsonFreekicks || ''
        } as formData,
        onSubmit: updateMatch,
        validationSchema: validationSchema
    })

    return (  
        <SafeAreaView className="flex-1 items-center bg-white">
            <ScrollView className="w-[90%]" showsVerticalScrollIndicator={false}>
                <View className="flex-row items-center justify-between mt-6 mb-4">
                    <Pressable onPress={() => router.back()} className="mr-4">
                        <Text className="font-poppins text-custom-blue text-base">← Back</Text>
                    </Pressable>
                    <Text className="font-poppinsM text-lg flex-1">Edit Match</Text>
                </View>

                {matchDate && (
                    <View className="bg-gray-50 p-3 rounded-md mb-6">
                        <Text className="font-poppins text-sm text-gray-600">Match Date</Text>
                        <Text className="font-poppinsM text-base mt-1">{matchDate}</Text>
                    </View>
                )}

                <View className="w-full my-4">
                    <View className="w-full mb-4">
                        <Text className="mb-2 font-poppins">Manzi's goals</Text>
                        <TextInput
                            className={`w-full h-10 px-2 border ${formik.touched.manziGoals && formik.errors.manziGoals ? 'border-red-500':'border-custom-grey'} rounded-md font-poppins`}
                            value={formik.values.manziGoals.toString()}
                            onChangeText={formik.handleChange('manziGoals')}
                            onBlur={formik.handleBlur('manziGoals')}
                            keyboardType="numeric"
                        />
                        {formik.touched.manziGoals && formik.errors.manziGoals && <Text className="text-red-500 text-xs font-poppins mt-2">{formik.errors.manziGoals}</Text>}
                    </View>
                    <View className="w-full mb-4">
                        <Text className="mb-2 font-poppins">Manzi's freekicks</Text>
                        <TextInput 
                            className={`w-full h-10 px-2 border ${formik.touched.manziFreekicks && formik.errors.manziFreekicks ? 'border-red-500':'border-custom-grey'} rounded-md font-poppins`}
                            value={formik.values.manziFreekicks.toString()}
                            onChangeText={formik.handleChange('manziFreekicks')}
                            onBlur={formik.handleBlur('manziFreekicks')}
                            keyboardType="numeric"
                        />
                        {formik.touched.manziFreekicks && formik.errors.manziFreekicks && <Text className="text-red-500 text-xs font-poppins mt-2">{formik.errors.manziFreekicks}</Text>}
                    </View>
                    <View className="w-full mb-4">
                        <Text className="mb-2 font-poppins">Johnson's goals</Text>
                        <TextInput 
                            className={`w-full h-10 px-2 border ${formik.touched.johnsonGoals && formik.errors.johnsonGoals ? 'border-red-500':'border-custom-grey'} rounded-md font-poppins`}
                            value={formik.values.johnsonGoals.toString()}
                            onChangeText={formik.handleChange('johnsonGoals')}
                            onBlur={formik.handleBlur('johnsonGoals')}
                            keyboardType="numeric"
                        />
                        {formik.touched.johnsonGoals && formik.errors.johnsonGoals && <Text className="text-red-500 text-xs font-poppins mt-2">{formik.errors.johnsonGoals}</Text>}
                    </View>
                    <View className="w-full mb-4">
                        <Text className="mb-2 font-poppins">Johnson's freekicks</Text>
                        <TextInput 
                            className={`w-full h-10 px-2 border ${formik.touched.johnsonFreekicks && formik.errors.johnsonFreekicks ? 'border-red-500':'border-custom-grey'} rounded-md font-poppins`}
                            value={formik.values.johnsonFreekicks.toString()}
                            onChangeText={formik.handleChange('johnsonFreekicks')}
                            onBlur={formik.handleBlur('johnsonFreekicks')}
                            keyboardType="numeric"
                        />
                        {formik.touched.johnsonFreekicks && formik.errors.johnsonFreekicks && <Text className="text-red-500 text-xs font-poppins mt-2">{formik.errors.johnsonFreekicks}</Text>}
                    </View>
                </View> 
                <View className="w-full mb-2 items-center">
                    <Pressable 
                        className="w-full h-10 mb-2" 
                        onPress={() => formik.handleSubmit()}
                        disabled={updateStatMutation.isPending}
                    >
                        <View className={`w-full h-full ${updateStatMutation.isPending?'bg-custom-blue opacity-80':'bg-custom-blue'} items-center justify-center rounded-md`}>
                            <Text className="text-white font-poppins">{updateStatMutation.isPending?'Updating...':'Update Match'}</Text>
                        </View>
                    </Pressable>
                </View>  
            </ScrollView>          
        </SafeAreaView>
    );
}
 
export default EditMatch;
