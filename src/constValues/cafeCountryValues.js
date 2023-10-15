export const countryCroatia = {
    name: "Croatia",
    nameLocale: "Hrvatska",
    code: "CRO",
    codeLocale: "HR",
    currency: "€",
    timeZone: "Europe/Zagreb",
    timeZoneLocale: "hr-HR",
}

export const countryGreatBritain = {
    name: "Great Britain",
    nameLocale: "Great Britain",
    code: "GB",
    codeLocale: "GB",
    currency: "£",
    timeZone: "Europe/London",
    timeZoneLocale: "en-GB",
}

export const countriesMap = new Map([
    [countryCroatia.codeLocale, countryCroatia],
    [countryGreatBritain.codeLocale, countryGreatBritain],
  ]);