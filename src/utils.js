const TRANSLATION_API = process.env.REACT_APP_TRANSLATE_API_KEY;

export const translateSite = async (siteContent, userNativeLanguage, originalLanguage = "en") => {
    try {
        const response = await fetch('https://api.lecto.ai/v1/translate/json', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": TRANSLATION_API,
          },
          body: JSON.stringify({
            from: originalLanguage,
            json: JSON.stringify(siteContent),
            to: [ userNativeLanguage ]
          })
        })
        const data = await response.json()
        return JSON.parse(data.translations[0].translated[0])
      } catch (err) {
        console.error(err)
      }
}

export const getSiteTranslations = (page) => {
  const translations = localStorage.getItem('siteTranslations')
  if (translations) {
    // return JSON.parse(localStorage.getItem('siteTranslations'))[page]
  } else {
    return null
  }
}
