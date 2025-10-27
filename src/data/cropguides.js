// src/data/cropGuides.js
export const CROP_GUIDES = {
  Paddy: {
    overview:
      "Paddy (rice) thrives in warm, humid climates with standing water during early growth. Suited to areas with assured irrigation or high rainfall.",
    water: {
      requirement: "High (standing water 2–5 cm during early stages)",
      monthly_mm: "180–250 mm during vegetative phase",
      notes:
        "Keep soil saturated up to panicle initiation; reduce water before harvest to avoid lodging.",
    },
    fertilizerSchedule: [
      {
        stage: "Basal (at transplanting / sowing)",
        when: "Day 0",
        npk: "NPK 10:26:26 @ 50–75 kg/acre",
        examples: ["DAP", "SSP + MOP combo"],
      },
      {
        stage: "Tillering",
        when: "20–25 days after transplanting",
        npk: "Urea @ 20–30 kg/acre",
        examples: ["Urea"],
      },
      {
        stage: "Panicle initiation",
        when: "40–45 days after transplanting",
        npk: "Urea @ 20–30 kg/acre + MOP @ 10–15 kg/acre",
        examples: ["Urea", "MOP"],
      },
    ],
    costPerAcre: [
      { item: "Seed", amount: 1200 },
      { item: "Fertilizers & soil amendments", amount: 3500 },
      { item: "Pesticides/Herbicides", amount: 1500 },
      { item: "Irrigation & labor", amount: 4500 },
      { item: "Miscellaneous", amount: 800 },
    ],
    timeline: [
      { step: "Land prep & puddling", window: "Week 0" },
      { step: "Transplanting/Sowing", window: "Week 1" },
      { step: "Tillering care & top-dress", window: "Week 3–4" },
      { step: "Panicle initiation top-dress", window: "Week 6–7" },
      { step: "Drain field before harvest", window: "Week 12–14" },
      { step: "Harvest", window: "Week 14–16" },
    ],
    bestPractices: [
      "Maintain shallow standing water during early growth; avoid deep flooding.",
      "Use well-sprouted, healthy seedlings.",
      "Adopt intermittent irrigation (Alternate Wetting & Drying) to save water.",
    ],
  },
  Wheat: {
    overview:
      "Wheat prefers cool, dry climate with moderate water. Well-drained loam to clay-loam soils give best yields.",
    water: {
      requirement: "Moderate (critical at crown root, tillering, and grain filling)",
      monthly_mm: "60–120 mm with 3–4 irrigations per season",
      notes:
        "Avoid waterlogging. Provide light irrigation at critical stages.",
    },
    fertilizerSchedule: [
      {
        stage: "Basal (at sowing)",
        when: "Day 0",
        npk: "NPK 12:32:16 @ 40–60 kg/acre",
        examples: ["DAP / Complex NPK", "Zinc sulphate if deficient"],
      },
      {
        stage: "Crown root initiation (CRI)",
        when: "20–25 DAS",
        npk: "Urea @ 20–25 kg/acre",
        examples: ["Urea"],
      },
      {
        stage: "Tillering / Before booting",
        when: "40–45 DAS",
        npk: "Urea @ 15–20 kg/acre",
        examples: ["Urea"],
      },
    ],
    costPerAcre: [
      { item: "Seed", amount: 1800 },
      { item: "Fertilizers & amendments", amount: 3200 },
      { item: "Plant protection", amount: 1000 },
      { item: "Irrigation & labor", amount: 3000 },
      { item: "Miscellaneous", amount: 700 },
    ],
    timeline: [
      { step: "Sowing", window: "Week 0" },
      { step: "CRI irrigation + top-dress", window: "Week 3–4" },
      { step: "Tillering top-dress", window: "Week 6–7" },
      { step: "Grain filling care", window: "Week 10–12" },
      { step: "Harvest", window: "Week 14–16" },
    ],
    bestPractices: [
      "Ensure fine tilth and proper seed rate for uniform stand.",
      "Irrigate at CRI stage for maximum yield response.",
      "Rotate with legumes to improve soil health.",
    ],
  },
  Cotton: {
    overview:
      "Cotton thrives in warm climates with moderate rainfall and plenty of sunshine. It requires a long frost-free period and well-drained black or alluvial soils rich in nutrients.",
    water: {
      requirement: "Moderate to high (sensitive to drought at flowering and boll formation stages)",
      monthly_mm: "500–700 mm total over the growing season or 6–8 irrigations",
      notes:
        "Avoid prolonged waterlogging. Irrigate lightly but frequently, especially during flowering and boll development.",
    },
    fertilizerSchedule: [
      {
        stage: "Basal (before sowing or at sowing)",
        when: "Day 0",
        npk: "NPK 4:2:1 ratio @ 60–80 kg Nitrogen, 30–40 kg Phosphorus, 15–20 kg Potassium per acre",
        examples: ["Compost/FYM @ 2 tons/acre", "DAP or Complex NPK formulations"],
      },
      {
        stage: "Vegetative growth",
        when: "25–30 DAS",
        npk: "Urea @ 25–30 kg/acre",
        examples: ["Urea", "Micronutrients (Zinc, Magnesium) if deficient"],
      },
      {
        stage: "Flowering",
        when: "50–60 DAS",
        npk: "Urea @ 20–25 kg/acre + Potash @ 10 kg/acre",
        examples: ["MOP (Muriate of Potash)", "Foliar spray: 1% Urea + 1% KNO₃"],
      },
      {
        stage: "Boll formation",
        when: "75–90 DAS",
        npk: "Urea @ 10–15 kg/acre (final split)",
        examples: ["Urea", "Micronutrient foliar spray (Borax 0.2%)"],
      },
    ],
    costPerAcre: [
      { item: "Seed", amount: 2500 },
      { item: "Fertilizers & amendments", amount: 4500 },
      { item: "Plant protection", amount: 3000 },
      { item: "Irrigation & labor", amount: 3500 },
      { item: "Miscellaneous", amount: 1000 },
    ],
    timeline: [
      { step: "Land preparation & sowing", window: "Week 0–1" },
      { step: "First irrigation + basal dose", window: "Week 2–3" },
      { step: "Vegetative fertilizer top-up", window: "Week 4–5" },
      { step: "Flowering stage care", window: "Week 8–10" },
      { step: "Boll formation management", window: "Week 12–14" },
      { step: "Harvesting", window: "Week 18–22" },
    ],
    bestPractices: [
      "Use certified Bt cotton or hybrid seeds suited to your region.",
      "Maintain 2–3 irrigations during flowering and boll development for higher yield.",
      "Adopt Integrated Pest Management (IPM) to control bollworms and sucking pests.",
      "Avoid excessive nitrogen to reduce vegetative growth and pest risk.",
      "Rotate with pulses or cereals to improve soil fertility.",
    ],
  },
  Maize: {
    overview:
      "Maize (corn) grows best in warm weather with good sunshine. Performs well on well-drained loam to sandy-loam soils with adequate nutrients.",
    water: {
      requirement: "Moderate (critical at knee-high, tasseling, and grain-filling stages)",
      monthly_mm: "350–500 mm total over the season; 4–6 irrigations",
      notes:
        "Avoid water stress at tasseling and silking. Prevent waterlogging on heavy soils.",
    },
    fertilizerSchedule: [
      {
        stage: "Basal (at sowing)",
        when: "Day 0",
        npk: "NPK 10:26:26 @ 40–50 kg/acre + FYM/compost 1–2 tons/acre",
        examples: ["DAP/Complex NPK", "FYM/Compost"],
      },
      {
        stage: "Knee-high (V6–V8)",
        when: "20–25 DAS",
        npk: "Urea @ 25–30 kg/acre",
        examples: ["Urea", "Zinc sulphate if deficient"],
      },
      {
        stage: "Pre-tasseling",
        when: "35–40 DAS",
        npk: "Urea @ 20–25 kg/acre + MOP @ 8–10 kg/acre (if low K)",
        examples: ["Urea", "MOP"],
      },
    ],
    costPerAcre: [
      { item: "Seed", amount: 1800 },
      { item: "Fertilizers & amendments", amount: 3200 },
      { item: "Plant protection", amount: 1200 },
      { item: "Irrigation & labor", amount: 2500 },
      { item: "Miscellaneous", amount: 700 },
    ],
    timeline: [
      { step: "Sowing & basal application", window: "Week 0" },
      { step: "Weeding + top-dress (knee-high)", window: "Week 3–4" },
      { step: "Top-dress (pre-tasseling)", window: "Week 5–6" },
      { step: "Grain filling care", window: "Week 8–10" },
      { step: "Harvest (physiological maturity)", window: "Week 12–14" },
    ],
    bestPractices: [
      "Use region-recommended hybrids; treat seed with fungicide/insecticide.",
      "Maintain plant spacing ~60×20 cm (or as per hybrid).",
      "Irrigate at critical stages (knee-high, tasseling, grain filling).",
      "Monitor for fall armyworm; use IPM (pheromone traps, need-based sprays).",
    ],
  },
  Chickpea: {
    overview:
      "Chickpea is a cool-season pulse that fixes nitrogen and improves soil health. Performs well on well-drained loam to clay-loam soils.",
    water: {
      requirement: "Low to moderate; largely rainfed with 1–2 lifesaving irrigations",
      monthly_mm: "200–300 mm total; avoid waterlogging",
      notes:
        "Irrigate at flowering and pod filling if moisture is limiting. Excess moisture increases disease risk.",
    },
    fertilizerSchedule: [
      {
        stage: "Basal (at sowing)",
        when: "Day 0",
        npk: "NPK 12:32:16 @ 20–30 kg/acre + SSP if P is low",
        examples: ["Complex NPK / DAP", "Rhizobium inoculation of seed"],
      },
      {
        stage: "Flowering (if needed)",
        when: "35–40 DAS",
        npk: "Foliar 2% DAP or 1% KNO₃ (optional under nutrient stress)",
        examples: ["DAP foliar", "KNO₃ foliar"],
      },
    ],
    costPerAcre: [
      { item: "Seed", amount: 1400 },
      { item: "Fertilizers & amendments", amount: 1600 },
      { item: "Plant protection", amount: 1000 },
      { item: "Irrigation & labor", amount: 1800 },
      { item: "Miscellaneous", amount: 600 },
    ],
    timeline: [
      { step: "Sowing & basal application", window: "Week 0" },
      { step: "Weed management", window: "Week 2–4" },
      { step: "Flowering care", window: "Week 5–7" },
      { step: "Pod filling", window: "Week 8–10" },
      { step: "Harvest", window: "Week 12–14" },
    ],
    bestPractices: [
      "Inoculate seed with Rhizobium for better N fixation.",
      "Prefer raised beds in heavy soils to avoid waterlogging.",
      "Scout for pod borer; install pheromone traps and use IPM.",
      "Rotate with cereals/oilseeds to break disease cycles.",
    ],
  },
  Pigeonpea: {
    overview:
      "Pigeonpea is a deep-rooted pulse tolerant to drought, suited to warm regions. Does well on well-drained black or red soils.",
    water: {
      requirement: "Low to moderate; mostly rainfed, critical at flowering and pod filling",
      monthly_mm: "300–400 mm seasonal; avoid standing water",
      notes:
        "Provide 1–2 irrigations if severe moisture stress occurs during flowering/pod filling.",
    },
    fertilizerSchedule: [
      {
        stage: "Basal (at sowing)",
        when: "Day 0",
        npk: "NPK 10:26:26 @ 20–25 kg/acre + FYM/compost 1 ton/acre",
        examples: ["DAP/Complex NPK", "FYM/Compost", "PSB + Rhizobium inoculation"],
      },
      {
        stage: "Early flowering",
        when: "50–60 DAS",
        npk: "Foliar 2% DAP or 1% KNO₃ (optional under stress)",
        examples: ["DAP foliar", "KNO₃ foliar", "Micronutrients if deficient"],
      },
    ],
    costPerAcre: [
      { item: "Seed", amount: 1200 },
      { item: "Fertilizers & amendments", amount: 1700 },
      { item: "Plant protection", amount: 1400 },
      { item: "Irrigation & labor", amount: 2000 },
      { item: "Miscellaneous", amount: 600 },
    ],
    timeline: [
      { step: "Sowing & basal application", window: "Week 0" },
      { step: "Weeding & earthing-up", window: "Week 3–6" },
      { step: "Flowering management", window: "Week 8–10" },
      { step: "Pod filling", window: "Week 12–16" },
      { step: "Harvest (physiological maturity)", window: "Week 18–22" },
    ],
    bestPractices: [
      "Use wilt-tolerant varieties for endemic areas.",
      "Maintain wider spacing (e.g., 90×20–30 cm) or inter-crop with short-duration pulses/cereals.",
      "Adopt IPM for pod borer and sucking pests; use bird perches and traps.",
      "Retain crop residues to improve soil organic matter.",
    ],
  },

};
