const steerYield = 220; // kg of freezer-ready beef per steer
const premiumCutYield = 0.20; // 20% premium cuts for both models
const thinSteaksYield = 0.175; // 17.5% thin steaks
const boneInRoastsYield = 0.15; // 15% bone-in roasts
const cubeMeatYield = 0.225; // 22.5% cube meat
const groundMeatYield = 0.20; // 20% ground meat
const co2PerSteer = 13500; // kg CO₂ per steer
const waterPerSteer = 7500000; // liters of water per steer
const landPerSteer = 2000; // square meters per steer
const carbonOffsetPerSteer = 5000; // kg CO₂ offset per steer
const steerCanteenBeef = 10; // 10 kg for 1 steer equivalent in low-quality beef (staff canteen)

// Percentages for guest and staff use
const guestUse = {
    premiumCuts: 1.0, // 100% for guests
    thinSteaks: 0.2,  // 20% for guests
    boneInRoasts: 0.3,  // 30% for guests
    cubeMeat: 0.15, // 15% for guests
    groundMeat: 0.2  // 20% for guests
};

const staffUse = {
    premiumCuts: 0.0,  // 0% for staff
    thinSteaks: 0.8,  // 80% for staff
    boneInRoasts: 0.7,  // 70% for staff
    cubeMeat: 0.85, // 85% for staff
    groundMeat: 0.8  // 80% for staff
};

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

    // Full Set Model Calculation (Distribute based on provided percentages)
    const fullSetSteers = totalConsumption / steerYield;
    
    // Calculate total available cuts from the Full Set
    const fullSetPremiumCuts = fullSetSteers * premiumCutYield * steerYield;
    const fullSetThinSteaks = fullSetSteers * thinSteaksYield * steerYield;
    const fullSetBoneInRoasts = fullSetSteers * boneInRoastsYield * steerYield;
    const fullSetCubeMeat = fullSetSteers * cubeMeatYield * steerYield;
    const fullSetGroundMeat = fullSetSteers * groundMeatYield * steerYield;

    // Calculate quantities for guests and staff based on percentages
    const guestPremiumCuts = fullSetPremiumCuts * guestUse.premiumCuts;
    const staffPremiumCuts = fullSetPremiumCuts * staffUse.premiumCuts;

    const guestThinSteaks = fullSetThinSteaks * guestUse.thinSteaks;
    const staffThinSteaks = fullSetThinSteaks * staffUse.thinSteaks;

    const guestBoneInRoasts = fullSetBoneInRoasts * guestUse.boneInRoasts;
    const staffBoneInRoasts = fullSetBoneInRoasts * staffUse.boneInRoasts;

    const guestCubeMeat = fullSetCubeMeat * guestUse.cubeMeat;
    const staffCubeMeat = fullSetCubeMeat * staffUse.cubeMeat;

    const guestGroundMeat = fullSetGroundMeat * guestUse.groundMeat;
    const staffGroundMeat = fullSetGroundMeat * staffUse.groundMeat;

    // Premium Model Calculation
    const premiumGuestSteers = guestConsumption / (premiumCutYield * steerYield);
    const premiumStaffSteers = staffConsumption / steerCanteenBeef; // 10 kg = 1 steer for low-quality beef

    // Update HTML with Results for Premium Only
    document.getElementById("premiumResult").innerHTML = `
        <h4>Current Premium Only Model</h4>
        <h4>Total Cows Slaughtered: ${(premiumGuestSteers + premiumStaffSteers).toFixed(2)}</h4>
        Premium Cuts for Guests (High Quality): ${guestConsumption} kg<br>
        Premium Cuts for Staff (Low Quality): ${staffConsumption} kg
        <br><br>
        For Guests, beef is used as thick steaks in A la Carte Restaurants (premium Cuts), thin steaks in sandwiches and buffets, roasts (bone-in steaks and roasts), and stew meat and ground meat for other side dishes. Based on menu stats, the Guest Beef consumption should be divided into the below section:
        <ul>
            <li>Premium Cuts: ${(guestConsumption * guestUse.premiumCuts).toFixed(2)} kg</li>
            <li>Thin Steaks: ${(guestConsumption * guestUse.thinSteaks).toFixed(2)} kg</li>
            <li>Bone-In Roasts: ${(guestConsumption * guestUse.boneInRoasts).toFixed(2)} kg</li>
            <li>Cube Meat: ${(guestConsumption * guestUse.cubeMeat).toFixed(2)} kg</li>
            <li>Ground Meat: ${(guestConsumption * guestUse.groundMeat).toFixed(2)} kg</li>
        </ul>
        <br>
        Staff canteen operations mostly use thin steaks and curry-type cube meat:
        <ul>
            <li>Thin Steaks: ${(staffConsumption * staffUse.thinSteaks).toFixed(2)} kg</li>
            <li>Cube Meat: ${(staffConsumption * staffUse.cubeMeat).toFixed(2)} kg</li>
        </ul>
    `;

    // Update HTML with Results for Full Set
    document.getElementById("fullsetResult").innerHTML = `
        <h4>Total Cows Slaughtered: ${fullSetSteers.toFixed(2)}</h4>
        <h4>Full Set Model (For Guests):</h4>
        Premium Cuts: ${guestPremiumCuts.toFixed(2)} kg<br>
        Thin Steaks: ${guestThinSteaks.toFixed(2)} kg<br>
        Bone-In Roasts: ${guestBoneInRoasts.toFixed(2)} kg<br>
        Cube Meat: ${guestCubeMeat.toFixed(2)} kg<br>
        Ground Meat: ${guestGroundMeat.toFixed(2)} kg<br>

        <h4>Full Set Model (For Staff):</h4>
        Premium Cuts: ${staffPremiumCuts.toFixed(2)} kg<br>
        Thin Steaks: ${staffThinSteaks.toFixed(2)} kg<br>
        Bone-In Roasts: ${staffBoneInRoasts.toFixed(2)} kg<br>
        Cube Meat: ${staffCubeMeat.toFixed(2)} kg<br>
        Ground Meat: ${staffGroundMeat.toFixed(2)} kg
    `;

    // Environmental Impact Calculation
    const premiumModelCO2 = (premiumGuestSteers + premiumStaffSteers) * co2PerSteer;
    const fullSetModelCO2 = fullSetSteers * co2PerSteer;
    const co2Difference = premiumModelCO2 - fullSetModelCO2;

    // Carbon Footprint Offset
    const carbonFootprintOffset = fullSetSteers * carbonOffsetPerSteer;

    // Calculate how many cows are saved
    const cowsSaved = (premiumGuestSteers + premiumStaffSteers) - fullSetSteers;

    // Update the environmental impact results
    document.getElementById("environmentImpact").innerHTML = `
        <div style="text-align:center;">
            <h4>Environmental Impact Comparison</h4>
            CO₂ Saved: ${formatNumber(co2Difference, "metric tons")}<br>
            Water Saved: ${formatNumber(((premiumGuestSteers + premiumStaffSteers) * waterPerSteer - fullSetSteers * waterPerSteer), "m³")}<br>
            Land Saved: ${formatNumber(((premiumGuestSteers + premiumStaffSteers) * landPerSteer - fullSetSteers * landPerSteer), "hectares")}<br>
            Carbon Footprint Offset: ${formatNumber(carbonFootprintOffset, "metric tons")}<br>
            <br>
            <h4>Cows Saved: ${cowsSaved.toFixed(2)}</h4>
        </div>
    `;
}
