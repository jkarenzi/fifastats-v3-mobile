import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TextInput, Pressable, ScrollView } from "react-native";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from 'yup'
import { errorToast, successToast } from "@/utils/toast";
import { useUpdateStat } from "@/hooks/useStats";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

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
        <SafeAreaView className="flex-1 bg-white">
            <LinearGradient
                colors={['#7C3AED', '#EC4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute top-0 left-0 right-0 h-48"
            />
            <ScrollView className="w-full px-5" showsVerticalScrollIndicator={false}>
                <View className="flex-row items-center pt-6 pb-4">
                    <Pressable onPress={() => router.push('/history')} className="mr-3 w-10 h-10 bg-white/20 rounded-xl items-center justify-center">
                        <Ionicons name="arrow-back" size={20} color="white" />
                    </Pressable>
                    <View className="flex-1">
                        <Text className="font-poppinsB text-white text-2xl">Edit Match</Text>
                        <Text className="font-poppins text-white/80 text-sm mt-0.5">Update match details</Text>
                    </View>
                </View>

                {matchDate && (
                    <View className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl mb-6">
                        <View className="flex-row items-center">
                            <Ionicons name="time-outline" size={18} color="white" />
                            <Text className="font-poppinsM text-sm text-white ml-2">{matchDate}</Text>
                        </View>
                    </View>
                )}

                <View className="bg-white rounded-2xl p-5 mb-6" style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5}}>
                    <View className="w-full mb-5">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="football" size={18} color="#7C3AED" />
                            <Text className="ml-2 font-poppinsM text-gray-700">Manzi's goals</Text>
                        </View>
                        <TextInput
                            className={`w-full h-12 px-4 bg-gray-50 ${formik.touched.manziGoals && formik.errors.manziGoals ? 'border-2 border-red-500':'border border-gray-200'} rounded-xl font-poppins text-base`}
                            value={formik.values.manziGoals.toString()}
                            onChangeText={formik.handleChange('manziGoals')}
                            onBlur={formik.handleBlur('manziGoals')}
                            keyboardType="numeric"
                            placeholder="0"
                        />
                        {formik.touched.manziGoals && formik.errors.manziGoals && <Text className="text-red-500 text-xs font-poppins mt-1.5">{formik.errors.manziGoals}</Text>}
                    </View>
                    <View className="w-full mb-5">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="flash" size={18} color="#EC4899" />
                            <Text className="ml-2 font-poppinsM text-gray-700">Manzi's freekicks</Text>
                        </View>
                        <TextInput 
                            className={`w-full h-12 px-4 bg-gray-50 ${formik.touched.manziFreekicks && formik.errors.manziFreekicks ? 'border-2 border-red-500':'border border-gray-200'} rounded-xl font-poppins text-base`}
                            value={formik.values.manziFreekicks.toString()}
                            onChangeText={formik.handleChange('manziFreekicks')}
                            onBlur={formik.handleBlur('manziFreekicks')}
                            keyboardType="numeric"
                            placeholder="0"
                        />
                        {formik.touched.manziFreekicks && formik.errors.manziFreekicks && <Text className="text-red-500 text-xs font-poppins mt-1.5">{formik.errors.manziFreekicks}</Text>}
                    </View>
                    <View className="w-full mb-5">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="football" size={18} color="#7C3AED" />
                            <Text className="ml-2 font-poppinsM text-gray-700">Johnson's goals</Text>
                        </View>
                        <TextInput 
                            className={`w-full h-12 px-4 bg-gray-50 ${formik.touched.johnsonGoals && formik.errors.johnsonGoals ? 'border-2 border-red-500':'border border-gray-200'} rounded-xl font-poppins text-base`}
                            value={formik.values.johnsonGoals.toString()}
                            onChangeText={formik.handleChange('johnsonGoals')}
                            onBlur={formik.handleBlur('johnsonGoals')}
                            keyboardType="numeric"
                            placeholder="0"
                        />
                        {formik.touched.johnsonGoals && formik.errors.johnsonGoals && <Text className="text-red-500 text-xs font-poppins mt-1.5">{formik.errors.johnsonGoals}</Text>}
                    </View>
                    <View className="w-full mb-6">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="flash" size={18} color="#EC4899" />
                            <Text className="ml-2 font-poppinsM text-gray-700">Johnson's freekicks</Text>
                        </View>
                        <TextInput 
                            className={`w-full h-12 px-4 bg-gray-50 ${formik.touched.johnsonFreekicks && formik.errors.johnsonFreekicks ? 'border-2 border-red-500':'border border-gray-200'} rounded-xl font-poppins text-base`}
                            value={formik.values.johnsonFreekicks.toString()}
                            onChangeText={formik.handleChange('johnsonFreekicks')}
                            onBlur={formik.handleBlur('johnsonFreekicks')}
                            keyboardType="numeric"
                            placeholder="0"
                        />
                        {formik.touched.johnsonFreekicks && formik.errors.johnsonFreekicks && <Text className="text-red-500 text-xs font-poppins mt-1.5">{formik.errors.johnsonFreekicks}</Text>}
                    </View>
                    <Pressable 
                        onPress={() => formik.handleSubmit()}
                        disabled={updateStatMutation.isPending}
                        className="w-full h-14 rounded-xl overflow-hidden"
                    >
                        <LinearGradient
                            colors={['#7C3AED', '#EC4899']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            className="w-full h-full items-center justify-center flex-row"
                        >
                            {!updateStatMutation.isPending && <Ionicons name="checkmark-circle" size={22} color="white" />}
                            <Text className="text-white font-poppinsS text-base ml-2">
                                {updateStatMutation.isPending?'Updating...':'Update Match'}
                            </Text>
                        </LinearGradient>
                    </Pressable>
                </View>
            </ScrollView>          
        </SafeAreaView>
    );
}
 
export default EditMatch;
