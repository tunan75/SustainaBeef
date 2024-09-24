const steerYield = 220; // kg of freezer-ready beef per steer
const premiumCutYield = 0.20; // 20% premium cuts (premium only)
const fullSetPremiumCutYield = 0.25; // 25% premium cuts (full set)
const fullSetYield = 1.00; // 100% utilization
const co2PerSteer = 13500; // kg CO₂ per steer
const waterPerSteer = 7500000; // liters of water per steer
const landPerSteer = 2000; // square meters per steer

// Singular Calculation for Full Set and Premium Only Models
function calculateComparison() {
    const guestConsumption = parseFloat(document.getElementById("guestConsumption").value);
    const staffConsumption = parseFloat(document.getElementById("staffConsumption").value);
    const totalConsumption = guestConsumption + staffConsumption;

    // Full Set Model Calculation
    const fullSetSteers = totalConsumption / steerYield;
    const fullSetPremiumCuts = fullSetSteers * fullSetPremiumCutYield * steerYield;

    // Premium Only Model Calculation
    const premiumSteers = guestConsumption / (premiumCutYield * steerYield);

    // Adjust for Premium Cuts in Full Set Model (if needed)
    const premiumShortfall = guestConsumption - fullSetPremiumCuts;
    const additionalPremiumSteers = premiumShortfall > 0 ? premiumShortfall / (premiumCutYield * steerYield) : 0;

    // Update HTML with Results
    document.getElementById("premiumResult").innerHTML = `
        Total Steers: ${premiumSteers.toFixed(2)}<br>
        Premium Cuts: ${guestConsumption} kg
    `;

    document.getElementById("fullsetResult").innerHTML = `
        Total Steers: ${fullSetSteers.toFixed(2)}<br>
        Full Set Premium Cuts: ${fullSetPremiumCuts.toFixed(2)} kg<br>
        Additional Premium Steers: ${additionalPremiumSteers.toFixed(2)} steers
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
