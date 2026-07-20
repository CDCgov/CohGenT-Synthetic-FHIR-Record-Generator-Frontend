export const SYSTEM_LIST: { label: string, uri: string | null }[] = [
  {label: "CPT", uri: "http://www.ama-assn.org/go/cpt"},
  {label: "ICD 10", uri: "http://hl7.org/fhir/sid/icd-10"},
  {label: "ICD 10 CM  (U.S.)", uri: "http://hl7.org/fhir/sid/icd-10-cm"},
  {label: "ICD 10 PCS (U.S.)", uri: "http://hl7.org/fhir/sid/icd-10-pcs"},
  {label: "LOINC", uri: "http://loinc.org"},
  {label: "NDC", uri: "http://hl7.org/fhir/sid/ndc"},
  {label: "RxNorm", uri: "http://www.nlm.nih.gov/research/umls/rxnorm"},
  {label: "SNOMED CT", uri: "http://snomed.info/sct"},
  {label: "Other", uri: "other"},
];

export const  TIME_PERIOD_UNIT_LIST: { display: string, value: string }[] = [
  {display: 'Day(s)', value: 'days'},
  {display: 'Week(s)', value: 'weeks'},
  {display: 'Month(s)', value: 'months'},
  {display: 'Year(s)', value: 'years'},
];

export const US_STATES_LIST = [
  {
    "name": "Alabama",
    "abbreviation": "AL"
  },
  {
    "name": "Alaska",
    "abbreviation": "AK"
  },
  {
    "name": "American Samoa",
    "abbreviation": "AS"
  },
  {
    "name": "Arizona",
    "abbreviation": "AZ"
  },
  {
    "name": "Arkansas",
    "abbreviation": "AR"
  },
  {
    "name": "California",
    "abbreviation": "CA"
  },
  {
    "name": "Colorado",
    "abbreviation": "CO"
  },
  {
    "name": "Connecticut",
    "abbreviation": "CT"
  },
  {
    "name": "Delaware",
    "abbreviation": "DE"
  },
  {
    "name": "District of Columbia",
    "abbreviation": "DC"
  },
  {
    "name": "Federated States of Micronesia",
    "abbreviation": "FM"
  },
  {
    "name": "Florida",
    "abbreviation": "FL"
  },
  {
    "name": "Georgia",
    "abbreviation": "GA"
  },
  {
    "name": "Guam",
    "abbreviation": "GU"
  },
  {
    "name": "Hawaii",
    "abbreviation": "HI"
  },
  {
    "name": "Idaho",
    "abbreviation": "ID"
  },
  {
    "name": "Illinois",
    "abbreviation": "IL"
  },
  {
    "name": "Indiana",
    "abbreviation": "IN"
  },
  {
    "name": "Iowa",
    "abbreviation": "IA"
  },
  {
    "name": "Kansas",
    "abbreviation": "KS"
  },
  {
    "name": "Kentucky",
    "abbreviation": "KY"
  },
  {
    "name": "Louisiana",
    "abbreviation": "LA"
  },
  {
    "name": "Maine",
    "abbreviation": "ME"
  },
  {
    "name": "Marshall Islands",
    "abbreviation": "MH"
  },
  {
    "name": "Maryland",
    "abbreviation": "MD"
  },
  {
    "name": "Massachusetts",
    "abbreviation": "MA"
  },
  {
    "name": "Michigan",
    "abbreviation": "MI"
  },
  {
    "name": "Minnesota",
    "abbreviation": "MN"
  },
  {
    "name": "Mississippi",
    "abbreviation": "MS"
  },
  {
    "name": "Missouri",
    "abbreviation": "MO"
  },
  {
    "name": "Montana",
    "abbreviation": "MT"
  },
  {
    "name": "Nebraska",
    "abbreviation": "NE"
  },
  {
    "name": "Nevada",
    "abbreviation": "NV"
  },
  {
    "name": "New Hampshire",
    "abbreviation": "NH"
  },
  {
    "name": "New Jersey",
    "abbreviation": "NJ"
  },
  {
    "name": "New Mexico",
    "abbreviation": "NM"
  },
  {
    "name": "New York",
    "abbreviation": "NY"
  },
  {
    "name": "North Carolina",
    "abbreviation": "NC"
  },
  {
    "name": "North Dakota",
    "abbreviation": "ND"
  },
  {
    "name": "Northern Mariana Islands",
    "abbreviation": "MP"
  },
  {
    "name": "Ohio",
    "abbreviation": "OH"
  },
  {
    "name": "Oklahoma",
    "abbreviation": "OK"
  },
  {
    "name": "Oregon",
    "abbreviation": "OR"
  },
  {
    "name": "Palau",
    "abbreviation": "PW"
  },
  {
    "name": "Pennsylvania",
    "abbreviation": "PA"
  },
  {
    "name": "Puerto Rico",
    "abbreviation": "PR"
  },
  {
    "name": "Rhode Island",
    "abbreviation": "RI"
  },
  {
    "name": "South Carolina",
    "abbreviation": "SC"
  },
  {
    "name": "South Dakota",
    "abbreviation": "SD"
  },
  {
    "name": "Tennessee",
    "abbreviation": "TN"
  },
  {
    "name": "Texas",
    "abbreviation": "TX"
  },
  {
    "name": "Utah",
    "abbreviation": "UT"
  },
  {
    "name": "Vermont",
    "abbreviation": "VT"
  },
  {
    "name": "Virgin Islands",
    "abbreviation": "VI"
  },
  {
    "name": "Virginia",
    "abbreviation": "VA"
  },
  {
    "name": "Washington",
    "abbreviation": "WA"
  },
  {
    "name": "West Virginia",
    "abbreviation": "WV"
  },
  {
    "name": "Wisconsin",
    "abbreviation": "WI"
  },
  {
    "name": "Wyoming",
    "abbreviation": "WY"
  },
  {
    "name": "Armed Forces Europe, the Middle East, and Canada",
    "abbreviation": "AE"
  },
  {
    "name": "Armed Forces Pacific",
    "abbreviation": "AP"
  },
  {
    "name": "Armed Forces Americas (except Canada)",
    "abbreviation": "AA"
  }
]

