const steerYield = 220; // kg of freezer-ready beef per steer
const premiumCutYield = 0.20; // 20% premium cuts for both models
const thinSteaksYield = 0.175; // 17.5% thin steaks
const boneInRoastsYield = 0.15; // 15% bone-in roasts
const cubeMeatYield = 0.225; // 22.5% cube meat
const groundMeatYield = 0.20; // 20% ground meat
const co2PerSteer = 13500; // kg CO₂ per steer
const waterPerSteer = 7500000; // liters of water per steer
const landPerSteer = 2000; // square meters per steer
const steerCanteenBeef = 10; // 10 kg for 1 steer equivalent in low-quality beef (staff canteen)

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
        Total Steers (Guests - High Quality Beef): ${premiumGuestSteers.toFixed(2)}<br>
        Premium Cuts for Guests (High Quality): ${guestConsumption} kg<br><br>
        Total Steers (Staff - Low Quality Beef): ${premiumStaffSteers.toFixed(2)}<br>
        Premium Cuts for Staff (Low Quality): ${staffConsumption} kg
    `;

    // Update HTML with Results for Full Set
    document.getElementById("fullsetResult").innerHTML = `
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
        Ground Meat: ${staffGroundMeat.toFixed(2)} kg<br>

        <br><strong>Total Steers Slaughtered (Full Set Model): ${fullSetSteers.toFixed(2)}</strong><br>
    `;

    // Environmental Impact Calculation
    const premiumModelCO2 = (premiumGuestSteers + premiumStaffSteers) * co2PerSteer;
    const fullSetModelCO2 = fullSetSteers * co2PerSteer;
    const co2Difference = premiumModelCO2 - fullSetModelCO2;

    document.getElementById("environmentImpact").innerHTML = `
        CO₂ Saved: ${co2Difference.toFixed(2)} kg<br>
        Water Saved: ${((premiumGuestSteers + premiumStaffSteers) * waterPerSteer - fullSetSteers * waterPerSteer).toFixed(2)} liters<br>
        Land Saved: ${((premiumGuestSteers + premiumStaffSteers) * landPerSteer - fullSetSteers * landPerSteer).toFixed(2)} sq meters
    `;
}
