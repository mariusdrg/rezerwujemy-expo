import { Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Index() {

  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text onPress={() => changeLanguage('pl-PL')}>Change to polish</Text>
      <Text onPress={() => changeLanguage('en-US')}>Change to english</Text>

      <Text>{t('home.welcome')}</Text>
    </View>
  );
}
