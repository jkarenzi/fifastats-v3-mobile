import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TextInput, Pressable, ScrollView } from "react-native";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from 'yup'
import { useState } from "react";
import { errorToast, successToast } from "@/utils/toast";
import { useCreateStat, useBulkCreateStats } from "@/hooks/useStats";

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
        <SafeAreaView className="flex-1 items-center bg-white">
            <ScrollView className="w-[90%]" showsVerticalScrollIndicator={false}>
                <Text className="font-poppinsM text-lg mt-8">Submit new stats</Text>
                
                {/* Toggle between single and bulk */}
                <View className="flex-row w-full mt-6 border border-custom-grey rounded-md overflow-hidden">
                    <Pressable 
                        className={`flex-1 py-3 ${mode === 'single' ? 'bg-custom-blue' : 'bg-white'}`}
                        onPress={() => setMode('single')}
                    >
                        <Text className={`text-center font-poppins ${mode === 'single' ? 'text-white' : 'text-gray-600'}`}>
                            Single Entry
                        </Text>
                    </Pressable>
                    <Pressable 
                        className={`flex-1 py-3 ${mode === 'bulk' ? 'bg-custom-blue' : 'bg-white'}`}
                        onPress={() => setMode('bulk')}
                    >
                        <Text className={`text-center font-poppins ${mode === 'bulk' ? 'text-white' : 'text-gray-600'}`}>
                            Bulk Entry
                        </Text>
                    </Pressable>
                </View>

                {mode === 'single' ? (
                    <View className="w-full my-8">
                        <View className="w-full mb-4">
                            <Text className="mb-2 font-poppins">Enter Manzi's goals</Text>
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
                            <Text className="mb-2 font-poppins">Enter Manzi's freekicks</Text>
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
                            <Text className="mb-2 font-poppins">Enter Johnson's goals</Text>
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
                            <Text className="mb-2 font-poppins">Enter Johnson's freekicks</Text>
                            <TextInput 
                                className={`w-full h-10 px-2 border ${formik.touched.johnsonFreekicks && formik.errors.johnsonFreekicks ? 'border-red-500':'border-custom-grey'} rounded-md font-poppins`}
                                value={formik.values.johnsonFreekicks.toString()}
                                onChangeText={formik.handleChange('johnsonFreekicks')}
                                onBlur={formik.handleBlur('johnsonFreekicks')}
                                keyboardType="numeric"
                            />
                            {formik.touched.johnsonFreekicks && formik.errors.johnsonFreekicks && <Text className="text-red-500 text-xs font-poppins mt-2">{formik.errors.johnsonFreekicks}</Text>}
                        </View>
                        <View className="w-full mb-2 items-center">
                            <Pressable 
                                className="w-full h-10 mb-2" 
                                onPress={() => formik.handleSubmit()}
                                disabled={createStatMutation.isPending}
                            >
                                <View className={`w-full h-full ${createStatMutation.isPending?'bg-custom-blue opacity-80':'bg-custom-blue'} items-center justify-center rounded-md`}>
                                    <Text className="text-white font-poppins">{createStatMutation.isPending?'Submitting...':'Submit'}</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                ) : (
                    <View className="w-full my-8">
                        <Text className="mb-2 font-poppins">Enter match data</Text>
                        <TextInput
                            className="w-full h-40 px-2 py-2 border border-custom-grey rounded-md font-poppins"
                            value={bulkData}
                            onChangeText={setBulkData}
                            multiline
                            textAlignVertical="top"
                            placeholder="5,2,3,1&#10;7,0,4,2&#10;3,1,2,0"
                        />
                        <Text className="mt-2 font-poppins text-xs text-gray-500">
                            Example: 5,2,3,1 means Manzi scored 5 goals & 2 freekicks, Johnson scored 3 goals & 1 freekick
                        </Text>
                        <View className="w-full mt-6 mb-2 items-center">
                            <Pressable 
                                className="w-full h-10 mb-2" 
                                onPress={handleBulkSubmit}
                                disabled={bulkCreateMutation.isPending}
                            >
                                <View className={`w-full h-full ${bulkCreateMutation.isPending?'bg-custom-blue opacity-80':'bg-custom-blue'} items-center justify-center rounded-md`}>
                                    <Text className="text-white font-poppins">{bulkCreateMutation.isPending?'Submitting...':'Submit All'}</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                )}
            </ScrollView>          
        </SafeAreaView>
    );
}
 
export default SubmitStats;