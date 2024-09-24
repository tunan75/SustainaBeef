const steerYield = 220; // kg of freezer-ready beef per steer
const premiumCutYield = 0.25; // 25% premium cuts
const thinSteaksYield = 0.175; // 17.5% thin steaks
const boneInRoastsYield = 0.15; // 15% bone-in roasts
const cubeMeatYield = 0.225; // 22.5% cube meat
const groundMeatYield = 0.20; // 20% ground meat
const co2PerSteer = 13500; // kg CO₂ per steer
const waterPerSteer = 7500000; // liters of water per steer
const landPerSteer = 2000; // square meters per steer

// Main Calculation Function
function calculate() {
    const guestConsumption = parseFloat(document.getElementById("guestConsumption").value);
    const staffConsumption = parseFloat(document.getElementById("staffConsumption").value);
    const totalConsumption = guestConsumption + staffConsumption;

    // Full Set Model Calculation (Distribute based on provided percentages)
    const fullSetSteers = totalConsumption / steerYield;
    const fullSetPremiumCuts = fullSetSteers * premiumCutYield * steerYield;
    const fullSetThinSteaks = fullSetSteers * thinSteaksYield * steerYield;
    const fullSetBoneInRoasts = fullSetSteers * boneInRoastsYield * steerYield;
    const fullSetCubeMeat = fullSetSteers * cubeMeatYield * steerYield;
    const fullSetGroundMeat = fullSetSteers * groundMeatYield * steerYield;

    // Premium Model Calculation (assumes only premium cuts are bought for guests)
    const premiumSteers = guestConsumption / (premiumCutYield * steerYield);

    // Update HTML with Results
    document.getElementById("premiumResult").innerHTML = `
        Total Steers: ${premiumSteers.toFixed(2)}<br>
        Premium Cuts: ${guestConsumption} kg<br>
    `;

    document.getElementById("fullsetResult").innerHTML = `
        Total Steers: ${fullSetSteers.toFixed(2)}<br>
        Premium Cuts: ${fullSetPremiumCuts.toFixed(2)} kg<br>
        Thin Steaks: ${fullSetThinSteaks.toFixed(2)} kg<br>
        Bone-In Roasts: ${fullSetBoneInRoasts.toFixed(2)} kg<br>
        Cube Meat: ${fullSetCubeMeat.toFixed(2)} kg<br>
        Ground Meat: ${fullSetGroundMeat.toFixed(2)} kg
    `;

    // Environmental Impact Calculation
    const premiumModelCO2 = premiumSteers * co2PerSteer;
    const fullSetModelCO2 = fullSetSteers * co2PerSteer;
    const co2Difference = premiumModelCO2 - fullSetModelCO2;

    document.getElementById("environmentImpact").innerHTML = `
        CO₂ Saved: ${co2Difference.toFixed(2)} kg<br>
        Water Saved: ${(premiumSteers * waterPerSteer - fullSetSteers * waterPerSteer).toFixed(2)} liters<br>
        Land Saved: ${(premiumSteers * landPerSteer - fullSetSteers * landPerSteer).toFixed(2)} sq meters
    `;
}