export const UNITS_OF_MEASURE = [
    {
      "System": "http://unitsofmeasure.org",
      "Code": "%",
      "Display": "%",
      "Display (English)": "percent"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "%/100",
      "Display": "%/100",
      "Display (English)": "(percent) / 100"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "%[slope]",
      "Display": "%[slope]",
      "Display (English)": "percent of slope"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/(12.h)",
      "Display": "/(12.h)",
      "Display (English)": "per 12 * hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/(2.h)",
      "Display": "/(2.h)",
      "Display (English)": "/ 2 * (hour)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/10*10",
      "Display": "/10*10",
      "Display (English)": "PerTenGiga"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/10*12",
      "Display": "/10*12",
      "Display (English)": "PerTrillion"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/10*3",
      "Display": "/10*3",
      "Display (English)": "per thousand"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/10*4",
      "Display": "/10*4",
      "Display (English)": "/ (the number ten for arbitrary powers ^ 4)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/10*6",
      "Display": "/10*6",
      "Display (English)": "PerMillion"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/10*9",
      "Display": "/10*9",
      "Display (English)": "PerBillion"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/100",
      "Display": "/100",
      "Display (English)": "per 100"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/100.g",
      "Display": "/100.g",
      "Display (English)": "/ 100 * (gram)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/L",
      "Display": "/L",
      "Display (English)": "per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/U",
      "Display": "/U",
      "Display (English)": "per enzyme unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/[HPF]",
      "Display": "/[HPF]",
      "Display (English)": "per high power field"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/[IU]",
      "Display": "/[IU]",
      "Display (English)": "per international unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/[LPF]",
      "Display": "/[LPF]",
      "Display (English)": "per low power field"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/[arb'U]",
      "Display": "/[arb'U]",
      "Display (English)": "per arbitrary unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/[iU]",
      "Display": "/[iU]",
      "Display (English)": "per international unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/a",
      "Display": "/a",
      "Display (English)": "/ year"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/cm[H2O]",
      "Display": "/cm[H2O]",
      "Display (English)": "per centimeter of water"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/d",
      "Display": "/d",
      "Display (English)": "per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/dL",
      "Display": "/dL",
      "Display (English)": "per deciliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/g",
      "Display": "/g",
      "Display (English)": "per gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/h",
      "Display": "/h",
      "Display (English)": "per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/kg",
      "Display": "/kg",
      "Display (English)": "per kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/m2",
      "Display": "/m2",
      "Display (English)": "per square meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/m3",
      "Display": "/m3",
      "Display (English)": "per cubic meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/mL",
      "Display": "/mL",
      "Display (English)": "per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/mg",
      "Display": "/mg",
      "Display (English)": "per milligram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/min",
      "Display": "/min",
      "Display (English)": "per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/min/10*3",
      "Display": "/min/10*3",
      "Display (English)": "/ (minute) / (the number ten for arbitrary powers ^ 3)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/mm",
      "Display": "/mm",
      "Display (English)": "per millimeter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/mm3",
      "Display": "/mm3",
      "Display (English)": "per cubic millimeter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/mmol",
      "Display": "/mmol",
      "Display (English)": "per millimole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/mo",
      "Display": "/mo",
      "Display (English)": "per month"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/s",
      "Display": "/s",
      "Display (English)": "per second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/uL",
      "Display": "/uL",
      "Display (English)": "per microliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/ug",
      "Display": "/ug",
      "Display (English)": "per microgram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "/wk",
      "Display": "/wk",
      "Display (English)": "per week"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "1",
      "Display": "1",
      "Display (English)": "1*"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "1/d",
      "Display": "1/d",
      "Display (English)": "one per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "1/min",
      "Display": "1/min",
      "Display (English)": "one per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*",
      "Display": "10*",
      "Display (English)": "the number ten for arbitrary powers"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*-3",
      "Display": "10*-3",
      "Display (English)": "(the number ten for arbitrary powers ^ -3)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*-6",
      "Display": "10*-6",
      "Display (English)": "(the number ten for arbitrary powers ^ -6)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*12/L",
      "Display": "10*12/L",
      "Display (English)": "trillion per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*3",
      "Display": "10*3",
      "Display (English)": "Thousand"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*3.U",
      "Display": "10*3.U",
      "Display (English)": "Thousand Per * Unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*3/L",
      "Display": "10*3/L",
      "Display (English)": "Thousand Per Liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*3/mL",
      "Display": "10*3/mL",
      "Display (English)": "Thousand Per MilliLiter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*3/uL",
      "Display": "10*3/uL",
      "Display (English)": "Thousands Per MicroLiter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*4/uL",
      "Display": "10*4/uL",
      "Display (English)": "10 thousand per microliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*5",
      "Display": "10*5",
      "Display (English)": "OneHundredThousand"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*6",
      "Display": "10*6",
      "Display (English)": "Million"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*6.U",
      "Display": "10*6.U",
      "Display (English)": "(the number ten for arbitrary powers ^ 6) * Unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*6.[CFU]/L",
      "Display": "10*6.[CFU]/L",
      "Display (English)": "million colony forming unit per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*6.[IU]",
      "Display": "10*6.[IU]",
      "Display (English)": "million international unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*6.[iU]",
      "Display": "10*6.[iU]",
      "Display (English)": "MillionInternationalUnit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*6.eq/mL",
      "Display": "10*6.eq/mL",
      "Display (English)": "MillionEquivalentsPerMilliLiter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*6/(24.h)",
      "Display": "10*6/(24.h)",
      "Display (English)": "million per 24 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*6/L",
      "Display": "10*6/L",
      "Display (English)": "million per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*6/kg",
      "Display": "10*6/kg",
      "Display (English)": "million per kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*6/mL",
      "Display": "10*6/mL",
      "Display (English)": "million per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*6/mm3",
      "Display": "10*6/mm3",
      "Display (English)": "(the number ten for arbitrary powers ^ 6) / (millimeter ^ 3)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*6/uL",
      "Display": "10*6/uL",
      "Display (English)": "million per microliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*8",
      "Display": "10*8",
      "Display (English)": "TenToEighth"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*9/L",
      "Display": "10*9/L",
      "Display (English)": "billion per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*9/mL",
      "Display": "10*9/mL",
      "Display (English)": "billion per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10*9/uL",
      "Display": "10*9/uL",
      "Display (English)": "billion per microliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10.L/(min.m2)",
      "Display": "10.L/(min.m2)",
      "Display (English)": "10 liter per minute per square meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10.L/min",
      "Display": "10.L/min",
      "Display (English)": "10 liter per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10.uN.s/(cm.m2)",
      "Display": "10.uN.s/(cm.m2)",
      "Display (English)": "10 * microNewton * second / centimeter * (meter ^ 2)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10.uN.s/(cm5.m2)",
      "Display": "10.uN.s/(cm5.m2)",
      "Display (English)": "10 micronewton second per centimeter to the fifth power per square meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10.uN.s/cm",
      "Display": "10.uN.s/cm",
      "Display (English)": "10 * microNewton * second / centimeter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10.uN.s/cm2",
      "Display": "10.uN.s/cm2",
      "Display (English)": "10 * microNewton * second / (centimeter ^ 2)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "10^",
      "Display": "10^",
      "Display (English)": "the number ten for arbitrary powers"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "24.h",
      "Display": "24.h",
      "Display (English)": "24 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "A",
      "Display": "A",
      "Display (English)": "Ampère"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "A/m",
      "Display": "A/m",
      "Display (English)": "Ampère / meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "AU",
      "Display": "AU",
      "Display (English)": "astronomic unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Ao",
      "Display": "Ao",
      "Display (English)": "Ångström"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "B",
      "Display": "B",
      "Display (English)": "bel"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "B[SPL]",
      "Display": "B[SPL]",
      "Display (English)": "bel sound pressure"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "B[V]",
      "Display": "B[V]",
      "Display (English)": "bel volt"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "B[W]",
      "Display": "B[W]",
      "Display (English)": "bel watt"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "B[kW]",
      "Display": "B[kW]",
      "Display (English)": "bel kilowatt"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "B[mV]",
      "Display": "B[mV]",
      "Display (English)": "bel millivolt"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "B[uV]",
      "Display": "B[uV]",
      "Display (English)": "bel microvolt"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Bd",
      "Display": "Bd",
      "Display (English)": "baud"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Bi",
      "Display": "Bi",
      "Display (English)": "Biot"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Bq",
      "Display": "Bq",
      "Display (English)": "Becquerel"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "By",
      "Display": "By",
      "Display (English)": "byte"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "C",
      "Display": "C",
      "Display (English)": "Coulomb"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Cel",
      "Display": "Cel",
      "Display (English)": "degree Celsius"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Ci",
      "Display": "Ci",
      "Display (English)": "CURIE"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "F",
      "Display": "F",
      "Display (English)": "Farad"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "G",
      "Display": "G",
      "Display (English)": "Gauss"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "GBq",
      "Display": "GBq",
      "Display (English)": "gigaBecquerel"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Gal",
      "Display": "Gal",
      "Display (English)": "(Gal)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Gb",
      "Display": "Gb",
      "Display (English)": "Gilbert"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Gy",
      "Display": "Gy",
      "Display (English)": "Gray"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "H",
      "Display": "H",
      "Display (English)": "Henry"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Hz",
      "Display": "Hz",
      "Display (English)": "Hertz"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "J",
      "Display": "J",
      "Display (English)": "joule"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "J/L",
      "Display": "J/L",
      "Display (English)": "joule per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "K",
      "Display": "K",
      "Display (English)": "Kelvin"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "K/W",
      "Display": "K/W",
      "Display (English)": "Kelvin / Watt"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Ky",
      "Display": "Ky",
      "Display (English)": "Kayser"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "L",
      "Display": "L",
      "Display (English)": "liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "L.s2/s",
      "Display": "L.s2/s",
      "Display (English)": "liter * (second ^ 2) / second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "L/(24.h)",
      "Display": "L/(24.h)",
      "Display (English)": "liter per 24 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "L/(8.h)",
      "Display": "L/(8.h)",
      "Display (English)": "liter per 8 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "L/(min.m2)",
      "Display": "L/(min.m2)",
      "Display (English)": "liter per minute per square meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "L/L",
      "Display": "L/L",
      "Display (English)": "liter per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "L/d",
      "Display": "L/d",
      "Display (English)": "liter per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "L/h",
      "Display": "L/h",
      "Display (English)": "liter per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "L/kg",
      "Display": "L/kg",
      "Display (English)": "liter per kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "L/min",
      "Display": "L/min",
      "Display (English)": "liter per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "L/s",
      "Display": "L/s",
      "Display (English)": "liter / second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "L/s/s2",
      "Display": "L/s/s2",
      "Display (English)": "liter per second per square second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Lmb",
      "Display": "Lmb",
      "Display (English)": "Lambert"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "MBq",
      "Display": "MBq",
      "Display (English)": "megaBecquerel"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Ms",
      "Display": "Ms",
      "Display (English)": "megasecond"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Mx",
      "Display": "Mx",
      "Display (English)": "Maxwell"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "N",
      "Display": "N",
      "Display (English)": "Newton"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "N.cm",
      "Display": "N.cm",
      "Display (English)": "Newton centimeter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "N.s",
      "Display": "N.s",
      "Display (English)": "Newton second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Np",
      "Display": "Np",
      "Display (English)": "neper"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Oe",
      "Display": "Oe",
      "Display (English)": "Oersted"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Ohm",
      "Display": "Ohm",
      "Display (English)": "(ohm)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Ohm.m",
      "Display": "Ohm.m",
      "Display (English)": "Ohm meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "P",
      "Display": "P",
      "Display (English)": "Poise"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Pa",
      "Display": "Pa",
      "Display (English)": "Pascal"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "R",
      "Display": "R",
      "Display (English)": "Roentgen"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "RAD",
      "Display": "RAD",
      "Display (English)": "radiation absorbed dose"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "REM",
      "Display": "REM",
      "Display (English)": "radiation equivalent man"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "S",
      "Display": "S",
      "Display (English)": "Siemens"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "St",
      "Display": "St",
      "Display (English)": "Stokes"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Sv",
      "Display": "Sv",
      "Display (English)": "Sievert"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "T",
      "Display": "T",
      "Display (English)": "Tesla"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U",
      "Display": "U",
      "Display (English)": "enzyme Unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/(1.h)",
      "Display": "U/(1.h)",
      "Display (English)": "enzyme Unit per 1 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/(10.g)",
      "Display": "U/(10.g)",
      "Display (English)": "(Unit) / 10 * (gram)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/(12.h)",
      "Display": "U/(12.h)",
      "Display (English)": "enzyme unit per 12 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/(18.h)",
      "Display": "U/(18.h)",
      "Display (English)": "enzyme Unit per 18 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/(2.h)",
      "Display": "U/(2.h)",
      "Display (English)": "enzyme unit per 2 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/(24.h)",
      "Display": "U/(24.h)",
      "Display (English)": "enzyme unit per 24 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/10",
      "Display": "U/10",
      "Display (English)": "enzyme unit per 10"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/10*10",
      "Display": "U/10*10",
      "Display (English)": "enzyme unit per 10 billion"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/10*12",
      "Display": "U/10*12",
      "Display (English)": "enzyme unit per trillion"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/10*6",
      "Display": "U/10*6",
      "Display (English)": "enzyme unit per million"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/10*9",
      "Display": "U/10*9",
      "Display (English)": "enzyme unit per billion"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/L",
      "Display": "U/L",
      "Display (English)": "enzyme unit per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/d",
      "Display": "U/d",
      "Display (English)": "enzyme unit per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/dL",
      "Display": "U/dL",
      "Display (English)": "enzyme unit per deciliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/g",
      "Display": "U/g",
      "Display (English)": "enzyme unit per gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/h",
      "Display": "U/h",
      "Display (English)": "enzyme unit per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/kg",
      "Display": "U/kg",
      "Display (English)": "(Unit) / (kilogram)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/kg/h",
      "Display": "U/kg/h",
      "Display (English)": "Unit / kilogram / hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/mL",
      "Display": "U/mL",
      "Display (English)": "enzyme unit per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/min",
      "Display": "U/min",
      "Display (English)": "enzyme unit per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/mmol",
      "Display": "U/mmol",
      "Display (English)": "(Unit) / (millimole)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/mol",
      "Display": "U/mol",
      "Display (English)": "enzyme Unit per mole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/s",
      "Display": "U/s",
      "Display (English)": "enzyme unit per second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "U/umol",
      "Display": "U/umol",
      "Display (English)": "enzyme Unit per micromole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "V",
      "Display": "V",
      "Display (English)": "volt"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "W",
      "Display": "W",
      "Display (English)": "Watt"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "Wb",
      "Display": "Wb",
      "Display (English)": "Weber"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[APL'U]",
      "Display": "[APL'U]",
      "Display (English)": "IgA anticardiolipin unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[APL'U]/mL",
      "Display": "[APL'U]/mL",
      "Display (English)": "IgA anticardiolipin unit per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[AU]",
      "Display": "[AU]",
      "Display (English)": "allergy unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[Amb'a'1'U]",
      "Display": "[Amb'a'1'U]",
      "Display (English)": "Amb a 1 units"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[BAU]",
      "Display": "[BAU]",
      "Display (English)": "bioequivalent allergen unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[Btu]",
      "Display": "[Btu]",
      "Display (English)": "British thermal unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[Btu_39]",
      "Display": "[Btu_39]",
      "Display (English)": "British thermal unit at 39 °F"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[Btu_59]",
      "Display": "[Btu_59]",
      "Display (English)": "British thermal unit at 59 °F"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[Btu_60]",
      "Display": "[Btu_60]",
      "Display (English)": "British thermal unit at 60 °F"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[Btu_IT]",
      "Display": "[Btu_IT]",
      "Display (English)": "international table British thermal unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[Btu_m]",
      "Display": "[Btu_m]",
      "Display (English)": "mean British thermal unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[Btu_th]",
      "Display": "[Btu_th]",
      "Display (English)": "thermochemical British thermal unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[CCID_50]",
      "Display": "[CCID_50]",
      "Display (English)": "CELL CULTURE INFECTIOUS DOSE 50%"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[CFU]",
      "Display": "[CFU]",
      "Display (English)": "colony forming unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[CFU]/L",
      "Display": "[CFU]/L",
      "Display (English)": "colony forming unit per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[CFU]/mL",
      "Display": "[CFU]/mL",
      "Display (English)": "colony forming unit per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[Cal]",
      "Display": "[Cal]",
      "Display (English)": "nutrition label Calories"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[Ch]",
      "Display": "[Ch]",
      "Display (English)": "French (catheter gauge)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[D'ag'U]",
      "Display": "[D'ag'U]",
      "Display (English)": "D-ANTIGEN UNITS"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[FFU]",
      "Display": "[FFU]",
      "Display (English)": "FOCUS-FORMING UNITS"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[GPL'U]",
      "Display": "[GPL'U]",
      "Display (English)": "IgG anticardiolipin unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[GPL'U]/mL",
      "Display": "[GPL'U]/mL",
      "Display (English)": "IgG anticardiolipin unit per milliliter**"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[G]",
      "Display": "[G]",
      "Display (English)": "Newtonian constant of gravitation"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[HPF]",
      "Display": "[HPF]",
      "Display (English)": "high power field"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[HP]",
      "Display": "[HP]",
      "Display (English)": "horsepower"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[IU]",
      "Display": "[IU]",
      "Display (English)": "international unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[IU]/(2.h)",
      "Display": "[IU]/(2.h)",
      "Display (English)": "international unit per 2 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[IU]/(24.h)",
      "Display": "[IU]/(24.h)",
      "Display (English)": "international unit per 24 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[IU]/10*9",
      "Display": "[IU]/10*9",
      "Display (English)": "(international unit) / (the number ten for arbitrary powers ^ 9)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[IU]/L",
      "Display": "[IU]/L",
      "Display (English)": "international unit per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[IU]/d",
      "Display": "[IU]/d",
      "Display (English)": "international unit per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[IU]/dL",
      "Display": "[IU]/dL",
      "Display (English)": "international unit per deciliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[IU]/g",
      "Display": "[IU]/g",
      "Display (English)": "international unit per gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[IU]/h",
      "Display": "[IU]/h",
      "Display (English)": "international unit per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[IU]/kg",
      "Display": "[IU]/kg",
      "Display (English)": "international unit per kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[IU]/kg/d",
      "Display": "[IU]/kg/d",
      "Display (English)": "international unit per kilogram per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[IU]/mL",
      "Display": "[IU]/mL",
      "Display (English)": "international unit per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[IU]/min",
      "Display": "[IU]/min",
      "Display (English)": "international unit per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[LPF]",
      "Display": "[LPF]",
      "Display (English)": "low power field"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[Lf]",
      "Display": "[Lf]",
      "Display (English)": "LIMIT OF FLOCCULATION"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[MET]",
      "Display": "[MET]",
      "Display (English)": "metabolic equivalent"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[MPL'U]",
      "Display": "[MPL'U]",
      "Display (English)": "IgM anticardiolipin unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[MPL'U]/mL",
      "Display": "[MPL'U]/mL",
      "Display (English)": "IgM anticardiolipin unit per milliliter**"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[PFU]",
      "Display": "[PFU]",
      "Display (English)": "PLAQUE-FORMING UNITS"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[PNU]",
      "Display": "[PNU]",
      "Display (English)": "PROTEIN NITROGEN UNITS"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[PRU]",
      "Display": "[PRU]",
      "Display (English)": "peripheral vascular resistance unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[S]",
      "Display": "[S]",
      "Display (English)": "Svedberg unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[TCID_50]",
      "Display": "[TCID_50]",
      "Display (English)": "TISSUE CULTURE INFECTIOUS DOSE 50%"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[USP'U]",
      "Display": "[USP'U]",
      "Display (English)": "UNITED STATES PHARMACOPEIA UNIT"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[acr_br]",
      "Display": "[acr_br]",
      "Display (English)": "acre"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[acr_us]",
      "Display": "[acr_us]",
      "Display (English)": "acre"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[arb'U]",
      "Display": "[arb'U]",
      "Display (English)": "arbitrary unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[arb'U]/L",
      "Display": "[arb'U]/L",
      "Display (English)": "arbitary unit / liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[arb'U]/mL",
      "Display": "[arb'U]/mL",
      "Display (English)": "arbitrary unit per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[bbl_us]",
      "Display": "[bbl_us]",
      "Display (English)": "barrel"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[bdsk'U]",
      "Display": "[bdsk'U]",
      "Display (English)": "Bodansky unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[beth'U]",
      "Display": "[beth'U]",
      "Display (English)": "Bethesda unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[bf_i]",
      "Display": "[bf_i]",
      "Display (English)": "board foot"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[bu_br]",
      "Display": "[bu_br]",
      "Display (English)": "bushel"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[bu_us]",
      "Display": "[bu_us]",
      "Display (English)": "bushel"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[c]",
      "Display": "[c]",
      "Display (English)": "velocity of light"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[car_Au]",
      "Display": "[car_Au]",
      "Display (English)": "carat of gold alloys"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[car_m]",
      "Display": "[car_m]",
      "Display (English)": "metric carat"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[cft_i]",
      "Display": "[cft_i]",
      "Display (English)": "cubic foot"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[ch_br]",
      "Display": "[ch_br]",
      "Display (English)": "Gunter's chain"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[ch_us]",
      "Display": "[ch_us]",
      "Display (English)": "Gunter's chain Surveyor's chain"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[cicero]",
      "Display": "[cicero]",
      "Display (English)": "cicero Didot's pica"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[cin_i]",
      "Display": "[cin_i]",
      "Display (English)": "cubic inch"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[cml_i]",
      "Display": "[cml_i]",
      "Display (English)": "circular mil"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[cr_i]",
      "Display": "[cr_i]",
      "Display (English)": "cord"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[crd_us]",
      "Display": "[crd_us]",
      "Display (English)": "cord"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[cup_us]",
      "Display": "[cup_us]",
      "Display (English)": "cup"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[cyd_i]",
      "Display": "[cyd_i]",
      "Display (English)": "cubic yard"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[degF]",
      "Display": "[degF]",
      "Display (English)": "degree Fahrenheit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[didot]",
      "Display": "[didot]",
      "Display (English)": "didot Didot's point"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[diop]",
      "Display": "[diop]",
      "Display (English)": "diopter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[dpt_us]",
      "Display": "[dpt_us]",
      "Display (English)": "dry pint"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[dqt_us]",
      "Display": "[dqt_us]",
      "Display (English)": "dry quart"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[dr_ap]",
      "Display": "[dr_ap]",
      "Display (English)": "dram drachm"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[dr_av]",
      "Display": "[dr_av]",
      "Display (English)": "Dram (US and British)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[drp]",
      "Display": "[drp]",
      "Display (English)": "drop"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[drp]/[HPF]",
      "Display": "[drp]/[HPF]",
      "Display (English)": "(drop) / (high power field)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[drp]/h",
      "Display": "[drp]/h",
      "Display (English)": "drop / hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[drp]/mL",
      "Display": "[drp]/mL",
      "Display (English)": "drop / milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[drp]/min",
      "Display": "[drp]/min",
      "Display (English)": "drop / minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[drp]/s",
      "Display": "[drp]/s",
      "Display (English)": "drop / second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[dye'U]",
      "Display": "[dye'U]",
      "Display (English)": "Dye unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[e]",
      "Display": "[e]",
      "Display (English)": "elementary charge"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[eps_0]",
      "Display": "[eps_0]",
      "Display (English)": "permittivity of vacuum"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[fdr_br]",
      "Display": "[fdr_br]",
      "Display (English)": "fluid dram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[fdr_us]",
      "Display": "[fdr_us]",
      "Display (English)": "fluid dram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[foz_br]",
      "Display": "[foz_br]",
      "Display (English)": "fluid ounce"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[foz_us]",
      "Display": "[foz_us]",
      "Display (English)": "fluid ounce"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[ft_br]",
      "Display": "[ft_br]",
      "Display (English)": "foot"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[ft_i]",
      "Display": "[ft_i]",
      "Display (English)": "Feet"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[ft_us]",
      "Display": "[ft_us]",
      "Display (English)": "foot"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[fth_br]",
      "Display": "[fth_br]",
      "Display (English)": "fathom"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[fth_i]",
      "Display": "[fth_i]",
      "Display (English)": "fathom"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[fth_us]",
      "Display": "[fth_us]",
      "Display (English)": "fathom"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[fur_us]",
      "Display": "[fur_us]",
      "Display (English)": "furlong"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[gal_br]",
      "Display": "[gal_br]",
      "Display (English)": "gallon"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[gal_us]",
      "Display": "[gal_us]",
      "Display (English)": "Queen Anne's wine gallon"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[gal_wi]",
      "Display": "[gal_wi]",
      "Display (English)": "historical winchester gallon"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[gil_br]",
      "Display": "[gil_br]",
      "Display (English)": "gill"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[gil_us]",
      "Display": "[gil_us]",
      "Display (English)": "gill"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[gr]",
      "Display": "[gr]",
      "Display (English)": "grain"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[h]",
      "Display": "[h]",
      "Display (English)": "Planck constant"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[hd_i]",
      "Display": "[hd_i]",
      "Display (English)": "hand"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[hnsf'U]",
      "Display": "[hnsf'U]",
      "Display (English)": "Hounsfield unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[hp_C]",
      "Display": "[hp_C]",
      "Display (English)": "HOMEOPATHIC POTENCY OF CENTESIMAL SERIES"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[hp_M]",
      "Display": "[hp_M]",
      "Display (English)": "HOMEOPATHIC POTENCY OF MILLESIMAL SERIES"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[hp_Q]",
      "Display": "[hp_Q]",
      "Display (English)": "HOMEOPATHIC POTENCY OF QUINTAMILLESIMAL SERIES"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[hp_X]",
      "Display": "[hp_X]",
      "Display (English)": "HOMEOPATHIC POTENCY OF DECIMAL SERIES"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[iU]",
      "Display": "[iU]",
      "Display (English)": "international unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[iU]/L",
      "Display": "[iU]/L",
      "Display (English)": "InternationalUnitsPerLiter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[iU]/dL",
      "Display": "[iU]/dL",
      "Display (English)": "InternationalUnitsPerDeciLiter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[iU]/g",
      "Display": "[iU]/g",
      "Display (English)": "InternationalUnitsPerGram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[iU]/kg",
      "Display": "[iU]/kg",
      "Display (English)": "InternationalUnitsPerKilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[iU]/mL",
      "Display": "[iU]/mL",
      "Display (English)": "InternationalUnitsPerMilliLiter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[in_br]",
      "Display": "[in_br]",
      "Display (English)": "inch"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[in_i'H2O]",
      "Display": "[in_i'H2O]",
      "Display (English)": "inch (international) of water"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[in_i'Hg]",
      "Display": "[in_i'Hg]",
      "Display (English)": "inch of mercury column"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[in_i]",
      "Display": "[in_i]",
      "Display (English)": "inch (international)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[in_us]",
      "Display": "[in_us]",
      "Display (English)": "inch"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[k]",
      "Display": "[k]",
      "Display (English)": "Boltzmann constant"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[ka'U]",
      "Display": "[ka'U]",
      "Display (English)": "King Armstrong unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[kn_br]",
      "Display": "[kn_br]",
      "Display (English)": "knot"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[kn_i]",
      "Display": "[kn_i]",
      "Display (English)": "knot"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[knk'U]",
      "Display": "[knk'U]",
      "Display (English)": "Kunkel unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[kp_C]",
      "Display": "[kp_C]",
      "Display (English)": "(homeopathic potency of centesimal korsakovian series)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[lb_ap]",
      "Display": "[lb_ap]",
      "Display (English)": "pound"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[lb_av]",
      "Display": "[lb_av]",
      "Display (English)": "pound (US and British)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[lb_tr]",
      "Display": "[lb_tr]",
      "Display (English)": "pound"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[lbf_av]",
      "Display": "[lbf_av]",
      "Display (English)": "pound force"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[lcwt_av]",
      "Display": "[lcwt_av]",
      "Display (English)": "long hunderdweight British hundredweight"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[ligne]",
      "Display": "[ligne]",
      "Display (English)": "ligne French line"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[lk_br]",
      "Display": "[lk_br]",
      "Display (English)": "link for Gunter's chain"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[lk_us]",
      "Display": "[lk_us]",
      "Display (English)": "link for Gunter's chain"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[lne]",
      "Display": "[lne]",
      "Display (English)": "line"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[lton_av]",
      "Display": "[lton_av]",
      "Display (English)": "long ton British ton"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[ly]",
      "Display": "[ly]",
      "Display (English)": "light-year"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[m_e]",
      "Display": "[m_e]",
      "Display (English)": "electron mass"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[m_p]",
      "Display": "[m_p]",
      "Display (English)": "proton mass"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[mclg'U]",
      "Display": "[mclg'U]",
      "Display (English)": "Mac Lagan unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[mesh_i]",
      "Display": "[mesh_i]",
      "Display (English)": "mesh"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[mi_br]",
      "Display": "[mi_br]",
      "Display (English)": "mile"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[mi_i]",
      "Display": "[mi_i]",
      "Display (English)": "statute mile"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[mi_us]",
      "Display": "[mi_us]",
      "Display (English)": "mile"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[mil_i]",
      "Display": "[mil_i]",
      "Display (English)": "mil"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[mil_us]",
      "Display": "[mil_us]",
      "Display (English)": "mil"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[min_br]",
      "Display": "[min_br]",
      "Display (English)": "minim"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[min_us]",
      "Display": "[min_us]",
      "Display (English)": "minim"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[mu_0]",
      "Display": "[mu_0]",
      "Display (English)": "permeability of vacuum"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[nmi_br]",
      "Display": "[nmi_br]",
      "Display (English)": "nautical mile"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[nmi_i]",
      "Display": "[nmi_i]",
      "Display (English)": "nautical mile"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[oz_ap]",
      "Display": "[oz_ap]",
      "Display (English)": "ounce (US and British)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[oz_av]",
      "Display": "[oz_av]",
      "Display (English)": "ounce (US and British)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[oz_tr]",
      "Display": "[oz_tr]",
      "Display (English)": "ounce"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[p'diop]",
      "Display": "[p'diop]",
      "Display (English)": "prism diopter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[pH]",
      "Display": "[pH]",
      "Display (English)": "pH"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[pc_br]",
      "Display": "[pc_br]",
      "Display (English)": "pace"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[pca]",
      "Display": "[pca]",
      "Display (English)": "pica"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[pca_pr]",
      "Display": "[pca_pr]",
      "Display (English)": "Printer's pica"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[pi]",
      "Display": "[pi]",
      "Display (English)": "the number pi"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[pi].rad/min",
      "Display": "[pi].rad/min",
      "Display (English)": "the number pi * radian / minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[pied]",
      "Display": "[pied]",
      "Display (English)": "pied French foot"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[pk_br]",
      "Display": "[pk_br]",
      "Display (English)": "peck"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[pk_us]",
      "Display": "[pk_us]",
      "Display (English)": "peck"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[pnt]",
      "Display": "[pnt]",
      "Display (English)": "point"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[pnt_pr]",
      "Display": "[pnt_pr]",
      "Display (English)": "Printer's point"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[pouce]",
      "Display": "[pouce]",
      "Display (English)": "pouce French inch"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[ppb]",
      "Display": "[ppb]",
      "Display (English)": "part per billion"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[ppm]",
      "Display": "[ppm]",
      "Display (English)": "part per million"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[ppth]",
      "Display": "[ppth]",
      "Display (English)": "parts per thousand"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[pptr]",
      "Display": "[pptr]",
      "Display (English)": "parts per trillion"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[psi]",
      "Display": "[psi]",
      "Display (English)": "pound per square inch"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[pt_br]",
      "Display": "[pt_br]",
      "Display (English)": "pint"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[pt_us]",
      "Display": "[pt_us]",
      "Display (English)": "pint"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[pwt_tr]",
      "Display": "[pwt_tr]",
      "Display (English)": "pennyweight"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[qt_br]",
      "Display": "[qt_br]",
      "Display (English)": "quart"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[qt_us]",
      "Display": "[qt_us]",
      "Display (English)": "quart"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[rch_us]",
      "Display": "[rch_us]",
      "Display (English)": "Ramden's chain Engineer's chain"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[rd_br]",
      "Display": "[rd_br]",
      "Display (English)": "rod"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[rd_us]",
      "Display": "[rd_us]",
      "Display (English)": "rod"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[rlk_us]",
      "Display": "[rlk_us]",
      "Display (English)": "link for Ramden's chain"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[sc_ap]",
      "Display": "[sc_ap]",
      "Display (English)": "scruple"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[sct]",
      "Display": "[sct]",
      "Display (English)": "section"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[scwt_av]",
      "Display": "[scwt_av]",
      "Display (English)": "short hundredweight U.S. hundredweight"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[sft_i]",
      "Display": "[sft_i]",
      "Display (English)": "square foot (international)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[sin_i]",
      "Display": "[sin_i]",
      "Display (English)": "square inch (international)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[smgy'U]",
      "Display": "[smgy'U]",
      "Display (English)": "Somogyi unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[smi_us]",
      "Display": "[smi_us]",
      "Display (English)": "square mile"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[smoot]",
      "Display": "[smoot]",
      "Display (English)": "Smoot"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[srd_us]",
      "Display": "[srd_us]",
      "Display (English)": "square rod"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[ston_av]",
      "Display": "[ston_av]",
      "Display (English)": "short ton U.S. ton"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[stone_av]",
      "Display": "[stone_av]",
      "Display (English)": "stone British stone"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[syd_i]",
      "Display": "[syd_i]",
      "Display (English)": "square yard"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[tb'U]",
      "Display": "[tb'U]",
      "Display (English)": "tuberculin unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[tbs_us]",
      "Display": "[tbs_us]",
      "Display (English)": "tablespoon (US)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[todd'U]",
      "Display": "[todd'U]",
      "Display (English)": "Todd unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[tsp_us]",
      "Display": "[tsp_us]",
      "Display (English)": "teaspoon"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[twp]",
      "Display": "[twp]",
      "Display (English)": "township"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[yd_br]",
      "Display": "[yd_br]",
      "Display (English)": "yard"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[yd_i]",
      "Display": "[yd_i]",
      "Display (English)": "yard"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "[yd_us]",
      "Display": "[yd_us]",
      "Display (English)": "yard"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "a",
      "Display": "a",
      "Display (English)": "year"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "a_g",
      "Display": "a_g",
      "Display (English)": "mean Gregorian year"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "a_j",
      "Display": "a_j",
      "Display (English)": "mean Julian year"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "a_t",
      "Display": "a_t",
      "Display (English)": "tropical year"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ag",
      "Display": "ag",
      "Display (English)": "(attogram)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ar",
      "Display": "ar",
      "Display (English)": "are"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "atm",
      "Display": "atm",
      "Display (English)": "standard atmosphere"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "att",
      "Display": "att",
      "Display (English)": "technical atmosphere"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "b",
      "Display": "b",
      "Display (English)": "barn"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "bar",
      "Display": "bar",
      "Display (English)": "(bar)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "bit",
      "Display": "bit",
      "Display (English)": "(bit)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "bit_s",
      "Display": "bit_s",
      "Display (English)": "bit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cL",
      "Display": "cL",
      "Display (English)": "centiliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cP",
      "Display": "cP",
      "Display (English)": "centiPoise"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cSt",
      "Display": "cSt",
      "Display (English)": "centiStokes"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cal",
      "Display": "cal",
      "Display (English)": "calorie"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cal_IT",
      "Display": "cal_IT",
      "Display (English)": "international table calorie"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cal_[15]",
      "Display": "cal_[15]",
      "Display (English)": "calorie at 15 °C"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cal_[20]",
      "Display": "cal_[20]",
      "Display (English)": "calorie at 20 °C"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cal_m",
      "Display": "cal_m",
      "Display (English)": "mean calorie"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cal_th",
      "Display": "cal_th",
      "Display (English)": "thermochemical calorie"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cd",
      "Display": "cd",
      "Display (English)": "candela"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cg",
      "Display": "cg",
      "Display (English)": "centigram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "circ",
      "Display": "circ",
      "Display (English)": "circle"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cm",
      "Display": "cm",
      "Display (English)": "centimeter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cm2",
      "Display": "cm2",
      "Display (English)": "square centimeter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cm2/s",
      "Display": "cm2/s",
      "Display (English)": "square centimeter per second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cm3",
      "Display": "cm3",
      "Display (English)": "cubic centimeter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cm[H2O]",
      "Display": "cm[H2O]",
      "Display (English)": "centimeter of water"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cm[H2O]/(s.m)",
      "Display": "cm[H2O]/(s.m)",
      "Display (English)": "centimeter of water column / second * meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cm[H2O]/L/s",
      "Display": "cm[H2O]/L/s",
      "Display (English)": "centimeter of water per liter per second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cm[H2O]/s/m",
      "Display": "cm[H2O]/s/m",
      "Display (English)": "centimeter of water per second per meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "cm[Hg]",
      "Display": "cm[Hg]",
      "Display (English)": "centimeter of mercury"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "d",
      "Display": "d",
      "Display (English)": "day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "dB",
      "Display": "dB",
      "Display (English)": "decibel"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "dL",
      "Display": "dL",
      "Display (English)": "deciliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "daL/min",
      "Display": "daL/min",
      "Display (English)": "dekaliter per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "daL/min/m2",
      "Display": "daL/min/m2",
      "Display (English)": "dekaliter per minute per square meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "deg",
      "Display": "deg",
      "Display (English)": "degree"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "deg/s",
      "Display": "deg/s",
      "Display (English)": "degree per second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "dg",
      "Display": "dg",
      "Display (English)": "decigram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "dm",
      "Display": "dm",
      "Display (English)": "decimeter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "dm2/s2",
      "Display": "dm2/s2",
      "Display (English)": "square decimeter per square second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "dyn",
      "Display": "dyn",
      "Display (English)": "dyne"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "dyn.s/(cm.m2)",
      "Display": "dyn.s/(cm.m2)",
      "Display (English)": "dyne second per centimeter per square meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "dyn.s/cm",
      "Display": "dyn.s/cm",
      "Display (English)": "dyne second per centimeter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "eV",
      "Display": "eV",
      "Display (English)": "electronvolt"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "eq",
      "Display": "eq",
      "Display (English)": "equivalents"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "eq/L",
      "Display": "eq/L",
      "Display (English)": "equivalents / liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "eq/mL",
      "Display": "eq/mL",
      "Display (English)": "equivalents / milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "eq/mmol",
      "Display": "eq/mmol",
      "Display (English)": "equivalents / millimole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "eq/umol",
      "Display": "eq/umol",
      "Display (English)": "equivalents / micromole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "erg",
      "Display": "erg",
      "Display (English)": "(erg)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "fL",
      "Display": "fL",
      "Display (English)": "femtoliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "fL/nL",
      "Display": "fL/nL",
      "Display (English)": "femtoliter / nanoliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "fg",
      "Display": "fg",
      "Display (English)": "femtogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "fm",
      "Display": "fm",
      "Display (English)": "femtometer"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "fmol",
      "Display": "fmol",
      "Display (English)": "femtomole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "fmol/L",
      "Display": "fmol/L",
      "Display (English)": "femtomole per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "fmol/g",
      "Display": "fmol/g",
      "Display (English)": "femtomole per gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "fmol/mL",
      "Display": "fmol/mL",
      "Display (English)": "femtomole / milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "fmol/mg",
      "Display": "fmol/mg",
      "Display (English)": "femtomole / milligram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g",
      "Display": "g",
      "Display (English)": "gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g%",
      "Display": "g%",
      "Display (English)": "gram percent"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g.m",
      "Display": "g.m",
      "Display (English)": "gram * meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/(100.g)",
      "Display": "g/(100.g)",
      "Display (English)": "gram per 100 gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/(12.h)",
      "Display": "g/(12.h)",
      "Display (English)": "gram per 12 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/(24.h)",
      "Display": "g/(24.h)",
      "Display (English)": "gram per 24 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/(3.d)",
      "Display": "g/(3.d)",
      "Display (English)": "gram per 3 days"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/(4.h)",
      "Display": "g/(4.h)",
      "Display (English)": "gram per 4 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/(48.h)",
      "Display": "g/(48.h)",
      "Display (English)": "gram per 48 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/(5.h)",
      "Display": "g/(5.h)",
      "Display (English)": "gram per 5 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/(6.h)",
      "Display": "g/(6.h)",
      "Display (English)": "gram per 6 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/(72.h)",
      "Display": "g/(72.h)",
      "Display (English)": "gram per 72 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/(8.h)",
      "Display": "g/(8.h)",
      "Display (English)": "gram / 8 * hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/(8.kg.h)",
      "Display": "g/(8.kg.h)",
      "Display (English)": "gram / 8 * kilogram * hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/(kg.h)",
      "Display": "g/(kg.h)",
      "Display (English)": "gram / kilogram * hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/(kg.min)",
      "Display": "g/(kg.min)",
      "Display (English)": "gram / kilogram * minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/L",
      "Display": "g/L",
      "Display (English)": "gram per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/cm3",
      "Display": "g/cm3",
      "Display (English)": "gram per cubic centimeter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/d",
      "Display": "g/d",
      "Display (English)": "gram per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/dL",
      "Display": "g/dL",
      "Display (English)": "gram per deciliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/g",
      "Display": "g/g",
      "Display (English)": "gram per gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/h",
      "Display": "g/h",
      "Display (English)": "gram per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/h/m2",
      "Display": "g/h/m2",
      "Display (English)": "gram per hour per square meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/kg",
      "Display": "g/kg",
      "Display (English)": "gram per kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/kg/(8.h)",
      "Display": "g/kg/(8.h)",
      "Display (English)": "gram per kilogram per 8 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/kg/d",
      "Display": "g/kg/d",
      "Display (English)": "gram per kilogram per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/kg/h",
      "Display": "g/kg/h",
      "Display (English)": "gram per kilogram per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/kg/min",
      "Display": "g/kg/min",
      "Display (English)": "gram per kilogram per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/m2",
      "Display": "g/m2",
      "Display (English)": "grams Per Square Meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/mL",
      "Display": "g/mL",
      "Display (English)": "gram per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/mg",
      "Display": "g/mg",
      "Display (English)": "gram per milligram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/min",
      "Display": "g/min",
      "Display (English)": "gram per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/mmol",
      "Display": "g/mmol",
      "Display (English)": "gram per millimole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "g/mol",
      "Display": "g/mol",
      "Display (English)": "gram per mole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "gf",
      "Display": "gf",
      "Display (English)": "gram-force"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "gon",
      "Display": "gon",
      "Display (English)": "gon grade"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "h",
      "Display": "h",
      "Display (English)": "hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "hL",
      "Display": "hL",
      "Display (English)": "hectoliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kBq",
      "Display": "kBq",
      "Display (English)": "kiloBecquerel"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kL",
      "Display": "kL",
      "Display (English)": "kiloliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kPa",
      "Display": "kPa",
      "Display (English)": "kiloPascal"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kU",
      "Display": "kU",
      "Display (English)": "kilo enzyme unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kU/L",
      "Display": "kU/L",
      "Display (English)": "kiloenzyme Unit per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kU/g",
      "Display": "kU/g",
      "Display (English)": "kiloenzyme Unit per gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kU/h",
      "Display": "kU/h",
      "Display (English)": "kiloUnit / hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kU/mL",
      "Display": "kU/mL",
      "Display (English)": "kilo enzyme unit per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "k[IU]/L",
      "Display": "k[IU]/L",
      "Display (English)": "kilo international unit per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "k[IU]/mL",
      "Display": "k[IU]/mL",
      "Display (English)": "kilo international unit per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "k[iU]/mL",
      "Display": "k[iU]/mL",
      "Display (English)": "KiloInternationalUnitsPerMilliLiter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kat",
      "Display": "kat",
      "Display (English)": "katal"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kat/L",
      "Display": "kat/L",
      "Display (English)": "katal / liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kat/kg",
      "Display": "kat/kg",
      "Display (English)": "katal / kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kcal",
      "Display": "kcal",
      "Display (English)": "kilocalorie"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kcal/(8.h)",
      "Display": "kcal/(8.h)",
      "Display (English)": "kilocalorie / 8 * hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kcal/[oz_av]",
      "Display": "kcal/[oz_av]",
      "Display (English)": "kilocalorie per ounce (US & British)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kcal/d",
      "Display": "kcal/d",
      "Display (English)": "kilocalorie per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kcal/h",
      "Display": "kcal/h",
      "Display (English)": "kilocalorie per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kcal/kg/(24.h)",
      "Display": "kcal/kg/(24.h)",
      "Display (English)": "kilocalorie per kilogram per 24 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kg",
      "Display": "kg",
      "Display (English)": "kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kg.m/s",
      "Display": "kg.m/s",
      "Display (English)": "kilogram meter per second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kg/(s.m2)",
      "Display": "kg/(s.m2)",
      "Display (English)": "kilogram per second per square meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kg/L",
      "Display": "kg/L",
      "Display (English)": "kilogram per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kg/h",
      "Display": "kg/h",
      "Display (English)": "kilogram per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kg/m2",
      "Display": "kg/m2",
      "Display (English)": "kilogram / (meter ^ 2)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kg/m3",
      "Display": "kg/m3",
      "Display (English)": "kilogram / (meter ^ 3)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kg/min",
      "Display": "kg/min",
      "Display (English)": "kilogram / minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kg/mol",
      "Display": "kg/mol",
      "Display (English)": "kilogram per mole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "kg/s",
      "Display": "kg/s",
      "Display (English)": "kilogram / second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "km",
      "Display": "km",
      "Display (English)": "kilometer"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ks",
      "Display": "ks",
      "Display (English)": "kilosecond"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "lm",
      "Display": "lm",
      "Display (English)": "lumen"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "lm.m2",
      "Display": "lm.m2",
      "Display (English)": "lumen square meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "lm/m2",
      "Display": "lm/m2",
      "Display (English)": "lumen / (meter ^ 2)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "lx",
      "Display": "lx",
      "Display (English)": "lux"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "m",
      "Display": "m",
      "Display (English)": "meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "m/s",
      "Display": "m/s",
      "Display (English)": "meter per second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "m/s2",
      "Display": "m/s2",
      "Display (English)": "meter per square second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "m2",
      "Display": "m2",
      "Display (English)": "square meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "m2/s",
      "Display": "m2/s",
      "Display (English)": "square meter per second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "m3/s",
      "Display": "m3/s",
      "Display (English)": "cubic meter per second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mA",
      "Display": "mA",
      "Display (English)": "milliAmpère"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mCi",
      "Display": "mCi",
      "Display (English)": "milliCurie"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL",
      "Display": "mL",
      "Display (English)": "milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/(10.h)",
      "Display": "mL/(10.h)",
      "Display (English)": "milliliter per 10 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/(12.h)",
      "Display": "mL/(12.h)",
      "Display (English)": "milliliter per 12 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/(2.h)",
      "Display": "mL/(2.h)",
      "Display (English)": "milliliter per 2 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/(24.h)",
      "Display": "mL/(24.h)",
      "Display (English)": "milliliter per 24 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/(4.h)",
      "Display": "mL/(4.h)",
      "Display (English)": "milliliter per 4 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/(5.h)",
      "Display": "mL/(5.h)",
      "Display (English)": "milliliter per 5 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/(6.h)",
      "Display": "mL/(6.h)",
      "Display (English)": "milliliter per 6 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/(72.h)",
      "Display": "mL/(72.h)",
      "Display (English)": "milliliter per 72 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/(8.h)",
      "Display": "mL/(8.h)",
      "Display (English)": "milliliter per 8 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/(kg.min)",
      "Display": "mL/(kg.min)",
      "Display (English)": "milliliter / kilogram * minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/L",
      "Display": "mL/L",
      "Display (English)": "milliliter per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/[sin_i]",
      "Display": "mL/[sin_i]",
      "Display (English)": "milliliter per square inch (international)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/cm[H2O]",
      "Display": "mL/cm[H2O]",
      "Display (English)": "milliliter / centimeter of water column"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/d",
      "Display": "mL/d",
      "Display (English)": "milliliter per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/dL",
      "Display": "mL/dL",
      "Display (English)": "milliliter per deciliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/h",
      "Display": "mL/h",
      "Display (English)": "milliliter per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/kg",
      "Display": "mL/kg",
      "Display (English)": "milliliter per kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/kg/(8.h)",
      "Display": "mL/kg/(8.h)",
      "Display (English)": "milliliter per kilogram per 8 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/kg/d",
      "Display": "mL/kg/d",
      "Display (English)": "milliliter per kilogram per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/kg/h",
      "Display": "mL/kg/h",
      "Display (English)": "milliliter per kilogram per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/kg/min",
      "Display": "mL/kg/min",
      "Display (English)": "milliliter per kilogram per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/m2",
      "Display": "mL/m2",
      "Display (English)": "milliliter per square meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/mbar",
      "Display": "mL/mbar",
      "Display (English)": "milliliter per millibar"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/min",
      "Display": "mL/min",
      "Display (English)": "milliliter per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/min/(173.10*-2.m2)",
      "Display": "mL/min/(173.10*-2.m2)",
      "Display (English)": "milliliter / minute / 173 * (the number ten for arbitrary powers ^ -2) * (meter ^ 2)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/min/1.73.m2",
      "Display": "mL/min/1.73.m2",
      "Display (English)": "(milliliter) / (minute) / 1 * 73 * (meter ^ 2)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/min/m2",
      "Display": "mL/min/m2",
      "Display (English)": "milliliter per minute per square meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/mm",
      "Display": "mL/mm",
      "Display (English)": "milliliter per millimeter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mL/s",
      "Display": "mL/s",
      "Display (English)": "milliliter per second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mPa",
      "Display": "mPa",
      "Display (English)": "millipascal"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mPa.s",
      "Display": "mPa.s",
      "Display (English)": "millipascal second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mU",
      "Display": "mU",
      "Display (English)": "millienzyme Unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mU/L",
      "Display": "mU/L",
      "Display (English)": "millienzyme Unit per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mU/g",
      "Display": "mU/g",
      "Display (English)": "millienzyme Unit per gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mU/mL",
      "Display": "mU/mL",
      "Display (English)": "millienzyme Unit per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mU/mL/min",
      "Display": "mU/mL/min",
      "Display (English)": "millienzyme Unit per milliliter per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mU/mg",
      "Display": "mU/mg",
      "Display (English)": "milliUnit / milligram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mU/min",
      "Display": "mU/min",
      "Display (English)": "milliUnit / minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mU/mmol",
      "Display": "mU/mmol",
      "Display (English)": "(milliUnit) / (millimole)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mV",
      "Display": "mV",
      "Display (English)": "milliVolt"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "m[H2O]",
      "Display": "m[H2O]",
      "Display (English)": "meter of water column"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "m[Hg]",
      "Display": "m[Hg]",
      "Display (English)": "meter of mercury column"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "m[IU]/L",
      "Display": "m[IU]/L",
      "Display (English)": "milli international unit per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "m[IU]/mL",
      "Display": "m[IU]/mL",
      "Display (English)": "milli international unit per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "m[iU]",
      "Display": "m[iU]",
      "Display (English)": "milliinternational unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mbar",
      "Display": "mbar",
      "Display (English)": "millibar"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mbar.s/L",
      "Display": "mbar.s/L",
      "Display (English)": "millibar second per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mbar/L/s",
      "Display": "mbar/L/s",
      "Display (English)": "millibar per liter per second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "meq",
      "Display": "meq",
      "Display (English)": "milliequivalent"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "meq/(12.h)",
      "Display": "meq/(12.h)",
      "Display (English)": "milliequivalent per 12 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "meq/(2.h)",
      "Display": "meq/(2.h)",
      "Display (English)": "milliequivalent per 2 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "meq/(24.h)",
      "Display": "meq/(24.h)",
      "Display (English)": "milliequivalent per 24 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "meq/(8.h)",
      "Display": "meq/(8.h)",
      "Display (English)": "milliequivalent per 8 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "meq/(8.h.kg)",
      "Display": "meq/(8.h.kg)",
      "Display (English)": "milliequivalents / 8 * hour * kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "meq/(kg.d)",
      "Display": "meq/(kg.d)",
      "Display (English)": "milliequivalents / kilogram * day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "meq/L",
      "Display": "meq/L",
      "Display (English)": "milliequivalent per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "meq/d",
      "Display": "meq/d",
      "Display (English)": "milliequivalent per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "meq/dL",
      "Display": "meq/dL",
      "Display (English)": "milliequivalent per deciliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "meq/g",
      "Display": "meq/g",
      "Display (English)": "milliequivalent per gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "meq/h",
      "Display": "meq/h",
      "Display (English)": "milliequivalent per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "meq/kg",
      "Display": "meq/kg",
      "Display (English)": "milliequivalent per kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "meq/kg/h",
      "Display": "meq/kg/h",
      "Display (English)": "milliequivalent per kilogram per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "meq/kg/min",
      "Display": "meq/kg/min",
      "Display (English)": "milliequivalents / kilogram / minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "meq/m2",
      "Display": "meq/m2",
      "Display (English)": "milliequivalent per square meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "meq/mL",
      "Display": "meq/mL",
      "Display (English)": "milliequivalent per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "meq/min",
      "Display": "meq/min",
      "Display (English)": "milliequivalent per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg",
      "Display": "mg",
      "Display (English)": "milligram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/(10.h)",
      "Display": "mg/(10.h)",
      "Display (English)": "milligram per 10 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/(12.h)",
      "Display": "mg/(12.h)",
      "Display (English)": "milligram per 12 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/(18.h)",
      "Display": "mg/(18.h)",
      "Display (English)": "milligram per 18 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/(2.h)",
      "Display": "mg/(2.h)",
      "Display (English)": "milligram per 2 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/(24.h)",
      "Display": "mg/(24.h)",
      "Display (English)": "milligram per 24 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/(6.h)",
      "Display": "mg/(6.h)",
      "Display (English)": "milligram per 6 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/(72.h)",
      "Display": "mg/(72.h)",
      "Display (English)": "milligram per 72 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/(8.h)",
      "Display": "mg/(8.h)",
      "Display (English)": "milligram per 8 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/(8.h.kg)",
      "Display": "mg/(8.h.kg)",
      "Display (English)": "milligram / 8 * hour * kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/(kg.h)",
      "Display": "mg/(kg.h)",
      "Display (English)": "milligram / kilogram * hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/L",
      "Display": "mg/L",
      "Display (English)": "milligram per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/d",
      "Display": "mg/d",
      "Display (English)": "milligram per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/d/(173.10*-2.m2)",
      "Display": "mg/d/(173.10*-2.m2)",
      "Display (English)": "milligram / day / 173 * (the number ten for arbitrary powers ^ -2) * (meter ^ 2)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/d/1.73.m2",
      "Display": "mg/d/1.73.m2",
      "Display (English)": "(milligram) / (day) / 1 * 73 * (meter ^ 2)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/dL",
      "Display": "mg/dL",
      "Display (English)": "milligram per deciliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/g",
      "Display": "mg/g",
      "Display (English)": "milligram per gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/h",
      "Display": "mg/h",
      "Display (English)": "milligram per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/kg",
      "Display": "mg/kg",
      "Display (English)": "milligram per kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/kg/(24.h)",
      "Display": "mg/kg/(24.h)",
      "Display (English)": "milligram / kilogram / 24 * hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/kg/(8.h)",
      "Display": "mg/kg/(8.h)",
      "Display (English)": "milligram per kilogram per 8 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/kg/d",
      "Display": "mg/kg/d",
      "Display (English)": "milligram per kilogram per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/kg/h",
      "Display": "mg/kg/h",
      "Display (English)": "milligram per kilogram per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/kg/min",
      "Display": "mg/kg/min",
      "Display (English)": "milligram per kilogram per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/m2",
      "Display": "mg/m2",
      "Display (English)": "milligram per square meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/m3",
      "Display": "mg/m3",
      "Display (English)": "milligram per cubic meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/mL",
      "Display": "mg/mL",
      "Display (English)": "milligram per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/mg",
      "Display": "mg/mg",
      "Display (English)": "milligram per milligram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/min",
      "Display": "mg/min",
      "Display (English)": "milligram per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/mmol",
      "Display": "mg/mmol",
      "Display (English)": "milligram per millimole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mg/wk",
      "Display": "mg/wk",
      "Display (English)": "milligram per week"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mho",
      "Display": "mho",
      "Display (English)": "(mho)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "min",
      "Display": "min",
      "Display (English)": "minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mm",
      "Display": "mm",
      "Display (English)": "millimeter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mm/h",
      "Display": "mm/h",
      "Display (English)": "millimeter per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mm/min",
      "Display": "mm/min",
      "Display (English)": "millimeter per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mm2",
      "Display": "mm2",
      "Display (English)": "square millimeter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mm3",
      "Display": "mm3",
      "Display (English)": "cubic millimeter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mm[H2O]",
      "Display": "mm[H2O]",
      "Display (English)": "millimeter of water"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mm[Hg]",
      "Display": "mm[Hg]",
      "Display (English)": "millimeter of mercury"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol",
      "Display": "mmol",
      "Display (English)": "millimole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/(12.h)",
      "Display": "mmol/(12.h)",
      "Display (English)": "millimole per 12 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/(18.h)",
      "Display": "mmol/(18.h)",
      "Display (English)": "millimole per 18 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/(2.h)",
      "Display": "mmol/(2.h)",
      "Display (English)": "millimole per 2 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/(24.h)",
      "Display": "mmol/(24.h)",
      "Display (English)": "millimole per 24 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/(5.h)",
      "Display": "mmol/(5.h)",
      "Display (English)": "millimole per 5 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/(6.h)",
      "Display": "mmol/(6.h)",
      "Display (English)": "millimole per 6 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/(8.h)",
      "Display": "mmol/(8.h)",
      "Display (English)": "millimole per 8 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/(8.h.kg)",
      "Display": "mmol/(8.h.kg)",
      "Display (English)": "millimole / 8 * hour * kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/L",
      "Display": "mmol/L",
      "Display (English)": "millimole per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/L/s",
      "Display": "mmol/L/s",
      "Display (English)": "millimole per liter per second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/d",
      "Display": "mmol/d",
      "Display (English)": "millimole per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/dL",
      "Display": "mmol/dL",
      "Display (English)": "millimole per deciliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/g",
      "Display": "mmol/g",
      "Display (English)": "millimole per gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/h",
      "Display": "mmol/h",
      "Display (English)": "millimole per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/h/mg",
      "Display": "mmol/h/mg",
      "Display (English)": "(millimole) / (hour) / (milligram)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/kg",
      "Display": "mmol/kg",
      "Display (English)": "millimole per kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/kg/(8.h)",
      "Display": "mmol/kg/(8.h)",
      "Display (English)": "millimole per kilogram per 8 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/kg/d",
      "Display": "mmol/kg/d",
      "Display (English)": "millimole per kilogram per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/kg/h",
      "Display": "mmol/kg/h",
      "Display (English)": "millimole per kilogram per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/kg/min",
      "Display": "mmol/kg/min",
      "Display (English)": "millimole per kilogram per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/m",
      "Display": "mmol/m",
      "Display (English)": "millimole / meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/m2",
      "Display": "mmol/m2",
      "Display (English)": "millimole per square meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/min",
      "Display": "mmol/min",
      "Display (English)": "millimole per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/mmol",
      "Display": "mmol/mmol",
      "Display (English)": "millimole per millimole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/mol",
      "Display": "mmol/mol",
      "Display (English)": "millimole per mole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mmol/s/L",
      "Display": "mmol/s/L",
      "Display (English)": "millimole per second per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mo",
      "Display": "mo",
      "Display (English)": "month"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mo_g",
      "Display": "mo_g",
      "Display (English)": "mean Gregorian month"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mo_j",
      "Display": "mo_j",
      "Display (English)": "mean Julian month"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mo_s",
      "Display": "mo_s",
      "Display (English)": "synodal month"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mol",
      "Display": "mol",
      "Display (English)": "mole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mol/L",
      "Display": "mol/L",
      "Display (English)": "mole per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mol/d",
      "Display": "mol/d",
      "Display (English)": "mole per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mol/kg",
      "Display": "mol/kg",
      "Display (English)": "mole per kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mol/kg/s",
      "Display": "mol/kg/s",
      "Display (English)": "mole per kilogram per second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mol/m3",
      "Display": "mol/m3",
      "Display (English)": "mole per cubic meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mol/mL",
      "Display": "mol/mL",
      "Display (English)": "mole per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mol/mol",
      "Display": "mol/mol",
      "Display (English)": "mole per mole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mol/s",
      "Display": "mol/s",
      "Display (English)": "mole per second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mosm",
      "Display": "mosm",
      "Display (English)": "milliosmole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mosm/L",
      "Display": "mosm/L",
      "Display (English)": "milliosmole per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "mosm/kg",
      "Display": "mosm/kg",
      "Display (English)": "milliosmole per kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ms",
      "Display": "ms",
      "Display (English)": "millisecond"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nCi",
      "Display": "nCi",
      "Display (English)": "nanoCurie"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nL",
      "Display": "nL",
      "Display (English)": "nanoliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nU/mL",
      "Display": "nU/mL",
      "Display (English)": "nanoenzyme unit per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nU",
      "Display": "nU",
      "Display (English)": "(nanoUnit)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng",
      "Display": "ng",
      "Display (English)": "nanogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/(24.h)",
      "Display": "ng/(24.h)",
      "Display (English)": "nanogram per 24 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/(8.h)",
      "Display": "ng/(8.h)",
      "Display (English)": "nanogram per 8 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/(8.h.kg)",
      "Display": "ng/(8.h.kg)",
      "Display (English)": "nanogram / 8 * hour * kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/(kg.d)",
      "Display": "ng/(kg.d)",
      "Display (English)": "nanogram / kilogram * day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/(kg.h)",
      "Display": "ng/(kg.h)",
      "Display (English)": "nanogram / kilogram * hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/(kg.min)",
      "Display": "ng/(kg.min)",
      "Display (English)": "nanogram / kilogram * minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/10*6",
      "Display": "ng/10*6",
      "Display (English)": "nanogram per million"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/L",
      "Display": "ng/L",
      "Display (English)": "nanogram per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/U",
      "Display": "ng/U",
      "Display (English)": "nanogram per enzyme unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/d",
      "Display": "ng/d",
      "Display (English)": "nanogram per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/dL",
      "Display": "ng/dL",
      "Display (English)": "nanogram per deciliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/dL/h",
      "Display": "ng/dL/h",
      "Display (English)": "nanogram / deciliter / hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/g",
      "Display": "ng/g",
      "Display (English)": "nanogram per gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/h",
      "Display": "ng/h",
      "Display (English)": "nanogram per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/kg",
      "Display": "ng/kg",
      "Display (English)": "nanogram per kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/kg/(8.h)",
      "Display": "ng/kg/(8.h)",
      "Display (English)": "nanogram per kilogram per 8 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/kg/h",
      "Display": "ng/kg/h",
      "Display (English)": "nanogram per kilogram per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/kg/min",
      "Display": "ng/kg/min",
      "Display (English)": "nanogram per kilogram per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/m2",
      "Display": "ng/m2",
      "Display (English)": "nanogram per square meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/mL",
      "Display": "ng/mL",
      "Display (English)": "nanogram per millliiter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/mL/h",
      "Display": "ng/mL/h",
      "Display (English)": "nanogram per milliliter per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/mg",
      "Display": "ng/mg",
      "Display (English)": "nanogram per milligram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/mg/h",
      "Display": "ng/mg/h",
      "Display (English)": "nanogram per milligram per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/min",
      "Display": "ng/min",
      "Display (English)": "nanogram per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ng/s",
      "Display": "ng/s",
      "Display (English)": "nanogram per second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nkat",
      "Display": "nkat",
      "Display (English)": "nanokatal"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nm",
      "Display": "nm",
      "Display (English)": "nanometer"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nm/s/L",
      "Display": "nm/s/L",
      "Display (English)": "nanometer per second per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol",
      "Display": "nmol",
      "Display (English)": "nanomole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/(24.h)",
      "Display": "nmol/(24.h)",
      "Display (English)": "nanomole per 24 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/L",
      "Display": "nmol/L",
      "Display (English)": "nanomole per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/L/mmol",
      "Display": "nmol/L/mmol",
      "Display (English)": "(nanomole) / (liter) / (millimole)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/L/s",
      "Display": "nmol/L/s",
      "Display (English)": "nanomole per liter per second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/d",
      "Display": "nmol/d",
      "Display (English)": "nanomole per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/dL",
      "Display": "nmol/dL",
      "Display (English)": "nanomole per deciliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/g",
      "Display": "nmol/g",
      "Display (English)": "nanomole per gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/h/L",
      "Display": "nmol/h/L",
      "Display (English)": "nanomole per hour per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/h/mL",
      "Display": "nmol/h/mL",
      "Display (English)": "nanomole per hour per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/h/mg",
      "Display": "nmol/h/mg",
      "Display (English)": "(nanomole) / (hour) / (milligram)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/m/mg",
      "Display": "nmol/m/mg",
      "Display (English)": "(nanomole) / (meter) / (milligram)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/mL",
      "Display": "nmol/mL",
      "Display (English)": "nanomole per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/mL/h",
      "Display": "nmol/mL/h",
      "Display (English)": "nanomole per milliliter per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/mL/min",
      "Display": "nmol/mL/min",
      "Display (English)": "nanomole per milliliter per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/mg",
      "Display": "nmol/mg",
      "Display (English)": "nanomole per milligram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/mg/h",
      "Display": "nmol/mg/h",
      "Display (English)": "nanomole per milligram per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/min",
      "Display": "nmol/min",
      "Display (English)": "nanomole per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/min/10*6",
      "Display": "nmol/min/10*6",
      "Display (English)": "(nanomole) / (minute) / (the number ten for arbitrary powers ^ 6)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/min/mL",
      "Display": "nmol/min/mL",
      "Display (English)": "nanomole per minute per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/min/mg",
      "Display": "nmol/min/mg",
      "Display (English)": "(nanomole) / (minute) / (milligram)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/mmol",
      "Display": "nmol/mmol",
      "Display (English)": "nanomole per millimole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/mol",
      "Display": "nmol/mol",
      "Display (English)": "nanomole per mole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/nmol",
      "Display": "nmol/nmol",
      "Display (English)": "nanomole per nanomole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/s",
      "Display": "nmol/s",
      "Display (English)": "nanomole per second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "nmol/s/L",
      "Display": "nmol/s/L",
      "Display (English)": "nanomole per second per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ns",
      "Display": "ns",
      "Display (English)": "nanosecond"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "osm",
      "Display": "osm",
      "Display (English)": "osmole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "osm/L",
      "Display": "osm/L",
      "Display (English)": "osmole per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "osm/kg",
      "Display": "osm/kg",
      "Display (English)": "osmole per kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pA",
      "Display": "pA",
      "Display (English)": "picoampere"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pL",
      "Display": "pL",
      "Display (English)": "picoliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pT",
      "Display": "pT",
      "Display (English)": "picotesla"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pc",
      "Display": "pc",
      "Display (English)": "parsec"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pg",
      "Display": "pg",
      "Display (English)": "picogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pg/L",
      "Display": "pg/L",
      "Display (English)": "picogram per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pg/dL",
      "Display": "pg/dL",
      "Display (English)": "picogram per deciliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pg/mL",
      "Display": "pg/mL",
      "Display (English)": "picogram per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pg/mg",
      "Display": "pg/mg",
      "Display (English)": "picogram per milligram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pg/mm",
      "Display": "pg/mm",
      "Display (English)": "picogram per millimeter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ph",
      "Display": "ph",
      "Display (English)": "phot"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pkat",
      "Display": "pkat",
      "Display (English)": "picokatal"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pm",
      "Display": "pm",
      "Display (English)": "picometer"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pmol",
      "Display": "pmol",
      "Display (English)": "picomole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pmol/(24.h)",
      "Display": "pmol/(24.h)",
      "Display (English)": "picomole per 24 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pmol/L",
      "Display": "pmol/L",
      "Display (English)": "picomole per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pmol/d",
      "Display": "pmol/d",
      "Display (English)": "picomole per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pmol/dL",
      "Display": "pmol/dL",
      "Display (English)": "picomole per deciliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pmol/g",
      "Display": "pmol/g",
      "Display (English)": "picomole per gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pmol/h/mL",
      "Display": "pmol/h/mL",
      "Display (English)": "picomole per hour per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pmol/h/mg",
      "Display": "pmol/h/mg",
      "Display (English)": "(picomole) / (hour) / (milligram)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pmol/mL",
      "Display": "pmol/mL",
      "Display (English)": "picomole per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pmol/mg",
      "Display": "pmol/mg",
      "Display (English)": "(picomole) / (milligram)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pmol/min",
      "Display": "pmol/min",
      "Display (English)": "picomole per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pmol/min/mg",
      "Display": "pmol/min/mg",
      "Display (English)": "(picomole) / (minute) / (milligram)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pmol/mmol",
      "Display": "pmol/mmol",
      "Display (English)": "picomole per millimole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pmol/mol",
      "Display": "pmol/mol",
      "Display (English)": "picomole per mole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "pmol/umol",
      "Display": "pmol/umol",
      "Display (English)": "picomole per micromole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ps",
      "Display": "ps",
      "Display (English)": "picosecond"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "rad",
      "Display": "rad",
      "Display (English)": "radian"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "s",
      "Display": "s",
      "Display (English)": "second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "sb",
      "Display": "sb",
      "Display (English)": "stilb"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "sph",
      "Display": "sph",
      "Display (English)": "spere"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "sr",
      "Display": "sr",
      "Display (English)": "steradian"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "st",
      "Display": "st",
      "Display (English)": "stere"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "t",
      "Display": "t",
      "Display (English)": "tonne"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "u",
      "Display": "u",
      "Display (English)": "unified atomic mass unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "uCi",
      "Display": "uCi",
      "Display (English)": "MICROCURIE"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "uL",
      "Display": "uL",
      "Display (English)": "microliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "uL/(2.h)",
      "Display": "uL/(2.h)",
      "Display (English)": "microliter per 2 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "uL/h",
      "Display": "uL/h",
      "Display (English)": "microliter per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "uOhm",
      "Display": "uOhm",
      "Display (English)": "microOhm"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "uU",
      "Display": "uU",
      "Display (English)": "microUnit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "uU/L",
      "Display": "uU/L",
      "Display (English)": "micro enzyme unit per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "uU/g",
      "Display": "uU/g",
      "Display (English)": "micro enzyme unit per gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "uU/mL",
      "Display": "uU/mL",
      "Display (English)": "micro enzyme unit per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "uV",
      "Display": "uV",
      "Display (English)": "microvolt"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "u[IU]",
      "Display": "u[IU]",
      "Display (English)": "micro international unit"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "u[IU]/L",
      "Display": "u[IU]/L",
      "Display (English)": "microinternational unit per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "u[IU]/mL",
      "Display": "u[IU]/mL",
      "Display (English)": "micro international unit per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ueq",
      "Display": "ueq",
      "Display (English)": "microequivalents"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ueq/L",
      "Display": "ueq/L",
      "Display (English)": "microequivalent per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ueq/mL",
      "Display": "ueq/mL",
      "Display (English)": "microequivalent per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug",
      "Display": "ug",
      "Display (English)": "microgram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/(100.g)",
      "Display": "ug/(100.g)",
      "Display (English)": "microgram per 100 gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/(24.h)",
      "Display": "ug/(24.h)",
      "Display (English)": "microgram per 24 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/(8.h)",
      "Display": "ug/(8.h)",
      "Display (English)": "microgram per 8 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/(kg.d)",
      "Display": "ug/(kg.d)",
      "Display (English)": "microgram / kilogram * day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/(kg.h)",
      "Display": "ug/(kg.h)",
      "Display (English)": "microgram / kilogram * hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/L",
      "Display": "ug/L",
      "Display (English)": "microgram per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/L/(24.h)",
      "Display": "ug/L/(24.h)",
      "Display (English)": "microgram per liter per 24 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/[sft_i]",
      "Display": "ug/[sft_i]",
      "Display (English)": "microgram per square foot (international)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/d",
      "Display": "ug/d",
      "Display (English)": "microgram per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/dL",
      "Display": "ug/dL",
      "Display (English)": "microgram per deciliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/g",
      "Display": "ug/g",
      "Display (English)": "microgram per gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/h",
      "Display": "ug/h",
      "Display (English)": "microgram per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/kg",
      "Display": "ug/kg",
      "Display (English)": "microgram per kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/kg/(8.h)",
      "Display": "ug/kg/(8.h)",
      "Display (English)": "microgram per kilogram per 8 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/kg/d",
      "Display": "ug/kg/d",
      "Display (English)": "microgram per kilogram per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/kg/h",
      "Display": "ug/kg/h",
      "Display (English)": "microgram per kilogram per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/kg/min",
      "Display": "ug/kg/min",
      "Display (English)": "microgram per kilogram per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/m2",
      "Display": "ug/m2",
      "Display (English)": "microgram per square meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/m3",
      "Display": "ug/m3",
      "Display (English)": "microgram per cubic meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/mL",
      "Display": "ug/mL",
      "Display (English)": "microgram per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/mg",
      "Display": "ug/mg",
      "Display (English)": "microgram per milligram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/min",
      "Display": "ug/min",
      "Display (English)": "microgram per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/mmol",
      "Display": "ug/mmol",
      "Display (English)": "microgram per millimole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ug/ng",
      "Display": "ug/ng",
      "Display (English)": "microgram per nanogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "ukat",
      "Display": "ukat",
      "Display (English)": "microkatal"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "um",
      "Display": "um",
      "Display (English)": "micrometer"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "um/s",
      "Display": "um/s",
      "Display (English)": "micrometer per second"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol",
      "Display": "umol",
      "Display (English)": "micromole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/(2.h)",
      "Display": "umol/(2.h)",
      "Display (English)": "micromole per 2 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/(24.h)",
      "Display": "umol/(24.h)",
      "Display (English)": "micromole per 24 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/(8.h)",
      "Display": "umol/(8.h)",
      "Display (English)": "micromole per 8 hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/L",
      "Display": "umol/L",
      "Display (English)": "micromole per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/L/h",
      "Display": "umol/L/h",
      "Display (English)": "micromole per liter per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/d",
      "Display": "umol/d",
      "Display (English)": "micromole per day"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/dL",
      "Display": "umol/dL",
      "Display (English)": "micromole per deciliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/g",
      "Display": "umol/g",
      "Display (English)": "micromole per gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/h",
      "Display": "umol/h",
      "Display (English)": "micromole per hour"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/h/L",
      "Display": "umol/h/L",
      "Display (English)": "micromole per hour per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/h/g",
      "Display": "umol/h/g",
      "Display (English)": "micromole / hour / gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/h/mg",
      "Display": "umol/h/mg",
      "Display (English)": "(micromole) / (hour) / (milligram)"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/kg",
      "Display": "umol/kg",
      "Display (English)": "micromole per kilogram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/m",
      "Display": "umol/m",
      "Display (English)": "micromole / meter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/mL",
      "Display": "umol/mL",
      "Display (English)": "micromole per milliliter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/mL/min",
      "Display": "umol/mL/min",
      "Display (English)": "micromole per milliliter per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/mg",
      "Display": "umol/mg",
      "Display (English)": "micromole per milligram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/min",
      "Display": "umol/min",
      "Display (English)": "micromole per minute"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/min/L",
      "Display": "umol/min/L",
      "Display (English)": "micromole per minute per liter"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/min/g",
      "Display": "umol/min/g",
      "Display (English)": "micromole per minute per gram"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/mmol",
      "Display": "umol/mmol",
      "Display (English)": "micromole per millimole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/mol",
      "Display": "umol/mol",
      "Display (English)": "micromole per mole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "umol/umol",
      "Display": "umol/umol",
      "Display (English)": "micromole per micromole"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "us",
      "Display": "us",
      "Display (English)": "microsecond"
    },
    {
      "System": "http://unitsofmeasure.org",
      "Code": "wk",
      "Display": "wk",
      "Display (English)": "week"
    }
  ]
