import { useLanguage } from "@/contexts/LanguageContext";
import enTranslations from "@/locales/en.json";
import esTranslations from "@/locales/es.json";

type TranslationKey = string;
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type Translations = typeof enTranslations;
type TranslationKeys = NestedKeyOf<Translations>;

export const useTranslation = () => {
  const { language } = useLanguage();
  const translations = language === "es" ? esTranslations : enTranslations;

  const t = (key: TranslationKeys): string => {
    const keys = key.split(".");
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k as keyof typeof value];
      } else {
        console.warn(`Translation key "${key}" not found`);
        return key;
      }
    }
    
    return typeof value === "string" ? value : key;
  };

  return { t, language };
};
