import React from "react";
export const LanguageSelect = ({ selected, handleSelectedLanguage }) => {
  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "zh-CN", label: "Chinese Simplified" },
    { value: "bn", label: "Bengali" },
    { value: "hi", label: "Hindi" },
    { value: "ko", label: "Korean" },
    { value: "ar", label: "Arabic" },
    { value: "ja", label: "Japanese" },
    { value: "ht", label: "Hatian Creole" },
    { value: "tl", label: "Filipino" },
    { value: "ur", label: "Urdu" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "vi", label: "Vietnamese" },
  ];
  return (
    <div className="language_select">
      <label>
        Native Language:
        <select value={selected} onChange={handleSelectedLanguage} required>
          <option value="">Select a language</option>
          {languages.map((language) => (
            <option value={language.value} key={language.value}>
              {language.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
