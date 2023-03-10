import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import {
  ArrowLeftCircleIcon,
  ChevronRightIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon, StarIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import BasketIcon from "../components/BasketIcon";
import DishRow from "../components/DishRow";
import { selectBasketItems } from "../features/basketSlice";
import { setRestaurant } from "../features/restaurantSlice";
import { urlFor } from "../sanity";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const basketItems = useSelector(selectBasketItems);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const {
    params: {
      id,
      imgUrl,
      title,
      ratting,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating: ratting,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, [dispatch]);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View>
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="w-full h-56 bg-white-300 p-4"
          />
          <TouchableOpacity className="absolute top-14 left-5 p-1 bg-gray-100 rounded-full">
            <ArrowLeftCircleIcon
              size={30}
              color="#00CCBB"
              onPress={navigation.goBack}
            />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={22} />
                <Text className="text-gray-500 text-xs ">
                  <Text className="text-green-500">{ratting}</Text>. {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <MapPinIcon color="gray" opacity={0.4} size={22} />
                <Text className="text-gray-500 text-xs ">
                  Nearby . {address.slice(0, 20)}
                </Text>
              </View>
            </View>

            <Text className="text-gray-400 mt-2 pb-4">{short_description}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300 ">
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
            <Text className=" pl-2 flex-1 text-md font-bold">
              Have a food allergy ?
            </Text>
            <ChevronRightIcon color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View className={basketItems.length === 0 ? "" : "pb-28"}>
          <Text className="px-4 pt-4 mb-3 font-bold text-xl">Menu</Text>

          {/* Dish rows */}
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
