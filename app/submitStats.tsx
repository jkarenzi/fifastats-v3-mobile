import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TextInput, Pressable, ScrollView } from "react-native";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from 'yup'
import { useState } from "react";
import { errorToast, successToast } from "@/utils/toast";
import { useCreateStat, useBulkCreateStats } from "@/hooks/useStats";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const validationSchema = Yup.object().shape({
    manziGoals: Yup.number().required('Manzi goals are required'),
    manziFreekicks:Yup.number().required('Manzi freekicks are required'),
    johnsonGoals:Yup.number().required('Johnson goals are required'),
    johnsonFreekicks:Yup.number().required('Johnson freekicks are required'),
})

interface formData {
    manziGoals:string|number,
    manziFreekicks:string|number,
    johnsonGoals:string|number,
    johnsonFreekicks:string|number
}

const SubmitStats = () => {
    const [mode, setMode] = useState<'single' | 'bulk'>('single');
    const [bulkData, setBulkData] = useState('');
    
    const createStatMutation = useCreateStat();
    const bulkCreateMutation = useBulkCreateStats();
    
    const submitStats = async (formData: formData, {resetForm}:FormikHelpers<formData>) => {
        const convertedFormData = {
            manziGoals: parseInt(formData.manziGoals as string, 10),
            manziFreekicks: parseInt(formData.manziFreekicks as string, 10),
            johnsonGoals: parseInt(formData.johnsonGoals as string, 10),
            johnsonFreekicks: parseInt(formData.johnsonFreekicks as string, 10),
        };

        try {
            await createStatMutation.mutateAsync(convertedFormData);
            successToast('Match added successfully!');
            resetForm();
        } catch (error) {
            errorToast(error instanceof Error ? error.message : 'An error occurred');
        }
    }

    const handleBulkSubmit = async () => {
        if (!bulkData.trim()) {
            errorToast('Please enter match data');
            return;
        }

        try {
            const result = await bulkCreateMutation.mutateAsync(bulkData);
            successToast(`${result.count} matches added successfully!`);
            setBulkData('');
        } catch (error) {
            errorToast(error instanceof Error ? error.message : 'An error occurred');
        }
    }

    const formik = useFormik({
        initialValues:{
            manziGoals:'',
            manziFreekicks:'',
            johnsonGoals:'',
            johnsonFreekicks:''
        } as formData,
        onSubmit: submitStats,
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
            <ScrollView className="w-full h-full" showsVerticalScrollIndicator={false}>
                <View className="px-5 pt-6 pb-6">
                    <Text className="font-poppinsB text-white text-3xl">New Match</Text>
                    <Text className="font-poppins text-white/80 text-sm mt-1">Record your game stats</Text>
                </View>

                <View className="px-5 pb-6">
                    {/* Toggle between single and bulk - shadcn style */}
                    <View className="bg-white rounded-xl p-4 mb-6" style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5}}>
                        <View className="bg-gray-100 rounded-lg p-1">
                            <View className="flex-row gap-1">
                                <Pressable 
                                    className="flex-1"
                                    onPress={() => setMode('single')}
                                >
                                    <View className={`${mode === 'single' ? 'bg-white' : ''} rounded-md py-2`} style={mode === 'single' ? {shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.08, shadowRadius: 3, elevation: 3} : {}}>
                                        <Text className={`text-center font-poppinsM text-sm ${mode === 'single' ? 'text-gray-900' : 'text-gray-500'}`}>
                                            Single Entry
                                        </Text>
                                    </View>
                                </Pressable>
                                <Pressable 
                                    className="flex-1"
                                    onPress={() => setMode('bulk')}
                                >
                                    <View className={`${mode === 'bulk' ? 'bg-white' : ''} rounded-md py-2`} style={mode === 'bulk' ? {shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.08, shadowRadius: 3, elevation: 3} : {}}>
                                        <Text className={`text-center font-poppinsM text-sm ${mode === 'bulk' ? 'text-gray-900' : 'text-gray-500'}`}>
                                            Bulk Entry
                                        </Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </View>

                    {mode === 'single' ? (
                        <View className="bg-white rounded-2xl p-5" style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5}}>
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
                                disabled={createStatMutation.isPending}
                                className="w-full h-14 rounded-xl overflow-hidden"
                            >
                                <LinearGradient
                                    colors={['#7C3AED', '#EC4899']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    className="w-full h-full items-center justify-center flex-row"
                                >
                                    {!createStatMutation.isPending && <Ionicons name="checkmark-circle" size={22} color="white" />}
                                    <Text className="text-white font-poppinsS text-base ml-2">
                                        {createStatMutation.isPending?'Submitting...':'Submit Match'}
                                    </Text>
                                </LinearGradient>
                            </Pressable>
                        </View>
                    ) : (
                        <View className="bg-white rounded-2xl p-5" style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5}}>
                            <View className="flex-row items-center mb-3">
                                <Ionicons name="list-circle" size={22} color="#7C3AED" />
                                <Text className="ml-2 font-poppinsM text-base text-gray-800">Bulk Match Data</Text>
                            </View>
                            <TextInput
                                className="w-full h-48 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-poppins text-sm"
                                value={bulkData}
                                onChangeText={setBulkData}
                                multiline
                                textAlignVertical="top"
                                placeholder="5,2,3,1&#10;7,0,4,2&#10;3,1,2,0"
                            />
                            <View className="bg-purple-50 rounded-xl p-4 mt-4">
                                <Text className="font-poppinsM text-xs text-custom-purple mb-1">Format:</Text>
                                <Text className="font-poppins text-xs text-gray-600">manziGoals,manziFreekicks,johnsonGoals,johnsonFreekicks</Text>
                                <Text className="font-poppins text-xs text-gray-500 mt-2">One match per line</Text>
                            </View>
                            <Pressable 
                                onPress={handleBulkSubmit}
                                disabled={bulkCreateMutation.isPending}
                                className="w-full h-14 rounded-xl overflow-hidden mt-5"
                            >
                                <LinearGradient
                                    colors={['#7C3AED', '#EC4899']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    className="w-full h-full items-center justify-center flex-row"
                                >
                                    {!bulkCreateMutation.isPending && <Ionicons name="cloud-upload" size={22} color="white" />}
                                    <Text className="text-white font-poppinsS text-base ml-2">
                                        {bulkCreateMutation.isPending?'Submitting...':'Submit All Matches'}
                                    </Text>
                                </LinearGradient>
                            </Pressable>
                        </View>
                    )}
                </View>
            </ScrollView>          
        </SafeAreaView>
    );
}
 
export default SubmitStats;
