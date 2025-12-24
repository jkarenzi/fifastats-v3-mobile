import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Text, View, Image } from "react-native";
import { errorToast } from "@/utils/toast";
import { ScrollView, RefreshControl } from "react-native";
import { useGetStats } from "@/hooks/useStats";
import { useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Index = () => {
    const { data: stats, isLoading, refetch, isRefetching, error } = useGetStats();

    useEffect(() => {
        if (error) {
            errorToast(error instanceof Error ? error.message : 'Failed to fetch stats');
        }
    }, [error]);

    const StatRow = ({ icon, iconColor, iconBg, value, label, isLeading }: any) => (
        <View className="flex-row items-center py-3 border-b border-gray-100">
            <View className={`w-10 h-10 rounded-xl items-center justify-center ${iconBg} mr-3`}>
                <Ionicons name={icon} size={20} color={iconColor} />
            </View>
            <Text className="flex-1 font-poppins text-sm text-gray-700">{label}</Text>
            <Text className={`font-poppinsB text-xl ${isLeading ? 'text-custom-purple' : 'text-gray-800'}`}>{value}</Text>
        </View>
    );

    return (  
        <SafeAreaView className="flex-1 bg-white">
            <LinearGradient
                colors={['#7C3AED', '#EC4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute top-0 left-0 right-0 h-48"
            />
            <ScrollView 
                className='w-full h-full' 
                showsVerticalScrollIndicator={false} 
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => refetch()}/>}
            >
                <View className="px-5 pt-6 pb-4">
                    <Text className="font-poppinsB text-white text-3xl">FIFA Stats</Text>
                    <Text className="font-poppins text-white/80 text-sm mt-1">Track your victories</Text>
                </View>

                <View className="px-5 pb-6">
                    {isLoading && (
                        <View className="w-full items-center py-12 bg-white rounded-2xl" style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5}}>
                            <ActivityIndicator size="large" color='#7C3AED'/>
                            <Text className="font-poppinsM text-base mt-4 text-gray-600">Loading stats...</Text>
                        </View>
                    )}

                    {stats && !isLoading && (
                        <>
                            {/* Manzi's Card */}
                            <View className='w-full bg-white rounded-2xl p-5 mb-4' style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5}}>
                                <View className="flex-row items-center mb-5">
                                    <View className="w-12 h-12 rounded-full overflow-hidden" style={{shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3}}>
                                        <Image source={require('../assets/images/karenzi.jpg')} className="w-full h-full object-cover"/>
                                    </View>  
                                    <Text className="ml-3 font-poppinsB text-xl text-gray-800">Manzi</Text>              
                                </View>
                                <View>
                                    <StatRow 
                                        icon="football" 
                                        iconColor="#7C3AED" 
                                        iconBg="bg-purple-50"
                                        value={stats.manziStats.manziGoals}
                                        label="Goals scored"
                                        isLeading={stats.manziStats.manziGoals > stats.johnsonStats.johnsonGoals}
                                    />
                                    <StatRow 
                                        icon="trophy" 
                                        iconColor="#3B82F6" 
                                        iconBg="bg-blue-50"
                                        value={stats.manziStats.manziMatches}
                                        label="Matches won"
                                        isLeading={stats.manziStats.manziMatches > stats.johnsonStats.johnsonMatches}
                                    />
                                    <StatRow 
                                        icon="flash" 
                                        iconColor="#EC4899" 
                                        iconBg="bg-pink-50"
                                        value={stats.manziStats.manziFreekicks}
                                        label="Freekicks scored"
                                        isLeading={stats.manziStats.manziFreekicks > stats.johnsonStats.johnsonFreekicks}
                                    />
                                    <StatRow 
                                        icon="shield-checkmark" 
                                        iconColor="#10B981" 
                                        iconBg="bg-green-50"
                                        value={stats.manziStats.manziCleanSheets}
                                        label="Clean sheets"
                                        isLeading={stats.manziStats.manziCleanSheets > stats.johnsonStats.johnsonCleanSheets}
                                    />
                                    <View className="flex-row items-center py-3">
                                        <View className="w-10 h-10 rounded-xl items-center justify-center bg-indigo-50 mr-3">
                                            <Ionicons name="star" size={20} color="#6366F1" />
                                        </View>
                                        <Text className="flex-1 font-poppins text-sm text-gray-700">7+ goal matches</Text>
                                        <Text className={`font-poppinsB text-xl ${stats.manziStats.manziAbove7 > stats.johnsonStats.johnsonAbove7 ? 'text-custom-purple' : 'text-gray-800'}`}>
                                            {stats.manziStats.manziAbove7}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* Johnson's Card */}
                            <View className='w-full bg-white rounded-2xl p-5 mb-4' style={{shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5}}>
                                <View className="flex-row items-center mb-5">
                                    <View className="w-12 h-12 rounded-full overflow-hidden" style={{shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3}}>
                                        <Image source={require('../assets/images/johnson.png')} className="w-full h-full object-cover"/>
                                    </View>  
                                    <Text className="ml-3 font-poppinsB text-xl text-gray-800">Johnson</Text>              
                                </View>
                                <View>
                                    <StatRow 
                                        icon="football" 
                                        iconColor="#7C3AED" 
                                        iconBg="bg-purple-50"
                                        value={stats.johnsonStats.johnsonGoals}
                                        label="Goals scored"
                                        isLeading={stats.johnsonStats.johnsonGoals > stats.manziStats.manziGoals}
                                    />
                                    <StatRow 
                                        icon="trophy" 
                                        iconColor="#3B82F6" 
                                        iconBg="bg-blue-50"
                                        value={stats.johnsonStats.johnsonMatches}
                                        label="Matches won"
                                        isLeading={stats.johnsonStats.johnsonMatches > stats.manziStats.manziMatches}
                                    />
                                    <StatRow 
                                        icon="flash" 
                                        iconColor="#EC4899" 
                                        iconBg="bg-pink-50"
                                        value={stats.johnsonStats.johnsonFreekicks}
                                        label="Freekicks scored"
                                        isLeading={stats.johnsonStats.johnsonFreekicks > stats.manziStats.manziFreekicks}
                                    />
                                    <StatRow 
                                        icon="shield-checkmark" 
                                        iconColor="#10B981" 
                                        iconBg="bg-green-50"
                                        value={stats.johnsonStats.johnsonCleanSheets}
                                        label="Clean sheets"
                                        isLeading={stats.johnsonStats.johnsonCleanSheets > stats.manziStats.manziCleanSheets}
                                    />
                                    <View className="flex-row items-center py-3">
                                        <View className="w-10 h-10 rounded-xl items-center justify-center bg-indigo-50 mr-3">
                                            <Ionicons name="star" size={20} color="#6366F1" />
                                        </View>
                                        <Text className="flex-1 font-poppins text-sm text-gray-700">7+ goal matches</Text>
                                        <Text className={`font-poppinsB text-xl ${stats.johnsonStats.johnsonAbove7 > stats.manziStats.manziAbove7 ? 'text-custom-purple' : 'text-gray-800'}`}>
                                            {stats.johnsonStats.johnsonAbove7}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Index;
