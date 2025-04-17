const elements = [
    {
        name: "Fe",
        description: "Iron (Fe) is essential for the synthesis of chlorophyll. It helps in photosynthesis and promotes healthy plant growth.",
        recommendedDosage: "0.1 - 0.5 mg/L",
        deficiencySigns: "Yellowing of leaves (chlorosis), particularly in younger leaves. Stunted growth and poor development.",
        deficiencyCauses: "Low iron availability, high pH levels, or poor substrate for root absorption.",
        excessSigns: "Dark green or black spots on leaves, possible inhibition of nutrient uptake.",
        excessCauses: "Over-fertilization, high iron concentration in the water.",
        excessCorrection: "Perform a water change, reduce iron dosage, and check pH levels.",
        dataFilter: ["fe", "micro"]
    },
    {
        name: "Mn",
        description: "Manganese (Mn) is involved in photosynthesis, respiration, and nitrogen assimilation.",
        recommendedDosage: "0.01 - 0.1 mg/L",
        deficiencySigns: "Mottled leaves, interveinal chlorosis (yellowing between leaf veins), poor plant growth.",
        deficiencyCauses: "Low manganese levels in water or soil, high pH levels.",
        excessSigns: "Leaf edges turning brown or showing necrosis.",
        excessCauses: "Over-fertilization, high manganese concentration.",
        excessCorrection: "Perform a water change and reduce manganese input.",
        dataFilter: ["mn", "micro"]
    },
    {
        name: "B",
        description: "Boron (B) is important for the transport of sugars and the formation of cell walls.",
        recommendedDosage: "0.01 - 0.05 mg/L",
        deficiencySigns: "Deformed or stunted growth, especially in the tips of roots and stems.",
        deficiencyCauses: "Low boron availability, high pH.",
        excessSigns: "Leaf tip burning, especially on older leaves.",
        excessCauses: "Over-fertilization, high boron levels.",
        excessCorrection: "Perform a water change and reduce boron concentration.",
        dataFilter: ["b", "micro"]
    },
    {
        name: "Zn",
        description: "Zinc (Zn) plays a role in plant metabolism and enzyme activation. It’s also vital for chlorophyll formation.",
        recommendedDosage: "0.005 - 0.02 mg/L",
        deficiencySigns: "Chlorosis, particularly in the younger leaves, stunted growth.",
        deficiencyCauses: "Low zinc availability in the substrate or water.",
        excessSigns: "Yellowing of leaves with curling or necrosis, especially in the older leaves.",
        excessCauses: "High zinc levels in water, over-fertilization.",
        excessCorrection: "Reduce zinc dosage and perform water changes.",
        dataFilter: ["zn", "micro"]
    },
    {
        name: "Cu",
        description: "Copper (Cu) is required in very small amounts for plant respiration and photosynthesis.",
        recommendedDosage: "0.002 - 0.01 mg/L",
        deficiencySigns: "Yellowing leaves, poor plant growth.",
        deficiencyCauses: "Low copper levels in water or soil.",
        excessSigns: "Leaf discoloration (blue or green), stunted growth, toxicity symptoms.",
        excessCauses: "Over-fertilization, high copper concentration.",
        excessCorrection: "Perform a water change and reduce copper input.",
        dataFilter: ["cu", "micro"]
    },
    {
        name: "Mo",
        description: "Molybdenum (Mo) is vital for nitrogen metabolism, especially nitrate reduction.",
        recommendedDosage: "0.0005 - 0.002 mg/L",
        deficiencySigns: "Chlorosis and necrosis on leaves, poor plant growth.",
        deficiencyCauses: "Low molybdenum levels in water or substrate.",
        excessSigns: "Yellowing of leaves, toxicity symptoms.",
        excessCauses: "Excessive molybdenum levels, over-fertilization.",
        excessCorrection: "Perform a water change, reduce molybdenum levels.",
        dataFilter: ["mo", "micro"]
    },
    {
        name: "NO3",
        description: "Nitrates (NO3) are the main source of nitrogen for plants, crucial for protein synthesis and healthy leaf development.",
        recommendedDosage: "10 - 20 mg/L",
        deficiencySigns: "Slow growth, pale leaves, overall plant weakness.",
        deficiencyCauses: "Low nitrate levels in the water, poor filtration.",
        excessSigns: "Excessive algae growth, plant leaves turning dark green.",
        excessCauses: "Over-fertilization, excess nitrate in the water.",
        excessCorrection: "Perform a water change to reduce nitrate levels.",
        dataFilter: ["no3", "macro"]
    },
    {
        name: "PO4",
        description: "Phosphates (PO4) are essential for energy transfer within the plant cells and for root development.",
        recommendedDosage: "0.5 - 2 mg/L",
        deficiencySigns: "Weak root system, slow plant growth, yellowing of leaves.",
        deficiencyCauses: "Low phosphate levels in water, poor substrate.",
        excessSigns: "Algae blooms, water cloudiness, stunted growth.",
        excessCauses: "Over-fertilization, too much phosphate in the water.",
        excessCorrection: "Perform water changes and reduce phosphate fertilizer use.",
        dataFilter: ["po4", "macro"]
    },
    {
        name: "K",
        description: "Potassium (K) helps in the regulation of water balance, enzyme activation, and improves disease resistance in plants.",
        recommendedDosage: "5 - 20 mg/L",
        deficiencySigns: "Yellowing at the leaf edges, curling of leaves.",
        deficiencyCauses: "Low potassium availability, insufficient fertilization.",
        excessSigns: "Interveinal chlorosis, leaf burning.",
        excessCauses: "Excessive potassium in the water, over-fertilization.",
        excessCorrection: "Perform a water change and reduce potassium dosage.",
        dataFilter: ["k", "macro"]
    },
    {
        name: "Mg",
        description: "Magnesium (Mg) is the central atom of the chlorophyll molecule and plays a crucial role in photosynthesis.",
        recommendedDosage: "5 - 15 mg/L",
        deficiencySigns: "Interveinal chlorosis, leaf curl, reduced photosynthesis.",
        deficiencyCauses: "Low magnesium levels in the water.",
        excessSigns: "Yellowing of leaves and root issues.",
        excessCauses: "Over-fertilization, high magnesium concentrations.",
        excessCorrection: "Perform a water change and reduce magnesium input.",
        dataFilter: ["mg", "macro"]
    },
    {
        name: "Ca",
        description: "Calcium (Ca) is essential for cell wall formation and root development.",
        recommendedDosage: "20 - 50 mg/L",
        deficiencySigns: "Stunted growth, necrotic spots on leaves, weak cell walls.",
        deficiencyCauses: "Low calcium availability in the water.",
        excessSigns: "Leaf tip burn, white spots on leaves.",
        excessCauses: "Over-fertilization, high calcium levels.",
        excessCorrection: "Perform a water change and reduce calcium input.",
        dataFilter: ["ca", "macro"]
    }
];

export default elements;