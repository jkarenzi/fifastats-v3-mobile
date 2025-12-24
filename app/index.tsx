import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Text,View, Image } from "react-native";
import { errorToast } from "@/utils/toast";
import { ScrollView, RefreshControl } from "react-native";
import { useGetStats } from "@/hooks/useStats";
import { useEffect } from "react";

const Index = () => {
    const { data: stats, isLoading, refetch, isRefetching, error } = useGetStats();

    useEffect(() => {
        if (error) {
            errorToast(error instanceof Error ? error.message : 'Failed to fetch stats');
        }
    }, [error]);

    return (  
        <SafeAreaView className="flex-1 items-center justify-center bg-[#f2f2f2]">
            <ScrollView contentContainerStyle={{alignItems:'center', justifyContent:'center', flex:1}} className='w-full h-full' refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => refetch()}/>}>
                <Text className="self-start font-poppinsS text-custom-blue text-2xl mt-8 ml-4">Fifastats</Text>
                <View className="w-[90%] flex-1 justify-center">
                    {stats && !isLoading && <View className='w-full h-60 border border-[lightgray] rounded-md p-2 bg-white'>
                        <View className="flex-row items-center">
                            <View className="w-10 h-10 rounded-full overflow-hidden">
                                <Image source={require('../assets/images/karenzi.jpg')} className="w-full h-full object-cover"/>
                            </View>  
                            <Text className="ml-3 font-poppinsS text-lg">Manzi</Text>              
                        </View>
                        <View className="mt-6 ml-2">
                            <View className="flex-row items-center">
                                <View className="justify-center w-12 mr-2">
                                    <Text className={`${stats.manziStats.manziGoals > stats.johnsonStats.johnsonGoals && 'text-custom-blue'} font-poppinsB text-base`}>{stats.manziStats.manziGoals}</Text>
                                </View>
                                <Text className="font-poppins text-base text-gray-600">Goals scored</Text>
                            </View>
                            <View className="flex-row items-center mt-2">
                                <View className="justify-center w-12 mr-2">
                                    <Text className={`${stats.manziStats.manziMatches > stats.johnsonStats.johnsonMatches && 'text-custom-blue'} font-poppinsB text-base`}>{stats.manziStats.manziMatches}</Text>
                                </View>
                                <Text className="font-poppins text-base text-gray-600">Matches won</Text>
                            </View>
                            <View className="flex-row items-center mt-2">
                                <View className="justify-center w-12 mr-2">
                                    <Text className={`${stats.manziStats.manziFreekicks > stats.johnsonStats.johnsonFreekicks && 'text-custom-blue'} font-poppinsB text-base`}>{stats.manziStats.manziFreekicks}</Text>
                                </View>
                                <Text className="font-poppins text-base text-gray-600">Freekicks scored</Text>
                            </View>
                            <View className="flex-row items-center mt-2">
                                <View className="justify-center w-12 mr-2">
                                    <Text className={`${stats.manziStats.manziCleanSheets > stats.johnsonStats.johnsonCleanSheets && 'text-custom-blue'} font-poppinsB text-base`}>{stats.manziStats.manziCleanSheets}</Text>
                                </View>
                                <Text className="font-poppins text-base text-gray-600">Clean sheets</Text>
                            </View>
                            <View className="flex-row items-center mt-2">
                                <View className="justify-center w-12 mr-2">
                                    <Text className={`${stats.manziStats.manziAbove7 > stats.johnsonStats.johnsonAbove7 && 'text-custom-blue'} font-poppinsB text-base`}>{stats.manziStats.manziAbove7}</Text>
                                </View>
                                <Text className="font-poppins text-base text-gray-600">7 & above goal matches</Text>
                            </View>  
                        </View>
                    </View>}
                    {stats && !isLoading && <View className='w-full h-60 border border-[lightgray] rounded-md mt-8 p-2 bg-white'>
                        <View className="flex-row items-center">
                            <View className="w-10 h-10 rounded-full overflow-hidden">
                                <Image source={require('../assets/images/johnson.png')} className="w-full h-full object-cover"/>
                            </View>  
                            <Text className="ml-3 font-poppinsS text-lg">Johnson</Text>              
                        </View>
                        <View className="mt-6 ml-2">
                            <View className="flex-row items-center">
                                <View className="justify-center w-12 mr-2">
                                    <Text className={`${stats.manziStats.manziGoals < stats.johnsonStats.johnsonGoals && 'text-custom-blue'} font-poppinsB text-base`}>{stats.johnsonStats.johnsonGoals}</Text>
                                </View>
                                <Text className="font-poppins text-base text-gray-600">Goals scored</Text>
                            </View>
                            <View className="flex-row items-center mt-2">
                                <View className="justify-center w-12 mr-2">
                                <Text className={`${stats.manziStats.manziMatches < stats.johnsonStats.johnsonMatches && 'text-custom-blue'} font-poppinsB text-base`}>{stats.johnsonStats.johnsonMatches}</Text>
                                </View>
                                <Text className="font-poppins text-base text-gray-600">Matches won</Text>
                            </View>
                            <View className="flex-row items-center mt-2">
                                <View className="justify-center w-12 mr-2">
                                    <Text className={`${stats.manziStats.manziFreekicks < stats.johnsonStats.johnsonFreekicks && 'text-custom-blue'} font-poppinsB text-base`}>{stats.johnsonStats.johnsonFreekicks}</Text>
                                </View>
                                <Text className="font-poppins text-base text-gray-600">Freekicks scored</Text>
                            </View>
                            <View className="flex-row items-center mt-2">
                                <View className="justify-center w-12 mr-2">
                                    <Text className={`${stats.manziStats.manziCleanSheets < stats.johnsonStats.johnsonCleanSheets && 'text-custom-blue'} font-poppinsB text-base`}>{stats.johnsonStats.johnsonCleanSheets}</Text>
                                </View>
                                <Text className="font-poppins text-base text-gray-600">Clean sheets</Text>
                            </View>
                            <View className="flex-row items-center mt-2">
                                <View className="justify-center w-12 mr-2">
                                    <Text className={`${stats.manziStats.manziAbove7 < stats.johnsonStats.johnsonAbove7 && 'text-custom-blue'} font-poppinsB text-base`}>{stats.johnsonStats.johnsonAbove7}</Text>
                                </View>
                                <Text className="font-poppins text-base text-gray-600">7 & above goal matches</Text>
                            </View>
                        </View>
                    </View>}
                    {isLoading && <View className="w-full items-center">
                        <ActivityIndicator size={50} color='#3A66BD'/>
                        <Text className="font-poppins text-base mt-4 text-gray-600">Just a sec! We are almost done</Text>
                    </View>}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Index;