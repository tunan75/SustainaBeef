const steerYield = 220; // kg of freezer-ready beef per steer
const premiumCutYield = 0.20; // 20% premium cuts for both models
const thickSteaksPercentage = 0.40; // 40% Thick Steaks
const thinSteaksPercentage = 0.25; // 25% Thin Steaks
const roastsPercentage = 0.10; // 10% Roasts
const stewMeatPercentage = 0.15; // 15% Stew Meat
const groundMeatPercentage = 0.10; // 10% Ground Meat
const co2PerSteer = 13500; // kg CO₂ per steer
const waterPerSteer = 7500000; // liters of water per steer
const landPerSteer = 2000; // square meters per steer
const carbonOffsetPerSteer = 5000; // kg CO₂ offset per steer
const steerCanteenBeef = 10; // 10 kg for 1 steer equivalent in low-quality beef (staff canteen)

// Helper function to format large numbers with commas and units
function formatNumber(value, unit) {
    if (unit === "metric tons") {
        return (value / 1000).toFixed(2) + " " + unit;
    } else if (unit === "m³") {
        return (value / 1000).toFixed(2) + " " + unit;
    } else if (unit === "hectares") {
        return (value / 10000).toFixed(2) + " " + unit;
    } else {
        return value.toLocaleString() + " " + unit;
    }
}

// Main Calculation Function
function calculate() {
    const guestConsumption = parseFloat(document.getElementById("guestConsumption").value);
    const staffConsumption = parseFloat(document.getElementById("staffConsumption").value);
    const totalConsumption = guestConsumption + staffConsumption;

    // Breakdown guest consumption into specific types of beef cuts
    const thickSteaks = guestConsumption * thickSteaksPercentage;
    const thinSteaks = guestConsumption * thinSteaksPercentage;
    const roasts = guestConsumption * roastsPercentage;
    const stewMeat = guestConsumption * stewMeatPercentage;
    const groundMeat = guestConsumption * groundMeatPercentage;

    // Display breakdown results in HTML
    document.getElementById("thickSteaks").textContent = thickSteaks.toFixed(2);
    document.getElementById("thinSteaks").textContent = thinSteaks.toFixed(2);
    document.getElementById("roasts").textContent = roasts.toFixed(2);
    document.getElementById("stewMeat").textContent = stewMeat.toFixed(2);
    document.getElementById("groundMeat").textContent = groundMeat.toFixed(2);

    // Premium Model Calculation
    const premiumGuestSteers = guestConsumption / (premiumCutYield * steerYield);
    const premiumStaffSteers = staffConsumption / steerCanteenBeef; // 10 kg = 1 steer for low-quality beef

    // Display premium model results
    document.getElementById("premiumCows").textContent = (premiumGuestSteers + premiumStaffSteers).toFixed(2);
    document.getElementById("guestConsumptionKg").textContent = guestConsumption.toFixed(2);
    document.getElementById("staffConsumptionKg").textContent = staffConsumption.toFixed(2);

    // Full Set Model Calculation (Distribute based on provided percentages)
    const fullSetSteers = totalConsumption / steerYield;
    
    // Calculate total available cuts from the Full Set
    const fullSetPremiumCuts = fullSetSteers * premiumCutYield * steerYield;
    const fullSetThinSteaks = fullSetSteers * thinSteaksPercentage * steerYield;
    const fullSetBoneInRoasts = fullSetSteers * roastsPercentage * steerYield;
    const fullSetCubeMeat = fullSetSteers * stewMeatPercentage * steerYield;
    const fullSetGroundMeat = fullSetSteers * groundMeatPercentage * steerYield;

    // Display Full Set model results
    document.getElementById("fullSetCows").textContent = fullSetSteers.toFixed(2);
    document.getElementById("fullSetPremiumCuts").textContent = fullSetPremiumCuts.toFixed(2);
    document.getElementById("fullSetThinSteaks").textContent = fullSetThinSteaks.toFixed(2);
    document.getElementById("fullSetBoneInRoasts").textContent = fullSetBoneInRoasts.toFixed(2);
    document.getElementById("fullSetCubeMeat").textContent = fullSetCubeMeat.toFixed(2);
    document.getElementById("fullSetGroundMeat").textContent = fullSetGroundMeat.toFixed(2);

    // Environmental Impact Calculation
    const premiumModelCO2 = (premiumGuestSteers + premiumStaffSteers) * co2PerSteer;
    const fullSetModelCO2 = fullSetSteers * co2PerSteer;
    const co2Difference = premiumModelCO2 - fullSetModelCO2;

    // Carbon Footprint Offset
    const carbonFootprintOffset = fullSetSteers * carbonOffsetPerSteer;

    // Calculate how many cows are saved
    const cowsSaved = (premiumGuestSteers + premiumStaffSteers) - fullSetSteers;

    // Update the environmental impact results
    document.getElementById("co2Saved").textContent = formatNumber(co2Difference, "metric tons");
    document.getElementById("waterSaved").textContent = formatNumber(((premiumGuestSteers + premiumStaffSteers) * waterPerSteer - fullSetSteers * waterPerSteer), "m³");
    document.getElementById("landSaved").textContent = formatNumber(((premiumGuestSteers + premiumStaffSteers) * landPerSteer - fullSetSteers * landPerSteer), "hectares");
    document.getElementById("carbonFootprintOffset").textContent = formatNumber(carbonFootprintOffset, "metric tons");
    document.getElementById("cowsSaved").textContent = cowsSaved.toFixed(2);
}

