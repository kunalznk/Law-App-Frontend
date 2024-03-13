import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { View } from 'react-native';


const Rating = ( { rating }) => {
    return <View style={{ flexDirection: "row", gap: 5, alignItems:"center" }}>
    {new Array(Math.floor(rating)).fill(1).map(() => 
    <AntDesign name="star" size={12} color="#FFC000" />
    )}
    {new Array(Math.ceil(5 - rating)).fill(1).map(() => 
    <FontAwesome name="star-half-empty" size={12} color="#FFC000" />
    )}
    </View>  
}

export default Rating