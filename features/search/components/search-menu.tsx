import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useLanguage } from "@/context/language-context";
import { useSessionContext } from "@/context/session-context";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { useOptionsContext } from "../context/options-context";
import { useSearchContext } from "../context/search-context";
import { CustomDropdown } from "./custom-dropdown";
import { CustomSwitch } from "./custom-switch";
import { SearchButton } from "./search-button";
import { SearchTrigger } from "./search-trigger";

export type SearchMenuProps = {
  style?: object;
};

export function SearchMenu({ style }: SearchMenuProps) {
  const { articleDelimiter, setArticleDelimiter } = useSearchContext();
  const { isLoading } = useSessionContext();
  const { tagOptions } = useOptionsContext();
  const switchOpts = ["City", "Country"];
  const {t} = useLanguage();

  const onSwitchChange = useCallback((index: number) => {
    if (index === 0) {
      setArticleDelimiter({
        ...articleDelimiter,
        type: "city",
        location: "",
        mode: "",
      });
    } else {
      setArticleDelimiter({
        ...articleDelimiter,
        type: "country",
        location: "",
        mode: "",
      });
    }
  }, [articleDelimiter, setArticleDelimiter]);

  const onDropdownChange = useCallback((selectedIndex: number) => {
    setArticleDelimiter({
      ...articleDelimiter,
      mode: tagOptions[articleDelimiter.type][selectedIndex].internalText,
    });
  }, [articleDelimiter, setArticleDelimiter, tagOptions]);

  const router = useRouter();

  const onPressSearch = useCallback(() => {
    if (articleDelimiter.location === "" || articleDelimiter.mode === "") return;
    router.push("/article");
  }, [articleDelimiter, router]);

  return (
    <ThemedView lightColor={Colors.light.primary} darkColor={Colors.dark.primary} style={[styles.container, style]}>
      <CustomSwitch callback={onSwitchChange} values={switchOpts} style={styles.switch} />
      <SearchTrigger searchedTerm={articleDelimiter.location} style={styles.trigger} />
      <CustomDropdown 
      callback={onDropdownChange}
      style={styles.dropdown}
      data={articleDelimiter.type === "city" ? tagOptions.city : tagOptions.country}
        labelField={"displayText"}
        valueField={"internalText"}
        onChange={(item) => {}}
      />
      {isLoading ? <ThemedText type="menu" style={styles.loadingText} lightColor={Colors.light.textSecondary}>{t("text.loading")}</ThemedText> : <SearchButton onPress={onPressSearch} />}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 0,
    elevation: 5,
  },
  dropdown: {
    margin: 16,
  },
  switch: {
    marginBottom: 16,
  },
  trigger: {
    marginBottom: 16,
  },
  loadingText: {
    textAlign: "center",
    margin: 14
  },
});
