const steerYield = 220; // kg of freezer-ready beef per steer
const premiumCutYield = 0.20; // 20% premium cuts
const fullSetYield = 1.00; // 100% utilization
const co2PerSteer = 13500; // kg CO₂ per steer
const waterPerSteer = 7500000; // liters of water per steer
const landPerSteer = 2000; // square meters per steer

// Simple Model Calculation
function calculateSimple() {
    const guestConsumption = parseFloat(document.getElementById("guestConsumption").value);
    const staffConsumption = parseFloat(document.getElementById("staffConsumption").value);
    const totalConsumption = guestConsumption + staffConsumption;

    const fullSetSteers = totalConsumption / steerYield;
    const premiumSteers = totalConsumption / (premiumCutYield * steerYield);

    const co2Offset = (premiumSteers - fullSetSteers) * co2PerSteer;
    const waterSaved = (premiumSteers - fullSetSteers) * waterPerSteer;
    const landSaved = (premiumSteers - fullSetSteers) * landPerSteer;

    document.getElementById("simpleResult").innerHTML = `
        Full Set Steers: ${fullSetSteers.toFixed(2)}<br>
        Premium Steers: ${premiumSteers.toFixed(2)}<br>
        CO₂ Offset: ${co2Offset.toFixed(2)} kg<br>
        Water Saved: ${waterSaved.toFixed(2)} liters<br>
        Land Saved: ${landSaved.toFixed(2)} sq meters
    `;
}

// Complex Model Calculation
function calculateComplex() {
    const rooms = parseFloat(document.getElementById("rooms").value);
    const occupancy = parseFloat(document.getElementById("occupancy").value) / 100;
    const staff = parseFloat(document.getElementById("staff").value);

    const guestConsumption = rooms * 2 * 1.1 * 80 * 30 * occupancy / 1000; // kg per month
    const staffConsumption = staff * 0.6; // kg per month
    const totalConsumption = guestConsumption + staffConsumption;

    const fullSetSteers = totalConsumption / steerYield;
    const premiumSteers = totalConsumption / (premiumCutYield * steerYield);

    const co2Offset = (premiumSteers - fullSetSteers) * co2PerSteer;
    const waterSaved = (premiumSteers - fullSetSteers) * waterPerSteer;
    const landSaved = (premiumSteers - fullSetSteers) * landPerSteer;

    document.getElementById("complexResult").innerHTML = `
        Full Set Steers: ${fullSetSteers.toFixed(2)}<br>
        Premium Steers: ${premiumSteers.toFixed(2)}<br>
        CO₂ Offset: ${co2Offset.toFixed(2)} kg<br>
        Water Saved: ${waterSaved.toFixed(2)} liters<br>
        Land Saved: ${landSaved.toFixed(2)} sq meters
    `;
}
const steerYield = 220; // kg of freezer-ready beef per steer
const premiumCutYield = 0.20; // 20% premium cuts (premium only)
const fullSetPremiumCutYield = 0.25; // 25% premium cuts (full set)
const fullSetYield = 1.00; // 100% utilization
const co2PerSteer = 13500; // kg CO₂ per steer
const waterPerSteer = 7500000; // liters of water per steer
const landPerSteer = 2000; // square meters per steer

// Main Calculation Function
function calculate() {
    const guestConsumption = parseFloat(document.getElementById("guestConsumption").value);
    const staffConsumption = parseFloat(document.getElementById("staffConsumption").value);
    const totalConsumption = guestConsumption + staffConsumption;

    // Full Set Model Calculation
    const fullSetSteers = totalConsumption / steerYield;
    const fullSetPremiumCuts = fullSetSteers * fullSetPremiumCutYield * steerYield;

    // Premium Model Calculation
    const premiumSteers = guestConsumption / (premiumCutYield * steerYield);

    // Adjust for Premium Cuts in Full Set Model (if needed)
    const premiumShortfall = guestConsumption - fullSetPremiumCuts;
    const additionalPremiumSteers = premiumShortfall > 0 ? premiumShortfall / (premiumCutYield * steerYield) : 0;

    // Update HTML with Results
    document.getElementById("premiumResult").innerHTML = `
        Total Steers: ${premiumSteers.toFixed(2)}<br>
        Premium Cuts: ${guestConsumption} kg<br>
    `;

    document.getElementById("fullsetResult").innerHTML = `
        Total Steers: ${fullSetSteers.toFixed(2)}<br>
        Full Set Premium Cuts: ${fullSetPremiumCuts.toFixed(2)} kg<br>
        Additional Premium Cuts: ${premiumShortfall > 0 ? premiumShortfall.toFixed(2) : 0} kg<br>
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
