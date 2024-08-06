import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TextInput, Pressable, ScrollView } from "react-native";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from 'yup'
import { useState } from "react";
import axios from '../utils/client'
import { errorToast, successToast } from "@/utils/toast";

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
    const [isLoading, setIsLoading] = useState(false)
    const submitStats = async (formData: formData, {resetForm}:FormikHelpers<formData>) => {
        const mutation = `
            mutation CreateStat($input: StatInput!) {
                createStat(statInput: $input) {
                    _id
                    manziGoals
                    manziFreekicks
                    johnsonGoals
                    johnsonFreekicks
                    createdAt
                    updatedAt
                }
            }
        `

        try{
            setIsLoading(true)
            const convertedFormData = {
                manziGoals: parseInt(formData.manziGoals as string, 10),
                manziFreekicks: parseInt(formData.manziFreekicks as string, 10),
                johnsonGoals: parseInt(formData.johnsonGoals as string, 10),
                johnsonFreekicks: parseInt(formData.johnsonFreekicks as string, 10),
            };
            

            const response = await axios.post('/',{
                query: mutation,
                variables: {input:convertedFormData}
            })

            setIsLoading(false)
            successToast('Operation successful')
            resetForm()
        }catch(err){
            setIsLoading(false)
            errorToast(err as string)
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
                <View className="w-full my-8">
                    <View className="w-full mb-4">
                        <Text className="mb-2 font-poppins">Enter Manzi's goals</Text>
                        <TextInput
                            className={`w-full h-10 px-2 border ${formik.touched.manziGoals && formik.errors.manziGoals ? 'border-red-500':'border-custom-grey'} rounded-md font-poppins`}
                            value={formik.values.manziGoals.toString()}
                            onChangeText={formik.handleChange('manziGoals')}
                            onBlur={formik.handleBlur('manziGoals')}
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
                        />
                        {formik.touched.johnsonFreekicks && formik.errors.johnsonFreekicks && <Text className="text-red-500 text-xs font-poppins mt-2">{formik.errors.johnsonFreekicks}</Text>}
                    </View>
                </View> 
                <View className="w-full mb-2 items-center">
                    <Pressable className="w-full h-10 mb-2" onPress={() => formik.handleSubmit()}>
                        <View className={`w-full h-full ${isLoading?'bg-custom-blue opacity-80':'bg-custom-blue'} items-center justify-center rounded-md`}>
                            <Text className="text-white font-poppins">{isLoading?'Submitting...':'Submit'}</Text>
                        </View>
                    </Pressable>
                </View>  
            </ScrollView>          
        </SafeAreaView>
    );
}
 
export default SubmitStats;