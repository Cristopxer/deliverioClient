import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  formatCurrency,
  getSupportedCurrencies,
} from "react-native-format-currency";
import { urlFor } from "../sanity";
import { useState } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPress, setIsPress] = useState(false);
  const priceFormatted = formatCurrency({ amount: price, code: "USD" });

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPress(!isPress)}
        className={`bg-white border p-4 border-gray-200 ${
          isPress && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">{priceFormatted[0]}</Text>
          </View>
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#F3F3F4",
              }}
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPress && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity>
              <MinusCircleIcon size={40} color="#00CCBB" />
            </TouchableOpacity>
            <Text>0</Text>
            <TouchableOpacity>
              <PlusCircleIcon size={40} color="#00CCBB" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;